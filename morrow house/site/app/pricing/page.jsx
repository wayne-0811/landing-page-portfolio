import { PageFrame } from '../../components/PageFrame';
import { PageIntro } from '../../components/PageIntro';
import { ClosingCta } from '../../components/ClosingCta';
import { Accordion } from '../../components/Accordion';
import { Eyebrow } from '../../components/Eyebrow';
import { pricingPage as p } from '../../content/pages';

export const metadata = {
  title: 'Pricing — Morrow House',
  description: 'How a Morrow House build is paid for: the payment timeline, open-book cost-plus or fixed price, change orders, allowances and the questions people ask. A concept site.',
};

const pad = (n) => String(n).padStart(2, '0');

export default function PricingPage() {
  const t = p.timeline;
  const a = p.allowances;
  return (
    <PageFrame current="pricing.html">
      <PageIntro eyebrow={p.eyebrow} title={p.title} body={p.body} />

      <section className="section ptimeline" aria-labelledby="ptimeline-title">
        <div className="wrap">
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <h2 className="sr-only" id="ptimeline-title">{t.eyebrow}</h2>
          <div className="paybar paybar--large" aria-hidden="true">
            {t.stages.map((s, i) => <span key={s.title} className={`paybar__seg seg-${i + 1}`} style={{ flexGrow: s.share }} />)}
          </div>
          <p className="micro ptimeline__note">{t.note}</p>
          <ol className="ptimeline__rows">
            {t.stages.map((s, i) => (
              <li key={s.title}>
                <span className={`paylegend__sw seg-${i + 1}`} aria-hidden="true" />
                <span className="micro ptimeline__num">{pad(i + 1)}</span>
                <span className="ptimeline__stage">{s.title}</span>
                <span className="ptimeline__cost">{s.cost}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section pcards" aria-label="Contracts, changes and allowances">
        <div className="wrap pcards__grid">
          {p.contracts.map((c) => (
            <article key={c.title} className="pcard">
              <h2 className="pcard__title">{c.title}</h2>
              <p className="body">{c.text}</p>
              <p className="pcard__best">{c.best}</p>
            </article>
          ))}
          <article className="pcard">
            <h2 className="pcard__title">{p.changeOrders.title}</h2>
            <ol className="pcard__steps">
              {p.changeOrders.steps.map((s, i) => (
                <li key={s}><span className="micro">{pad(i + 1)}</span>{s}</li>
              ))}
            </ol>
          </article>
          <article className="pcard">
            <h2 className="pcard__title">{a.title}</h2>
            <p className="body">{a.text}</p>
            <div className="allow">
              <div className="allow__bar" role="img" aria-label={`${a.example.label}: ${a.example.used}% used, ${100 - a.example.used}% remaining`}>
                <span className="allow__used" style={{ width: `${a.example.used}%` }} />
              </div>
              <div className="allow__legend micro">
                <span>{a.example.label}</span>
                <span>{a.example.usedLabel} {a.example.used}% · {a.example.remainingLabel} {100 - a.example.used}%</span>
              </div>
            </div>
          </article>
        </div>
        <div className="wrap preport" id="cost-report">
          <a className="alink alink--rule alink--down" href="#cost-report" aria-describedby="report-note">
            <span>{p.report.link}</span>
            <span className="alink__icon" aria-hidden="true">↓</span>
          </a>
          <p className="micro" id="report-note">{p.report.note}</p>
        </div>
      </section>

      <Accordion id="pricing-faq" eyebrow={p.faq.eyebrow} title={p.faq.title} items={p.faq.items} className="section--stone" />
      <ClosingCta button={p.closing.button} />
    </PageFrame>
  );
}
