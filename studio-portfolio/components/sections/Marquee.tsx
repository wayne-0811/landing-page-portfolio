/**
 * Full-width infinite marquee. The track is duplicated so the -50% scroll
 * loops seamlessly; it pauses on hover and is disabled entirely under
 * prefers-reduced-motion (see globals.css). Hidden from screen readers — it
 * is purely decorative; the real CTA lives in the footer.
 */
export function Marquee() {
  const phrase = "Get in touch";
  const items = Array.from({ length: 8 });

  return (
    <section
      aria-hidden="true"
      className="group/marquee overflow-hidden border-y border-line py-8"
    >
      <div className="flex w-max animate-marquee whitespace-nowrap">
        {/* Two identical halves -> seamless -50% loop */}
        {[0, 1].map((half) => (
          <div key={half} className="flex shrink-0">
            {items.map((_, i) => (
              <span
                key={i}
                className="mx-6 font-display text-5xl font-bold tracking-tight text-ink/30 sm:text-7xl"
              >
                {phrase}
                <span className="text-accent"> · </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
