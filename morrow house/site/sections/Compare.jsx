'use client';

import { useEffect, useRef, useState } from 'react';
import { Eyebrow } from '../components/Eyebrow';
import { ArrowLink } from '../components/ArrowLink';
import { AwardSeal } from '../components/AwardSeal';
import { compare } from '../content/homepage';

const clamp = (v) => Math.min(100, Math.max(0, v));

// How much of the drawing scrolling alone would show: 100 (all drawing) when
// the frame's centre enters at 85% of the viewport height, easing to 0 (all
// photo) by the time it reaches 25%.
function scrollPosition(el) {
  const box = el.getBoundingClientRect();
  const vh = window.innerHeight;
  const t = clamp(((0.85 * vh - (box.top + box.height / 2)) / (0.6 * vh)) * 100) / 100;
  return 100 - t * t * (3 - 2 * t) * 100;
}

// Rendering vs finished home in one frame; both images stay full-frame so they
// line up. The rendering is a line drawing traced from the photo in the same
// pixel space (scripts/draw-stillwater.mjs).
//
// Scrolling sweeps the handle from drawing to photo. Dragging or the keyboard
// moves it too, and scrolling then carries on from wherever it was left. With
// reduced motion it stays put until moved.
export function Compare() {
  const frame = useRef(null);
  const [value, setValue] = useState(50);
  const fromScroll = useRef(50);
  const offset = useRef(0);
  const dragging = useRef(false);

  useEffect(() => {
    const el = frame.current;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    let raf = 0;
    const update = () => {
      raf = 0;
      if (reduce.matches) return;
      const box = el.getBoundingClientRect();
      // Once the frame is fully off screen, the next visit replays the sweep.
      if (box.bottom < 0 || box.top > window.innerHeight) offset.current = 0;
      fromScroll.current = scrollPosition(el);
      setValue(clamp(fromScroll.current + offset.current));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onMotionChange = () => {
      offset.current = 0;
      fromScroll.current = 50;
      if (reduce.matches) setValue(50);
      else update();
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    reduce.addEventListener('change', onMotionChange);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      reduce.removeEventListener('change', onMotionChange);
    };
  }, []);

  const setManual = (v) => {
    const next = clamp(v);
    offset.current = next - fromScroll.current;
    setValue(next);
  };

  // Pointer drag on the whole frame (mouse and touch); the range input below
  // handles the keyboard and assistive tech.
  const moveTo = (e) => {
    const box = e.currentTarget.getBoundingClientRect();
    setManual(((e.clientX - box.left) / box.width) * 100);
  };
  const onPointerDown = (e) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    moveTo(e);
  };
  const onPointerMove = (e) => dragging.current && moveTo(e);
  const onPointerUp = () => { dragging.current = false; };
  const shown = Math.round(value);

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
          ref={frame}
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
            value={shown}
            onChange={(e) => setManual(Number(e.target.value))}
            aria-label="Compare the rendering with the finished home"
            aria-valuetext={`${shown}% rendering`}
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
