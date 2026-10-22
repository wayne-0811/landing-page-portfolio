// Copy for the How we work and Pricing pages, verbatim from the copy deck
// (headline option A). Figures are sample content for a concept company.

export const howWeWork = {
  eyebrow: 'How we work',
  title: 'Six stages. No grey areas.',
  body: 'From the first call to a year after you move in.',
  labels: { happens: 'What happens', decide: 'What you decide', cost: 'What it costs', long: 'How long' },
  // The calendar below the explorer: each stage on real dates, with who you
  // meet and what you leave with. Bookings use the rules in lib/calendar.js:
  // { nth, day } is the nth weekday of the month, { every } repeats weekly,
  // { workday } is the nth working day, { after: [id, days] } and
  // { afterWorkdays: [id, n] } follow another booking, and { yearAfter: id }
  // is 52 weeks on. `reveal` is the point (0–1) in the stage's scroll at which
  // it appears. `monthOffset` is the month shown, counted from the start.
  calendar: {
    eyebrow: 'An example schedule',
    title: 'Every stage, on a real calendar.',
    note: 'Example schedule if you started next month. Real dates are set together in pre-construction.',
    // Shown until the browser fills in the visitor's own dates.
    fallbackStart: { year: 2027, month: 2 },
    detailLabels: { meet: 'Who you’ll meet', leave: 'You leave with' },
  },
  stages: [
    {
      title: 'Fit', happens: 'A first conversation about your plans.', decide: 'You share a rough brief.', cost: 'Free', long: '1–2 weeks',
      image: { src: 'assets/whitmore-patio.jpg', alt: 'A long table on a stone terrace, where first conversations often happen', position: '45% 60%' },
      time: 'Weeks 1–2', monthOffset: 0,
      text: 'A call or a coffee about how you want to live, what you have in mind and what worries you. We listen more than we talk.',
      meet: 'A founder and the project lead who would run your build.',
      leave: ['A rough brief, in your own words', 'A first sense of budget and timing', 'An honest answer on whether we’re right for you'],
      bookings: [
        { id: 'call', nth: 1, day: 'tue', time: '10:00', title: 'First conversation · video call', reveal: 0.08 },
        { id: 'brief', after: ['call', 3], time: '', title: 'Your rough brief shared', reveal: 0.3 },
        { id: 'notes', after: ['call', 7], time: '', title: 'Our notes and first questions', reveal: 0.52 },
        { id: 'coffee', after: ['call', 9], time: '09:30', title: 'Follow-up over coffee', reveal: 0.74 },
      ],
    },
    {
      title: 'Site', happens: 'We walk your land together.', decide: 'You arrange access and any survey.', cost: 'Free', long: '1 week',
      image: { src: 'assets/journal-homesite.jpg', alt: 'A hillside meadow with scattered oaks and a long view to the Blue Ridge', position: '50% 60%' },
      time: 'Weeks 5–6', monthOffset: 1,
      text: 'We walk the land with you and read it: sun, slope, views, access, water and soil. The site shapes the house more than anything else.',
      meet: 'Your project lead and our site engineer.',
      leave: ['Site notes and photographs', 'A list of the surveys you’ll need', 'First thoughts on where the house could sit'],
      bookings: [
        { id: 'walk', nth: 1, day: 'thu', time: '09:30', title: 'Site walk with your project lead', reveal: 0.08 },
        { id: 'survey', after: ['walk', 5], time: '08:00', title: 'Topographic survey', reveal: 0.28 },
        { id: 'soils', after: ['survey', 2], time: '08:00', title: 'Soil tests', reveal: 0.46 },
        { id: 'sitenotes', after: ['walk', 11], time: '', title: 'Site notes and photos shared', reveal: 0.64 },
        { id: 'options', after: ['walk', 13], time: '14:00', title: 'Where the house could sit · call', reveal: 0.82 },
      ],
    },
    {
      title: 'Pre-construction', happens: 'Design, cost plan and schedule.', decide: 'You agree style, budget and finishes.', cost: 'Fixed fee of $18,500, credited to your build', long: '8–12 weeks',
      image: { src: 'assets/journal-materials.jpg', alt: 'Samples of oak, rough limestone and dark steel laid on a plaster surface', position: '50% 55%' },
      time: 'Weeks 9–20', monthOffset: 2,
      text: 'Design, materials, cost and schedule, resolved together before anything is built. Weekly workshops keep every decision in the open.',
      meet: 'Your project lead, your architect and our estimator.',
      leave: ['Drawings ready for permit', 'A line-by-line cost plan', 'A week-by-week build schedule'],
      bookings: [
        { id: 'workshop', every: 'wed', time: '14:00', title: 'Design workshop', reveal: 0.08 },
        { id: 'materials', nth: 2, day: 'fri', time: '10:00', title: 'Materials day at the studio', reveal: 0.3 },
        { id: 'cost', after: ['materials', 4], time: '11:00', title: 'Cost plan review', reveal: 0.5 },
        { id: 'schedule', after: ['cost', 2], time: '15:00', title: 'Schedule agreed', reveal: 0.66 },
        { id: 'signoff', after: ['schedule', 4], time: '10:00', title: 'Sign-off: design, budget and schedule', reveal: 0.82 },
      ],
    },
    {
      title: 'Contract', happens: 'Cost-plus or fixed price, in writing.', decide: 'You choose and sign.', cost: 'No fee', long: '2 weeks',
      image: { src: 'assets/oak-door.jpg', alt: 'A hand-finished oak front door set into a pale stone wall', position: '50% 50%' },
      time: 'Weeks 22–23', monthOffset: 5,
      text: 'Open-book cost-plus or one fixed price, in plain language, with the drawings, allowances and schedule attached. We walk you through every page.',
      meet: 'Your project lead and our contracts manager.',
      leave: ['A signed contract', 'Allowances set for finishes still to choose', 'Your login to the client portal'],
      bookings: [
        { id: 'draft', nth: 1, day: 'mon', time: '', title: 'Contract draft sent', reveal: 0.1 },
        { id: 'readthrough', after: ['draft', 3], time: '10:00', title: 'Contract walkthrough', reveal: 0.32 },
        { id: 'allowances', after: ['readthrough', 1], time: '14:00', title: 'Allowances agreed', reveal: 0.52 },
        { id: 'sign', after: ['readthrough', 7], time: '11:00', title: 'Contract signed', reveal: 0.72 },
        { id: 'portal', after: ['sign', 1], time: '', title: 'Client portal opens', reveal: 0.88 },
      ],
    },
    {
      title: 'Build', happens: 'One project lead, weekly reports.', decide: 'You approve changes in the client portal.', cost: 'Monthly draws', long: '12–18 months',
      image: { src: 'assets/journal-collab.jpg', alt: 'A project lead and a homeowner reviewing drawings inside a timber-framed house', position: '50% 40%' },
      time: '12–18 months', monthOffset: 8,
      text: 'A typical month on site. One project lead runs your build from first dig to final coat, and the site is always open to you.',
      meet: 'Your project lead every week, and the trades as they arrive.',
      leave: ['A weekly report with photos', 'Every invoice, open book', 'A say on every change before it happens'],
      bookings: [
        { id: 'draw', workday: 1, time: '', title: 'Monthly draw · open book', reveal: 0.08 },
        { id: 'sitewalk', every: 'tue', time: '08:00', title: 'Weekly site walk', reveal: 0.24 },
        { id: 'report', every: 'fri', time: '16:00', title: 'Weekly report', reveal: 0.4 },
        { id: 'inspection', nth: 2, day: 'thu', time: '09:00', title: 'Framing inspection', reveal: 0.56 },
        { id: 'change', nth: 3, day: 'mon', time: '', title: 'Change order priced', reveal: 0.7 },
        { id: 'approve', afterWorkdays: ['change', 2], time: '', title: 'You approve · client portal', reveal: 0.84 },
      ],
    },
    {
      title: 'Aftercare', happens: 'Handover, home guide and a 12-month review.', decide: 'You move in.', cost: 'Included', long: '12 months',
      image: { src: 'assets/craft-interior.jpg', alt: 'A finished garden room with limestone floors and sliding doors open to a courtyard', position: '50% 60%' },
      time: 'The year after keys', monthOffset: 20,
      text: 'A careful handover, a guide to every system in your home, and the same team on call for the first year.',
      meet: 'Your project lead, then our aftercare team.',
      leave: ['Keys and a written home guide', 'Warranties and a maintenance plan', 'A 12-month review, already booked'],
      bookings: [
        { id: 'handover', nth: 2, day: 'tue', time: '10:00', title: 'Handover & keys', reveal: 0.1 },
        { id: 'guide', after: ['handover', 2], time: '14:00', title: 'Home guide walkthrough', reveal: 0.32 },
        { id: 'moving', after: ['handover', 4], time: '', title: 'Moving day', reveal: 0.52 },
        { id: 'checkin', after: ['handover', 14], time: '10:00', title: 'Two-week check-in', reveal: 0.7 },
        { id: 'review', yearAfter: 'handover', time: '10:00', title: '12-month review', reveal: 0.86 },
      ],
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
