'use client';

import { useRef, useState } from 'react';
import { howWeWork } from '../content/pages';

const { stages, labels } = howWeWork;
const pad = (n) => String(n).padStart(2, '0');

// Six stages on a line. Stages before the current one fill brass; choosing a
// stage swaps the panel and photo. The rail is a tab list, so arrow keys move
// between stages. On phones the rail runs down the page.
export function StageExplorer() {
  const [active, setActive] = useState(0);
  const tabs = useRef([]);
  const stage = stages[active];

  const onKeyDown = (e) => {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    if (e.key === 'Home' || e.key === 'End' || step) {
      e.preventDefault();
      const next = e.key === 'Home' ? 0 : e.key === 'End' ? stages.length - 1 : (active + step + stages.length) % stages.length;
      setActive(next);
      tabs.current[next]?.focus();
    }
  };

  return (
    <section className="section explorer" aria-label="The six stages">
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
              onClick={() => setActive(i)}
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
            <h2 className="explorer__title">{stage.title}</h2>
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
    </section>
  );
}
