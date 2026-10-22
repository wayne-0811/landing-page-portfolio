'use client';

import { useEffect, useRef, useState } from 'react';

const clamp = (v) => Math.min(100, Math.max(0, v));

// Strips used to locate the visible screen when the page itself can't scroll
// (shown at full height inside another page's frame, as some previews do).
const BANDS = 80;
const BAND_SPAN = 3000;

// How much of the drawing scrolling alone shows, from where the frame's centre
// sits on screen (f: 0 = top, 1 = bottom): all drawing at 85%, easing to all
// photo by 25%.
function sweep(f) {
  const t = Math.min(1, Math.max(0, (0.85 - f) / 0.6));
  return 100 - t * t * (3 - 2 * t) * 100;
}

// Rendering vs finished home in one frame; both images stay full-frame so they
// line up. Stillwater's rendering, the default, is a line drawing traced from
// the photo in the same pixel space (scripts/draw-stillwater.mjs). A home page
// passes its own pair: rendering or "before" on the left, photo on the right.
//
// Scrolling sweeps the handle from drawing to photo. Dragging or the keyboard
// moves it too, and scrolling then carries on from wherever it was left.
export function CompareSlider({
  rendering, built, hint,
  photo = 'assets/stillwater-hero.jpg', drawing = 'assets/stillwater-drawing.svg', width = 1584, height = 672,
  alt = 'Stillwater House as built: limestone, oak and glass beside a long reflecting pool',
}) {
  const frame = useRef(null);
  const bands = useRef(null);
  const [value, setValue] = useState(50);
  const fromScroll = useRef(50);
  const offset = useRef(0);
  const dragging = useRef(false);

  useEffect(() => {
    const el = frame.current;
    const column = bands.current;
    const visible = new Set();
    let raf = 0;

    const apply = (f, onScreen) => {
      // Once the frame is fully off screen, the next visit replays the sweep.
      if (!onScreen) offset.current = 0;
      fromScroll.current = sweep(f);
      setValue(clamp(fromScroll.current + offset.current));
    };

    // A window taller than the screen means the page is drawn at (near) full
    // height inside another page that does the scrolling.
    const tallFrame = () => window.innerHeight > (window.screen.height || 1600) + 100;

    // Normal case: read the frame's position in the window directly.
    const fromViewport = () => {
      const box = el.getBoundingClientRect();
      const vh = window.innerHeight;
      apply((box.top + box.height / 2) / vh, box.bottom > 0 && box.top < vh);
    };

    // Full-height case: intersection observers still report against what is
    // actually on screen, so the strips in view give the screen's top and bottom.
    const fromBands = () => {
      el.dataset.stepped = '';
      if (!visible.size) return apply(1, false);
      const band = BAND_SPAN / BANDS;
      const top = column.getBoundingClientRect().top;
      const lo = Math.min(...visible);
      const hi = Math.max(...visible);
      const guess = Math.min(window.screen.height || 800, 1200);
      let vTop = top + lo * band;
      let vBottom = top + (hi + 1) * band;
      if (lo === 0 && hi < BANDS - 1) vTop = vBottom - guess;
      if (hi === BANDS - 1 && lo > 0) vBottom = vTop + guess;
      const box = el.getBoundingClientRect();
      const centre = box.top + box.height / 2;
      apply((centre - vTop) / (vBottom - vTop), box.bottom > vTop && box.top < vBottom);
    };

    // Centre the strips on the frame.
    const place = () => {
      column.style.top = `${el.offsetTop + el.offsetHeight / 2 - BAND_SPAN / 2}px`;
    };

    const update = () => {
      raf = 0;
      place();
      if (tallFrame()) fromBands();
      else fromViewport();
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        const i = Number(e.target.dataset.i);
        if (e.isIntersecting) visible.add(i);
        else visible.delete(i);
      });
      if (tallFrame()) schedule();
    });
    [...column.children].forEach((b) => io.observe(b));

    place();
    update();
    // Capture catches scrolling on any element, not just the window.
    document.addEventListener('scroll', schedule, { passive: true, capture: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      document.removeEventListener('scroll', schedule, { capture: true });
      window.removeEventListener('resize', schedule);
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
    <div className="compare-slider">
      <div className="compare__bands" ref={bands} aria-hidden="true">
        {Array.from({ length: BANDS }, (_, i) => <span key={i} data-i={i} />)}
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
        <img className="compare__img" src={photo} alt={alt} width={width} height={height} loading="lazy" />
        <div className="compare__render" aria-hidden="true">
          <img className="compare__img" src={drawing} alt="" width={width} height={height} loading="lazy" />
        </div>
        <span className="compare__tag compare__tag--left micro">{rendering}</span>
        <span className="compare__tag compare__tag--right micro">{built}</span>
        <span className="compare__handle" aria-hidden="true"><span /></span>
        <input
          className="compare__range"
          type="range"
          min="0"
          max="100"
          value={shown}
          onChange={(e) => setManual(Number(e.target.value))}
          aria-label={`Compare ${rendering} with ${built}`}
          aria-valuetext={`${shown}% ${rendering}`}
        />
      </div>
      {hint && <p className="compare__hint micro">{hint}</p>}
    </div>
  );
}
