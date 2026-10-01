import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { PrinciplesSection } from "@/components/home/principles-section";
import { WorkSection } from "@/components/home/work-section";
import { WhySection } from "@/components/home/why-section";
import { ServicesSection } from "@/components/home/services-section";
import { PricingSection } from "@/components/home/pricing-section";
import { ProofSection } from "@/components/home/proof-section";
import { ProcessSection } from "@/components/home/process-section";
import { FounderSection } from "@/components/home/founder-section";
import { AuditSection } from "@/components/home/audit-section";
import { CtaSection } from "@/components/home/cta-section";
import { JsonLd, organizationSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: {
    absolute: "Product Packaging Design Studio | Chopra Creative",
  },
  description:
    "Founder-led product packaging design studio: strategic packaging, production-ready artwork and dielines, extended into Amazon, A+ Content and Shopify creative.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <JsonLd data={organizationSchema()} />
      <Hero />
      <PrinciplesSection />
      <WorkSection />
      <WhySection />
      <ServicesSection />
      <PricingSection />
      <ProofSection />
      <ProcessSection />
      <FounderSection />
      <AuditSection />
      <CtaSection />
    </>
  );
}
