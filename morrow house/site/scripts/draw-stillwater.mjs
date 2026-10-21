// Generates public/assets/stillwater-drawing.svg: an architect's line drawing of
// Stillwater House traced from assets/stillwater-hero.jpg. It shares the photo's
// 1584×672 pixel space so the two line up in the compare slider.
// Run: node scripts/draw-stillwater.mjs
import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const W = 1584;
const H = 672;
const INK = '#141B18';
const BRASS = '#B79A66';
const GRID = '#CFCCC3';
const GROUND = '#F2F0E9';

// Seeded random so the hatching is the same on every run.
let seed = 7;
const rand = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
const r = (n) => Math.round(n * 10) / 10;

// A line that overshoots its ends a little, like a hand-drafted construction line.
function line(x1, y1, x2, y2, over = 5) {
  const len = Math.hypot(x2 - x1, y2 - y1) || 1;
  const ux = ((x2 - x1) / len) * over;
  const uy = ((y2 - y1) / len) * over;
  return `<line x1="${r(x1 - ux)}" y1="${r(y1 - uy)}" x2="${r(x2 + ux)}" y2="${r(y2 + uy)}"/>`;
}
const poly = (pts) => `<polygon points="${pts.map((p) => p.join(',')).join(' ')}"/>`;
const path = (d) => `<path d="${d}"/>`;
const group = (attrs, body) => `<g ${attrs}>${body.join('')}</g>`;

// ---------- Grid ----------
const grid = [];
for (let x = 40; x < W; x += 40) grid.push(`<line x1="${x}" y1="0" x2="${x}" y2="${H}"/>`);
for (let y = 40; y < H; y += 40) grid.push(`<line x1="0" y1="${y}" x2="${W}" y2="${y}"/>`);

// ---------- Landscape (light) ----------
// Tree canopy: scalloped line through the treetops seen in the photo.
function canopy(points, bump = 9) {
  let d = `M${points[0][0]},${points[0][1]}`;
  for (let i = 1; i < points.length; i++) {
    const [x0, y0] = points[i - 1];
    const [x1, y1] = points[i];
    const steps = Math.max(1, Math.round(Math.hypot(x1 - x0, y1 - y0) / 26));
    for (let s = 1; s <= steps; s++) {
      const t = s / steps;
      const px = x0 + (x1 - x0) * t;
      const py = y0 + (y1 - y0) * t;
      const mx = x0 + (x1 - x0) * (t - 0.5 / steps);
      const my = y0 + (y1 - y0) * (t - 0.5 / steps) - bump * (0.6 + rand() * 0.8);
      d += ` Q${r(mx)},${r(my)} ${r(px)},${r(py)}`;
    }
  }
  return path(d);
}
const trees = [
  canopy([[0, 300], [20, 150], [40, 60], [90, 18], [180, 8], [260, 30], [330, 62], [390, 92], [455, 84],
    [520, 104], [565, 128], [625, 150], [680, 144], [730, 152], [800, 160], [855, 156], [905, 180],
    [965, 188], [1020, 166], [1075, 176], [1112, 238]]),
  canopy([[1168, 258], [1230, 262], [1300, 255], [1370, 270], [1440, 266], [1510, 280], [1584, 292]], 7),
  // tree line behind the right wing
  canopy([[1278, 312], [1330, 300], [1400, 318], [1470, 330], [1540, 342], [1584, 350]], 6),
];
const mountains = [
  path('M1110,240 L1150,233 L1185,236 L1230,240 L1262,232 L1300,224 L1340,214 L1372,214 L1405,219 L1440,224 L1480,228 L1530,222 L1584,216'),
  path('M1112,252 L1160,246 L1205,250'),
];
// A few trunks on the left slope.
const trunks = [
  path('M96,230 L104,150 L98,90'), path('M104,150 L130,110'), path('M60,280 L66,190'),
  path('M210,240 L214,170'), path('M1520,350 L1522,300'), path('M1440,330 L1438,290'),
];

