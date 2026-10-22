import { SectionHeading } from '../components/SectionHeading';
import { ArrowLink } from '../components/ArrowLink';
import { pricing } from '../content/homepage';

// Stacked bar of proportional spend, with a legend that names each stage.
export function Pricing() {
  return (
    <section className="section pricing" id="pricing" aria-labelledby="pricing-title">
      <div className="wrap pricing__grid">
        <div className="pricing__intro">
          <SectionHeading id="pricing-title" eyebrow={pricing.eyebrow} title={pricing.title} />
          <p className="body">{pricing.body}</p>
        </div>
        <div className="pricing__chart">
          <div className="paybar" aria-hidden="true">
            {pricing.bar.map((s, i) => (
              <span key={s.label} className={`paybar__seg seg-${i + 1}`} style={{ flexGrow: s.share }} />
            ))}
          </div>
          <ol className="paylegend">
            {pricing.bar.map((s, i) => (
              <li key={s.label}>
                <span className={`paylegend__sw seg-${i + 1}`} aria-hidden="true" />
                <span className="paylegend__label micro">{String(i + 1).padStart(2, '0')} {s.label}</span>
                <span className="paylegend__note body-s">{s.note}</span>
              </li>
            ))}
          </ol>
          <div className="pricing__links">
            {pricing.links.map((l) => (
              <ArrowLink key={l.label} href={l.href} icon={l.icon} variant="rule">{l.label}</ArrowLink>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
