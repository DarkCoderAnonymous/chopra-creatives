import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";
import { WorkExplorer } from "@/components/work/work-explorer";
import { WorkShowcase } from "@/components/work/work-showcase";
import { CtaSection } from "@/components/home/cta-section";
import { caseStudies, industries } from "@/lib/data";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Packaging design case studies across supplements, pet care, snacks, kitchenware, food staples, and custom event packaging.",
};

export default function WorkPage() {
  return (
    <>
      <section className="pt-32 pb-16 md:pt-40 md:pb-20">
        <Container>
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">
              Work
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-3 max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
              Six packaging systems, six retail categories.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
              Every project runs the same discipline: identity, structural
              dieline, 3D visualization, and a check against how it actually
              performs on shelf and on screen.
            </p>
          </Reveal>
        </Container>
        <Reveal delay={0.15}>
          <div className="mt-14">
            <Container>
              <WorkShowcase />
            </Container>
          </div>
        </Reveal>
      </section>

      <section className="pb-24">
        <Container>
          <WorkExplorer studies={caseStudies} industries={industries} />
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
