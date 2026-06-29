import type { AnchorHTMLAttributes, ReactNode } from "react";

type Variant = "accent" | "outline";

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  children: ReactNode;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-button px-6 py-3 text-sm font-medium transition-all duration-200 focus-visible:outline-2";

const variants: Record<Variant, string> = {
  accent:
    "bg-accent text-base hover:bg-accent-hover hover:-translate-y-0.5 active:translate-y-0",
  outline:
    "border border-line text-ink hover:border-accent hover:text-accent",
};

/** Accent or outline call-to-action rendered as a link. */
export function ButtonLink({
  variant = "accent",
  className = "",
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <a className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </a>
  );
}
