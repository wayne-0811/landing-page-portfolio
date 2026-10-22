// The homes: gallery cards, the homepage carousel and each home's page.
// Copy from the copy deck (Homes gallery, Work detail). Laurel Hollow,
// Fernbrook House, Bent Creek Studio and High Meadow are illustrative, and
// only Stillwater House carries the full case study.

export const categories = ['Custom homes', 'Renovations', 'Pre-construction'];

export const homes = [
  {
    slug: 'stillwater-house', name: 'Stillwater House', place: 'Fletcher', year: 2025,
    category: 'Custom homes', type: 'Custom build',
    tagline: 'a slower way of living',
    description: 'Limestone, oak and glass, set low beside a reflecting pool.',
    summary: 'A single-storey house of limestone, oak and glass, set low in a meadow in the Blue Ridge foothills. The living rooms open onto a long reflecting pool that holds the evening sky.',
    specs: [['Size', '4,200 ft²'], ['Built in', '16 months'], ['Delivered', 'On schedule'], ['Contract', 'Open-book cost-plus']],
    award: 'Best Custom Home, 2025',
    image: { src: 'assets/stillwater-card.jpg', alt: 'Stillwater House: limestone and glass beside a long reflecting pool at golden hour', position: '38% 50%' },
    hero: { src: 'assets/stillwater-hero.jpg', alt: 'Stillwater House at dusk: a low stone and timber home with a long reflecting pool, set in meadow grasses below the Blue Ridge', position: '50% 60%' },
    materials: [
      { name: 'White oak', text: 'Hand-finished doors, beams and joinery.', image: { src: 'assets/oak-door.jpg', position: '62% 50%' } },
      { name: 'Limestone', text: 'Honed floors inside, split-face walls outside.', image: { src: 'assets/stillwater-hero.jpg', position: '24% 58%' } },
      { name: 'Limewash', text: 'Soft walls that change with the light.', image: { src: 'assets/craft-interior.jpg', position: '6% 35%' } },
      { name: 'Glass', text: 'Steel-framed glazing that opens the living room to the pool.', image: { src: 'assets/stillwater-hero.jpg', position: '40% 52%' } },
    ],
    caseStudy: true,
  },
  {
    slug: 'the-ridge-residence', name: 'The Ridge Residence', place: 'Asheville', year: 2024,
    category: 'Custom homes', type: 'Custom build',
    tagline: 'at home in the landscape',
    description: 'A cedar gable on a stone base, among tall forest trees.',
    summary: 'A cedar-clad gabled home on a stone base, reached by a gravel path through tall forest. Every window frames trees, and the deck steps out into the canopy.',
    specs: [['Size', '3,650 ft²'], ['Built in', '14 months'], ['Delivered', 'On schedule'], ['Project', 'Custom build']],
    award: 'Craftsmanship Award, 2024',
    image: { src: 'assets/ridge-card.jpg', alt: 'The Ridge Residence: a cedar gable on a stone base among tall forest trees', position: '55% 50%' },
    hero: { src: 'assets/ridge-card.jpg', alt: 'The Ridge Residence: a cedar-clad gable on a dry-laid stone base, reached by a gravel path through ferns and tall trees', position: '55% 45%' },
    materials: [
      { name: 'Cedar', text: 'Vertical cladding, left to silver with age.' },
      { name: 'Fieldstone', text: 'A dry-laid base that roots the house to the slope.' },
      { name: 'Steel', text: 'Slim window frames and a standing-seam roof.' },
      { name: 'Oak', text: 'Floors, stair treads and kitchen joinery.' },
    ],
  },
  {
    slug: 'laurel-hollow', name: 'Laurel Hollow', place: 'Black Mountain', year: 2024,
    category: 'Renovations', type: 'Renovation', illustrative: true,
    tagline: 'an old house, a new chapter',
    description: 'A 1920s brick farmhouse, opened up for a family of five.',
    summary: 'A 1920s brick farmhouse, opened up and made warm again for a family of five.',
    specs: [['Size', '2,900 ft²'], ['Built in', '9 months'], ['Delivered', 'On schedule'], ['Project', 'Renovation']],
    image: { src: 'assets/oak-door.jpg', alt: 'A hand-finished oak front door set into a pale stone wall', position: '50% 50%' },
    hero: { src: 'assets/oak-door.jpg', alt: 'A hand-finished oak front door set into a pale stone wall', position: '50% 50%' },
    materials: [
      { name: 'Brick', text: 'The original walls, cleaned and repointed.' },
      { name: 'Oak', text: 'New floors laid to match the old.' },
      { name: 'Lime plaster', text: 'Breathable walls throughout.' },
    ],
  },
  {
    slug: 'fernbrook-house', name: 'Fernbrook House', place: 'Weaverville', year: 2023,
    category: 'Custom homes', type: 'Custom build', illustrative: true,
    tagline: 'room for everyone',
    description: 'A long timber house by a creek, planned around the kitchen.',
    summary: 'A long timber house beside a creek, planned around a kitchen big enough for three generations.',
    specs: [['Size', '3,900 ft²'], ['Built in', '15 months'], ['Delivered', 'On schedule'], ['Project', 'Custom build']],
    image: { src: 'assets/whitmore-patio.jpg', alt: 'A stone terrace with a long dining table under a timber pergola', position: '40% 50%' },
    hero: { src: 'assets/whitmore-patio.jpg', alt: 'A stone terrace with a long dining table under a timber pergola, beside a stone house with tall windows', position: '45% 55%' },
    materials: [
      { name: 'Timber', text: 'Douglas fir frame and cladding.' },
      { name: 'Fieldstone', text: 'Chimney and garden walls.' },
      { name: 'Zinc', text: 'Roof and rainwater details.' },
    ],
  },
  {
    slug: 'bent-creek-studio', name: 'Bent Creek Studio', place: 'Asheville', year: 2023,
    category: 'Renovations', type: 'Renovation', illustrative: true,
    tagline: 'a place to make things',
    description: 'A disused workshop, now a light-filled studio and guest room.',
    summary: 'A disused workshop turned into a light-filled studio and guest room.',
    specs: [['Size', '1,400 ft²'], ['Built in', '7 months'], ['Delivered', 'On schedule'], ['Project', 'Renovation']],
    image: { src: 'assets/craft-interior.jpg', alt: 'A light-filled room with limestone floors and oak-framed sliding doors to a garden', position: '60% 50%' },
    hero: { src: 'assets/craft-interior.jpg', alt: 'A light-filled room with limestone floors, a built-in bench and oak-framed sliding doors open to a garden', position: '50% 60%' },
    materials: [
      { name: 'Concrete', text: 'Board-formed walls, left honest.' },
      { name: 'Ash', text: 'Benches, shelving and doors.' },
      { name: 'Glass', text: 'A new north-facing roof light.' },
    ],
  },
  {
    slug: 'high-meadow', name: 'High Meadow', place: 'Brevard', year: 2026,
    category: 'Pre-construction', type: 'Pre-construction', illustrative: true, planned: true,
    tagline: 'drawn around the view',
    description: 'A hillside home in planning, arranged around one long view.',
    summary: 'A hillside home in planning, its rooms arranged around a single long view to the south.',
    specs: [['Size', '3,200 ft²'], ['Build', '14 months, planned'], ['Status', 'In planning'], ['Project', 'Pre-construction']],
    image: { src: 'assets/journal-homesite.jpg', alt: 'A hillside meadow with oaks and a long view to the Blue Ridge', position: '50% 50%' },
    hero: { src: 'assets/journal-homesite.jpg', alt: 'The High Meadow site: a hillside meadow with scattered oaks and a long view to the Blue Ridge', position: '50% 55%' },
    materials: [
      { name: 'Stone', text: 'Local stone for the base and terraces.' },
      { name: 'Cedar', text: 'Cladding and soffits.' },
      { name: 'Steel', text: 'Window frames and balustrades.' },
    ],
  },
];

