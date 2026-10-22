'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { ArrowLink } from '../components/ArrowLink';
import { howWeWork } from '../content/pages';

const { stages, labels } = howWeWork;
const pad = (n) => String(n).padStart(2, '0');

// Six stages on a line. Stages before the current one fill brass; choosing a
// stage swaps the panel and photo. The rail is a tab list, so arrow keys move
// between stages. On wide screens the rail and panel hold still while the page
// scrolls through a runway, and the stages advance with the scroll; choosing a
// stage scrolls to it. On phones the rail runs down the page and stages change
// on tap. Shown on the homepage under its heading ({ id, eyebrow, title, link,
// href }); the How we work page shows the same stages on a calendar.
export function StageExplorer({ heading }) {
  const [active, setActive] = useState(0);
  const tabs = useRef([]);
  const runway = useRef(null);
  const sticky = useRef(null);
  const stage = stages[active];

  // Pinned only where the CSS makes it sticky (wide, tall enough screens).
  const pinned = () => sticky.current && getComputedStyle(sticky.current).position === 'sticky';

  useEffect(() => {
    const el = runway.current;
    let raf = 0;
    const update = () => {
      raf = 0;
      if (!pinned()) return;
      const box = el.getBoundingClientRect();
      const travel = box.height - window.innerHeight;
      const p = Math.min(1, Math.max(0, -box.top / (travel || 1)));
      const k = Math.min(stages.length - 1, Math.floor(p * stages.length));
      setActive((prev) => (prev === k ? prev : k));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Pinned: scroll to the middle of the stage's stretch of runway. Otherwise
  // just switch.
  const choose = useCallback((k) => {
    setActive(k);
    if (!pinned()) return;
    const el = runway.current;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const travel = el.offsetHeight - window.innerHeight;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: top + ((k + 0.5) / stages.length) * travel, behavior: reduce ? 'auto' : 'smooth' });
  }, []);

  const onKeyDown = (e) => {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    if (e.key === 'Home' || e.key === 'End' || step) {
      e.preventDefault();
      const next = e.key === 'Home' ? 0 : e.key === 'End' ? stages.length - 1 : Math.min(stages.length - 1, Math.max(0, active + step));
      choose(next);
      tabs.current[next]?.focus({ preventScroll: true });
    }
  };

  return (
    <section className="section explorer" id={heading.id} aria-labelledby={`${heading.id}-title`}>
      <div className="wrap">
        <SectionHeading
          id={`${heading.id}-title`}
          eyebrow={heading.eyebrow}
          title={heading.title}
          aside={<ArrowLink href={heading.href} icon="right">{heading.link}</ArrowLink>}
        />
      </div>
      <div className="explorer-runway" ref={runway} style={{ '--stages': stages.length }}>
        <div className="explorer-sticky" ref={sticky}>
          <div className="wrap">
            <div className="explorer__rail" role="tablist" aria-label="Stages" onKeyDown={onKeyDown} style={{ '--progress': active / (stages.length - 1) }}>
              <span className="explorer__line" aria-hidden="true"><span className="explorer__fill" /></span>
              {stages.map((s, i) => (
                <button
                  key={s.title}
                  ref={(el) => { tabs.current[i] = el; }}
                  type="button"
                  role="tab"
                  id={`stage-tab-${i}`}
                  aria-selected={i === active}
                  aria-controls="stage-panel"
                  tabIndex={i === active ? 0 : -1}
                  className={['explorer__stage', i < active && 'is-done', i === active && 'is-current'].filter(Boolean).join(' ')}
                  onClick={() => choose(i)}
                >
                  <span className="explorer__node" aria-hidden="true">{pad(i + 1)}</span>
                  <span className="explorer__name">{s.title}</span>
                </button>
              ))}
            </div>

            <div className="explorer__panel" id="stage-panel" role="tabpanel" aria-labelledby={`stage-tab-${active}`} key={active}>
              <div className="explorer__media">
                <img src={stage.image.src} alt={stage.image.alt} style={{ objectPosition: stage.image.position }} />
              </div>
              <div className="explorer__facts">
                <p className="micro explorer__kicker">Stage {pad(active + 1)} of {pad(stages.length)}</p>
                <h3 className="explorer__title">{stage.title}</h3>
                <dl className="explorer__grid">
                  {Object.entries(labels).map(([key, label]) => (
                    <div key={key}>
                      <dt className="micro">{label}</dt>
                      <dd>{stage[key]}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
