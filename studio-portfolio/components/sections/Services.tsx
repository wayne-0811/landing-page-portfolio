import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/lib/site";

function ServiceCard({
  title,
  body,
  align = "left",
}: {
  title: string;
  body: string;
  align?: "left" | "right";
}) {
  return (
    <div
      className={`group rounded-card border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/60 hover:bg-elevated ${
        align === "right" ? "lg:text-right" : ""
      }`}
    >
      <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted">{body}</p>
    </div>
  );
}

export function Services() {
  // Split the four services into two columns flanking the device mockup.
  const left = services.slice(0, 2);
  const right = services.slice(2, 4);

  return (
    <section id="services" className="py-(--spacing-section)">
      <Container>
        <SectionHeading
          eyebrow="Services"
          title="What I can build for you."
        />

        <div className="mt-12 grid items-center gap-6 lg:grid-cols-[1fr_minmax(280px,0.9fr)_1fr]">
          {/* Left column */}
          <div className="flex flex-col gap-6">
            {left.map((s, i) => (
              <Reveal key={s.title} delay={i * 80}>
                <ServiceCard {...s} align="right" />
              </Reveal>
            ))}
          </div>

          {/* Center device mockup */}
          <Reveal delay={120} className="order-first lg:order-none">
            <div className="relative mx-auto aspect-4/5 w-full max-w-xs overflow-hidden rounded-card border border-line bg-surface">
              <Image
                src="/images/device.svg"
                alt="Device mockup placeholder — replace with a screenshot of your work"
                fill
                loading="lazy"
                sizes="(max-width: 1024px) 70vw, 320px"
                className="object-cover"
              />
            </div>
          </Reveal>

          {/* Right column */}
          <div className="flex flex-col gap-6">
            {right.map((s, i) => (
              <Reveal key={s.title} delay={i * 80}>
                <ServiceCard {...s} />
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
