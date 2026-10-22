// Copies the static export (out/) up into the served folder (morrow house/),
// replacing the previous build. Source files in site/ are left alone.
import { cpSync, rmSync, existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const site = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(site, 'out');
const target = join(site, '..');

// Remove the previous build: _next/, assets/ and every page at the top level.
for (const old of ['_next', 'assets', '404', 'index.txt']) rmSync(join(target, old), { recursive: true, force: true });
for (const f of readdirSync(target)) if (f.endsWith('.html') || f.endsWith('.txt')) rmSync(join(target, f));

cpSync(join(out, '_next'), join(target, '_next'), { recursive: true });
cpSync(join(out, 'assets'), join(target, 'assets'), { recursive: true });

// Every page sits at the top level, so "./_next" and "assets/" resolve the
// same way from each of them.
// (_not-found.html is Next's internal copy of 404.html.)
const pages = readdirSync(out).filter((f) => f.endsWith('.html') && !f.startsWith('_'));
for (const page of pages) {
  const html = readFileSync(join(out, page), 'utf8');
  if (html.includes('"/_next/')) throw new Error(`Absolute /_next/ URL left in ${page}`);
  writeFileSync(join(target, page), html);
}
// Per-route folders only hold Next's client-navigation data (__next.*.txt),
// unused here because links are plain page loads. A page inside one would
// break the relative URLs, so stop if one ever appears.
for (const d of readdirSync(out, { withFileTypes: true })) {
  if (d.isDirectory() && !['_next', 'assets'].includes(d.name) && readdirSync(join(out, d.name)).some((f) => f.endsWith('.html'))) {
    throw new Error(`Nested page in ${d.name}/ would break relative URLs`);
  }
}

if (existsSync(join(out, 'favicon.ico'))) cpSync(join(out, 'favicon.ico'), join(target, 'favicon.ico'));
console.log(`Copied ${pages.length} pages into`, target);
