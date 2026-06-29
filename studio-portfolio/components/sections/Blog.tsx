import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { posts } from "@/lib/site";

/**
 * Optional section — to remove the blog entirely, delete this file and its
 * import + usage in app/page.tsx (and the "Blog" nav link in lib/site.ts).
 */
export function Blog() {
  return (
    <section id="blog" className="py-(--spacing-section)">
      <Container>
        <SectionHeading
          eyebrow="Thoughts & ideas"
          title="Notes on design & conversion."
          action={
            <a
              href="#"
              className="group inline-flex items-center gap-2 text-sm text-ink transition-colors hover:text-accent"
            >
              Read the blog
              <span
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-1"
              >
                →
              </span>
            </a>
          }
        />

        <div className="mt-12 flex flex-col gap-5">
          {posts.map((post, i) => (
            <Reveal key={post.title} delay={i * 60}>
              <a
                href={post.href}
                className="group grid grid-cols-1 items-center gap-6 rounded-card border border-line bg-surface p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/60 sm:grid-cols-[200px_1fr_auto] sm:p-5"
              >
                <div className="relative aspect-3/2 overflow-hidden rounded-[10px] sm:aspect-4/3">
                  <Image
                    src={post.image}
                    alt={`${post.title} — article thumbnail placeholder`}
                    fill
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, 200px"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-3">
                    <span className="rounded-pill border border-line px-3 py-1 text-xs text-muted">
                      {post.tag}
                    </span>
                    <span className="text-xs text-muted">{post.readingTime}</span>
                  </div>
                  <h3 className="mt-3 font-display text-xl font-semibold text-ink">
                    {post.title}
                  </h3>
                  <p className="mt-2 max-w-prose text-sm leading-relaxed text-muted">
                    {post.excerpt}
                  </p>
                </div>

                <span className="hidden items-center gap-2 text-sm text-muted transition-colors group-hover:text-accent sm:inline-flex">
                  Read
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
