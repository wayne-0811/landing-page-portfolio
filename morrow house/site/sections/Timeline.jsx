'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { ArrowLink } from '../components/ArrowLink';
import { process } from '../content/homepage';

// Alternating vertical timeline. The centre line fills brass down to the
// current stage, which follows the row crossing the middle of the viewport.
// Nodes are buttons, so a stage can also be picked directly.
export function Timeline() {
  const list = useRef(null);
  const nodes = useRef([]);
  const [active, setActive] = useState(0);
  const [fill, setFill] = useState(0);

  const measure = useCallback(() => {
    const node = nodes.current[active];
    if (!node || !list.current) return;
    const top = list.current.getBoundingClientRect().top;
    const box = node.getBoundingClientRect();
    setFill(box.top - top + box.height / 2);
  }, [active]);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(list.current);
    return () => ro.disconnect();
  }, [measure]);

  useEffect(() => {
    const rows = [...list.current.querySelectorAll('.tl__row')];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number(e.target.dataset.i));
        });
      },
      { rootMargin: '-50% 0px -50% 0px' }
    );
    rows.forEach((r) => io.observe(r));
    return () => io.disconnect();
  }, []);

  return (
    <section className="section tl-section" id="process" aria-labelledby="process-title">
      <div className="wrap">
        <SectionHeading
          id="process-title"
          eyebrow={process.eyebrow}
          title={process.title}
          aside={<ArrowLink href="#process" icon="right">{process.link}</ArrowLink>}
        />
        <ol className="tl" ref={list} style={{ '--fill': `${fill}px` }}>
          <span className="tl__line" aria-hidden="true"><span className="tl__fill" /></span>
          {process.steps.map((s, i) => (
            <li key={s.title} className={['tl__row', i % 2 && 'tl__row--flip', i <= active && 'is-reached', i === active && 'is-current'].filter(Boolean).join(' ')} data-i={i}>
              <div className="tl__card">
                <p className="micro tl__time">{s.time}</p>
                <h3 className="tl__title">{s.title}</h3>
                <p className="body">{s.text}</p>
              </div>
              <button
                className="tl__node"
                type="button"
                ref={(el) => { nodes.current[i] = el; }}
                onClick={() => setActive(i)}
                aria-label={`Stage ${i + 1}: ${s.title}`}
                aria-current={i === active ? 'step' : undefined}
              >
                {i + 1}
              </button>
              <div className="tl__media">
                <img src={s.image.src} alt={s.image.alt} width={s.image.width} height={s.image.height} loading="lazy" />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
