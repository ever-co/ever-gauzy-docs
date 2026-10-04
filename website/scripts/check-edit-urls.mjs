#!/usr/bin/env node
/**
 * Checks the built site: every "Edit this page" link must open the page's own source file on a
 * branch that exists, i.e. <repoUrl>/blob/<branch>/website/<path> where website/<path> is a file in
 * this repository.
 *
 *   node scripts/check-edit-urls.mjs [buildDir=build] [repoUrl=https://github.com/ever-co/ever-gauzy-docs] [branch=develop]
 *
 * Docusaurus joins a string `editUrl` with the doc's path relative to the site directory
 * (docs/<file>.md), so editUrl must end in `.../blob/<branch>/website/`. It named `tree/main/`
 * while this repository has no `main` branch (develop is the default, master is production), so the
 * link on every doc page answered 404. `blob/` rather than `edit/`: GitHub sends a crawler on
 * `edit/` to its login page, while `blob/` answers 200 and offers the edit pencil.
 *
 * Exits 1 on any failing link, and also when the build holds no edit link at all -- a check that
 * finds nothing to check would otherwise pass by absence.
 */
import {existsSync, readdirSync, readFileSync, statSync} from 'node:fs';
import {join} from 'node:path';

const buildDir = process.argv[2] || 'build';
const repoUrl = (process.argv[3] || 'https://github.com/ever-co/ever-gauzy-docs').replace(/\/$/, '');
const branch = process.argv[4] || 'develop';
const prefix = `${repoUrl}/blob/${branch}/website/`;

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

if (!existsSync(buildDir)) {
  console.error(`No build directory at ${buildDir} -- run the build first.`);
  process.exit(1);
}

// <a href="..." target="_blank" rel="..." class="theme-edit-this-page">
const editLinkPattern = /<a\s[^>]*class="[^"]*\btheme-edit-this-page\b[^"]*"[^>]*>/g;
const hrefPattern = /\shref="([^"]*)"/;
let links = 0;
const failures = [];

for (const file of htmlFiles(buildDir)) {
  const html = readFileSync(file, 'utf8');
  for (const [anchor] of html.matchAll(editLinkPattern)) {
    links += 1;
    const href = (anchor.match(hrefPattern) || [])[1] || '';
    if (!href.startsWith(prefix)) {
      failures.push(`${file}: ${href} does not start with ${prefix}`);
      continue;
    }
    // The site directory is the working directory (website/), as for `docusaurus build`.
    const source = decodeURIComponent(href.slice(prefix.length).split(/[#?]/)[0]);
    if (!existsSync(source) || !statSync(source).isFile()) {
      failures.push(`${file}: ${href} names website/${source}, which is not a file here`);
    }
  }
}

console.log(`Edit links: ${links}, ${failures.length} failing (expected prefix ${prefix})`);
if (links === 0) {
  console.error('No "Edit this page" links found -- nothing was checked.');
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
