// Generates public/assets/materials/<key>.svg: close-up material samples for
// the home pages' Materials sections, like tiles on a sample board. They are
// illustrative textures built from SVG noise filters and drawn shapes, not
// photographs. Run: node scripts/draw-materials.mjs
import { mkdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const S = 600;
const outDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'assets', 'materials');
mkdirSync(outDir, { recursive: true });

let seed = 11;
const rand = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
const between = (a, b) => a + rand() * (b - a);
const pick = (list) => list[Math.floor(rand() * list.length)];
const r = (n) => Math.round(n * 10) / 10;

const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
const mix = (a, b, t) => { const A = hex(a); const B = hex(b); return '#' + A.map((v, i) => Math.round((v + (B[i] - v) * t) * 255).toString(16).padStart(2, '0')).join(''); };
const shade = (h, t) => (t < 0 ? mix(h, '#000000', -t) : mix(h, '#ffffff', t));

/**
 * A noise filter whose grey value is mapped through a colour ramp.
 * freq "x y", octaves, seed; stops: colours from dark to light (repeat
 * them to make bands, as wood rings do).
 */
function noiseFilter(id, { freq, octaves = 3, type = 'fractalNoise', seed: s = 1, stops, opacity = 1 }) {
  const ch = [0, 1, 2].map((c) => stops.map((h) => hex(h)[c].toFixed(3)).join(' '));
  return `<filter id="${id}" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
  <feTurbulence type="${type}" baseFrequency="${freq}" numOctaves="${octaves}" seed="${s}" stitchTiles="stitch"/>
  <feColorMatrix type="matrix" values="1 0 0 0 0  1 0 0 0 0  1 0 0 0 0  0 0 0 0 1"/>
  <feComponentTransfer>
    <feFuncR type="table" tableValues="${ch[0]}"/>
    <feFuncG type="table" tableValues="${ch[1]}"/>
    <feFuncB type="table" tableValues="${ch[2]}"/>
    <feFuncA type="linear" slope="0" intercept="${opacity}"/>
  </feComponentTransfer>
</filter>`;
}
const noiseRect = (id, extra = '') => `<rect width="${S}" height="${S}" filter="url(#${id})" ${extra}/>`;

// Fine grey speckle used over several materials.
const speckle = (id, strength = 0.18, freq = '0.9') => `<filter id="${id}" x="0" y="0" width="100%" height="100%">
  <feTurbulence type="fractalNoise" baseFrequency="${freq}" numOctaves="2" seed="7" stitchTiles="stitch"/>
  <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -${strength * 2} ${strength}"/>
</filter>`;

