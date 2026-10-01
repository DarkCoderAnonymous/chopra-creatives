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
  title: "Packaging Design Case Studies",
  description:
    "Product packaging design case studies: supplement, pet, snack, food and kitchenware packaging, each with strategy, dielines and production-ready artwork.",
  alternates: { canonical: "/work" },
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
            text="Packaging case studies, from strategy to *production.*"
            className="mt-4 max-w-4xl text-[2.6rem] font-bold leading-[1.02] tracking-[-0.035em] sm:text-6xl lg:text-7xl"
          />
          <Reveal delay={0.4}>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted">
              Every project shows the problem, the strategy, the design
              decisions and the production work behind it: dielines,
              print-ready artwork and 3D renders.
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
