import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { site, socials } from "@/lib/site";

export function Hero() {
  return (
    <section id="top" className="relative pt-28 sm:pt-32">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.4fr_1fr]">
          {/* Copy */}
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-pill border border-line bg-surface px-4 py-1.5 text-xs text-muted">
                <span
                  className="h-1.5 w-1.5 rounded-pill bg-accent"
                  aria-hidden="true"
                />
                {site.availability}
              </span>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="mt-6 text-[length:var(--text-hero)] font-bold leading-[var(--text-hero--line-height)] tracking-tight text-balance">
                Hello, I&apos;m
                <br />
                <span className="text-accent">{site.name}</span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
                An independent designer &amp; front-end developer crafting
                hand-coded landing pages and product UI that are built to
                convert.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <ButtonLink href="#contact">Book a call</ButtonLink>
                <a
                  href={`mailto:${site.email}`}
                  className="text-sm text-ink underline decoration-line underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                >
                  {site.email}
                </a>
              </div>
            </Reveal>

            <Reveal delay={320}>
              <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      className="text-xs uppercase tracking-[0.12em] text-muted transition-colors hover:text-ink"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Portrait */}
          <Reveal delay={160} className="order-first lg:order-last">
            <div className="relative mx-auto aspect-4/5 w-full max-w-sm overflow-hidden rounded-card border border-line bg-surface">
              <Image
                src="/images/portrait.svg"
                alt="Portrait placeholder — replace with a black-and-white photo of yourself"
                fill
                priority
                sizes="(max-width: 1024px) 80vw, 400px"
                className="object-cover grayscale"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
