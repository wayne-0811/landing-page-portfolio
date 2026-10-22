import { Icon } from './Icon';
import { homeHref } from '../content/homes';

// Gallery card: photo, name with arrow, place · year · type, serif tagline
// and one sentence. The whole card links to the home's page.
export function HomeCard({ home, ratio = '4 / 5', headingLevel: H = 'h2' }) {
  return (
    <article className="hcard">
      <a className="hcard__link" href={homeHref(home)}>
        <span className="hcard__media" style={{ aspectRatio: ratio }}>
          <img src={home.image.src} alt={home.image.alt} style={{ objectPosition: home.image.position }} loading="lazy" />
        </span>
        <H className="hcard__name">
          {home.name}
          <Icon name="up-right" size={16} className="hcard__arrow" />
        </H>
        <span className="hcard__meta micro">{home.place} · {home.year} · {home.type}</span>
        <span className="hcard__tagline">{home.tagline}</span>
        <span className="hcard__desc body">{home.description}</span>
      </a>
    </article>
  );
}
