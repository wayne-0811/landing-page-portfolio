// Copies the static export (out/) up into the served folder (morrow house/),
// replacing the previous build. Source files in site/ are left alone.
import { cpSync, rmSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const site = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(site, 'out');
const target = join(site, '..');

for (const old of ['_next', 'assets', 'index.html', '404.html', '404', 'index.txt']) {
  rmSync(join(target, old), { recursive: true, force: true });
}

cpSync(join(out, '_next'), join(target, '_next'), { recursive: true });
cpSync(join(out, 'assets'), join(target, 'assets'), { recursive: true });

// "./_next" only resolves from the folder root, which is the only page this round.
const html = readFileSync(join(out, 'index.html'), 'utf8');
if (html.includes('"/_next/')) throw new Error('Absolute /_next/ URL left in index.html');
writeFileSync(join(target, 'index.html'), html);

if (existsSync(join(out, 'favicon.ico'))) cpSync(join(out, 'favicon.ico'), join(target, 'favicon.ico'));
console.log('Copied static export into', target);
