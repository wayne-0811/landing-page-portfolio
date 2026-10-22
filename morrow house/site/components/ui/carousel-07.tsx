"use client";

import * as React from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
  animate,
  type PanInfo,
  type MotionValue,
} from "motion/react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

// Stacked, draggable cards in the Morrow House style: square corners, no
// blur or shadow, quiet easing, and no text on the photographs. The front
// card's name and details sit on a placard beneath the stack.
// Text blocks are divs, not <p>: styles/site.css resets paragraph margins
// outside any layer, which would beat Tailwind's margin utilities.

export interface Slide {
  image: string;
  title: string;
  description: string;
  badge: string;
  /** Small caps line under the title, e.g. "Fletcher · 2025". */
  meta?: string;
  href?: string;
}

const defaultSlides: Slide[] = [
  {
    image: "https://cdn.21st.dev/assets/mirror/c1/c1e7bf149d430fd5bd5aa6dd3aaebb771fbc95b3a7cd303851ed585fd838a7b9.webp",
    title: "Mountain Trek",
    description: "Scale new heights and embrace the hiker's journey.",
    badge: "Adventure",
  },
  {
    image: "https://cdn.21st.dev/assets/mirror/fa/fac14e3cb2b67d40c5f3a2a0e212d0c60c1fd0aff588e59bc80883e4aceb4eee.webp",
    title: "River Rafting",
    description: "Feel the adrenaline rush as you navigate the wild rapids.",
    badge: "Extreme",
  },
  {
    image: "https://cdn.21st.dev/assets/mirror/b4/b49b413f935303df7e05362b3530028b05c913cc039b44e25e491f12f9ba0015.webp",
    title: "Azure Beach",
    description: "Unwind on the crystal clear shores of a tropical paradise.",
    badge: "Paradise",
  },
];

interface CarouselConfig {
  distanceDivisor: number;
  velocityDivisor: number;
  sensitivity: number;
  xMultiplier: number;
  yMultiplier: number;
  rotationMultiplier: number;
  scaleReduction: number;
}

// A gentler fan than the original: small tilt and drop, so the stack reads as
// photographs laid on a table rather than a deck being thrown.
const getCarouselConfig = (width: number): CarouselConfig => {
  if (width < 640) {
    return {
      distanceDivisor: 120,
      velocityDivisor: 500,
      sensitivity: 180,
      xMultiplier: 92,
      yMultiplier: 10,
      rotationMultiplier: 3,
      scaleReduction: 0.07,
    };
  }
  if (width < 1024) {
    return {
      distanceDivisor: 160,
      velocityDivisor: 650,
      sensitivity: 220,
      xMultiplier: 150,
      yMultiplier: 14,
      rotationMultiplier: 3.5,
      scaleReduction: 0.08,
    };
  }
  return {
    distanceDivisor: 200,
    velocityDivisor: 800,
    sensitivity: 250,
    xMultiplier: 210,
    yMultiplier: 18,
    rotationMultiplier: 4,
    scaleReduction: 0.09,
  };
};

// --ease-quiet from the design tokens.
const QUIET = [0.2, 0.7, 0.2, 1] as const;

const wrap = (i: number, n: number) => ((i % n) + n) % n;
const pad = (n: number) => String(n).padStart(2, "0");

interface CarouselStackedProps {
  slides?: Slide[];
  /** Accessible name for the carousel. */
  label?: string;
}

