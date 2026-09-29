#!/usr/bin/env node
/**
 * Checks the built site: every BreadcrumbList item URL in the JSON-LD must be a URL nginx serves
 * directly (200), never one that answers with a redirect.
 *
 *   node scripts/check-structured-data-urls.mjs [buildDir=build] [siteUrl=https://docs.gauzy.co]
 *
 * nginx serves the build output as-is, so a path maps to a response like this:
 *   /api/overview/  ->  build/api/overview/index.html            200
 *   /api/overview   ->  build/api/overview/ is a directory       301 to /api/overview/  (FAIL)
 *   /sitemap.xml    ->  build/sitemap.xml is a file              200
 *   anything else                                                404                    (FAIL)
 *
 * Exits 1 on any failing item, and also when the build holds no BreadcrumbList at all -- a check
 * that finds nothing to check would otherwise pass by absence.
 */
import {existsSync, readdirSync, readFileSync, statSync} from 'node:fs';
import {join} from 'node:path';

const buildDir = process.argv[2] || 'build';
const siteUrl = (process.argv[3] || 'https://docs.gauzy.co').replace(/\/$/, '');

function htmlFiles(dir) {
  const found = [];
  for (const entry of readdirSync(dir, {withFileTypes: true})) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      found.push(...htmlFiles(path));
    } else if (entry.name.endsWith('.html')) {
      found.push(path);
    }
  }
  return found;
}

function servedStatus(pathname) {
  const onDisk = join(buildDir, decodeURIComponent(pathname));
  if (pathname.endsWith('/')) {
    return existsSync(join(onDisk, 'index.html')) ? 200 : 404;
  }
  if (!existsSync(onDisk)) {
    return 404;
  }
  return statSync(onDisk).isDirectory() ? 301 : 200;
}

if (!existsSync(buildDir)) {
  console.error(`No build directory at ${buildDir} -- run the build first.`);
  process.exit(1);
}

const jsonLdPattern = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
let pages = 0;
let items = 0;
const failures = [];

for (const file of htmlFiles(buildDir)) {
  const html = readFileSync(file, 'utf8');
  let pageHasBreadcrumbs = false;
  for (const [, json] of html.matchAll(jsonLdPattern)) {
    const data = JSON.parse(json);
    if (data['@type'] !== 'BreadcrumbList') {
      continue;
    }
    pageHasBreadcrumbs = true;
    for (const element of data.itemListElement || []) {
      items += 1;
      const url = String(element.item);
      if (!url.startsWith(`${siteUrl}/`)) {
        failures.push(`${file}: ${url} is not on ${siteUrl}`);
        continue;
      }
      const pathname = url.slice(siteUrl.length).split(/[#?]/)[0];
      const status = servedStatus(pathname);
      if (status !== 200) {
        failures.push(`${file}: ${url} would answer ${status}`);
      }
    }
  }
  if (pageHasBreadcrumbs) {
    pages += 1;
  }
}

console.log(`BreadcrumbList: ${items} items on ${pages} pages, ${failures.length} failing`);
if (items === 0) {
  console.error('No BreadcrumbList items found -- nothing was checked.');
  process.exit(1);
}
if (failures.length > 0) {
  for (const failure of failures.slice(0, 20)) {
    console.error(`  ${failure}`);
  }
  if (failures.length > 20) {
    console.error(`  ... and ${failures.length - 20} more`);
  }
  process.exit(1);
}
