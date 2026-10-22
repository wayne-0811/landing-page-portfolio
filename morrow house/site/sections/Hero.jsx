import { SiteHeader } from '../components/SiteHeader';
import { Eyebrow } from '../components/Eyebrow';
import { Button } from '../components/Button';
import { ArrowLink } from '../components/ArrowLink';
import { hero, nav } from '../content/homepage';

export function Hero() {
  const { image } = hero;
  return (
    <section className="hero" aria-labelledby="hero-title">
      <img
        className="hero__img"
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        fetchPriority="high"
      />
      <div className="hero__scrim" aria-hidden="true" />
      <SiteHeader links={nav.links} cta={nav.cta} />
      <div className="wrap hero__content">
        <Eyebrow tone="image">{hero.eyebrow}</Eyebrow>
        <h1 className="display" id="hero-title">
          {hero.title.map((l) => <span key={l} className="line">{l}</span>)}
        </h1>
        <div className="hero__foot">
          <p className="hero__body">{hero.body}</p>
          <div className="hero__actions">
            <Button href="#next-chapter" variant="inverse">Begin the conversation</Button>
            <ArrowLink href="#homes" icon="down" tone="dark">See the homes</ArrowLink>
          </div>
        </div>
      </div>
    </section>
  );
}
