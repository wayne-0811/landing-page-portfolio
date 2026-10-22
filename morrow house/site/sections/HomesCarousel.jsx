import { SectionHeading } from '../components/SectionHeading';
import { ArrowLink } from '../components/ArrowLink';
import CarouselStacked from '@/components/ui/carousel-07';
import { selectedHomes } from '../content/homepage';
import { homes } from '../content/homes';

// Stacked, draggable cards (components/ui/carousel-07) fed with the homes.
const slides = homes.map((h) => ({
  image: h.image.src,
  title: h.name,
  description: `${h.tagline} · ${h.place}, ${h.year}`,
  badge: h.type,
}));

export function HomesCarousel() {
  return (
    <section className="section homes" id="homes" aria-labelledby="homes-title">
      <div className="wrap">
        <SectionHeading
          id="homes-title"
          eyebrow={selectedHomes.eyebrow}
          title={selectedHomes.title}
          aside={<ArrowLink href="#homes" icon="right">{selectedHomes.link}</ArrowLink>}
        />
      </div>
      <div className="wrap homes__viewport">
        <CarouselStacked slides={slides} />
      </div>
    </section>
  );
}
