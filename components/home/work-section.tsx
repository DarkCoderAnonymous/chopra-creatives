import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button-link";
import { CaseStudyCard } from "@/components/work/case-study-card";
import { caseStudies } from "@/lib/data";

/** Strongest projects for the target client, in this order. */
const FEATURED = ["dumbbell-nuts", "mitrocore", "natur-paws", "carolina-rice"];

export function WorkSection() {
  const featured = FEATURED.map((slug) => caseStudies.find((s) => s.slug === slug)!);

  return (
    <section id="work" className="scroll-mt-24 py-24 md:py-32">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Selected work"
            title="Case studies, not just *mockups.*"
            description="Each project shows the problem, the strategy behind the design, and the production work that made it real."
            className="max-w-2xl"
          />
          <Reveal className="hidden shrink-0 sm:block">
            <ButtonLink href="/work" variant="secondary" arrow>
              All case studies
            </ButtonLink>
          </Reveal>
        </div>

        <div className="mt-16 space-y-20 md:mt-20 md:space-y-28">
          {featured.map((study, i) => (
            <Reveal key={study.slug} y={40}>
              <CaseStudyCard study={study} index={i} reverse={i % 2 === 1} priority={i === 0} />
            </Reveal>
          ))}
        </div>

        <div className="mt-14 sm:hidden">
          <ButtonLink href="/work" variant="secondary" arrow magnetic={false}>
            All case studies
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
