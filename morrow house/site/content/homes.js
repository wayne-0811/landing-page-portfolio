// The homes: gallery cards, the homepage carousel and each home's page.
// Copy from the copy deck (Homes gallery, Work detail · Stillwater House).
// The other case studies follow Stillwater's pattern in the same voice.
// Laurel Hollow, Fernbrook House, Bent Creek Studio and High Meadow are
// illustrative. The case-study pictures in assets/homes/ were generated with
// Canva's AI for this concept. An image with no src shows a "Photograph to
// come" frame.

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
      { name: 'Cedar', text: 'Vertical cladding, left to silver with age.', image: { src: 'assets/materials/cedar.svg' } },
      { name: 'Fieldstone', text: 'A dry-laid base that roots the house to the slope.', image: { src: 'assets/materials/fieldstone.svg' } },
      { name: 'Steel', text: 'Slim window frames and a standing-seam roof.', image: { src: 'assets/materials/steel.svg' } },
      { name: 'Oak', text: 'Floors, stair treads and kitchen joinery.', image: { src: 'assets/materials/oak.svg' } },
    ],
  },
  {
    slug: 'laurel-hollow', name: 'Laurel Hollow', place: 'Black Mountain', year: 2024,
    category: 'Renovations', type: 'Renovation', illustrative: true,
    tagline: 'an old house, a new chapter',
    description: 'A 1920s brick farmhouse, opened up for a family of five.',
    summary: 'A 1920s brick farmhouse, opened up and made warm again for a family of five.',
    specs: [['Size', '2,900 ft²'], ['Built in', '9 months'], ['Delivered', 'On schedule'], ['Project', 'Renovation']],
    image: { src: 'assets/homes/laurel-hollow/hero.jpg', alt: 'Laurel Hollow: a 1920s brick farmhouse with three dormers and a rebuilt white porch', position: '50% 45%' },
    hero: { src: 'assets/homes/laurel-hollow/hero.jpg', alt: 'Laurel Hollow: a 1920s brick farmhouse with three dormers and a rebuilt white porch, in a mature garden below the mountains', position: '50% 45%' },
    materials: [
      { name: 'Brick', text: 'The original walls, cleaned and repointed.', image: { src: 'assets/materials/brick.svg' } },
      { name: 'Oak', text: 'New floors laid to match the old.', image: { src: 'assets/materials/oak.svg' } },
      { name: 'Lime plaster', text: 'Breathable walls throughout.', image: { src: 'assets/materials/lime-plaster.svg' } },
    ],
  },
  {
    slug: 'fernbrook-house', name: 'Fernbrook House', place: 'Weaverville', year: 2023,
    category: 'Custom homes', type: 'Custom build', illustrative: true,
    tagline: 'room for everyone',
    description: 'A long timber house by a creek, planned around the kitchen.',
    summary: 'A long timber house beside a creek, planned around a kitchen big enough for three generations.',
    specs: [['Size', '3,900 ft²'], ['Built in', '15 months'], ['Delivered', 'On schedule'], ['Project', 'Custom build']],
    image: { src: 'assets/homes/fernbrook-house/hero.jpg', alt: 'Fernbrook House: a long timber house with a zinc roof beside a creek', position: '50% 55%' },
    hero: { src: 'assets/homes/fernbrook-house/hero.jpg', alt: 'Fernbrook House: a long Douglas fir house with a zinc roof and fieldstone chimney, its stone terrace stepping down to a creek', position: '50% 55%' },
    materials: [
      { name: 'Timber', text: 'Douglas fir frame and cladding.', image: { src: 'assets/materials/timber.svg' } },
      { name: 'Fieldstone', text: 'Chimney and garden walls.', image: { src: 'assets/materials/fieldstone.svg' } },
      { name: 'Zinc', text: 'Roof and rainwater details.', image: { src: 'assets/materials/zinc.svg' } },
    ],
  },
  {
    slug: 'bent-creek-studio', name: 'Bent Creek Studio', place: 'Asheville', year: 2023,
    category: 'Renovations', type: 'Renovation', illustrative: true,
    tagline: 'a place to make things',
    description: 'A disused workshop, now a light-filled studio and guest room.',
    summary: 'A disused workshop turned into a light-filled studio and guest room.',
    specs: [['Size', '1,400 ft²'], ['Built in', '7 months'], ['Delivered', 'On schedule'], ['Project', 'Renovation']],
    image: { src: 'assets/homes/bent-creek-studio/hero.jpg', alt: 'Inside Bent Creek Studio: concrete walls under a long roof light', position: '50% 50%' },
    hero: { src: 'assets/homes/bent-creek-studio/hero.jpg', alt: 'Inside Bent Creek Studio: board-formed concrete walls under a long roof light, with steel-framed doors open to a gravel garden', position: '50% 50%' },
    materials: [
      { name: 'Concrete', text: 'Board-formed walls, left honest.', image: { src: 'assets/materials/concrete.svg' } },
      { name: 'Ash', text: 'Benches, shelving and doors.', image: { src: 'assets/materials/ash.svg' } },
      { name: 'Glass', text: 'A new north-facing roof light.', image: { src: 'assets/materials/glass.svg' } },
    ],
  },
  {
    slug: 'high-meadow', name: 'High Meadow', place: 'Brevard', year: 2026,
    category: 'Pre-construction', type: 'Pre-construction', illustrative: true, planned: true,
    tagline: 'drawn around the view',
    description: 'A hillside home in planning, arranged around one long view.',
    summary: 'A hillside home in planning, its rooms arranged around a single long view to the south.',
    specs: [['Size', '3,200 ft²'], ['Build', '14 months, planned'], ['Status', 'In planning'], ['Project', 'Pre-construction']],
    image: { src: 'assets/homes/high-meadow/site.jpg', alt: 'The High Meadow site: a hillside meadow with a long view to the Blue Ridge', position: '50% 50%' },
    hero: { src: 'assets/homes/high-meadow/site.jpg', alt: 'The High Meadow site: a sloping wildflower meadow with scattered oaks and a long view south to the Blue Ridge', position: '50% 50%' },
    materials: [
      { name: 'Stone', text: 'Local stone for the base and terraces.', image: { src: 'assets/materials/stone.svg' } },
      { name: 'Cedar', text: 'Cladding and soffits.', image: { src: 'assets/materials/cedar.svg' } },
      { name: 'Steel', text: 'Window frames and balustrades.', image: { src: 'assets/materials/steel.svg' } },
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

// Case studies, one per home (Stillwater House: copy deck, Work detail).
// drawing: a compare slider, shown once both of its images exist.
// build.now: the phase in progress, for a home still being planned.
export const caseStudies = {
  'stillwater-house': {
    drawing: {
      eyebrow: 'Drawing → doorstep',
      title: 'What we drew is what we built.',
      rendering: 'Rendering · 2023',
      built: 'Built · 2025',
      hint: 'Drag to compare the rendering with the finished home.',
      photo: 'assets/stillwater-hero.jpg',
      drawing: 'assets/stillwater-drawing.svg',
      width: 1584,
      height: 672,
      alt: 'Stillwater House as built: limestone, oak and glass beside a long reflecting pool',
    },
    rooms: [
      { title: 'The approach', text: 'A gravel path through meadow grasses, then the first view of the house across the water.', image: { src: 'assets/stillwater-card.jpg', alt: 'A gravel path through meadow grasses to Stillwater House across its reflecting pool', position: '55% 50%' } },
      { title: 'Garden room', text: 'Limestone floors, oak beams and a window seat. Sliding doors open onto a green courtyard.', image: { src: 'assets/craft-interior.jpg', alt: 'The garden room: limestone floors, oak beams, a window seat and sliding doors open to a green courtyard', position: '50% 50%' } },
      { title: 'Kitchen', text: 'An oak island and a long limestone counter, facing west toward the pool.', image: { src: 'assets/homes/stillwater-house/room3.jpg', alt: 'The kitchen: an oak island and a long limestone counter facing west toward the pool' } },
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
  },

  'the-ridge-residence': {
    drawing: {
      eyebrow: 'Drawing → doorstep',
      title: 'Drawn between the trees.',
      rendering: 'Rendering · 2022',
      built: 'Built · 2024',
      hint: 'Drag to compare the rendering with the finished home.',
      photo: 'assets/homes/the-ridge-residence/exterior.jpg',
      drawing: 'assets/homes/the-ridge-residence/rendering.jpg',
      width: 1600,
      height: 899,
      alt: 'The Ridge Residence as built: a cedar gable on a stone base among tall forest trees',
    },
    rooms: [
      { title: 'The approach', text: 'A gravel path through ferns, then the gable appears between two old poplars.', image: { src: 'assets/homes/the-ridge-residence/room1.jpg', alt: 'A gravel path through ferns to the cedar gable of The Ridge Residence' } },
      { title: 'Kitchen', text: 'An oak island under steel-framed windows that look straight into the canopy.', image: { src: 'assets/homes/the-ridge-residence/room2.jpg', alt: 'The kitchen: an oak island under tall steel-framed windows full of forest' } },
      { title: 'The stair', text: 'Oak treads on a steel stringer, lit from above by a roof light.', image: { src: 'assets/homes/the-ridge-residence/room3.jpg', alt: 'An oak and steel stair lit by a roof light' } },
      { title: 'The deck', text: 'A cedar deck that steps out among the trunks, ten feet above the forest floor.', image: { src: 'assets/homes/the-ridge-residence/room4.jpg', alt: 'A cedar deck among tall tree trunks' } },
    ],
    challenges: {
      eyebrow: 'The challenges',
      title: 'What made this one hard.',
      items: [
        { problem: 'A steep, wooded slope, and trees the owners wanted kept.', solution: 'We surveyed every trunk over 12 inches and set the house between them, on piers rather than a dug-out basement.' },
        { problem: 'Hundred-foot poplars close to the roof.', solution: 'An arborist’s root map shaped the foundations, and a standing-seam steel roof sheds whatever falls.' },
      ],
      photos: [
        { src: 'assets/homes/the-ridge-residence/challenge1.jpg', alt: 'Tree survey tags on poplar trunks across the slope', caption: 'Tree survey, pre-construction' },
        { src: 'assets/homes/the-ridge-residence/challenge2.jpg', alt: 'The dry-laid fieldstone base going up on the slope', caption: 'Stone base, month 4' },
      ],
    },
    build: {
      eyebrow: 'The build · 14 months',
      phases: [['Fit', 0.5], ['Pre-construction', 2.5], ['Build', 10], ['Keys', 1]],
      photos: [
        { caption: 'Month 2', src: 'assets/homes/the-ridge-residence/build1.jpg', alt: 'The wooded slope, marked out between the trees' },
        { caption: 'Month 5', src: 'assets/homes/the-ridge-residence/build2.jpg', alt: 'The stone base finished, piers set into the slope' },
        { caption: 'Month 9', src: 'assets/homes/the-ridge-residence/build3.jpg', alt: 'Cedar cladding going on the gable' },
        { caption: 'Month 14', src: 'assets/homes/the-ridge-residence/exterior.jpg', alt: 'The finished house, lit at dusk among the trees' },
      ],
      result: 'Planned 14 months · Actual 14 months · 3 change orders, each approved within 2 working days',
    },
    review: {
      quote: '“We were told we’d lose half the trees. Morrow kept all but two, and you can feel it in every room.”',
      name: 'Daniel & Priya Okafor',
      detail: 'Moved in 2024',
      image: { src: 'assets/homes/the-ridge-residence/review.jpg', alt: 'The Okafors’ deck among the trees, with two chairs facing the forest' },
      answers: [['Best part', 'Watching the tree survey shape the plan.'], ['Surprised by', 'How tidy the site was kept.'], ['Would we again?', 'Yes, and we’ve told our friends.']],
    },
    closing: { title: 'Building on a wooded lot?', button: 'Begin the conversation' },
  },

  'laurel-hollow': {
    drawing: {
      eyebrow: 'Before → after',
      title: 'Opened up, not knocked down.',
      rendering: 'Before · 2023',
      built: 'After · 2024',
      hint: 'Drag to compare the house before and after.',
      photo: 'assets/homes/laurel-hollow/hero.jpg',
      drawing: 'assets/homes/laurel-hollow/before.jpg',
      width: 1600,
      height: 899,
      alt: 'Laurel Hollow after the renovation: the 1920s brick farmhouse with its rebuilt porch',
    },
    rooms: [
      { title: 'The front porch', text: 'The original porch, rebuilt board by board to the same profile.', image: { src: 'assets/homes/laurel-hollow/room1.jpg', alt: 'The rebuilt front porch of the brick farmhouse' } },
      { title: 'Kitchen', text: 'Three small rooms became one, with an oak table at its centre and the old brick left bare.', image: { src: 'assets/homes/laurel-hollow/room2.jpg', alt: 'The open kitchen with an oak table and a bare brick wall' } },
      { title: 'The children’s rooms', text: 'Three bedrooms under the eaves, each with its own dormer window.', image: { src: 'assets/homes/laurel-hollow/room3.jpg', alt: 'A child’s bedroom under the eaves with a dormer window' } },
      { title: 'The back garden', text: 'New French doors open the kitchen to the garden for the first time.', image: { src: 'assets/homes/laurel-hollow/room4.jpg', alt: 'French doors open from the kitchen to the back garden' } },
    ],
    challenges: {
      eyebrow: 'The challenges',
      title: 'What made this one hard.',
      items: [
        { problem: 'Load-bearing brick walls where the family wanted open rooms.', solution: 'Steel beams set into the old brickwork carry the floor above, so the walls could open without the house moving.' },
        { problem: 'Damp in hundred-year-old walls.', solution: 'The cement render came off, lime plaster went on, and the walls dried out within a season.' },
      ],
      photos: [
        { src: 'assets/homes/laurel-hollow/challenge1.jpg', alt: 'Original brick uncovered behind old cement render', caption: 'Original brick, uncovered' },
        { src: 'assets/homes/laurel-hollow/challenge2.jpg', alt: 'A new steel beam set into the brick wall', caption: 'New steel beam, month 3' },
      ],
    },
    build: {
      eyebrow: 'The renovation · 9 months',
      phases: [['Fit', 0.5], ['Pre-construction', 1.5], ['Build', 6.5], ['Keys', 0.5]],
      photos: [
        { caption: 'Month 1', src: 'assets/homes/laurel-hollow/before.jpg', alt: 'The farmhouse as found, before work began' },
        { caption: 'Month 3', src: 'assets/homes/laurel-hollow/build2.jpg', alt: 'The ground floor opened up, propped while the steel went in' },
        { caption: 'Month 6', src: 'assets/homes/laurel-hollow/build3.jpg', alt: 'Lime plaster going onto the walls' },
        { caption: 'Month 9', src: 'assets/homes/laurel-hollow/build4.jpg', alt: 'The finished kitchen, ready for the family' },
      ],
      result: 'Planned 9 months · Actual 9 months · 6 change orders, most for what we found in the walls',
    },
    review: {
      quote: '“We loved this house before we could really live in it. Now it works for all five of us, and it still feels like 1924.”',
      name: 'Sarah & Tom Ellison',
      detail: 'Moved back in 2024',
      image: { src: 'assets/homes/laurel-hollow/review.jpg', alt: 'The Ellisons’ kitchen table by the bare brick wall' },
      answers: [['Best part', 'The kitchen, every evening.'], ['Surprised by', 'How much of the old house they saved.'], ['Would we again?', 'We’re already planning the barn.']],
    },
    closing: { title: 'Have an old house with a future?', button: 'Begin the conversation' },
  },

  'fernbrook-house': {
    drawing: {
      eyebrow: 'Drawing → doorstep',
      title: 'Long, low and close to the water.',
      rendering: 'Rendering · 2021',
      built: 'Built · 2023',
      hint: 'Drag to compare the rendering with the finished home.',
      photo: 'assets/homes/fernbrook-house/hero.jpg',
      drawing: 'assets/homes/fernbrook-house/rendering.jpg',
      width: 1600,
      height: 899,
      alt: 'Fernbrook House as built: a long timber house beside a creek',
    },
    rooms: [
      { title: 'The kitchen', text: 'A twelve-foot table, two ovens and a window seat for whoever isn’t cooking.', image: { src: 'assets/homes/fernbrook-house/room1.jpg', alt: 'A large kitchen with a twelve-foot timber table and a window seat' } },
      { title: 'Grandparents’ wing', text: 'A step-free suite at the quiet end, with its own porch onto the creek.', image: { src: 'assets/homes/fernbrook-house/room2.jpg', alt: 'A calm bedroom suite with a door to a porch over the creek' } },
      { title: 'The long hall', text: 'A Douglas fir gallery that links every room and doubles as a rainy-day play space.', image: { src: 'assets/homes/fernbrook-house/room3.jpg', alt: 'A long Douglas fir gallery lit by a row of windows' } },
      { title: 'The creek terrace', text: 'Stone steps down to the water, and a fire pit built from stone found on site.', image: { src: 'assets/homes/fernbrook-house/room4.jpg', alt: 'A stone terrace and fire pit stepping down to a creek' } },
    ],
    challenges: {
      eyebrow: 'The challenges',
      title: 'What made this one hard.',
      items: [
        { problem: 'A site on the edge of the creek’s flood plain.', solution: 'The house sits on a raised plinth two feet above the 100-year flood line, and the garden is left free to flood.' },
        { problem: 'Three generations, three sets of needs.', solution: 'We held design sessions with each generation and planned a quiet room for everyone around one shared kitchen.' },
      ],
      photos: [
        { src: 'assets/homes/fernbrook-house/challenge1.jpg', alt: 'Surveyors marking flood levels along the creek bank', caption: 'Flood survey, pre-construction' },
        { src: 'assets/homes/fernbrook-house/challenge2.jpg', alt: 'The Douglas fir frame standing on its raised plinth', caption: 'Timber frame, month 6' },
      ],
    },
    build: {
      eyebrow: 'The build · 15 months',
      phases: [['Fit', 0.5], ['Pre-construction', 3], ['Build', 10.5], ['Keys', 1]],
      photos: [
        { caption: 'Month 2', src: 'assets/homes/fernbrook-house/build1.jpg', alt: 'The creekside site before ground was broken' },
        { caption: 'Month 6', src: 'assets/homes/fernbrook-house/build2.jpg', alt: 'The timber frame raised on its plinth' },
        { caption: 'Month 10', src: 'assets/homes/fernbrook-house/build3.jpg', alt: 'Zinc roofing going on the long roof' },
        { caption: 'Month 15', src: 'assets/homes/fernbrook-house/hero.jpg', alt: 'The finished house beside the creek' },
      ],
      result: 'Planned 15 months · Actual 15 months · 5 change orders, each approved within 2 working days',
    },
    review: {
      quote: '“Sunday lunch used to mean driving to three houses. Now everyone just comes home.”',
      name: 'The Moreno family',
      detail: 'Moved in 2023',
      image: { src: 'assets/homes/fernbrook-house/review.jpg', alt: 'The long kitchen table laid for a family lunch' },
      answers: [['Best part', 'The table. Always the table.'], ['Surprised by', 'The weekly reports. We read every one.'], ['Would we again?', 'In a heartbeat.']],
    },
    closing: { title: 'Building for the whole family?', button: 'Begin the conversation' },
  },

  'bent-creek-studio': {
    drawing: {
      eyebrow: 'Before → after',
      title: 'Same walls, new light.',
      rendering: 'Before · 2022',
      built: 'After · 2023',
      hint: 'Drag to compare the workshop before and after.',
      photo: 'assets/homes/bent-creek-studio/hero.jpg',
      drawing: 'assets/homes/bent-creek-studio/before.jpg',
      width: 1600,
      height: 899,
      alt: 'Bent Creek Studio after the renovation: the old workshop as a studio under a long roof light',
    },
    rooms: [
      { title: 'The studio', text: 'One high room under a north light, steady enough for painting all day.', image: { src: 'assets/homes/bent-creek-studio/room1.jpg', alt: 'A tall studio under a long north-facing roof light' } },
      { title: 'The workbench wall', text: 'Ash shelving and a long bench, built along the old concrete wall.', image: { src: 'assets/homes/bent-creek-studio/room2.jpg', alt: 'Ash shelving and a workbench against a board-formed concrete wall' } },
      { title: 'Guest room', text: 'A small bedroom and shower room behind a sliding ash screen.', image: { src: 'assets/homes/bent-creek-studio/room3.jpg', alt: 'A small guest bedroom behind a sliding ash screen' } },
      { title: 'The yard', text: 'The old loading yard, now a gravel garden with a bench in the sun.', image: { src: 'assets/homes/bent-creek-studio/room4.jpg', alt: 'A gravel garden with a bench outside the studio' } },
    ],
    challenges: {
      eyebrow: 'The challenges',
      title: 'What made this one hard.',
      items: [
        { problem: 'A concrete roof too weak for a new opening.', solution: 'A steel ring beam spreads the load, so the roof light could run almost the length of the room.' },
        { problem: 'A cold, damp shell with no insulation.', solution: 'We insulated on the inside, behind the shelving, so the board-formed walls could stay bare.' },
      ],
      photos: [
        { src: 'assets/homes/bent-creek-studio/before.jpg', alt: 'The disused workshop as found, dim and empty', caption: 'The workshop as found' },
        { src: 'assets/homes/bent-creek-studio/challenge2.jpg', alt: 'The roof light frame being craned into place', caption: 'Roof light going in, month 4' },
      ],
    },
    build: {
      eyebrow: 'The renovation · 7 months',
      phases: [['Fit', 0.5], ['Pre-construction', 1.5], ['Build', 4.5], ['Keys', 0.5]],
      photos: [
        { caption: 'Month 1', src: 'assets/homes/bent-creek-studio/build1.jpg', alt: 'The workshop cleared out' },
        { caption: 'Month 3', src: 'assets/homes/bent-creek-studio/build2.jpg', alt: 'The steel ring beam in place' },
        { caption: 'Month 5', src: 'assets/homes/bent-creek-studio/build3.jpg', alt: 'Ash shelving being fitted' },
        { caption: 'Month 7', src: 'assets/homes/bent-creek-studio/hero.jpg', alt: 'The finished studio in afternoon light' },
      ],
      result: 'Planned 7 months · Actual 7 months · 2 change orders, each approved within 2 working days',
    },
    review: {
      quote: '“I can work here from first light to last without switching a lamp on.”',
      name: 'Maya Lindqvist',
      detail: 'Painter · moved in 2023',
      image: { src: 'assets/homes/bent-creek-studio/review.jpg', alt: 'Maya’s easel under the north light' },
      answers: [['Best part', 'The north light.'], ['Surprised by', 'How much of the old workshop stayed.'], ['Would I again?', 'Yes. The house is next.']],
    },
    closing: { title: 'Have a building waiting for a new life?', button: 'Begin the conversation' },
  },

  'high-meadow': {
    drawing: {
      eyebrow: 'Site → drawing',
      title: 'Drawn around one long view.',
      rendering: 'The design · 2026',
      built: 'The site · 2025',
      hint: 'Drag to compare the design with the site today.',
      photo: 'assets/homes/high-meadow/site.jpg',
      drawing: 'assets/homes/high-meadow/rendering.jpg',
      width: 1600,
      height: 899,
      alt: 'The High Meadow site: a hillside meadow with a long view south to the Blue Ridge',
    },
    rooms: [
      { title: 'The arrival', text: 'A walled courtyard that keeps the view hidden until you step inside.', image: { src: 'assets/homes/high-meadow/room1.jpg', alt: 'Rendering: a stone-walled entrance courtyard' } },
      { title: 'Living room', text: 'One long window, framing the ridge line to the south.', image: { src: 'assets/homes/high-meadow/room2.jpg', alt: 'Rendering: a living room with one long window onto distant ridges' } },
      { title: 'Kitchen', text: 'Set to catch the morning sun, with a door straight onto the herb garden.', image: { src: 'assets/homes/high-meadow/room3.jpg', alt: 'Rendering: a kitchen in morning sun with a door to a herb garden' } },
      { title: 'The terrace', text: 'A stone terrace that stops where the meadow begins.', image: { src: 'assets/homes/high-meadow/room4.jpg', alt: 'Rendering: a stone terrace at the edge of a meadow' } },
    ],
    challenges: {
      eyebrow: 'The challenges',
      title: 'What we’re solving now.',
      items: [
        { problem: 'A view to the south, and the summer sun that comes with it.', solution: 'Deep roof overhangs, set from a sun study, shade the glass in summer and let the winter sun in.' },
        { problem: 'A long, steep drive for construction traffic.', solution: 'A delivery plan agreed with the neighbours keeps loads small and off the lane at school times.' },
      ],
      photos: [
        { src: 'assets/homes/high-meadow/challenge1.jpg', alt: 'A sun-path study drawn over the site plan', caption: 'Sun study, pre-construction' },
        { src: 'assets/homes/high-meadow/challenge2.jpg', alt: 'The project lead and the owners walking the meadow', caption: 'Site walk with the owners' },
      ],
    },
    build: {
      eyebrow: 'The plan · 14 months',
      now: 1,
      phases: [['Fit', 0.5], ['Pre-construction', 3], ['Build', 10], ['Keys', 0.5]],
      photos: [
        { caption: 'The site', src: 'assets/homes/high-meadow/site.jpg', alt: 'The meadow in spring, before any work' },
        { caption: 'Survey day', src: 'assets/homes/high-meadow/build2.jpg', alt: 'Surveyors setting out the house on the slope' },
        { caption: 'Model review', src: 'assets/homes/high-meadow/build3.jpg', alt: 'A card model of the house on the drawing table' },
        { caption: 'Samples', src: 'assets/homes/high-meadow/build4.jpg', alt: 'Stone, cedar and steel samples chosen for the house' },
      ],
      result: 'Pre-construction under way · Build planned for 10 months · Price fixed once the drawings are complete',
    },
    review: {
      quote: '“We came with a view and a list of wishes. Every drawing since has made both clearer.”',
      name: 'Claire & Ben Hartley',
      detail: 'Building from 2026',
      image: { src: 'assets/homes/high-meadow/review.jpg', alt: 'The Hartleys looking out over the meadow' },
      answers: [['Best part so far', 'The sun study.'], ['Surprised by', 'A fixed fee, credited back.'], ['Next step', 'Signing the contract.']],
    },
    closing: { title: 'Have land and a view in mind?', button: 'Begin the conversation' },
  },
};