export const homeHref = (h) => `${h.slug}.html`;

/** The homes either side of `slug`, wrapping round. */
export function neighbours(slug) {
  const i = homes.findIndex((h) => h.slug === slug);
  return { prev: homes[(i - 1 + homes.length) % homes.length], next: homes[(i + 1) % homes.length] };
}

// Gallery page copy.
export const gallery = {
  eyebrow: 'Selected homes',
  region: 'Western NC · 2023–2026',
  title: ['Different lives.', 'Distinctive homes.'],
  body: 'Each began with a walk across the land and a conversation about how a family wanted to live.',
  all: 'All',
  empty: 'No homes here yet.',
  emptyLink: 'See all homes',
  note: 'Laurel Hollow, Fernbrook House, Bent Creek Studio and High Meadow are illustrative.',
  closing: {
    title: 'Don’t see your kind of home?',
    body: 'Every home here began as something new to us too.',
    button: 'Begin the conversation',
  },
};

// Stillwater House case study (copy deck: Work detail · Stillwater House).
export const stillwater = {
  drawing: {
    eyebrow: 'Drawing → doorstep',
    title: 'What we drew is what we built.',
    rendering: 'Rendering · 2023',
    built: 'Built · 2025',
  },
  rooms: [
    { title: 'The approach', text: 'A gravel path through meadow grasses, then the first view of the house across the water.', image: { src: 'assets/stillwater-card.jpg', alt: 'A gravel path through meadow grasses to Stillwater House across its reflecting pool', position: '55% 50%' } },
    { title: 'Garden room', text: 'Limestone floors, oak beams and a window seat. Sliding doors open onto a green courtyard.', image: { src: 'assets/craft-interior.jpg', alt: 'The garden room: limestone floors, oak beams, a window seat and sliding doors open to a green courtyard', position: '50% 50%' } },
    { title: 'Kitchen', text: 'An oak island and a long limestone counter, facing west toward the pool.' },
    { title: 'The terrace', text: 'A stone terrace under a timber pergola, used from spring to late autumn.', image: { src: 'assets/whitmore-patio.jpg', alt: 'A stone terrace with a long table under a timber pergola', position: '45% 55%' } },
  ],
  challenges: {
    eyebrow: 'The challenges',
    title: 'What made this one hard.',
    items: [
      { problem: 'A 40-metre pool on sloping clay.', solution: 'Helical piers and a sealed liner keep the water level and the ground still.' },
      { problem: 'Six-metre glass walls with no visible posts.', solution: 'A steel frame hidden in the roof lets the glass run uninterrupted.' },
    ],
    photos: [
      { src: 'assets/journal-materials.jpg', alt: 'Samples of oak, rough limestone and dark steel chosen for the house', caption: 'Materials, chosen in pre-construction' },
      { src: 'assets/journal-collab.jpg', alt: 'The project lead and an owner reviewing drawings on site inside the timber frame', caption: 'On site, month 7' },
    ],
  },
  build: {
    eyebrow: 'The build · 16 months',
    phases: [['Fit', 0.6], ['Pre-construction', 2.4], ['Build', 12], ['Keys', 1]],
    photos: [
      { caption: 'Month 3', src: 'assets/journal-homesite.jpg', alt: 'The meadow site before ground was broken' },
      { caption: 'Month 7', src: 'assets/journal-collab.jpg', alt: 'Reviewing drawings inside the timber frame' },
      { caption: 'Month 11', src: 'assets/oak-door.jpg', alt: 'The oak front door hung in the limestone wall' },
      { caption: 'Month 16', src: 'assets/stillwater-card.jpg', alt: 'The finished house beside the filled reflecting pool' },
    ],
    result: 'Planned 16 months · Actual 16 months · 4 change orders, each approved within 2 working days',
  },
  review: {
    quote: '“They understood that we weren’t just building a house. We were making a place for our family to grow. Every detail felt like it mattered.”',
    name: 'Anna & James Whitmore',
    detail: 'Moved in 2025',
    image: { src: 'assets/whitmore-patio.jpg', alt: 'The Whitmores’ terrace: a long table under the timber pergola', position: '30% 50%' },
    answers: [['Best part', 'The weekly site walks.'], ['Surprised by', 'No cost surprises. Not one.'], ['Would we again?', 'Without a second thought.']],
  },
  closing: { title: 'Thinking of something like this?', button: 'Begin the conversation' },
};
