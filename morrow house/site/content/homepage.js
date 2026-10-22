// Homepage copy, verbatim from the copy deck (headline option A throughout).
// Figures, reviews and awards are sample content for a concept company.

export const nav = {
  links: [
    { label: 'Homes', href: '#homes' },
    { label: 'How we work', href: '#process' },
    { label: 'Pricing', href: '#pricing' },
  ],
  cta: { label: 'Begin the conversation', href: '#next-chapter' },
};

export const hero = {
  eyebrow: 'Custom homes · Asheville, NC',
  title: ['A life well built.', 'A home all yours.'],
  body: 'Homes shaped around how you live, and built to stay that way for generations.',
  image: {
    src: 'assets/stillwater-hero.jpg',
    alt: 'Stillwater House at dusk: a low stone and timber home with a long reflecting pool, set in meadow grasses below the Blue Ridge',
    width: 1584,
    height: 672,
  },
};

export const stats = [
  { value: '20', label: 'Years building in Western North Carolina' },
  { value: '68', label: 'Homes, no two alike' },
  { value: '94%', label: 'Delivered on schedule' },
  { value: 'Open book', label: 'Every invoice, shared with you' },
];

export const compare = {
  eyebrow: 'Stillwater House · Fletcher',
  title: 'From drawing to doorstep.',
  hint: 'Drag to compare the rendering with the finished home.',
  award: 'Best Custom Home, 2025',
  meta: '16 months · Delivered on schedule · 4 change orders',
  link: 'Read the story',
  rendering: 'Rendering · 2023',
  built: 'Built · 2025',
};

export const selectedHomes = {
  eyebrow: 'Selected homes',
  title: 'Different lives. Distinctive homes.',
  link: 'All homes',
};

export const why = {
  eyebrow: 'Why Morrow',
  title: 'One team. Open books. No surprises.',
  points: [
    { title: 'One lead, start to key.', text: 'The person who walks your land is the person who hands you the keys.' },
    { title: 'You see every invoice.', text: 'Costs, receipts and allowances, shared as they happen.' },
    { title: 'Priced before we build.', text: 'Design, budget and schedule are agreed before ground is broken.' },
  ],
};

export const process = {
  eyebrow: 'How we build',
  title: 'A clear path. A shared commitment.',
  link: 'The full process',
  // Panel labels and stage answers from the copy deck's How we work stages.
  labels: { happens: 'What happens', decide: 'What you decide', cost: 'What it costs', long: 'How long' },
  calendar: {
    label: 'Your build, month by month',
    // Sample timeline: Stillwater House's 16-month build.
    note: 'Sample timeline, based on Stillwater House’s 16-month build.',
    months: 36,
  },
  steps: [
    {
      title: 'Fit', time: 'Weeks 1–2',
      text: 'A conversation and a walk across your land. We make sure we’re right for each other.',
      months: [0, 0.5],
      expect: {
        happens: 'A first conversation about your plans, then we walk your land together.',
        decide: 'You share a rough brief.',
        cost: 'Free',
        long: 'Weeks 1–2',
      },
      image: { src: 'assets/journal-homesite.jpg', alt: 'A meadow with scattered oaks and the Blue Ridge in morning haze', width: 822, height: 551 },
    },
    {
      title: 'Pre-construction', time: 'Weeks 3–14',
      text: 'Design, materials, cost and schedule, resolved together before anything is built.',
      months: [0.5, 3.25],
      expect: {
        happens: 'Design, cost plan and schedule.',
        decide: 'You agree style, budget and finishes.',
        cost: 'Fixed fee of $18,500, credited to your build',
        long: 'Weeks 3–14',
      },
      image: { src: 'assets/journal-materials.jpg', alt: 'Samples of oak, rough limestone and dark steel laid on a plaster surface', width: 822, height: 551 },
    },
    {
      title: 'Build', time: '12–18 months',
      text: 'One project lead, weekly updates, and a site you’re always welcome on.',
      months: [3.25, 19.25],
      expect: {
        happens: 'One project lead, weekly reports.',
        decide: 'You approve changes in the client portal.',
        cost: 'Monthly draws',
        long: '12–18 months',
      },
      image: { src: 'assets/journal-collab.jpg', alt: 'A project lead and a homeowner reviewing drawings at a table inside a timber-framed house', width: 822, height: 551 },
    },
    {
      title: 'Aftercare', time: '12 months',
      text: 'A careful handover, a guide to your home, and a review a year on.',
      months: [19.25, 31.25],
      expect: {
        happens: 'Handover, home guide and a 12-month review.',
        decide: 'You move in.',
        cost: 'Included',
        long: '12 months',
      },
      image: { src: 'assets/craft-interior.jpg', alt: 'A finished garden room with limestone floors, oak beams and sliding doors open to a courtyard', width: 1152, height: 928 },
    },
  ],
};

export const pricing = {
  eyebrow: 'How we price',
  title: 'You’ll know where every dollar goes.',
  body: 'Open-book cost-plus or one fixed price. Nothing changes without your approval.',
  // Bar widths are each stage's share of total spend (sample proportions).
  bar: [
    { label: 'First conversation', note: 'Free', share: 1 },
    { label: 'Pre-construction', note: 'Fixed fee, credited to your build', share: 1.5 },
    { label: 'Build', note: 'Monthly draws, open book or fixed', share: 6 },
    { label: 'Handover', note: '5% retention, released at completion', share: 1 },
  ],
  links: [
    { label: 'How we price', icon: 'right', href: '#pricing' },
    { label: 'Sample cost report', icon: 'down', href: '#pricing' },
  ],
};

