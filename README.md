# Landing Page Portfolio

A collection of hand-coded, responsive marketing landing pages. No frameworks —
just semantic HTML, modern CSS (flexbox/grid + custom properties), and minimal
vanilla JavaScript. The only external dependency is Google Fonts.

## Structure

```
landing-page-portfolio/
├── index.html          ← portfolio hub (gallery linking to each piece)
├── README.md
└── tempo/              ← the TEMPO landing page
    ├── index.html
    ├── styles.css
    └── main.js
```

## Pieces

### TEMPO — Remote running coaching

A single-page marketing site for a fictional personal running coach brand,
**TEMPO**. The coach, Dani Voss, takes recreational runners who have plateaued
and gets them to their next PR with a structured, personal plan and weekly
accountability. The page's single job: get visitors to **book a free intro call**.

**Built with**

- Semantic HTML (`header`, `nav`, `main`, `section`, `footer`) with a proper
  heading order.
- Mobile-first, fully responsive layout (verified down to 375px).
- CSS custom properties for the design tokens (dark/premium/athletic, one acid
  lime accent used sparingly).
- Space Grotesk (display) + Inter (body) via Google Fonts.
- ~90 lines of vanilla JS: mobile nav toggle, FAQ accordion, scroll-reveal.
- Accessible: visible keyboard focus states, `alt` text on all images,
  `aria-expanded`/`aria-controls` on interactive widgets, and
  `prefers-reduced-motion` respected.

## Running locally

It's all static files — open `index.html` in a browser, or serve the folder:

```bash
# Python
python -m http.server 8000

# Node
npx serve
```

Then visit `http://localhost:8000`.

## Placeholders to swap before client handoff

The TEMPO page is a portfolio piece and uses placeholder content. Replace the
following before showing it to a real client:

1. **Hero image** — `tempo/index.html`, the `.hero-bg` Unsplash URL → real client photo.
2. **Coach portrait** — `tempo/index.html`, the `.coach-photo` Unsplash URL → real photo of the coach.
3. **Booking links** — every `href="#book"` (nav CTA, hero, pricing CTAs, final CTA band) → real scheduling URL (e.g. Calendly).
4. **Contact details** — footer email `hello@tempo.run` and the Instagram `#` link → real contact info.
5. **Designer credit** — footer `Designed by [your name]` → your name.

> Note: stats, testimonials, names, and pricing are invented for the demo and
> should be replaced with the client's real numbers and approved quotes.