// Grass and planting hatch: short, slightly leaning strokes in bands.
const POOL = [[776, 414], [1012, 413], [1545, 590], [590, 594]];
function inPool(x, y) {
  let inside = false;
  for (let i = 0, j = POOL.length - 1; i < POOL.length; j = i++) {
    const [xi, yi] = POOL[i];
    const [xj, yj] = POOL[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}
function hatch(x0, x1, y0, y1, n, len = 14) {
  const out = [];
  for (let i = 0; i < n; i++) {
    const x = x0 + rand() * (x1 - x0);
    const y = y0 + rand() * (y1 - y0);
    if (inPool(x, y) || inPool(x, y - len)) continue;
    const l = len * (0.5 + rand() * 0.8);
    const lean = (rand() - 0.5) * 8;
    out.push(`<line x1="${r(x)}" y1="${r(y)}" x2="${r(x + lean)}" y2="${r(y - l)}"/>`);
  }
  return out;
}
const planting = [
  ...hatch(0, 600, 420, 500, 120, 16),
  ...hatch(0, 640, 540, 672, 160, 20),
  ...hatch(640, 1584, 615, 672, 170, 22),
  ...hatch(1000, 1584, 400, 560, 120, 16),
  ...hatch(1300, 1584, 540, 615, 60, 18),
  ...hatch(240, 520, 395, 430, 50, 18),
];

// ---------- Building ----------
const bold = []; // roof profiles and main edges
const mid = []; // walls, glazing frames
const fine = []; // stone coursing, soffit boards, mullion detail

// Left pavilion roof: front fascia, then the side fascia receding toward the camera.
bold.push(poly([[125, 216], [636, 216], [750, 306], [747, 318], [633, 243], [125, 246]]));
mid.push(line(125, 228, 634, 228, 0));
mid.push(line(636, 216, 633, 243, 0));
// soffit boards and the soffit's back edge
mid.push(line(252, 265, 552, 265));
mid.push(line(552, 277, 712, 321));
// Soffit boards between the glass head and the side fascia.
for (const t of [0.25, 0.5, 0.75]) {
  fine.push(line(552 + 81 * t, 277 - 34 * t, 712 + 35 * t, 321 - 3 * t, 0));
}

// Clerestory cedar band with its small dark window.
mid.push(poly([[252, 265], [517, 265], [517, 294], [252, 294]]));
mid.push(poly([[256, 268], [322, 268], [322, 291], [256, 291]]));
for (let x = 330; x < 517; x += 9) fine.push(`<line x1="${x}" y1="267" x2="${x}" y2="292"/>`);

// Stone wall block with coursing.
mid.push(poly([[234, 294], [517, 294], [517, 422], [234, 422]]));
bold.push(line(230, 294, 520, 294, 0));
mid.push(poly([[517, 294], [552, 296], [552, 410], [517, 422]]));
for (let y = 305; y < 420; y += 10.5) {
  fine.push(`<line x1="234" y1="${r(y)}" x2="517" y2="${r(y)}"/>`);
  const row = Math.round((y - 305) / 10.5);
  for (let x = 234 + ((row % 3) * 13); x < 517; x += 26 + ((row * 7 + x) % 3) * 9) {
    fine.push(`<line x1="${r(x)}" y1="${r(y - 10.5)}" x2="${r(x)}" y2="${r(y)}"/>`);
  }
}
for (let y = 306; y < 410; y += 11) fine.push(`<line x1="517" y1="${r(y)}" x2="552" y2="${r(y + 1)}"/>`);

// Corner glazing: front pane, corner post, then panes receding.
mid.push(poly([[552, 277], [712, 321], [712, 402], [552, 412]]));
mid.push(poly([[606, 292], [622, 296], [622, 409], [606, 410]]));
mid.push(line(552, 382, 606, 383, 0));
for (const x of [650, 660, 672, 690, 700]) {
  const yt = 277 + ((x - 552) / 160) * 44;
  const yb = 412 - ((x - 552) / 160) * 10;
  mid.push(`<line x1="${x}" y1="${r(yt)}" x2="${x}" y2="${r(yb)}"/>`);
}
mid.push(poly([[700, 324], [714, 326], [714, 402], [700, 403]]));

// Plinth and terrace under the left pavilion.
mid.push(line(552, 412, 715, 402));
mid.push(line(600, 430, 790, 420));
mid.push(line(625, 412, 600, 430, 0));

// Chimney.
bold.push(poly([[738, 261], [775, 261], [775, 272], [738, 272]]));
mid.push(poly([[740, 272], [773, 272], [773, 288], [740, 288]]));
for (let y = 276; y < 288; y += 4) fine.push(`<line x1="740" y1="${y}" x2="773" y2="${y}"/>`);

// Link roof (upper) and long lower roof to the right wing.
bold.push(poly([[728, 286], [988, 286], [988, 299], [728, 299]]));
mid.push(line(905, 304, 984, 304));
bold.push(poly([[745, 309], [1278, 309], [1278, 321], [745, 324]]));
mid.push(line(745, 316, 1278, 315, 0));

// Stone between pavilion and link.
mid.push(poly([[714, 324], [774, 326], [774, 398], [714, 402]]));
for (let y = 334; y < 398; y += 10) fine.push(`<line x1="714" y1="${y}" x2="774" y2="${y}"/>`);

// Link glazing (long run of glass), stone pier, right wing glazing and base.
mid.push(poly([[774, 326], [1095, 326], [1095, 395], [774, 395]]));
for (const x of [822, 850, 900, 950, 955, 1025, 1060]) mid.push(`<line x1="${x}" y1="326" x2="${x}" y2="395"/>`);
fine.push(line(774, 384, 1095, 384, 0));
fine.push(poly([[838, 380], [882, 380], [882, 392], [838, 392]])); // furniture glimpsed inside
mid.push(poly([[1095, 326], [1145, 326], [1145, 420], [1095, 420]]));
for (let y = 336; y < 420; y += 10) fine.push(`<line x1="1095" y1="${y}" x2="1145" y2="${y}"/>`);
mid.push(poly([[1145, 326], [1222, 326], [1222, 392], [1145, 392]]));
for (const x of [1168, 1196, 1218]) mid.push(`<line x1="${x}" y1="326" x2="${x}" y2="392"/>`);
mid.push(poly([[1145, 392], [1234, 392], [1234, 420], [1145, 420]]));
for (let y = 400; y < 420; y += 9) fine.push(`<line x1="1145" y1="${y}" x2="1234" y2="${y}"/>`);

// Terrace in front of the link, lawn strip, steps.
mid.push(line(774, 400, 1000, 400));
mid.push(line(790, 407, 1000, 407));
fine.push(line(790, 412, 1000, 412, 0));

// ---------- Pool ----------
// Back coping, left and right long edges, front coping.
bold.push(line(782, 418, 1006, 417));
mid.push(line(792, 425, 1000, 424, 0));
bold.push(line(782, 418, 597, 590));
mid.push(line(792, 425, 622, 590));
bold.push(line(1006, 417, 1530, 588));
mid.push(line(1000, 424, 1510, 596));
bold.push(line(597, 590, 1530, 598));
mid.push(line(622, 590, 1515, 596, 0));
mid.push(line(612, 605, 1530, 610));
mid.push(line(597, 590, 612, 605, 0));
// Reflections of the link glazing and a few ripple lines.
for (const [x, w] of [[790, 20], [835, 48], [905, 40], [960, 60], [1030, 40]]) {
  fine.push(`<line x1="${x}" y1="430" x2="${x}" y2="${492 - (x - 790) * 0.02}"/>`);
  fine.push(`<line x1="${x + w}" y1="430" x2="${x + w}" y2="${488 - (x - 790) * 0.02}"/>`);
}
for (const [x1, x2, y] of [[700, 900, 505], [760, 1100, 520], [680, 1000, 545], [900, 1250, 560], [700, 980, 575], [1050, 1380, 584]]) {
  fine.push(`<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke-dasharray="18 10"/>`);
}

// Gravel path from the left edge to the pool.
mid.push(path('M0,506 C150,500 330,498 470,502 S600,500 655,498'));
mid.push(path('M0,534 C160,530 340,528 480,528 S590,526 640,522'));
mid.push(path('M470,502 C520,480 540,465 560,452'));
for (let i = 0; i < 70; i++) {
  const x = rand() * 640;
  const y = 508 + rand() * 20;
  fine.push(`<circle cx="${r(x)}" cy="${r(y)}" r="0.9"/>`);
}

// ---------- Drawing furniture ----------
const brass = [];
const label = (x, y, text, anchor = 'middle') =>
  `<text x="${x}" y="${y}" text-anchor="${anchor}" stroke="none">${text}</text>`;
function dim(x1, y1, x2, y2, text, ext = []) {
  const out = [line(x1, y1, x2, y2, 0)];
  for (const [x, y] of [[x1, y1], [x2, y2]]) out.push(`<line x1="${x - 5}" y1="${y + 5}" x2="${x + 5}" y2="${y - 5}"/>`);
  for (const e of ext) out.push(line(...e, 0));
  out.push(label((x1 + x2) / 2, Math.min(y1, y2) - 8, text));
  return out;
}
// Overall width of the left pavilion roof.
brass.push(...dim(125, 192, 636, 192, '52′–0″', [[125, 186, 125, 210], [636, 186, 636, 210]]));
// Length of the reflecting pool along the front coping.
brass.push(...dim(612, 646, 1530, 646, 'REFLECTING POOL  ·  128′–0″', [[612, 614, 612, 652], [1530, 614, 1530, 652]]));
// Level datums on the right.
function datum(y, text) {
  return [
    line(1290, y, 1350, y, 0),
    `<polygon points="1296,${y} 1290,${y - 8} 1302,${y - 8}" fill="${BRASS}" stroke="none"/>`,
    label(1356, y + 4, text, 'start'),
  ];
}
brass.push(...datum(309, '+12′–6″  T.O. ROOF'));
brass.push(...datum(395, '±0′–0″  F.F.L.'));
// North arrow.
brass.push(`<circle cx="1520" cy="96" r="22" fill="none"/>`);
brass.push(`<polygon points="1520,70 1527,104 1520,98 1513,104" fill="${BRASS}" stroke="none"/>`);
brass.push(label(1520, 136, 'N'));
// Section marker on the left pavilion.
brass.push(`<circle cx="376" cy="452" r="14" fill="${GROUND}"/>`);
brass.push(label(376, 450, 'A', 'middle').replace('<text', '<text font-size="10"'));
brass.push(`<line x1="362" y1="452" x2="390" y2="452"/>`);
brass.push(label(376, 462, '03', 'middle').replace('<text', '<text font-size="8"'));

// Title block, bottom left.
const title = [
  `<rect x="24" y="584" width="300" height="72" fill="${GROUND}" stroke="${INK}" stroke-width="1"/>`,
  `<line x1="24" y1="612" x2="324" y2="612" stroke="${INK}" stroke-width="0.6"/>`,
  `<line x1="232" y1="612" x2="232" y2="656" stroke="${INK}" stroke-width="0.6"/>`,
  `<text x="36" y="603" font-size="12" letter-spacing="1.6" fill="${INK}">STILLWATER HOUSE · FLETCHER NC</text>`,
  `<text x="36" y="631" font-size="9" letter-spacing="1.2" fill="${INK}">SOUTH PERSPECTIVE</text>`,
  `<text x="36" y="646" font-size="9" letter-spacing="1.2" fill="${INK}" opacity=".7">MORROW HOUSE · DESIGN</text>`,
  `<text x="244" y="631" font-size="9" letter-spacing="1.2" fill="${INK}">REV C</text>`,
  `<text x="244" y="646" font-size="9" letter-spacing="1.2" fill="${INK}" opacity=".7">2023</text>`,
];

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" font-family="Archivo, 'Helvetica Neue', Arial, sans-serif">
<title>Stillwater House, south perspective drawing</title>
<rect width="${W}" height="${H}" fill="${GROUND}"/>
${group(`stroke="${GRID}" stroke-width="0.6" opacity=".55"`, grid)}
${group(`fill="none" stroke="${INK}" stroke-width="0.7" stroke-linecap="round" opacity=".38"`, [...trees, ...mountains, ...trunks])}
${group(`fill="none" stroke="${INK}" stroke-width="0.6" stroke-linecap="round" opacity=".32"`, planting)}
${group(`fill="none" stroke="${INK}" stroke-width="0.55" stroke-linecap="round" opacity=".55"`, fine)}
${group(`fill="none" stroke="${INK}" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" opacity=".85"`, mid)}
${group(`fill="none" stroke="${INK}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"`, bold)}
${group(`stroke="${BRASS}" stroke-width="0.9" fill="${BRASS}" font-size="11" letter-spacing="1.4"`, brass)}
${title.join('\n')}
</svg>
`;

const out = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'assets', 'stillwater-drawing.svg');
writeFileSync(out, svg);
console.log('Wrote', out, `${(svg.length / 1024).toFixed(1)} KB`);
