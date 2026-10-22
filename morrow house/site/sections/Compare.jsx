import { Eyebrow } from '../components/Eyebrow';
import { ArrowLink } from '../components/ArrowLink';
import { AwardSeal } from '../components/AwardSeal';
import { CompareSlider } from '../components/CompareSlider';
import { compare } from '../content/homepage';

// Drawing to doorstep: the Stillwater rendering against the finished house.
export function Compare() {
  return (
    <section className="section compare" aria-labelledby="compare-title">
      <div className="wrap">
        <div className="compare__head">
          <div className="shead__main">
            <Eyebrow>{compare.eyebrow}</Eyebrow>
            <h2 className="h2" id="compare-title">{compare.title}</h2>
          </div>
          <div className="award-tag">
            <AwardSeal year="2025" uid="compare" />
            <span className="micro">{compare.award}</span>
          </div>
        </div>

        <CompareSlider rendering={compare.rendering} built={compare.built} hint={compare.hint} />

        <div className="compare__meta">
          <p className="body-s">{compare.meta}</p>
          <ArrowLink href="stillwater-house.html" variant="rule">{compare.link}</ArrowLink>
        </div>
      </div>
    </section>
  );
}
