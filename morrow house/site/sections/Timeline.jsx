'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { ArrowLink } from '../components/ArrowLink';
import { process } from '../content/homepage';

const { steps, calendar, labels } = process;
const PER_ROW = 12;
const pad = (n) => String(n).padStart(2, '0');

// Where each month's square is split between phases: [{ k, start, len }].
function monthSegments(m) {
  const segs = [];
  steps.forEach((s, k) => {
    const start = Math.max(m, s.months[0]);
    const end = Math.min(m + 1, s.months[1]);
    if (end > start) segs.push({ k, start, len: end - start });
  });
  const used = segs.reduce((n, s) => n + s.len, 0);
  if (used < 1) segs.push({ k: -1, start: m + used, len: 1 - used });
  return segs;
}

// How we build, as a project calendar. The panel holds still while the page
// scrolls through a runway; scrolling fills the months phase by phase (each
// phase gets an equal share of the scroll, however long it runs), and the
// card beside it shows what to expect in the current phase. The phase
// buttons jump straight to a phase.
export function Timeline() {
  const runway = useRef(null);
  const sticky = useRef(null);
  const grid = useRef(null);
  const [active, setActive] = useState(0);
  const months = useMemo(() => Array.from({ length: calendar.months }, (_, m) => monthSegments(m)), []);
  const rows = useMemo(() => {
    const out = [];
    for (let i = 0; i < months.length; i += PER_ROW) out.push(months.slice(i, i + PER_ROW).map((segs, j) => ({ m: i + j, segs })));
    return out;
  }, [months]);

  useEffect(() => {
    const el = runway.current;
    const cells = [...grid.current.querySelectorAll('.cal__month')];
    let raf = 0;
    let lastCell = -1;
    const update = () => {
      raf = 0;
      if (getComputedStyle(sticky.current).position !== 'sticky') return;
      const box = el.getBoundingClientRect();
      const travel = box.height - window.innerHeight;
      const p = Math.min(1, Math.max(0, -box.top / (travel || 1)));
      const k = Math.min(steps.length - 1, Math.floor(p * steps.length));
      const t = Math.min(1, p * steps.length - k);
      const [s, e] = steps[k].months;
      const cursor = s + t * (e - s);
      grid.current.style.setProperty('--cursor', cursor.toFixed(3));
      const cell = Math.min(calendar.months - 1, Math.floor(cursor - 1e-6 < 0 ? 0 : cursor - 1e-6));
      if (cell !== lastCell) {
        if (lastCell >= 0) cells[lastCell].classList.remove('is-now');
        cells[cell].classList.add('is-now');
        lastCell = cell;
      }
      setActive(k);
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);

  // Scroll to a little way into phase k (or just show it if the panel isn't pinned).
  const jump = useCallback((k) => {
    setActive(k);
    const el = runway.current;
    if (getComputedStyle(sticky.current).position !== 'sticky') return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const travel = el.offsetHeight - window.innerHeight;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: top + ((k + 0.35) / steps.length) * travel, behavior: reduce ? 'auto' : 'smooth' });
  }, []);

  const step = steps[active];

  return (
    <section className="section tl-section" id="process" aria-labelledby="process-title">
      <div className="wrap">
        <SectionHeading
          id="process-title"
          eyebrow={process.eyebrow}
          title={process.title}
          aside={<ArrowLink href="#process" icon="right">{process.link}</ArrowLink>}
        />
      </div>

      <div className="cal-runway" ref={runway} style={{ '--phases': steps.length }}>
        <div className="cal-sticky" ref={sticky}>
          <div className="wrap cal-layout">
            <div className="cal">
              <div className="cal__phases" role="group" aria-label="Phases">
                {steps.map((s, k) => (
                  <button
                    key={s.title}
                    type="button"
                    className={`cal__phase ph-${k + 1}`}
                    aria-current={k === active ? 'step' : undefined}
                    onClick={() => jump(k)}
                  >
                    <span className="cal__swatch" aria-hidden="true" />
                    <span className="cal__phase-name">{s.title}</span>
                    <span className="micro">{s.time}</span>
                  </button>
                ))}
              </div>

              <p className="cal__label micro">{calendar.label}</p>
              <div className="cal__grid" ref={grid} aria-hidden="true" style={{ '--cursor': 0 }}>
                <span className="cal__corner" />
                {Array.from({ length: PER_ROW }, (_, i) => (
                  <span key={i} className="cal__col micro">{pad(i + 1)}</span>
                ))}
                {rows.map((row, r) => (
                  <div key={r} className="cal__row">
                    <span className="cal__year micro">Year {r + 1}</span>
                    {row.map(({ m, segs }) => (
                      <span key={m} className="cal__month">
                        {segs.map((g, i) => (
                          <span
                            key={i}
                            className={g.k < 0 ? 'cal__seg cal__seg--none' : `cal__seg ph-${g.k + 1}`}
                            style={{ flexGrow: g.len, '--s': g.start, '--l': g.len }}
                          >
                            {g.k >= 0 && <span className="cal__fill" />}
                          </span>
                        ))}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
              <p className="cal__note micro">{calendar.note}</p>
            </div>

            <article className="cal-card" key={active} aria-live="polite" aria-atomic="true">
              <div className="cal-card__media">
                <img src={step.image.src} alt={step.image.alt} width={step.image.width} height={step.image.height} loading="lazy" />
              </div>
              <div className="cal-card__body">
                <p className="micro cal-card__kicker">Phase {pad(active + 1)} · {step.time}</p>
                <h3 className="cal-card__title">{step.title}</h3>
                <p className="body">{step.text}</p>
                <dl className="cal-card__facts">
                  {Object.entries(labels).map(([key, label]) => (
                    <div key={key}>
                      <dt className="micro">{label}</dt>
                      <dd>{step.expect[key]}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
