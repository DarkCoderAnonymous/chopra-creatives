import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";
import { TextReveal } from "@/components/ui/text-reveal";
import { Eyebrow } from "@/components/ui/section-heading";
import { FounderSection } from "@/components/home/founder-section";
import { PrinciplesSection } from "@/components/home/principles-section";
import { ProcessSection } from "@/components/home/process-section";
import { ServicesSection } from "@/components/home/services-section";
import { CtaSection } from "@/components/home/cta-section";
import { founder } from "@/lib/data";
import { breadcrumbSchema, JsonLd, personSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "About: Founder-Led Packaging Design Studio",
  description:
    "Chopra Creative is a specialist product packaging and ecommerce design studio, led by a packaging designer who designs for both the shelf and the press.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const person = personSchema();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
          ...(person ? [person] : []),
        ]}
      />
      <section className="pt-36 pb-6 md:pt-48 md:pb-10">
        <Container className="max-w-4xl">
          <Reveal>
            <Eyebrow>About</Eyebrow>
          </Reveal>
          <TextReveal
            as="h1"
            immediate
            delay={0.1}
            text={`A specialist packaging & ecommerce design studio, led by *${founder.name}.*`}
            className="mt-4 text-[2.4rem] font-bold leading-[1.04] tracking-[-0.035em] sm:text-6xl lg:text-[4.25rem]"
          />
          <Reveal delay={0.4}>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted">
              <p>
                Chopra Creative is not a large agency and doesn&apos;t pretend
                to be one. It&apos;s a founder-led studio focused on one thing:
                product packaging that communicates clearly, gives people a
                reason to choose the product, and is prepared properly for
                real-world production.
              </p>
              <p>
                The portfolio spans supplements, pet care, gourmet snacks,
                kitchenware, food staples and custom packaging: jar labels,
                gusset pouches, stand-up pouches, folding cartons and a
                hand-assembled cup sleeve. The structure changes from project
                to project; the discipline doesn&apos;t.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <FounderSection linkToAbout={false} />
      <PrinciplesSection />
      <ProcessSection />
      <ServicesSection eyebrow="What I do" title="Packaging at the core, extended into *ecommerce.*" />
      <CtaSection />
    </>
  );
}
