import { SectionHeading } from '../components/SectionHeading';
import { why } from '../content/homepage';

export function WhyMorrow() {
  return (
    <section className="section section--stone why" aria-labelledby="why-title">
      <div className="wrap">
        <SectionHeading id="why-title" eyebrow={why.eyebrow} title={why.title} />
        <ul className="why__list">
          {why.points.map((p, i) => (
            <li key={p.title} className="why__item">
              <span className="why__num micro">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="why__title">{p.title}</h3>
              <p className="body">{p.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
