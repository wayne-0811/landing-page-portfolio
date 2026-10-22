import { PageFrame } from '../../components/PageFrame';
import { PageIntro } from '../../components/PageIntro';
import { ClosingCta } from '../../components/ClosingCta';
import { Timeline } from '../../sections/Timeline';
import { howWeWork } from '../../content/pages';

export const metadata = {
  title: 'How we work — Morrow House',
  description: 'Six stages from the first call to a year after you move in: what happens, what you decide, what it costs and how long it takes. A concept site.',
};

export default function HowWeWorkPage() {
  const g = howWeWork.guide;
  return (
    <PageFrame current="how-we-work.html">
      <PageIntro eyebrow={howWeWork.eyebrow} title={howWeWork.title} body={howWeWork.body} />
      <Timeline />
      <section className="section section--stone guide" aria-labelledby="guide-title">
        <div className="wrap guide__inner">
          <div className="guide__text">
            <h2 className="guide__title" id="guide-title">{g.title}</h2>
            <p className="body">{g.body}</p>
          </div>
          <div className="guide__action">
            <a className="btn btn--ghost" href="#guide-title" aria-describedby="guide-note">
              {g.button}<span className="btn__arrow" aria-hidden="true">↓</span>
            </a>
            <p className="micro" id="guide-note">{g.note}</p>
          </div>
        </div>
      </section>
      <ClosingCta button={howWeWork.closing.button} />
    </PageFrame>
  );
}
