/**
 * Generates monochrome SVG placeholder images into /public/images.
 * These are intentionally plain so they are obvious stand-ins — swap each
 * one for a real asset (same filename) when you have final imagery.
 *
 *   node scripts/gen-placeholders.mjs
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "public", "images");
mkdirSync(outDir, { recursive: true });

const base = "#0E0E0E";
const surface = "#1A1A1A";
const line = "#2A2A2A";
const muted = "#8C8C8C";

/** A subtle diagonal-line texture + centered label. */
function placeholder({ w, h, label, accent = false, mono = true }) {
  const fg = accent ? "#FF4D2E" : muted;
  const g1 = mono ? "#202020" : surface;
  const g2 = mono ? "#141414" : base;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label} placeholder">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${g1}"/>
      <stop offset="1" stop-color="${g2}"/>
    </linearGradient>
    <pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse" patternTransform="rotate(0)">
      <path d="M28 0H0V28" fill="none" stroke="${line}" stroke-width="1" opacity="0.5"/>
    </pattern>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  <rect width="${w}" height="${h}" fill="url(#grid)"/>
  <circle cx="${w / 2}" cy="${h / 2 - 14}" r="${Math.min(w, h) * 0.12}" fill="none" stroke="${fg}" stroke-width="2" opacity="0.7"/>
  <text x="50%" y="${h / 2 + Math.min(w, h) * 0.12 + 28}" fill="${fg}" font-family="ui-sans-serif,system-ui,sans-serif" font-size="${Math.max(12, Math.min(w, h) * 0.045)}" font-weight="600" letter-spacing="2" text-transform="uppercase" text-anchor="middle">${label.toUpperCase()}</text>
</svg>`;
}

const assets = [
  { name: "portrait.svg", w: 800, h: 1000, label: "Portrait" },
  { name: "project-1.svg", w: 900, h: 700, label: "Project 01" },
  { name: "project-2.svg", w: 900, h: 700, label: "Project 02" },
  { name: "project-3.svg", w: 900, h: 700, label: "Project 03" },
  { name: "project-4.svg", w: 900, h: 700, label: "Project 04" },
  { name: "device.svg", w: 800, h: 900, label: "Device Mockup", accent: true },
  { name: "avatar.svg", w: 500, h: 600, label: "Client" },
  { name: "blog-1.svg", w: 600, h: 480, label: "Article 01" },
  { name: "blog-2.svg", w: 600, h: 480, label: "Article 02" },
  { name: "blog-3.svg", w: 600, h: 480, label: "Article 03" },
  { name: "gallery-1.svg", w: 600, h: 600, label: "Work 01" },
  { name: "gallery-2.svg", w: 600, h: 600, label: "Work 02" },
  { name: "gallery-3.svg", w: 600, h: 600, label: "Work 03" },
  { name: "gallery-4.svg", w: 600, h: 600, label: "Work 04" },
  { name: "gallery-5.svg", w: 600, h: 600, label: "Work 05" },
];

for (const a of assets) {
  writeFileSync(join(outDir, a.name), placeholder(a));
}

console.log(`Generated ${assets.length} placeholder SVGs in public/images`);
