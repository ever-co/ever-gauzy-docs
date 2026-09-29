#!/usr/bin/env node
/**
 * Checks the retired-locale redirects in nginx-default.conf against a running copy of the site.
 *
 *   node scripts/check-locale-redirects.mjs [siteUrl=https://docs.gauzy.co] [pages=30]
 *
 * siteUrl is anything that serves the image: a local container
 * (`docker run -p 127.0.0.1:8080:80 <image>` -> http://127.0.0.1:8080) or production. The real
 * pages come from <siteUrl>/sitemap.xml, so every expectation is a page the site actually serves.
 * Redirects are never followed; each answer is judged on its own, as a crawler sees it.
 *
 *   /<locale><page>, with and without the trailing slash   301, Location = <page> exactly
 *   /<locale>  /<locale>/                                   301, Location = /
 *   /<locale>/sitemap.xml?probe=1                           301, Location = /sitemap.xml?probe=1
 *   every Location handed out                               200 directly, same scheme and host
 *
 * Controls (nothing here may be redirected away):
 *   every sampled page itself, and up to 10 pages whose first segment only STARTS with a
 *   locale code
 *   (/frontend/, /deployment/, ...), answers 200; /en/, /DE/ and /dex/ are not redirected;
 *   /de/%5Cevil.com is not redirected, and no Location ever leaves the site.
 *
 * Exits 1 on any failure, and when the sitemap yields no pages (a check with nothing to check
 * would otherwise pass by absence).
 */

// cspell:ignore Googlebot Cevil Fevil

const RETIRED_LOCALES = ['ar', 'bg', 'de', 'es', 'fr', 'he', 'it', 'nl', 'pl', 'pt', 'ru', 'zh'];
const USER_AGENT = 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)';

const siteUrl = new URL(process.argv[2] || 'https://docs.gauzy.co');
const pageCount = Number(process.argv[3] || 30);

let checks = 0;
const failures = [];

async function request(path) {
  const url = new URL(path, siteUrl);
  const response = await fetch(url, {
    redirect: 'manual',
    headers: {'user-agent': USER_AGENT},
  });
  await response.arrayBuffer();
  const location = response.headers.get('location');
  return {status: response.status, location, target: location ? new URL(location, url) : null};
}

function check(ok, message) {
  checks += 1;
  if (!ok) {
    failures.push(message);
  }
}

const targetStatus = new Map();
async function expectRedirect(path, expectedTarget, expectedTargetStatus = 200) {
  const {status, location, target} = await request(path);
  const sameSite =
    target !== null && target.protocol === siteUrl.protocol && target.host === siteUrl.host;
  const targetPath = target ? `${target.pathname}${target.search}` : null;
  check(
    status === 301 && sameSite && targetPath === expectedTarget,
    `${path}: expected 301 -> ${expectedTarget}, got ${status} ${location ?? '(no Location)'}`,
  );
  if (status === 301 && sameSite && !targetStatus.has(targetPath)) {
    const answered = (await request(targetPath)).status;
    targetStatus.set(targetPath, answered);
    check(
      answered === expectedTargetStatus,
      `${path}: target ${targetPath} answers ${answered}, expected ${expectedTargetStatus}`,
    );
  }
}

async function expectStatus(path, expected) {
  const {status, location} = await request(path);
  check(
    status === expected,
    `${path}: expected ${expected}, got ${status} ${location ?? ''}`.trim(),
  );
}

async function expectNotRedirected(path) {
  const {status, location} = await request(path);
  check(status < 300 || status >= 400, `${path}: must not redirect, got ${status} ${location}`);
}

async function expectStaysOnSite(path) {
  const {status, target} = await request(path);
  check(
    target === null || target.host === siteUrl.host,
    `${path}: ${status} redirects off the site, to ${target}`,
  );
}

const sitemap = await (
  await fetch(new URL('/sitemap.xml', siteUrl), {headers: {'user-agent': USER_AGENT}})
).text();
const pages = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, loc]) => new URL(loc).pathname);
if (pages.length === 0) {
  console.error(`No <loc> in ${new URL('/sitemap.xml', siteUrl)} -- nothing was checked.`);
  process.exit(1);
}

// An even spread over the whole sitemap, each page paired with the next retired locale in turn.
const step = Math.max(1, Math.floor(pages.length / pageCount));
const sample = pages.filter((_, index) => index % step === 0).slice(0, pageCount);

for (const [index, page] of sample.entries()) {
  const locale = RETIRED_LOCALES[index % RETIRED_LOCALES.length];
  await expectStatus(page, 200);
  await expectRedirect(`/${locale}${page}`, page);
  if (page !== '/' && page.endsWith('/')) {
    await expectRedirect(`/${locale}${page.slice(0, -1)}`, page);
  }
}

for (const locale of RETIRED_LOCALES) {
  await expectRedirect(`/${locale}`, '/');
  await expectRedirect(`/${locale}/`, '/');
}
await expectRedirect('/de/sitemap.xml?probe=1', '/sitemap.xml?probe=1');
await expectRedirect('/fr/no-such-page-locale-check/', '/no-such-page-locale-check/', 404);

const lookalikes = pages.filter((page) => {
  const segment = page.split('/')[1];
  return (
    segment &&
    !RETIRED_LOCALES.includes(segment) &&
    RETIRED_LOCALES.some((locale) => segment.startsWith(locale))
  );
});
for (const page of lookalikes.slice(0, 10)) {
  await expectStatus(page, 200);
}
for (const path of ['/en/', '/DE/', '/dex/', '/fr-x/']) {
  await expectNotRedirected(path);
}
for (const path of ['/de/%5Cevil.com', '/de/%5C%5Cevil.com/']) {
  await expectStatus(path, 404);
}
for (const path of ['/de//evil.com', '/de/%2F%2Fevil.com', '/de/%2F%5Cevil.com']) {
  await expectStaysOnSite(path);
}

console.log(
  `${siteUrl.origin}: ${checks} checks (${sample.length} sampled pages of ${pages.length}, ` +
    `${lookalikes.length} look-alike pages), ${failures.length} failing`,
);
if (failures.length > 0) {
  for (const failure of failures.slice(0, 25)) {
    console.error(`  ${failure}`);
  }
  if (failures.length > 25) {
    console.error(`  ... and ${failures.length - 25} more`);
  }
  process.exit(1);
}
