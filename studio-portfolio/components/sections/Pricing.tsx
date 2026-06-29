import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { pricing } from "@/lib/site";

function Check() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="mt-0.5 h-4 w-4 shrink-0 text-accent"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 10.5l4 4 8-9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Pricing() {
  return (
    <section id="pricing" className="py-(--spacing-section)">
      <Container>
        <SectionHeading
          eyebrow="Pricing"
          title="Simple, project-based pricing."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {pricing.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 80}>
              <div
                className={`relative flex h-full flex-col rounded-card border p-8 transition-all duration-300 ${
                  tier.popular
                    ? "border-accent/60 bg-elevated"
                    : "border-line bg-surface hover:border-accent/40"
                }`}
              >
                {tier.popular ? (
                  <span className="absolute right-6 top-6 rounded-pill bg-accent px-3 py-1 text-xs font-semibold text-base">
                    Popular
                  </span>
                ) : null}

                <h3 className="font-display text-xl font-semibold text-ink">
                  {tier.name}
                </h3>
                <p className="mt-2 text-sm text-muted">{tier.summary}</p>

                <div className="mt-6 flex items-baseline gap-2">
                  <span className="font-display text-5xl font-bold tracking-tight text-ink">
                    {tier.price}
                  </span>
                  <span className="text-sm text-muted">{tier.cadence}</span>
                </div>

                <ul className="mt-8 flex flex-col gap-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-3 text-sm text-muted">
                      <Check />
                      <span className="leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-2">
                  <ButtonLink
                    href={tier.cta.href}
                    variant={tier.popular ? "accent" : "outline"}
                    className="w-full"
                  >
                    {tier.cta.label}
                  </ButtonLink>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
