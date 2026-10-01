import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button-link";
import { WorkCard } from "@/components/work/work-card";
import { caseStudies } from "@/lib/data";

export function WorkSection() {
  const featured = caseStudies.slice(0, 6);

  return (
    <section className="py-24 md:py-32">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Selected work"
            title="Recent packaging systems, built for *retail.*"
            description="Six brands, six structures — from a liposomal supplement jar to a flexographic rice pouch — each engineered from identity through print-ready dieline."
            className="max-w-2xl"
          />
          <Reveal className="hidden shrink-0 sm:block">
            <ButtonLink href="/work" variant="secondary" arrow>
              View all work
            </ButtonLink>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((study, i) => (
            <Reveal
              key={study.slug}
              delay={(i % 3) * 0.12}
              y={48}
              className={i % 3 === 1 ? "lg:translate-y-12" : undefined}
            >
              <WorkCard study={study} priority={i < 3} />
            </Reveal>
          ))}
        </div>

        <div className="mt-10 sm:hidden">
          <ButtonLink href="/work" variant="secondary" arrow magnetic={false}>
            View all work
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