export const recognition = {
  eyebrow: 'Recognition',
  title: 'Trusted by the people who know building.',
  awards: [
    {
      title: 'Best Custom Home, 2025',
      by: 'Blue Ridge Building Awards · for Stillwater House',
      text: 'Noted for its stonework and the way the house sits low in the land.',
      year: '2025',
    },
    {
      title: 'Craftsmanship Award, 2024',
      by: 'Blue Ridge Building Awards · for The Ridge Residence',
      text: 'Noted for its cedar joinery and dry-laid stone base.',
      year: '2024',
    },
  ],
  partners: [
    {
      quote: '“They build what we draw, and tell us early when something needs to change.”',
      name: 'Clara Benton, Benton Hale Architects',
      detail: '4 homes together',
      mark: 'BH',
      role: 'Architect',
    },
    {
      quote: '“When buyers ask who to build with, I send them here.”',
      name: 'David Ruiz, Mountain & Main Realty',
      detail: '6 referrals',
      mark: 'M&M',
      role: 'Realtor',
    },
  ],
};

export const reviews = {
  eyebrow: 'What our clients say',
  title: 'In their words.',
  rating: '4.9',
  count: '47 reviews on Google',
  link: 'Read all reviews on Google',
  note: 'Sample reviews for a concept company.',
  // Each review is paired with a photograph of a Morrow home for the reel.
  items: [
    { name: 'Anna W.', when: '3 months ago', quote: '“Every conversation, every detail felt like it mattered. We moved in on the day they promised.”', image: 'assets/stillwater-card.jpg' },
    { name: 'Mark T.', when: '5 months ago', quote: '“Open books meant we never wondered where the money went. The weekly updates were excellent.”', image: 'assets/ridge-card.jpg' },
    { name: 'Sarah L.', when: '1 year ago', quote: '“They brought our 1920s farmhouse back to life and treated the old brick with real care.”', image: 'assets/oak-door.jpg' },
  ],
};

export const nextChapter = {
  eyebrow: 'Your next chapter',
  title: 'Every great home starts with a hello.',
  body: 'Five short questions, then a straight answer and a time to talk.',
  question: 'Who are you enquiring as?',
  options: ['Homeowner', 'Architect', 'Realtor', 'Attorney or advisor'],
  formTitle: 'Where should we send your answer?',
  fields: {
    name: { label: 'Full name', placeholder: 'Your name' },
    email: { label: 'Email', placeholder: 'you@example.com' },
    phone: { label: 'Phone (optional)', placeholder: 'For a quicker reply' },
  },
  reassurance: 'Your answers stay with our team.',
  submit: 'Begin the conversation',
  sending: 'Sending…',
  change: 'change',
  errors: {
    name: 'Please tell us your name.',
    email: 'Please enter a valid email address.',
    phone: 'That number looks incomplete.',
  },
  received: {
    eyebrow: 'Received',
    title: (first) => `Thank you, ${first}. Here’s what happens next.`,
    steps: [
      { state: 'done', title: 'Enquiry received', when: 'Today', text: 'Your answers are with our team.' },
      { state: 'active', title: 'We review your plans', when: 'Within 2 working days', text: 'A project lead reads everything you’ve shared.' },
      { state: 'todo', title: 'First conversation', when: 'Within a week', text: 'A call or a visit to your land, at a time that suits you.' },
      { state: 'todo', title: 'Your next step', when: 'After we talk', text: 'A clear recommendation, in writing, with no obligation.' },
    ],
    contact: 'Questions in the meantime?',
    note: 'This is a concept page, so nothing was sent.',
  },
};

export const questions = {
  eyebrow: 'Questions',
  items: [
    { q: 'Do you work with my architect?', a: 'Yes. We often join at concept stage, and can introduce architects we trust if you don’t have one yet.' },
    { q: 'Do you build outside Asheville?', a: 'We build within about 90 minutes of Asheville, across Western North Carolina.' },
    { q: 'How soon could we start?', a: 'Pre-construction can usually begin within a month. Ground breaks once design, budget and permits are settled.' },
  ],
};

export const footer = {
  tagline: 'Considered homes. Lasting relationships.\nAsheville & Western North Carolina.',
  signoff: 'Built for the life ahead.',
  links: [
    { label: 'Homes', href: '#homes' },
    { label: 'How we work', href: '#process' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Begin the conversation', href: '#next-chapter' },
  ],
  contacts: [
    { label: 'hello@morrowhouse.com', href: 'mailto:hello@morrowhouse.com' },
    { label: '+1 (828) 555 0146', href: 'tel:+18285550146' },
  ],
  legal: ['© 2026 Morrow House', 'Privacy & cookies'],
  concept: 'A concept company. Homes, figures and reviews are illustrative.',
};

export const contact = {
  email: 'hello@morrowhouse.com',
  phone: '+1 (828) 555 0146',
};
