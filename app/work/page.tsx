import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";
import { TextReveal } from "@/components/ui/text-reveal";
import { Eyebrow } from "@/components/ui/section-heading";
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
      <section className="pt-36 pb-16 md:pt-48 md:pb-20">
        <Container>
          <Reveal>
            <Eyebrow>Work</Eyebrow>
          </Reveal>
          <TextReveal
            as="h1"
            immediate
            delay={0.1}
            text="Six packaging systems, six retail *categories.*"
            className="mt-4 max-w-4xl text-[2.6rem] font-bold leading-[1.02] tracking-[-0.035em] sm:text-6xl lg:text-7xl"
          />
          <Reveal delay={0.4}>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted">
              Every project runs the same discipline: identity, structural
              dieline, 3D visualization, and a check against how it actually
              performs on shelf and on screen.
            </p>
          </Reveal>
        </Container>
        <Reveal delay={0.5}>
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
