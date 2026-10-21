'use client';

import { useRef, useState } from 'react';
import { Eyebrow } from '../components/Eyebrow';
import { ArrowLink } from '../components/ArrowLink';
import { AwardSeal } from '../components/AwardSeal';
import { compare } from '../content/homepage';

// Rendering vs finished home in one frame. The range input sets how much of the
// rendering layer is visible; both images stay full-frame so they line up.
// The rendering is a line drawing traced from the photo in the same pixel space
// (scripts/draw-stillwater.mjs), so the two layers line up.
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
          <img
            className="compare__img"
            src="assets/stillwater-hero.jpg"
            alt="Stillwater House as built: limestone, oak and glass beside a long reflecting pool"
            width="1584"
            height="672"
            loading="lazy"
          />
          <div className="compare__render" aria-hidden="true">
            <img className="compare__img" src="assets/stillwater-drawing.svg" alt="" width="1584" height="672" loading="lazy" />
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
