// Copy for the How we work and Pricing pages, verbatim from the copy deck
// (headline option A). Figures are sample content for a concept company.

export const howWeWork = {
  eyebrow: 'How we work',
  title: 'Six stages. No grey areas.',
  body: 'From the first call to a year after you move in.',
  labels: { happens: 'What happens', decide: 'What you decide', cost: 'What it costs', long: 'How long' },
  stages: [
    {
      title: 'Fit', happens: 'A first conversation about your plans.', decide: 'You share a rough brief.', cost: 'Free', long: '1–2 weeks',
      image: { src: 'assets/whitmore-patio.jpg', alt: 'A long table on a stone terrace, where first conversations often happen', position: '45% 60%' },
    },
    {
      title: 'Site', happens: 'We walk your land together.', decide: 'You arrange access and any survey.', cost: 'Free', long: '1 week',
      image: { src: 'assets/journal-homesite.jpg', alt: 'A hillside meadow with scattered oaks and a long view to the Blue Ridge', position: '50% 60%' },
    },
    {
      title: 'Pre-construction', happens: 'Design, cost plan and schedule.', decide: 'You agree style, budget and finishes.', cost: 'Fixed fee of $18,500, credited to your build', long: '8–12 weeks',
      image: { src: 'assets/journal-materials.jpg', alt: 'Samples of oak, rough limestone and dark steel laid on a plaster surface', position: '50% 55%' },
    },
    {
      title: 'Contract', happens: 'Cost-plus or fixed price, in writing.', decide: 'You choose and sign.', cost: 'No fee', long: '2 weeks',
      image: { src: 'assets/oak-door.jpg', alt: 'A hand-finished oak front door set into a pale stone wall', position: '50% 50%' },
    },
    {
      title: 'Build', happens: 'One project lead, weekly reports.', decide: 'You approve changes in the client portal.', cost: 'Monthly draws', long: '12–18 months',
      image: { src: 'assets/journal-collab.jpg', alt: 'A project lead and a homeowner reviewing drawings inside a timber-framed house', position: '50% 40%' },
    },
    {
      title: 'Aftercare', happens: 'Handover, home guide and a 12-month review.', decide: 'You move in.', cost: 'Included', long: '12 months',
      image: { src: 'assets/craft-interior.jpg', alt: 'A finished garden room with limestone floors and sliding doors open to a courtyard', position: '50% 60%' },
    },
  ],
  guide: {
    title: 'The Morrow process guide',
    body: 'A 12-page PDF to share with your architect, advisor or partner.',
    button: 'Download PDF',
    note: 'Sample download. The PDF isn’t part of this concept.',
  },
  closing: { button: 'Begin the conversation' },
};

export const pricingPage = {
  eyebrow: 'How we price',
  title: 'No surprises. In writing.',
  body: 'Choose the contract that suits your project. Either way, costs are agreed before work begins.',
  timeline: {
    eyebrow: 'Payment timeline',
    note: 'Bar widths show each stage’s share of total spend.',
    // share: sample proportions of total spend
    stages: [
      { title: 'First conversation', cost: 'Free', share: 1 },
      { title: 'Pre-construction', cost: 'Fixed fee of $18,500, credited to your build', share: 1.5 },
      { title: 'Build', cost: 'Monthly draws, open book or fixed', share: 6 },
      { title: 'Handover', cost: '5% retention, released at completion', share: 1 },
    ],
  },
  contracts: [
    { title: 'Open-book cost-plus', text: 'You pay the actual cost of the build, plus our agreed fee of 15%. Every invoice is shared.', best: 'Best while the design is still evolving.' },
    { title: 'Fixed price', text: 'One agreed sum for the whole build. We carry the risk on cost.', best: 'Best when drawings are complete.' },
  ],
  changeOrders: {
    title: 'Change orders',
    steps: ['You ask', 'We price it within 2 working days', 'Nothing changes until you approve'],
  },
  allowances: {
    title: 'Allowances',
    text: 'For finishes still to be chosen, we set a budget together and track it live. You see what’s spent and what remains.',
    // Sample figures for the illustration only.
    example: { label: 'Kitchen finishes (sample)', used: 62, usedLabel: 'Used', remainingLabel: 'Remaining' },
  },
  report: {
    link: 'See a sample cost report',
    note: 'Sample download. The report isn’t part of this concept.',
  },
  faq: {
    eyebrow: 'Pricing questions',
    title: 'The things people ask before they call.',
    items: [
      { q: 'What does pre-construction cost, and is it refundable?', a: 'A fixed fee of $18,500. If you build with us, it’s credited in full against your build.' },
      { q: 'What is your fee on a cost-plus contract?', a: '15% of the cost of the build, agreed in writing before work begins.' },
      { q: 'How are allowances set, and what if we go over?', a: 'We set them with you during pre-construction. Any overage is shown in advance and needs your sign-off.' },
      { q: 'How do change orders affect the schedule?', a: 'Each one is priced with its effect on time and cost, so you can decide with both in view.' },
      { q: 'Can we switch from cost-plus to fixed price?', a: 'Yes. Once drawings are complete, we can fix the price for the remaining work.' },
      { q: 'What does a home like yours typically cost per square foot?', a: 'Most of our recent homes have fallen between $650 and $1,100 per ft². Site, size and finishes move it most.' },
    ],
  },
  closing: { button: 'Begin the conversation' },
};
