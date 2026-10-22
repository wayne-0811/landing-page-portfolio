"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";

// Testimonial Slider (after kavikatiyar's testimonial-slider-1 on 21st.dev),
// in the Morrow House style for a forest-green section: a counter, a
// vertical "Reviews" label and thumbnails of the other reviews; a tall photo
// that slides up or down; and the reviewer and quote sliding sideways.
// Square corners, linen text, brass details, quiet easing.
// Spacing uses flex gaps, not margins: styles/site.css resets margins on
// headings, paragraphs and blockquotes outside any layer, which would beat
// Tailwind's margin utilities. Icon colours sit on the icons for the same
// reason (buttons inherit colour there).

export interface Review {
  id: string | number;
  name: string;
  /** Small line above the name, e.g. "Google review · 3 months ago". */
  affiliation: string;
  quote: string;
  imageSrc: string;
  thumbnailSrc?: string;
  imageAlt?: string;
  /** CSS object-position for the photo crop. */
  imagePosition?: string;
  rating?: number;
}

interface TestimonialSliderProps {
  reviews: Review[];
  label?: string;
  className?: string;
}

const QUIET = [0.2, 0.7, 0.2, 1] as const;
const pad = (n: number) => String(n).padStart(2, "0");

export function TestimonialSlider({ reviews, label = "Reviews", className }: TestimonialSliderProps) {
  const [index, setIndex] = React.useState(0);
  const [direction, setDirection] = React.useState<"left" | "right">("right");
  const reduceMotion = useReducedMotion();
  const review = reviews[index];
  const total = reviews.length;

  const next = () => {
    setDirection("right");
    setIndex((i) => (i + 1) % total);
  };
  const prev = () => {
    setDirection("left");
    setIndex((i) => (i - 1 + total) % total);
  };
  const goTo = (i: number) => {
    setDirection(i > index ? "right" : "left");
    setIndex(i);
  };
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); next(); }
    if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
  };

  // Up to three other reviews as thumbnails.
  const others = reviews.filter((_, i) => i !== index).slice(0, 3);

  const transition = reduceMotion ? { duration: 0 } : { duration: 0.7, ease: QUIET };
  const imageVariants = {
    enter: (d: string) => ({ y: reduceMotion ? 0 : d === "right" ? "100%" : "-100%", opacity: 0 }),
    center: { y: 0, opacity: 1 },
    exit: (d: string) => ({ y: reduceMotion ? 0 : d === "right" ? "-100%" : "100%", opacity: 0 }),
  };
  const textVariants = {
    enter: (d: string) => ({ x: reduceMotion ? 0 : d === "right" ? 40 : -40, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: string) => ({ x: reduceMotion ? 0 : d === "right" ? -40 : 40, opacity: 0 }),
  };

  const buttonBase =
    "grid size-12 cursor-pointer place-items-center rounded-[2px] transition-colors duration-[180ms] ease-quiet focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-mh-linen";

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={0}
      onKeyDown={onKeyDown}
      className={cn(
        "relative w-full text-mh-linen outline-none focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-mh-linen",
        className,
      )}
    >
      <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12">
        {/* Counter, label, thumbnails */}
        <div className="order-2 flex flex-col justify-between gap-8 md:order-1 md:col-span-3">
          <div className="flex flex-row items-center justify-between gap-4 md:flex-col md:items-start md:justify-start">
            <span className="text-[12px] font-medium tracking-[0.12em] text-mh-mist tabular-nums" aria-hidden="true">
              {pad(index + 1)} / {pad(total)}
            </span>
            <span className="hidden text-[12px] font-medium uppercase tracking-[0.12em] text-mh-linen [writing-mode:vertical-rl] md:block md:rotate-180">
              {label}
            </span>
          </div>
          <div className="flex gap-2">
            {others.map((r) => {
              const i = reviews.findIndex((x) => x.id === r.id);
              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Show the review from ${r.name}`}
                  className="h-20 w-16 cursor-pointer overflow-hidden border-0 bg-mh-moss p-0 opacity-60 transition-opacity duration-300 ease-quiet hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-mh-linen md:h-24 md:w-20"
                >
                  <img
                    src={r.thumbnailSrc ?? r.imageSrc}
                    alt=""
                    className="h-full w-full object-cover"
                    style={{ objectPosition: r.imagePosition }}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Photo */}
        <div className="relative order-1 h-80 min-h-[380px] overflow-hidden bg-mh-moss md:order-2 md:col-span-4 md:min-h-[500px]">
          <AnimatePresence initial={false} custom={direction}>
            <motion.img
              key={index}
              src={review.imageSrc}
              alt={review.imageAlt ?? ""}
              custom={direction}
              variants={imageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={transition}
              className="absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: review.imagePosition }}
            />
          </AnimatePresence>
        </div>

        {/* Reviewer, quote, controls */}
        <div className="order-3 flex flex-col justify-between gap-10 md:col-span-5 md:pl-4">
          <div className="relative min-h-[220px] overflow-hidden pt-2 md:pt-20" aria-live="polite">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={index}
                custom={direction}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={reduceMotion ? { duration: 0 } : { duration: 0.45, ease: QUIET }}
              >
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-medium uppercase tracking-[0.1em] text-mh-mist">
                      <span>{review.affiliation}</span>
                      {typeof review.rating === "number" && (
                        <span className="inline-flex gap-0.5 text-mh-brass-light" role="img" aria-label={`${review.rating} out of 5 stars`}>
                          {Array.from({ length: 5 }, (_, i) => (
                            <Star key={i} size={11} strokeWidth={0} fill="currentColor" aria-hidden="true"
                              className={i < Math.round(review.rating!) ? "" : "opacity-25"} />
                          ))}
                        </span>
                      )}
                    </div>
                    <h3 className="text-[20px] font-normal leading-[1.2] tracking-[0.04em] uppercase text-mh-linen">
                      {review.name}
                    </h3>
                  </div>
                  <blockquote className="font-serif text-[26px] leading-[1.22] text-mh-linen md:text-[34px]">
                    {review.quote}
                  </blockquote>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous review"
              className={cn(buttonBase, "border border-mh-linen/30 bg-transparent text-mh-linen hover:border-mh-linen")}
            >
              <ArrowLeft size={18} strokeWidth={1.5} aria-hidden="true" className="text-mh-linen" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next review"
              className={cn(buttonBase, "border border-mh-linen bg-mh-linen text-mh-forest hover:bg-white")}
            >
              <ArrowRight size={18} strokeWidth={1.5} aria-hidden="true" className="text-mh-forest" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestimonialSlider;
