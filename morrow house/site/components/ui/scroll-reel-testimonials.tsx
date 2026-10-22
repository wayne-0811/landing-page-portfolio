"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";

// Scroll Reel Testimonials (after smammar's component on 21st.dev), in the
// Morrow House style. A three-column reel of square tiles sits beside the
// quote: the middle column carries one photograph per testimonial and
// scrolls one way while the outer columns slide the other; the quote rises
// in letter by letter. Square corners, stone and hairlines, no shadows,
// blur or colour overlays. Keyframes live in app/globals.css.
// Text blocks are divs, not <p>: styles/site.css resets paragraph margins
// outside any layer, which would beat Tailwind's margin utilities.

export interface Testimonial {
  quote: string;
  author: string;
  image: string;
  alt?: string;
  /** Small line after the author, e.g. "3 months ago". */
  detail?: string;
  /** Star rating out of 5; omit to hide the stars. */
  rating?: number;
}

const CELL = 112; // tile size in px
const GAP = 8;
const STEP = 3 * (CELL + GAP); // one testimonial = three tiles down the reel
const SWAP_MS = 240; // old quote leaves, then the new one rises
const MOVE_MS = 800; // reel travel; also the lock between steps

function Tile() {
  return (
    <div
      aria-hidden="true"
      className="shrink-0 border border-mh-rule bg-mh-linen/50"
      style={{ width: CELL, height: CELL }}
    />
  );
}

function Photo({ src }: { src: string }) {
  return (
    <div
      className="relative shrink-0 overflow-hidden bg-mh-stone"
      style={{ width: CELL, height: CELL }}
    >
      <img
        src={src}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}

function Chars({
  text,
  startIndex,
  staggerMs,
}: {
  text: string;
  startIndex: number;
  staggerMs: number;
}) {
  let i = startIndex;
  const words = text.split(" ");
  return (
    <>
      {words.map((word, w) => {
        const el = (
          <span className="inline-block whitespace-nowrap">
            {Array.from(word).map((ch, c) => {
              const delay = i * staggerMs;
              i++;
              return (
                <span
                  key={c}
                  className="scroll-reel-char"
                  style={{ animationDelay: `${delay}ms` }}
                >
                  {ch}
                </span>
              );
            })}
          </span>
        );
        if (w < words.length - 1) i++;
        return (
          <React.Fragment key={w}>
            {el}
            {w < words.length - 1 ? " " : null}
          </React.Fragment>
        );
      })}
    </>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex gap-0.5 text-mh-brass" role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={12}
          strokeWidth={0}
          fill="currentColor"
          aria-hidden="true"
          className={i < Math.round(rating) ? "" : "opacity-25"}
        />
      ))}
    </span>
  );
}

const pad = (n: number) => String(n).padStart(2, "0");

const quoteClass =
  "font-serif text-[24px] leading-[1.22] text-mh-forest sm:text-[28px]";
const authorClass =
  "text-[11px] font-medium leading-[1.3] tracking-[0.1em] uppercase text-mh-forest";

interface ScrollReelTestimonialsProps {
  testimonials: Testimonial[];
  charStaggerMs?: number;
  className?: string;
}

