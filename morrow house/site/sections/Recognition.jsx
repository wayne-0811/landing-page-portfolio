import { SectionHeading } from '../components/SectionHeading';
import { AwardSeal } from '../components/AwardSeal';
import { recognition } from '../content/homepage';

// Every mark sits next to the reason it is there; never a bare logo wall.
export function Recognition() {
  return (
    <section className="section section--stone recog" aria-labelledby="recog-title">
      <div className="wrap">
        <SectionHeading id="recog-title" eyebrow={recognition.eyebrow} title={recognition.title} />
        <ul className="recog__grid">
          {recognition.awards.map((a) => (
            <li key={a.title} className="recog__item">
              <AwardSeal year={a.year} uid={`recog-${a.year}`} />
              <div>
                <h3 className="recog__title">{a.title}</h3>
                <p className="micro recog__by">{a.by}</p>
                <p className="body-s">{a.text}</p>
              </div>
            </li>
          ))}
          {recognition.partners.map((p) => (
            <li key={p.name} className="recog__item">
              <span className="recog__mark" aria-hidden="true">{p.mark}</span>
              <figure className="recog__quote">
                <blockquote>{p.quote}</blockquote>
                <figcaption className="micro">{p.name} · {p.detail}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