function svg(title, defs, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${S} ${S}" width="${S}" height="${S}">
<title>${title} (illustrative material sample)</title>
<defs>${defs}</defs>
${body}
</svg>
`;
}

// ---------- Woods ----------
function wood({ key, title, dark, mid, light, boards, vertical = false, freq = '0.004 0.16', seed: s, seam = 0.35, silver = 0 }) {
  const ring = [dark, mid, light, mid, light, mid, dark, mid, light];
  const defs = [
    noiseFilter('grain', { freq: vertical ? freq.split(' ').reverse().join(' ') : freq, octaves: 4, seed: s, stops: ring }),
    noiseFilter('fleck', { freq: vertical ? '0.6 0.02' : '0.02 0.6', octaves: 2, seed: s + 3, stops: [shade(dark, -0.15), dark, mid, light], opacity: 0.18 }),
    speckle('sp', 0.08),
  ];
  if (silver) defs.push(noiseFilter('weather', { freq: '0.006', octaves: 3, seed: s + 9, stops: ['#9a9890', '#b9b6ad', '#cfccc3'], opacity: silver }));
  const lines = [];
  const size = S / boards;
  for (let i = 1; i < boards; i++) {
    const p = r(i * size + between(-6, 6));
    lines.push(vertical
      ? `<rect x="${p - 1.5}" y="0" width="3" height="${S}" fill="${shade(dark, -0.45)}" opacity="${seam}"/><rect x="${p + 1.5}" y="0" width="1.5" height="${S}" fill="#fff" opacity="${seam * 0.35}"/>`
      : `<rect x="0" y="${p - 1.5}" width="${S}" height="3" fill="${shade(dark, -0.45)}" opacity="${seam}"/><rect x="0" y="${p + 1.5}" width="${S}" height="1.5" fill="#fff" opacity="${seam * 0.35}"/>`);
    // butt joints along each board
    const joint = between(0.2, 0.8) * S;
    lines.push(vertical
      ? `<rect x="${r(p)}" y="${r(joint)}" width="${r(size)}" height="2" fill="${shade(dark, -0.4)}" opacity="${seam * 0.8}"/>`
      : `<rect x="${r(joint)}" y="${r(p)}" width="2" height="${r(size)}" fill="${shade(dark, -0.4)}" opacity="${seam * 0.8}"/>`);
  }
  const body = [
    `<rect width="${S}" height="${S}" fill="${mid}"/>`,
    noiseRect('grain'),
    noiseRect('fleck'),
    silver ? noiseRect('weather') : '',
    ...lines,
    noiseRect('sp'),
  ];
  return { key, file: svg(title, defs.join('\n'), body.join('\n')) };
}

// ---------- Concrete (board-formed) ----------
function concrete() {
  const defs = [
    noiseFilter('base', { freq: '0.012', octaves: 4, seed: 4, stops: ['#8f8d86', '#a3a099', '#b3b0a8', '#a7a49c'] }),
    noiseFilter('boards', { freq: '0.002 0.09', octaves: 3, seed: 8, stops: ['#7e7c76', '#a19e97', '#b5b2aa'], opacity: 0.35 }),
    speckle('sp', 0.22, '1.1'),
  ];
  const body = [`<rect width="${S}" height="${S}" fill="#a29f98"/>`, noiseRect('base'), noiseRect('boards')];
  for (let y = 100; y < S; y += 100) {
    const yy = r(y + between(-3, 3));
    body.push(`<rect x="0" y="${yy}" width="${S}" height="2" fill="#6f6d68" opacity=".35"/><rect x="0" y="${yy + 2}" width="${S}" height="1" fill="#ffffff" opacity=".18"/>`);
  }
  for (const [x, y] of [[150, 150], [450, 150], [150, 450], [450, 450]]) {
    body.push(`<circle cx="${x}" cy="${y}" r="11" fill="#6b6964" opacity=".55"/><circle cx="${x}" cy="${y}" r="6" fill="#4d4b47" opacity=".7"/><circle cx="${x - 2}" cy="${y - 2}" r="13" fill="none" stroke="#ffffff" stroke-opacity=".18" stroke-width="2"/>`);
  }
  body.push(noiseRect('sp'));
  return { key: 'concrete', file: svg('Board-formed concrete', defs.join('\n'), body.join('\n')) };
}

// ---------- Lime plaster ----------
function limePlaster() {
  const defs = [
    noiseFilter('mottle', { freq: '0.006', octaves: 4, seed: 21, stops: ['#ddd6c8', '#e8e2d5', '#efeadf', '#e6dfd1'] }),
    noiseFilter('trowel', { freq: '0.01 0.03', octaves: 3, seed: 5, stops: ['#d3cbbb', '#ebe5d9', '#f4f0e7'], opacity: 0.35 }),
    speckle('sp', 0.06, '0.8'),
  ];
  const body = [`<rect width="${S}" height="${S}" fill="#e9e3d6"/>`, noiseRect('mottle'), noiseRect('trowel'), noiseRect('sp')];
  return { key: 'lime-plaster', file: svg('Lime plaster', defs.join('\n'), body.join('\n')) };
}

// ---------- Brick ----------
function brick() {
  const defs = [speckle('sp', 0.3, '0.7'), noiseFilter('wash', { freq: '0.008', octaves: 3, seed: 13, stops: ['#000000', '#7a7268', '#d8d0c2'], opacity: 0.2 })];
  const body = ['<rect width="600" height="600" fill="#bdb3a2"/>'];
  const palette = ['#8a5442', '#94604b', '#9c6c55', '#7a4a3b', '#866250', '#a07a62', '#6d4436', '#8f5a45', '#a58a72', '#77584a'];
  const h = 50; const w = 128; const joint = 10;
  for (let row = 0, y = -20; y < S; row++, y += h + joint) {
    const offset = row % 2 ? -(w + joint) / 2 : 0;
    for (let x = offset; x < S; x += w + joint) {
      const c = pick(palette);
      body.push(`<rect x="${r(x)}" y="${y}" width="${w}" height="${h}" fill="${c}"/>`);
      body.push(`<rect x="${r(x)}" y="${y}" width="${w}" height="4" fill="#fff" opacity=".07"/><rect x="${r(x)}" y="${y + h - 5}" width="${w}" height="5" fill="#000" opacity=".12"/>`);
      if (rand() < 0.35) body.push(`<rect x="${r(x + between(0, w - 30))}" y="${y + between(5, h - 15)}" width="${r(between(12, 30))}" height="${r(between(5, 10))}" fill="${shade(c, -0.25)}" opacity=".5"/>`);
    }
  }
  body.push(noiseRect('wash'), noiseRect('sp'));
  return { key: 'brick', file: svg('Reclaimed brick', defs.join('\n'), body.join('\n')) };
}

// Smooth closed path through points (midpoint quadratic curves).
function blob(points) {
  const n = points.length;
  const mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  const m0 = mid(points[n - 1], points[0]);
  let d = `M${r(m0[0])},${r(m0[1])}`;
  for (let i = 0; i < n; i++) {
    const p = points[i]; const m = mid(p, points[(i + 1) % n]);
    d += ` Q${r(p[0])},${r(p[1])} ${r(m[0])},${r(m[1])}`;
  }
  return d + 'Z';
}

// ---------- Fieldstone ----------
function fieldstone() {
  const defs = [
    speckle('sp', 0.28, '0.6'),
    noiseFilter('lichen', { freq: '0.02', octaves: 3, seed: 31, stops: ['#000000', '#000000', '#6f7a5c'], opacity: 0.18 }),
    `<filter id="shade"><feGaussianBlur stdDeviation="3"/></filter>`,
  ];
  const body = ['<rect width="600" height="600" fill="#a39d90"/>'];
  const palette = ['#8b8577', '#9a9384', '#7d786c', '#a59d8b', '#6f6c63', '#8f8a7f', '#a8a293', '#77736a'];
  let y = -20;
  while (y < S) {
    const rh = between(80, 120);
    let x = -between(0, 60);
    while (x < S) {
      const w = between(90, 170);
      const cx = x + w / 2; const cy = y + rh / 2 + between(-6, 6);
      const rx = w / 2 + 2; const ry = rh / 2 + 1;
      // Squarish outline with knocked-off corners, so stones sit flat in courses.
      const pts = Array.from({ length: 8 }, (_, k) => {
        const a = (k / 8) * Math.PI * 2 + Math.PI / 8 + between(-0.18, 0.18);
        const c = Math.cos(a); const sn = Math.sin(a);
        const sq = 1 / Math.max(Math.abs(c), Math.abs(sn));
        const j = between(0.9, 1.02);
        return [cx + c * sq * rx * j, cy + sn * sq * ry * j];
      });
      const c = pick(palette);
      body.push(`<path d="${blob(pts)}" fill="#000" opacity=".3" transform="translate(2,3)" filter="url(#shade)"/>`);
      body.push(`<path d="${blob(pts)}" fill="${c}"/>`);
      body.push(`<path d="${blob(pts.map(([px, py]) => [cx + (px - cx) * 0.8, cy + (py - cy) * 0.65 - 5]))}" fill="#fff" opacity=".07"/>`);
      x += w;
    }
    y += rh;
  }
  body.push(noiseRect('lichen'), noiseRect('sp'));
  return { key: 'fieldstone', file: svg('Fieldstone', defs.join('\n'), body.join('\n')) };
}

// ---------- Cut stone (ashlar) ----------
function stone() {
  const defs = [speckle('sp', 0.22, '0.75'), noiseFilter('veil', { freq: '0.01', octaves: 3, seed: 41, stops: ['#000000', '#888888', '#ffffff'], opacity: 0.1 })];
  const body = ['<rect width="600" height="600" fill="#b9b1a0"/>'];
  const palette = ['#d6cdb9', '#cfc5b0', '#ddd5c3', '#c8bea8', '#d2c9b5', '#e0d8c7'];
  let y = 0;
  while (y < S) {
    const rh = pick([64, 88, 110]);
    let x = -between(0, 120);
    while (x < S) {
      const w = between(120, 230);
      const c = pick(palette);
      body.push(`<rect x="${r(x + 2)}" y="${y + 2}" width="${r(w - 4)}" height="${rh - 4}" fill="${c}"/>`);
      body.push(`<rect x="${r(x + 2)}" y="${y + 2}" width="${r(w - 4)}" height="3" fill="#fff" opacity=".22"/><rect x="${r(x + 2)}" y="${y + rh - 6}" width="${r(w - 4)}" height="4" fill="#000" opacity=".1"/>`);
      x += w;
    }
    y += rh;
  }
  body.push(noiseRect('veil'), noiseRect('sp'));
  return { key: 'stone', file: svg('Cut local stone', defs.join('\n'), body.join('\n')) };
}

// ---------- Zinc (standing seam) ----------
function zinc() {
  const defs = [
    noiseFilter('patina', { freq: '0.004 0.02', octaves: 4, seed: 51, stops: ['#7d878b', '#8c969a', '#9aa3a6', '#a7afb1'] }),
    noiseFilter('streak', { freq: '0.3 0.004', octaves: 2, seed: 55, stops: ['#6e787c', '#a3abae', '#bcc3c5'], opacity: 0.25 }),
    speckle('sp', 0.1, '0.9'),
  ];
  const body = ['<rect width="600" height="600" fill="#8f999d"/>', noiseRect('patina'), noiseRect('streak')];
  for (let x = 60; x < S; x += 120) {
    body.push(`<rect x="${x - 5}" y="0" width="4" height="600" fill="#5c6569" opacity=".55"/><rect x="${x - 1}" y="0" width="5" height="600" fill="#c9d0d2" opacity=".75"/><rect x="${x + 4}" y="0" width="3" height="600" fill="#4f575a" opacity=".35"/>`);
  }
  body.push(noiseRect('sp'));
  return { key: 'zinc', file: svg('Standing-seam zinc', defs.join('\n'), body.join('\n')) };
}

// ---------- Steel (brushed) ----------
function steel() {
  const defs = [
    noiseFilter('brush', { freq: '0.0015 0.45', octaves: 3, seed: 61, stops: ['#2f3336', '#3d4246', '#4a5054', '#41464a'] }),
    `<linearGradient id="sheen" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".45" stop-color="#fff" stop-opacity=".13"/><stop offset=".55" stop-color="#fff" stop-opacity=".04"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>`,
    speckle('sp', 0.08, '1'),
  ];
  const body = ['<rect width="600" height="600" fill="#3c4144"/>', noiseRect('brush'), '<rect width="600" height="600" fill="url(#sheen)"/>', noiseRect('sp')];
  return { key: 'steel', file: svg('Brushed steel', defs.join('\n'), body.join('\n')) };
}

// ---------- Glass ----------
function glass() {
  const defs = [
    `<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c9d3d3"/><stop offset=".45" stop-color="#aebcbb"/><stop offset=".58" stop-color="#6f7f6c"/><stop offset="1" stop-color="#3f4b3c"/></linearGradient>`,
    noiseFilter('trees', { freq: '0.006 0.012', octaves: 3, seed: 71, stops: ['#2f3b2e', '#46553f', '#5f6e52', '#7b876a'], opacity: 0.7 }),
    `<filter id="soft" x="-5%" y="-5%" width="110%" height="110%"><feGaussianBlur stdDeviation="6"/></filter>`,
    `<linearGradient id="fade" x1="0" y1="0" x2="0" y2="1"><stop offset=".38" stop-color="#fff" stop-opacity="0"/><stop offset=".55" stop-color="#fff"/><stop offset="1" stop-color="#fff"/></linearGradient>`,
    `<mask id="lower"><rect width="600" height="600" fill="url(#fade)"/></mask>`,
    `<linearGradient id="hl" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".35"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>`,
  ];
  const body = [
    '<rect width="600" height="600" fill="url(#sky)"/>',
    `<g mask="url(#lower)"><g filter="url(#soft)">${noiseRect('trees')}</g></g>`,
    '<polygon points="120,0 230,0 40,600 -70,600" fill="url(#hl)" opacity=".55"/>',
    '<polygon points="300,0 340,0 150,600 110,600" fill="url(#hl)" opacity=".35"/>',
    '<rect x="0" y="0" width="600" height="22" fill="#26292a"/>',
    '<rect x="420" y="0" width="16" height="600" fill="#26292a"/>',
    '<rect x="436" y="0" width="2" height="600" fill="#5a5f61"/>',
  ];
  return { key: 'glass', file: svg('Steel-framed glass', defs.join('\n'), body.join('\n')) };
}

const swatches = [
  wood({ key: 'oak', title: 'Oak', dark: '#8a6542', mid: '#a98058', light: '#c39c71', boards: 4, seed: 3 }),
  wood({ key: 'ash', title: 'Ash', dark: '#b39c7c', mid: '#cbb795', light: '#ddcdaf', boards: 4, seed: 5, seam: 0.25 }),
  wood({ key: 'cedar', title: 'Cedar cladding', dark: '#7a4f36', mid: '#946446', light: '#ad7c5a', boards: 5, vertical: true, seed: 9, seam: 0.5, silver: 0.32 }),
  wood({ key: 'timber', title: 'Douglas fir timber', dark: '#9b6a3f', mid: '#b98653', light: '#d2a06a', boards: 3, seed: 15, freq: '0.003 0.12' }),
  concrete(), limePlaster(), brick(), fieldstone(), stone(), zinc(), steel(), glass(),
];

for (const { key, file } of swatches) writeFileSync(join(outDir, `${key}.svg`), file);
console.log('Wrote', swatches.map((s) => `${s.key}.svg`).join(', '), 'to', outDir);
