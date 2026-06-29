import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { clients } from "@/lib/site";

export function Clients() {
  return (
    <section aria-label="Selected clients" className="py-16 sm:py-20">
      <Container>
        <Reveal>
          <p className="eyebrow text-center">Selected clients</p>
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:gap-x-16">
            {clients.map((name) => (
              <li
                key={name}
                className="font-display text-lg font-semibold text-muted/70 transition-colors hover:text-ink sm:text-xl"
              >
                {name}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
