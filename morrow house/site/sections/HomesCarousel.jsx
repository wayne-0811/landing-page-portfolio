'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { ArrowLink } from '../components/ArrowLink';
import { Icon } from '../components/Icon';
import { selectedHomes } from '../content/homepage';
import { homes } from '../content/homes';

// Native horizontal scroll with snap. Cards are ~31% of the track so the 4th
// peeks past the edge. The progress thumb's width is the visible fraction and
// it follows scrollLeft.
export function HomesCarousel() {
  const track = useRef(null);
  const [bar, setBar] = useState({ width: 50, left: 0 });
  const [edge, setEdge] = useState({ start: true, end: false });

  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const width = Math.min(100, (el.clientWidth / el.scrollWidth) * 100);
    const left = max > 0 ? (el.scrollLeft / max) * (100 - width) : 0;
    setBar({ width, left });
    setEdge({ start: el.scrollLeft <= 2, end: el.scrollLeft >= max - 2 });
  }, []);

  useEffect(() => {
    measure();
    const el = track.current;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [measure]);

  const step = (dir) => {
    const el = track.current;
    const card = el.querySelector('.home-card');
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    el.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: 'smooth' });
  };

  return (
    <section className="section homes" id="homes" aria-labelledby="homes-title">
      <div className="wrap">
        <SectionHeading
          id="homes-title"
          eyebrow={selectedHomes.eyebrow}
          title={selectedHomes.title}
          aside={
            <div className="homes__controls">
              <button className="icon-btn" type="button" onClick={() => step(-1)} disabled={edge.start} aria-label="Previous homes">
                <Icon name="prev" size={18} />
              </button>
              <button className="icon-btn" type="button" onClick={() => step(1)} disabled={edge.end} aria-label="Next homes">
                <Icon name="next" size={18} />
              </button>
              <ArrowLink href="#homes" icon="right">{selectedHomes.link}</ArrowLink>
            </div>
          }
        />
      </div>
      <div className="wrap homes__viewport">
        <ul className="homes__track" ref={track} onScroll={measure} tabIndex={0} aria-label="Homes">
          {homes.map((h) => (
            <li key={h.id} className="home-card">
              <a className="home-card__link" href="#homes">
                <span className="home-card__media">
                  <img
                    src={h.image.src}
                    alt={h.image.alt}
                    style={{ objectPosition: h.image.position }}
                    loading="lazy"
                    width="600"
                    height="800"
                  />
                </span>
                <span className="home-card__name">
                  {h.name}
                  <Icon name="up-right" size={14} className="home-card__arrow" />
                </span>
                <span className="home-card__meta micro">{h.place} · {h.year} · {h.type}</span>
                <span className="home-card__tagline">{h.tagline}</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="homes__progress" aria-hidden="true">
          <span style={{ width: `${bar.width}%`, left: `${bar.left}%` }} />
        </div>
      </div>
    </section>
  );
}