export function ScrollReelTestimonials({
  testimonials,
  charStaggerMs = 6,
  className,
}: ScrollReelTestimonialsProps) {
  const [index, setIndex] = React.useState(0); // where the reel is heading
  const [shown, setShown] = React.useState(0); // quote on screen
  const [leaving, setLeaving] = React.useState(false);
  const [ready, setReady] = React.useState(false);
  const locked = React.useRef(false);
  const timers = React.useRef<ReturnType<typeof setTimeout>[]>([]);
  const total = testimonials.length;

  React.useEffect(() => {
    // Turn transitions on after first paint, so the reel doesn't slide in.
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => setReady(true)));
    const pending = timers.current;
    return () => {
      cancelAnimationFrame(raf);
      pending.forEach(clearTimeout);
    };
  }, []);

  const go = React.useCallback(
    (step: number) => {
      if (locked.current) return;
      const next = index + step;
      if (next < 0 || next >= total) return;
      locked.current = true;
      setIndex(next);
      setLeaving(true);
      timers.current.push(
        setTimeout(() => {
          setShown(next);
          setLeaving(false);
        }, SWAP_MS),
        setTimeout(() => {
          locked.current = false;
        }, MOVE_MS),
      );
    },
    [index, total],
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
  };

  // Middle column: 3 tiles, then each photo followed by 2 tiles, then 3 tiles.
  const reel = React.useMemo(() => {
    const items: ({ type: "tile" } | { type: "photo"; i: number })[] = [];
    for (let k = 0; k < 3; k++) items.push({ type: "tile" });
    testimonials.forEach((_, i) => {
      items.push({ type: "photo", i });
      if (i < total - 1) items.push({ type: "tile" }, { type: "tile" });
    });
    for (let k = 0; k < 3; k++) items.push({ type: "tile" });
    return items;
  }, [testimonials, total]);

  const outerCount = 4 + 2 * total;
  const middleY = ((total - 1) / 2 - index) * STEP;
  const outerY = -middleY;
  const columnStyle = (y: number): React.CSSProperties => ({
    transform: `translateY(${y}px)`,
    transition: ready ? `transform ${MOVE_MS}ms var(--ease-inout)` : "none",
  });

  const t = testimonials[shown];
  const columnClass =
    "flex shrink-0 flex-col gap-2 will-change-transform motion-reduce:[transition:none!important]";
  const buttonClass =
    "grid size-11 cursor-pointer place-items-center rounded-[2px] border border-mh-rule bg-transparent text-mh-forest transition-colors duration-[180ms] ease-quiet hover:enabled:border-mh-moss disabled:cursor-default disabled:opacity-35";

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Testimonials"
      tabIndex={0}
      onKeyDown={onKeyDown}
      className={cn(
        "relative flex w-full flex-col items-stretch overflow-hidden bg-mh-stone outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mh-forest md:min-h-[360px] md:flex-row",
        className,
      )}
    >
      {/* The reel */}
      <div
        aria-hidden="true"
        className="relative h-60 w-full shrink-0 self-stretch overflow-hidden md:h-auto md:w-[400px]"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
          maskImage:
            "linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
          WebkitMaskComposite: "source-in",
          maskComposite: "intersect",
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center gap-2">
          <div className={columnClass} style={columnStyle(outerY)}>
            {Array.from({ length: outerCount }, (_, k) => <Tile key={k} />)}
          </div>
          <div className={columnClass} style={columnStyle(middleY)}>
            {reel.map((item, k) =>
              item.type === "photo" ? (
                <Photo key={k} src={testimonials[item.i].image} />
              ) : (
                <Tile key={k} />
              ),
            )}
          </div>
          <div className={columnClass} style={columnStyle(outerY)}>
            {Array.from({ length: outerCount }, (_, k) => <Tile key={k} />)}
          </div>
        </div>
      </div>

      {/* The quote */}
      <div className="flex min-w-0 flex-1 flex-col justify-between gap-8 self-stretch border-t border-mh-rule px-6 py-8 md:border-t-0 md:border-l md:px-12 md:py-12">
        <div className="flex flex-col gap-5">
          <svg
            className="block h-8 w-8 text-mh-brass"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M4.58 17.32C3.55 16.23 3 15 3 13.01c0-3.5 2.46-6.64 6.03-8.19l.9 1.38c-3.34 1.8-4 4.15-4.25 5.62.54-.28 1.24-.38 1.93-.31 1.8.17 3.23 1.65 3.23 3.49a3.5 3.5 0 0 1-3.5 3.5c-1.07 0-2.1-.49-2.75-1.18zm10 0C13.55 16.23 13 15 13 13.01c0-3.5 2.46-6.64 6.03-8.19l.9 1.38c-3.34 1.8-4 4.15-4.25 5.62.54-.28 1.24-.38 1.93-.31 1.8.17 3.23 1.65 3.23 3.49a3.5 3.5 0 0 1-3.5 3.5c-1.07 0-2.1-.49-2.75-1.18z" />
          </svg>

          <div className="relative w-full max-w-[560px] overflow-hidden">
            {/* Invisible copy holds the height of the longest moment */}
            <div aria-hidden="true" className="invisible flex min-h-[150px] flex-col gap-5">
              <div className={quoteClass}>{t.quote}</div>
              <div className={authorClass}>{t.author}</div>
            </div>

            <div
              key={shown}
              className={cn(
                "absolute inset-x-0 top-0 flex flex-col gap-5 will-change-[transform,opacity]",
                leaving && "scroll-reel-exit",
              )}
            >
              <div className="sr-only" aria-live="polite">
                {`${t.quote} — ${t.author}${t.detail ? `, ${t.detail}` : ""}`}
              </div>
              <div className={quoteClass} aria-hidden="true">
                <Chars text={t.quote} startIndex={0} staggerMs={charStaggerMs} />
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2" aria-hidden="true">
                <span className={authorClass}>
                  <Chars text={t.author} startIndex={t.quote.length + 6} staggerMs={charStaggerMs} />
                </span>
                {t.detail && (
                  <span className="text-[14px] leading-[1.3] text-mh-slate">{t.detail}</span>
                )}
                {typeof t.rating === "number" && <Stars rating={t.rating} />}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              disabled={index === 0}
              aria-label="Previous testimonial"
              className={buttonClass}
            >
              <ChevronLeft size={18} strokeWidth={1.5} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              disabled={index === total - 1}
              aria-label="Next testimonial"
              className={buttonClass}
            >
              <ChevronRight size={18} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>
          <span className="text-[11px] font-medium tracking-[0.1em] text-mh-moss tabular-nums" aria-hidden="true">
            {pad(index + 1)} — {pad(total)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ScrollReelTestimonials;
