import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { footer, nav, site, socials } from "@/lib/site";

export function Footer() {
  return (
    <footer id="contact" className="border-t border-line pt-(--spacing-section)">
      <Container>
        {/* Work gallery band */}
        <Reveal>
          <ul className="grid grid-cols-3 gap-3 sm:grid-cols-5">
            {footer.galleryImages.map((src, i) => (
              <li
                key={src}
                className="relative aspect-square overflow-hidden rounded-[10px] border border-line bg-surface"
              >
                <Image
                  src={src}
                  alt={`Recent work sample ${i + 1} — placeholder`}
                  fill
                  loading="lazy"
                  sizes="(max-width: 640px) 33vw, 20vw"
                  className="object-cover grayscale transition-all duration-500 hover:grayscale-0"
                />
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Closing CTA */}
        <Reveal className="mt-16 flex flex-col gap-8 border-b border-line pb-16 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-2xl whitespace-pre-line text-[length:var(--text-display)] font-bold leading-[1.05] tracking-tight text-balance">
            {footer.closing}
          </h2>
          <ButtonLink href={`mailto:${site.email}`} className="self-start">
            Start a project
          </ButtonLink>
        </Reveal>

        {/* Columns */}
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <a
              href="#top"
              className="font-display text-xl font-bold tracking-tight text-ink"
            >
              {site.name}
              <span className="text-accent">.</span>
            </a>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
              Hand-coded landing pages &amp; product UI, built to convert.
            </p>
          </div>

          <nav aria-label="Footer">
            <h3 className="eyebrow">Quick links</h3>
            <ul className="mt-4 flex flex-col gap-2">
              {nav.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-ink"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="eyebrow">Contact</h3>
            <ul className="mt-4 flex flex-col gap-2 text-sm text-muted">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="transition-colors hover:text-ink"
                >
                  {site.email}
                </a>
              </li>
              <li>{site.location}</li>
            </ul>
            <h3 className="eyebrow mt-6">Social</h3>
            <ul className="mt-4 flex flex-col gap-2 text-sm text-muted">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="transition-colors hover:text-ink"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="eyebrow">Availability</h3>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {site.availability}
            </p>
            <ButtonLink
              href={nav.cta.href}
              variant="outline"
              className="mt-4"
            >
              {nav.cta.label}
            </ButtonLink>
          </div>
        </div>

        {/* Oversized wordmark */}
        <div className="overflow-hidden pb-8">
          <p
            aria-hidden="true"
            className="select-none font-display text-[length:clamp(4rem,16vw,16rem)] font-bold leading-none tracking-tight text-ink/5"
          >
            {site.name}
          </p>
        </div>

        <div className="flex flex-col gap-2 border-t border-line py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>Built hand-coded with Next.js &amp; Tailwind CSS.</p>
        </div>
      </Container>
    </footer>
  );
}
