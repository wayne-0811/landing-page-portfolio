'use client';

import { useRef, useState } from 'react';
import { Eyebrow } from '../components/Eyebrow';
import { ArrowLink } from '../components/ArrowLink';
import { AwardSeal } from '../components/AwardSeal';
import { compare } from '../content/homepage';

// Rendering vs finished home in one frame. The range input sets how much of the
// rendering layer is visible; both images stay full-frame so they line up.
// Until a real rendering is supplied, the rendering is the same photograph run
// through an SVG line-drawing filter.
export function Compare() {
  const [value, setValue] = useState(50);
  const dragging = useRef(false);

  // Pointer drag on the whole frame (mouse and touch); the range input below
  // handles the keyboard and assistive tech.
  const moveTo = (e) => {
    const box = e.currentTarget.getBoundingClientRect();
    const pct = ((e.clientX - box.left) / box.width) * 100;
    setValue(Math.round(Math.min(100, Math.max(0, pct))));
  };
  const onPointerDown = (e) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    moveTo(e);
  };
  const onPointerMove = (e) => dragging.current && moveTo(e);
  const onPointerUp = () => { dragging.current = false; };
  return (
    <section className="section compare" aria-labelledby="compare-title">
      <div className="wrap">
        <div className="compare__head">
          <div className="shead__main">
            <Eyebrow>{compare.eyebrow}</Eyebrow>
            <h2 className="h2" id="compare-title">{compare.title}</h2>
          </div>
          <div className="award-tag">
            <AwardSeal year="2025" uid="compare" />
            <span className="micro">{compare.award}</span>
          </div>
        </div>

        <div
          className="compare__frame"
          style={{ '--pos': `${value}%` }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <svg className="sr-only" aria-hidden="true" focusable="false">
            <filter id="pencil" colorInterpolationFilters="sRGB">
              <feColorMatrix type="saturate" values="0" />
              <feGaussianBlur stdDeviation="1.3" />
              <feConvolveMatrix order="3" kernelMatrix="-1 -1 -1 -1 8 -1 -1 -1 -1" preserveAlpha="true" />
              <feComponentTransfer>
                <feFuncR type="linear" slope="-2.6" intercept="1" />
                <feFuncG type="linear" slope="-2.6" intercept="1" />
                <feFuncB type="linear" slope="-2.6" intercept="1" />
              </feComponentTransfer>
              <feColorMatrix type="matrix" values="0.94 0 0 0 0.04  0 0.93 0 0 0.04  0 0 0.88 0 0.05  0 0 0 1 0" />
            </filter>
          </svg>
          <img
            className="compare__img"
            src="assets/stillwater-hero.jpg"
            alt="Stillwater House as built: limestone, oak and glass beside a long reflecting pool"
            width="1584"
            height="672"
            loading="lazy"
          />
          <div className="compare__render" aria-hidden="true">
            <img className="compare__img compare__img--drawn" src="assets/stillwater-hero.jpg" alt="" width="1584" height="672" loading="lazy" />
          </div>
          <span className="compare__tag compare__tag--left micro">{compare.rendering}</span>
          <span className="compare__tag compare__tag--right micro">{compare.built}</span>
          <span className="compare__handle" aria-hidden="true"><span /></span>
          <input
            className="compare__range"
            type="range"
            min="0"
            max="100"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            aria-label="Compare the rendering with the finished home"
            aria-valuetext={`${value}% rendering`}
          />
        </div>
        <p className="compare__hint micro">{compare.hint}</p>

        <div className="compare__meta">
          <p className="body-s">{compare.meta}</p>
          <ArrowLink href="#homes" variant="rule">{compare.link}</ArrowLink>
        </div>
      </div>
    </section>
  );
}
