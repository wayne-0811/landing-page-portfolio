# Studio Portfolio

A single-page dark-mode editorial studio site. Hand-coded, semantic HTML —
no page-builder patterns. Built with **Next.js 15 (App Router)**,
**TypeScript (strict)** and **Tailwind CSS v4**.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run start      # serve the production build
npm run typecheck  # tsc --noEmit
```

## How it's organised

```
app/
  globals.css      # design tokens (@theme) + base styles + motion
  layout.tsx       # fonts, metadata, <html>/<body>
  page.tsx         # section assembly (edit section order here)
  fonts/           # self-hosted variable woff2 files
lib/
  site.ts          # ALL editable copy & config (start here)
  fonts.ts         # next/font/local setup
components/
  ui/              # Container, Reveal, SectionHeading, Button
  sections/        # one component per page section
public/images/     # placeholder SVGs — swap for real assets
scripts/
  gen-placeholders.mjs  # regenerates the placeholder SVGs
```

## Editing content

Almost all copy lives in **`lib/site.ts`** — studio name, email, nav,
projects, services, testimonials, pricing, FAQ, blog posts and footer.
Items marked `PLACEHOLDER` are stand-ins. Placeholder imagery lives in
`public/images/` (re-run `npm run gen:placeholders` to regenerate, or just
drop real files in with the same names).

## Design tokens

Defined once in `app/globals.css` under `@theme` and exposed as Tailwind
utilities. Nothing hardcodes a hex value — everything references a token:

| Token            | Value     | Utility examples                |
| ---------------- | --------- | ------------------------------- |
| base             | `#0E0E0E` | `bg-base`, `text-base`          |
| surface          | `#1A1A1A` | `bg-surface`                    |
| elevated / hover | `#222222` | `bg-elevated`                   |
| border           | `#2A2A2A` | `border-line`                   |
| text primary     | `#F4F4F4` | `text-ink`                      |
| text muted       | `#8C8C8C` | `text-muted`                    |
| accent           | `#FF4D2E` | `bg-accent`, `text-accent`      |
| accent hover     | `#E63E20` | `hover:bg-accent-hover`         |
| radius card      | `14px`    | `rounded-card`                  |
| radius button    | `10px`    | `rounded-button`                |
| radius pill      | full      | `rounded-pill`                  |

Retune the accent (or anything else) by editing the single value in
`globals.css` — it propagates everywhere.

## ⚠️ Fonts — placeholder substitution

The brief specifies Fontshare **Clash Display** (display) and **General
Sans** (body). Those are distributed only through Fontshare, which was not
reachable from the build environment, so this scaffold ships the closest
**self-hostable** stand-ins instead:

- **Space Grotesk Variable** → standing in for Clash Display
- **Geist Variable** → standing in for General Sans

Both are self-hosted variable `woff2` files in `app/fonts/` and loaded with
`next/font/local`, so there is **no layout shift** and the fonts are
preloaded.

### Swapping in the real fonts

1. Download `ClashDisplay` and `GeneralSans` `woff2` files from Fontshare.
2. Drop them into `app/fonts/`.
3. Update the two `src` paths in `lib/fonts.ts`.

Nothing else changes — every component references the CSS variables
`--font-display` / `--font-body` (via the `font-display` / `font-body`
utilities), never a hardcoded family name.

## Sections

Nav · Hero · Selected clients · About + credibility (bento) · Projects ·
Services · Feedback · Pricing · FAQ · Blog · Marquee · Footer.

The **Blog** is optional: delete `components/sections/Blog.tsx`, its import
in `app/page.tsx`, and the `Blog` nav link in `lib/site.ts`.

## Accessibility & motion

- Semantic landmarks (`header`/`nav`/`main`/`section`/`footer`), visible
  focus rings, alt text on every image.
- Keyboard-operable nav and accordion (`aria-expanded` / `aria-controls`).
- Scroll-reveal via a lightweight `IntersectionObserver` (`components/ui/Reveal.tsx`)
  — chosen over a motion library to keep the bundle small.
- `prefers-reduced-motion` disables transforms, the marquee and smooth
  scrolling.
