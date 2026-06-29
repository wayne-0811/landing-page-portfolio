import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  /** Optional right-aligned slot (e.g. a "View all" link). */
  action?: ReactNode;
  className?: string;
};

/**
 * The shared section header pattern: small uppercase eyebrow over an
 * oversized display heading, with an optional action on the right.
 */
export function SectionHeading({
  eyebrow,
  title,
  action,
  className = "",
}: SectionHeadingProps) {
  return (
    <Reveal
      className={`flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between ${className}`}
    >
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="mt-4 text-[length:var(--text-display)] leading-[var(--text-display--line-height)] tracking-tight text-balance">
          {title}
        </h2>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </Reveal>
  );
}
