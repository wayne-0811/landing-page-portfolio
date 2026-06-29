"use client";

import { useId, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqs } from "@/lib/site";

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const panelId = `${id}-panel`;
  const buttonId = `${id}-button`;

  return (
    <div className="border-b border-line">
      <h3>
        <button
          type="button"
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-accent"
        >
          <span className="font-display text-lg font-medium text-ink">{q}</span>
          <span
            aria-hidden="true"
            className={`grid h-8 w-8 shrink-0 place-items-center rounded-pill border border-line text-muted transition-transform duration-300 ${
              open ? "rotate-45 border-accent text-accent" : ""
            }`}
          >
            +
          </span>
        </button>
      </h3>
      {/* Animated height via grid-rows trick — no JS measurement needed. */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={`grid transition-[grid-template-rows] duration-300 ease-[var(--ease-out-soft)] ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="max-w-2xl pb-5 text-base leading-relaxed text-muted">
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}

export function Faq() {
  return (
    <section id="faq" className="py-(--spacing-section)">
      <Container>
        <SectionHeading eyebrow="Answers" title="Questions, answered." />
        <Reveal className="mt-12 max-w-3xl">
          <div className="border-t border-line">
            {faqs.map((item) => (
              <FaqItem key={item.q} {...item} />
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
