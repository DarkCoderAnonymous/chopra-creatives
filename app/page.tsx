import { Hero } from "@/components/home/hero";
import { BrandBanner } from "@/components/home/brand-banner";
import { ProblemSection } from "@/components/home/problem-section";
import { WorkSection } from "@/components/home/work-section";
import { ProcessSection } from "@/components/home/process-section";
import { CapabilitiesSection } from "@/components/home/capabilities-section";
import { ChecklistSection } from "@/components/home/checklist-section";
import { CtaSection } from "@/components/home/cta-section";

export default function Home() {
  return (
    <>
      <Hero />
      <BrandBanner />
      <ProblemSection />
      <WorkSection />
      <ProcessSection />
      <CapabilitiesSection />
      <ChecklistSection />
      <CtaSection />
    </>
  );
}
