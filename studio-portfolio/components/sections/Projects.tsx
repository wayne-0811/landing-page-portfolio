import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/lib/site";

export function Projects() {
  return (
    <section id="projects" className="py-(--spacing-section)">
      <Container>
        <SectionHeading
          eyebrow="Projects"
          title="Selected work, built to ship."
          action={
            <a
              href="#"
              className="group inline-flex items-center gap-2 text-sm text-ink transition-colors hover:text-accent"
            >
              View all projects
              <span
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-1"
              >
                →
              </span>
            </a>
          }
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal key={project.title} delay={(i % 2) * 80}>
              <a
                href={project.href}
                className="group block h-full overflow-hidden rounded-card border border-line bg-surface transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/60"
              >
                <div className="relative aspect-3/2 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={`${project.title} — project preview placeholder`}
                    fill
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex items-start justify-between gap-4 p-6">
                  <div>
                    <span className="eyebrow">{project.tag}</span>
                    <h3 className="mt-2 font-display text-xl font-semibold text-ink">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {project.description}
                    </p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="mt-1 text-muted transition-all duration-200 group-hover:translate-x-1 group-hover:text-accent"
                  >
                    ↗
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
