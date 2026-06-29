"use client";

import { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/lib/site";

export function Feedback() {
  const [index, setIndex] = useState(0);
  const count = testimonials.length;
  const active = testimonials[index]!;

  const go = (dir: number) => setIndex((i) => (i + dir + count) % count);

  return (
    <section id="feedback" className="py-(--spacing-section)">
      <Container>
        <SectionHeading eyebrow="Feedback" title="Fast, focused, on point." />

        <Reveal className="mt-12">
          <figure className="grid items-center gap-8 rounded-card border border-line bg-surface p-8 sm:p-12 lg:grid-cols-[200px_1fr]">
            <div className="relative mx-auto aspect-4/5 w-40 overflow-hidden rounded-card border border-line lg:mx-0 lg:w-full">
              <Image
                src={active.avatar}
                alt={`${active.name} — client portrait placeholder`}
                fill
                loading="lazy"
                sizes="200px"
                className="object-cover grayscale"
              />
            </div>

            <div>
              <blockquote className="font-display text-2xl font-medium leading-snug text-ink text-balance sm:text-3xl">
                <span className="text-accent">“</span>
                {active.quote}
                <span className="text-accent">”</span>
              </blockquote>

              <figcaption className="mt-8 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="font-semibold text-ink">{active.name}</p>
                  <p className="text-sm text-muted">{active.role}</p>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className="text-sm tabular-nums text-muted"
                    aria-hidden="true"
                  >
                    {index + 1} / {count}
                  </span>
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label="Previous testimonial"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-pill border border-line text-ink transition-colors hover:border-accent hover:text-accent"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label="Next testimonial"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-pill border border-line text-ink transition-colors hover:border-accent hover:text-accent"
                  >
                    →
                  </button>
                </div>
              </figcaption>
            </div>
          </figure>
        </Reveal>
      </Container>
    </section>
  );
}