const CarouselStacked = ({ slides = defaultSlides, label = "Homes" }: CarouselStackedProps) => {
  const scrollProgress = useMotionValue(0);
  const startProgress = React.useRef(0);
  const [windowWidth, setWindowWidth] = React.useState(0);
  const [active, setActive] = React.useState(0);
  const reduceMotion = useReducedMotion();

  const total = slides.length;
  const current = slides[active];

  React.useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useMotionValueEvent(scrollProgress, "change", (v) => {
    setActive(wrap(Math.round(v), total));
  });

  const config = React.useMemo(
    () => getCarouselConfig(windowWidth),
    [windowWidth],
  );

  const settle = (target: number) => {
    animate(scrollProgress, target, reduceMotion
      ? { duration: 0 }
      : { duration: 0.7, ease: QUIET });
  };

  const go = (step: number) => settle(Math.round(scrollProgress.get()) + step);

  const handleDragStart = () => {
    startProgress.current = scrollProgress.get();
  };

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    const dragDistance = info.offset.x;
    const velocity = info.velocity.x;

    const distanceShift = -dragDistance / config.distanceDivisor;
    const velocityShift = -velocity / config.velocityDivisor;

    let totalShift = Math.round(distanceShift + velocityShift);
    totalShift = Math.max(-3, Math.min(3, totalShift));

    settle(Math.round(startProgress.current) + totalShift);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
  };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      className="w-full"
    >
      <div className="w-full overflow-hidden select-none">
        <div
          className="relative mx-auto h-72 w-full max-w-7xl sm:h-96 lg:h-[27rem] flex items-center justify-center outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mh-forest"
          tabIndex={0}
          onKeyDown={onKeyDown}
          aria-label={`${label}: use the arrow keys to move between them`}
        >
          {/* Transparent Drag Surface */}
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDragStart={handleDragStart}
            onDrag={(_, info) => {
              const delta = -info.delta.x / config.sensitivity;
              scrollProgress.set(scrollProgress.get() + delta);
            }}
            onDragEnd={handleDragEnd}
            className="absolute inset-0 z-[200] cursor-grab active:cursor-grabbing"
          />

          {slides.map((slide, i) => (
            <Card
              key={i}
              slide={slide}
              index={i}
              total={total}
              progress={scrollProgress}
              config={config}
            />
          ))}
        </div>
      </div>

      {/* Placard: the front card's details, beneath the stack */}
      <div className="mt-8 flex flex-wrap items-end justify-between gap-x-10 gap-y-6 border-t border-mh-rule pt-6">
        <div className="min-w-0 basis-full sm:basis-0 sm:flex-1" aria-live="polite">
          <motion.div
            key={active}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.32, ease: QUIET }}
          >
            <Badge
              variant="outline"
              className="rounded-[2px] border-mh-rule px-2 py-1 text-[11px] font-medium leading-none tracking-[0.1em] uppercase text-mh-moss"
            >
              {current.badge}
            </Badge>
            <a
              href={current.href ?? "#"}
              className="group mt-4 flex items-center gap-3 text-[20px] leading-[1.2] tracking-[0.04em] uppercase text-mh-forest"
            >
              {current.title}
              <ArrowUpRight
                aria-hidden="true"
                size={16}
                strokeWidth={1.5}
                className="text-mh-brass transition-transform duration-[320ms] ease-quiet group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
              />
            </a>
            {current.meta && (
              <div className="mt-2 text-[11px] font-medium leading-[1.3] tracking-[0.1em] uppercase text-mh-moss">
                {current.meta}
              </div>
            )}
            <div className="mt-3 font-serif italic text-[22px] leading-[1.2] text-mh-slate">
              {current.description}
            </div>
          </motion.div>
        </div>

        <div className="flex items-center gap-5">
          <p className="text-[11px] font-medium tracking-[0.1em] text-mh-moss tabular-nums" aria-hidden="true">
            {pad(active + 1)} — {pad(total)}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous home"
              className="grid size-11 place-items-center rounded-[2px] border border-mh-rule bg-transparent text-mh-forest transition-colors duration-[180ms] ease-quiet hover:border-mh-moss cursor-pointer"
            >
              <ChevronLeft size={18} strokeWidth={1.5} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next home"
              className="grid size-11 place-items-center rounded-[2px] border border-mh-rule bg-transparent text-mh-forest transition-colors duration-[180ms] ease-quiet hover:border-mh-moss cursor-pointer"
            >
              <ChevronRight size={18} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface CardProps {
  slide: Slide;
  index: number;
  total: number;
  progress: MotionValue<number>;
  config: CarouselConfig;
}

const Card = ({ slide, index, total, progress, config }: CardProps) => {
  const offset = useTransform(progress, (p) => {
    let diff = (index - p) % total;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  });

  const x = useTransform(offset, (o) => o * config.xMultiplier);
  const rotate = useTransform(offset, (o) => {
    const absO = Math.abs(o);
    if (absO < 0.05) return 0;
    return o * config.rotationMultiplier;
  });
  const y = useTransform(offset, (o) => {
    const absO = Math.abs(o);
    if (absO < 0.05) return 0;
    return absO * config.yMultiplier;
  });
  const scale = useTransform(
    offset,
    (o) => 1 - Math.abs(o) * config.scaleReduction,
  );
  const opacity = useTransform(
    offset,
    [-total / 2, -total / 2 + 0.5, 0, total / 2 - 0.5, total / 2],
    [0, 1, 1, 1, 0],
  );
  const zIndex = useTransform(offset, (o) =>
    Math.round(100 - Math.abs(o) * 10),
  );
  // The front photograph drifts in slightly as it arrives (1.03 → 1).
  const imageScale = useTransform(offset, [-1, 0, 1], [1.03, 1, 1.03]);
  // Cards behind recede into a forest tint rather than grey.
  const tint = useTransform(
    offset,
    [-2, -0.5, 0, 0.5, 2],
    [0.42, 0.16, 0, 0.16, 0.42],
  );

  return (
    <motion.div
      aria-hidden="true"
      style={{
        x,
        rotate,
        y,
        scale,
        opacity,
        zIndex,
      }}
      className={cn(
        "absolute overflow-hidden bg-mh-stone pointer-events-none",
        "w-44 h-55 sm:w-60 sm:h-75 lg:w-72 lg:h-90",
      )}
    >
      <motion.img
        src={slide.image}
        alt=""
        draggable={false}
        style={{ scale: imageScale }}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />
      <motion.div
        style={{ opacity: tint }}
        className="absolute inset-0 bg-mh-forest pointer-events-none"
      />
    </motion.div>
  );
};

export default CarouselStacked;
