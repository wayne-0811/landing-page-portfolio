// Homepage copy, verbatim from the copy deck (headline option A throughout).
// Figures, reviews and awards are sample content for a concept company.

export const nav = {
  links: [
    { label: 'Homes', href: 'homes.html' },
    { label: 'How we work', href: 'how-we-work.html' },
    { label: 'Pricing', href: 'pricing.html' },
  ],
  cta: { label: 'Begin the conversation', href: 'index.html#next-chapter' },
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
    { label: 'How we price', icon: 'right', href: 'pricing.html' },
    { label: 'Sample cost report', icon: 'down', href: 'pricing.html#cost-report' },
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
    { name: 'Anna W.', when: '3 months ago', quote: '“Every conversation, every detail felt like it mattered. We moved in on the day they promised.”', image: 'assets/stillwater-card.jpg', imagePosition: '38% 50%' },
    { name: 'Mark T.', when: '5 months ago', quote: '“Open books meant we never wondered where the money went. The weekly updates were excellent.”', image: 'assets/ridge-card.jpg', imagePosition: '55% 50%' },
    { name: 'Sarah L.', when: '1 year ago', quote: '“They brought our 1920s farmhouse back to life and treated the old brick with real care.”', image: 'assets/oak-door.jpg', imagePosition: '45% 50%' },
  ],
};

export const nextChapter = {
  eyebrow: 'Your next chapter',
  title: 'Every great home starts with a hello.',
  // Intro and questions from the Client Intake Brief. A field's `sum` is its
  // label on the review screen when that differs from what the form shows.
  body: 'Eight quick questions, about three minutes. Answer what you can. Anything you skip, we can cover when we meet.',
  steps: [
    {
      title: 'About you',
      intro: 'Let’s start with how to reach you.',
      questions: [{
        fields: [
          { type: 'text', name: 'fullname', label: 'Full name', required: true, autoComplete: 'name' },
          { type: 'email', name: 'email', label: 'Email', required: true, autoComplete: 'email' },
          { type: 'tel', name: 'phone', label: 'Phone (optional)', sum: 'Phone', autoComplete: 'tel' },
          { type: 'check', name: 'channels', label: 'Best way to reach you', options: ['Email', 'Phone call', 'Text message', 'Client portal'] },
        ],
      }],
    },
    {
      title: 'The project',
      intro: 'Where, when and roughly how much. Rough answers are fine.',
      questions: [
        {
          title: 'Where is the property?',
          fields: [
            { type: 'text', name: 'address', label: 'Street address or neighborhood', autoComplete: 'street-address' },
            { type: 'text', name: 'city', label: 'City and state or region', autoComplete: 'address-level2' },
          ],
        },
        {
          title: 'When would you like to begin?',
          help: 'Tell us about any fixed date, such as a move-in or an event at the house.',
          fields: [
            { type: 'radio', name: 'start', options: ['Within 3 months', '3 to 6 months', '6 to 12 months', 'More than a year out', 'Flexible'] },
            { type: 'text', name: 'deadline', label: 'Fixed date, if any', placeholder: 'e.g. a family wedding at the house in June' },
          ],
        },
        {
          title: 'What budget have you set aside?',
          help: 'A realistic range lets us design to your vision without compromising it halfway through.',
          fields: [
            { type: 'radio', name: 'budget', label: 'Approximate range', sum: 'Range', options: ['Under $250,000', '$250,000 to $500,000', '$500,000 to $1 million', '$1 million to $2 million', 'More than $2 million', 'Not sure yet. I would like your guidance'] },
            { type: 'radio', name: 'budgetFlex', label: 'How firm is it?', sum: 'Flexibility', options: ['The figure is firm', 'Some flexibility for the right decisions'] },
          ],
        },
      ],
    },
    {
      title: 'The home',
      intro: 'A little about the house, and the feeling you want.',
      questions: [
        {
          title: 'Is this your home or an investment?',
          fields: [{ type: 'radio', name: 'occupancy', options: ['Primary residence', 'Second or vacation home', 'Rental or investment', 'Bought to renovate and sell'] }],
        },
        {
          title: 'What works in the space now, and what does not?',
          help: 'There is no need to tidy before our visit. Seeing the home as you live in it shows us what to solve.',
          fields: [{ type: 'area', name: 'works', label: 'In a few lines', sum: 'What works, and what does not', placeholder: 'e.g. we love the morning light in the kitchen, but the primary suite feels cut off from the rest of the house' }],
        },
        {
          title: 'Which styles are you drawn to?',
          help: 'Choose as many as you like.',
          fields: [
            { type: 'check', name: 'styles', options: ['Contemporary', 'Transitional', 'Traditional', 'Mid-century modern', 'Modern farmhouse', 'Coastal', 'Mediterranean', 'Japandi', 'Historic restoration', 'Eclectic'] },
            { type: 'area', name: 'inspiration', label: 'A place you love, or links to images you have saved (optional)', sum: 'Inspiration', placeholder: 'A hotel, a garden, a restaurant, or paste a link' },
          ],
        },
      ],
    },
    {
      title: 'Working together',
      intro: 'Last step. Two quick questions.',
      questions: [
        {
          title: 'How would you like to work with us?',
          help: 'Many of the best rooms begin outside the original brief. This tells us how far to push.',
          fields: [{ type: 'radio', name: 'style', options: ['Guide me. Show me what is possible', 'Collaborate. I have ideas and welcome yours', 'Execute my vision. I know what I want'] }],
        },
        {
          title: 'How did you find us?',
          fields: [
            { type: 'select', name: 'source', label: 'Choose one', sum: 'How you found us', options: ['Referral from a friend or colleague', 'Houzz', 'Instagram or Pinterest', 'Google search', 'Magazine or press', 'Showroom or event', 'Another professional', 'Other'] },
            { type: 'text', name: 'sourceName', label: 'Name of the person or publication, if any', sum: 'Source name' },
          ],
        },
      ],
      note: 'Nothing is sent yet. You can review your answers on the next screen.',
    },
  ],
  labels: {
    step: (n, total) => `Step ${n} of ${total}`,
    required: 'Required',
    select: 'Select',
    back: 'Back',
    next: 'Continue',
    review: 'Review my answers',
    reviewEyebrow: 'Review',
    reviewTitle: 'Your answers',
    reviewIntro: 'Check everything looks right. You can edit any step before sending.',
    edit: 'Edit',
    empty: 'Not answered',
  },
  reassurance: 'Your answers stay with our team.',
  submit: 'Send my answers',
  sending: 'Sending…',
  errors: {
    fullname: 'Please tell us your name.',
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
    { label: 'Homes', href: 'homes.html' },
    { label: 'How we work', href: 'how-we-work.html' },
    { label: 'Pricing', href: 'pricing.html' },
    { label: 'Begin the conversation', href: 'index.html#next-chapter' },
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
