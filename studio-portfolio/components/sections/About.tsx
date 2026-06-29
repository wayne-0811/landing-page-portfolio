import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { about } from "@/lib/site";

export function About() {
  return (
    <section id="about" className="py-(--spacing-section)">
      <Container>
        <SectionHeading
          eyebrow="About"
          title="A small studio with a teardown-led, conversion-first way of working."
        />

        <Reveal className="mt-8 max-w-2xl">
          <p className="text-lg leading-relaxed text-muted">{about.bio}</p>
        </Reveal>

        {/* Bento grid of honest credibility points */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {about.cards.map((card, i) => (
            <Reveal key={card.title} delay={i * 80}>
              <article className="group h-full rounded-card border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/60 hover:bg-elevated">
                <h3 className="font-display text-lg font-semibold text-ink">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {card.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
