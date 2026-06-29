/**
 * Central site content & config.
 * ------------------------------------------------------------------
 * All editable copy lives here so you can rewrite the site without
 * touching component code. Everything marked PLACEHOLDER is a stand-in.
 */

export const site = {
  name: "Frederock", // PLACEHOLDER: your studio / personal wordmark
  email: "hello@frederock.studio", // PLACEHOLDER
  availability: "Available for projects — July", // PLACEHOLDER
  location: "Remote · Worldwide",
};

export const nav = {
  links: [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Services", href: "#services" },
    { label: "Pricing", href: "#pricing" },
    { label: "Blog", href: "#blog" },
    { label: "Contact", href: "#contact" },
  ],
  cta: { label: "Book a call", href: "#contact" },
} as const;

export const socials = [
  { label: "Twitter / X", href: "https://example.com" },
  { label: "Dribbble", href: "https://example.com" },
  { label: "LinkedIn", href: "https://example.com" },
  { label: "GitHub", href: "https://example.com" },
] as const;

// Quiet logo strip. Plain wordmarks keep it dependency-free.
export const clients = [
  "Northwind",
  "Lumen",
  "Aperture",
  "Vela",
  "Monolith",
  "Cobalt",
] as const;

export const about = {
  bio: "I'm an independent designer and front-end developer building landing pages and product interfaces that are made to convert — hand-coded, fast, and honest. No page builders, no bloated templates. Just clean, semantic work you own outright.", // PLACEHOLDER
  // HONEST credibility points — claims you can actually stand behind.
  cards: [
    {
      title: "Hand-coded, no page builders",
      body: "Every page is semantic HTML and modern CSS you can read, own, and maintain — not export sludge.",
    },
    {
      title: "Teardown-led approach",
      body: "I start by pulling your current funnel apart: what's leaking, what's unclear, what to fix first.",
    },
    {
      title: "Conversion-focused",
      body: "Layout, copy and hierarchy are built around a single action — not decoration for its own sake.",
    },
    {
      title: "Accessible & fast by default",
      body: "Keyboard-operable, screen-reader friendly, and tuned for Core Web Vitals from the first commit.",
    },
  ],
} as const;

export const projects = [
  {
    title: "Mensflos ordering app",
    description: "End-to-end ordering flow for a fragrance subscription brand.",
    image: "/images/project-1.svg",
    href: "#",
    tag: "Product UI",
  },
  {
    title: "Cardinal studio site",
    description: "A bold editorial marketing site for a creative studio.",
    image: "/images/project-2.svg",
    href: "#",
    tag: "Landing Page",
  },
  {
    title: "Distill dashboard UX",
    description: "Analytics dashboard rebuilt around the one metric that matters.",
    image: "/images/project-3.svg",
    href: "#",
    tag: "Web App",
  },
  {
    title: "Halo brand launch",
    description: "Pre-launch waitlist page that converted 38% of visitors.",
    image: "/images/project-4.svg",
    href: "#",
    tag: "Landing Page",
  },
] as const;

export const services = [
  {
    title: "Landing Pages",
    body: "Conversion-first single pages — design and copy — built to ship and to perform.",
  },
  {
    title: "Conversion UI",
    body: "Product surfaces, onboarding and pricing flows designed around the action that matters.",
  },
  {
    title: "Creative Direction",
    body: "Type, layout and art direction that give a young brand a confident, distinct voice.",
  },
  {
    title: "Audits & Fixes",
    body: "A teardown of your current funnel with a prioritised, do-this-first punch list.",
  },
] as const;

export const testimonials = [
  {
    quote:
      "Fast, focused, and on point. The new page reads clearly, loads instantly, and our demo bookings nearly doubled in the first month.",
    name: "Marcus Vorne", // PLACEHOLDER
    role: "Founder, Northwind",
    avatar: "/images/avatar.svg",
  },
  {
    quote:
      "The teardown alone was worth it. We finally understood why the old site wasn't converting — then the rebuild fixed exactly that.",
    name: "Elena Hart", // PLACEHOLDER
    role: "Head of Growth, Lumen",
    avatar: "/images/avatar.svg",
  },
  {
    quote:
      "Hand-coded, accessible, and handed over clean. No mystery dependencies, no lock-in. Exactly what was promised.",
    name: "Devon Park", // PLACEHOLDER
    role: "CTO, Aperture",
    avatar: "/images/avatar.svg",
  },
] as const;

export const pricing = [
  {
    name: "Essentials",
    price: "$850",
    cadence: "per project",
    summary: "A single, high-converting landing page — design and copy included.",
    features: [
      "1 custom-designed landing page",
      "Conversion copywriting included",
      "Mobile-first, fully responsive",
      "Clean, hand-off-ready code you own",
      "Delivered in 5–7 business days",
    ],
    cta: { label: "Start Essentials", href: "#contact" },
    popular: false,
  },
  {
    name: "Complete",
    price: "$2,200",
    cadence: "per project",
    summary: "Full multi-section site with funnel teardown and a round of iteration.",
    features: [
      "Up to 6 custom-designed sections",
      "Full UX & copy with funnel teardown",
      "Light brand styling (type & colour)",
      "A round of revisions + refinement",
      "Analytics events wired in",
      "Delivered in 2–3 weeks",
    ],
    cta: { label: "Start Complete", href: "#contact" },
    popular: true,
  },
] as const;

export const faqs = [
  {
    q: "What do you actually deliver?",
    a: "A finished, responsive page (or site) plus the copy that makes it work, handed over as clean code you fully own — no page-builder lock-in.",
  },
  {
    q: "Which parts of the project do you handle?",
    a: "Strategy, layout, visual design, conversion copy, and front-end build. If you already have copy or brand assets, we'll work them in.",
  },
  {
    q: "How long does a project take?",
    a: "A single landing page is typically 5–7 business days. A complete multi-section site runs 2–3 weeks depending on scope and feedback speed.",
  },
  {
    q: "Do you offer development too?",
    a: "Yes — every project is hand-coded. You receive production-ready, accessible, performance-tuned markup, not a static mockup.",
  },
  {
    q: "What if I need changes later?",
    a: "Because everything is plain, well-structured code, edits are simple. I also offer ongoing retainers for iteration and A/B testing.",
  },
] as const;

export const posts = [
  {
    tag: "Process",
    title: "Why I never reach for a page builder",
    excerpt:
      "Page builders feel fast until you need to change something. Here's the case for owning your markup.",
    image: "/images/blog-1.svg",
    href: "#",
    readingTime: "5 min read",
  },
  {
    tag: "Conversion",
    title: "Saying ‘no’ made my work better",
    excerpt:
      "One clear action per page beats five competing ones. A short note on conversion discipline.",
    image: "/images/blog-2.svg",
    href: "#",
    readingTime: "4 min read",
  },
  {
    tag: "Craft",
    title: "Building trust through honest UX",
    excerpt:
      "Real numbers, real testimonials, no invented stats. Why honesty is the highest-converting trick.",
    image: "/images/blog-3.svg",
    href: "#",
    readingTime: "6 min read",
  },
] as const;

export const footer = {
  closing: "A good idea needs a good start.\nI can help with that.",
  quickLinks: nav.links,
  galleryImages: [
    "/images/gallery-1.svg",
    "/images/gallery-2.svg",
    "/images/gallery-3.svg",
    "/images/gallery-4.svg",
    "/images/gallery-5.svg",
  ],
} as const;
