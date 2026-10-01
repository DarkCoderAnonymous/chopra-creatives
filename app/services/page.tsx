import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";
import { TextReveal } from "@/components/ui/text-reveal";
import { Eyebrow, SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { PricingSection } from "@/components/home/pricing-section";
import { AuditSection } from "@/components/home/audit-section";
import { ProcessSection } from "@/components/home/process-section";
import { CtaSection } from "@/components/home/cta-section";
import { EcosystemFlow } from "@/components/home/ecosystem-flow";
import { caseStudies, services, type ServiceId } from "@/lib/data";
import { breadcrumbSchema, JsonLd, serviceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Packaging Design Services: Packaging, Amazon & Shopify",
  description:
    "Packaging design services from a founder-led studio: production-ready packaging design, Amazon packaging design, Amazon A+ Content design and Shopify product design.",
  alternates: { canonical: "/services" },
};

const DETAILS: Record<ServiceId, { forWho: string; work: string[]; workLabel: string }> = {
  "packaging-design": {
    forWho:
      "Brands launching a new product, redesigning an existing pack, or needing accurate production artwork for their printer.",
    work: ["mitrocore", "natur-paws", "carolina-rice"],
    workLabel: "Packaging case studies",
  },
  "product-launch": {
    forWho:
      "Products preparing to launch or relaunch on Amazon and Shopify that need the packaging and the listing creative designed together.",
    work: ["natur-paws", "carolina-rice"],
    workLabel: "Packaging designed for the screen",
  },
  "brand-growth-system": {
    forWho:
      "Multi-SKU lines and growing brands adding flavors, sizes or ranges, where every new product has to look like part of one family.",
    work: ["dumbbell-nuts"],
    workLabel: "Multi-SKU case study",
  },
};


export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ]),
          ...services.map((s) => serviceSchema(s, s.href)),
        ]}
      />

      <section className="pt-36 pb-16 md:pt-48 md:pb-20">
        <Container className="max-w-4xl">
          <Reveal>
            <Eyebrow>Services</Eyebrow>
          </Reveal>
          <TextReveal
            as="h1"
            immediate
            delay={0.1}
            text="Packaging design services, from concept to *product page.*"
            className="mt-4 text-[2.4rem] font-bold leading-[1.04] tracking-[-0.035em] sm:text-6xl lg:text-[4.25rem]"
          />
          <Reveal delay={0.35}>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted">
              Packaging is the core expertise: strategic design and
              production-ready artwork. The same visual system is then extended
              into 3D, Amazon, A+ Content, Shopify and launch creative, so the
              product looks like one brand everywhere it&apos;s sold.
            </p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
              Unlike a large packaging design agency, Chopra Creative is
              founder-led: the packaging designer who scopes your project is
              the one who designs it and prepares the production files.
            </p>
          </Reveal>
          <Reveal delay={0.45}>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/contact" arrow>
                Start a project
              </ButtonLink>
              <ButtonLink href="#pricing" variant="secondary">
                See packages
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="pb-12">
        <Container className="space-y-6">
          {services.map((service, i) => {
            const detail = DETAILS[service.id];
            const work = detail.work.map((slug) => caseStudies.find((s) => s.slug === slug)!);
            return (
              <Reveal key={service.id}>
                <article
                  id={service.id}
                  className="grid scroll-mt-28 gap-10 rounded-[32px] border border-border p-7 md:p-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16"
                >
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-display text-3xl italic leading-none text-foreground/25">
                        0{i + 1}
                      </span>
                      {service.core && (
                        <span className="rounded-full bg-foreground px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-background">
                          Core expertise
                        </span>
                      )}
                    </div>
                    <h2 className="mt-6 text-3xl font-bold tracking-[-0.03em] sm:text-4xl">
                      {service.name}
                    </h2>
                    <p className="mt-4 text-base leading-relaxed text-foreground/85">
                      {service.summary}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-muted">
                      <span className="font-semibold text-foreground">Best for: </span>
                      {detail.forWho}
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                      <ButtonLink href="/contact" arrow magnetic={false}>
                        Start a project
                      </ButtonLink>
                      {service.id === "packaging-design" && (
                        <ButtonLink href={service.href} variant="secondary" magnetic={false}>
                          Production-ready packaging
                        </ButtonLink>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold">Includes</h3>
                    <ul className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                      {service.includes.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 border-b border-border pb-3 text-sm text-foreground/85"
                        >
                          <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-foreground/50" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <h3 className="mt-8 text-sm font-semibold">{detail.workLabel}</h3>
                    <ul className="mt-3 space-y-2">
                      {work.map((s) => (
                        <li key={s.slug}>
                          <Link
                            href={`/work/${s.slug}`}
                            className="group inline-flex items-center gap-2 text-sm text-foreground/85 hover:text-foreground"
                          >
                            <span className="link-underline pb-0.5">{s.title}</span>
                            <ArrowRight
                              aria-hidden
                              className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                            />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </Container>
      </section>

      <section className="py-24 md:py-32">
        <Container>
          <SectionHeading
            eyebrow="One visual system"
            title="Your product doesn't stop at the *package.*"
            description="Packaging → Production → Amazon → A+ Content → Shopify → Product launch → Social. Every asset is designed as one coherent system, built from the approved packaging files."
          />
          <EcosystemFlow className="mt-14" />
        </Container>
      </section>

      <PricingSection />
      <AuditSection />
      <div className="h-12 md:h-16" />
      <ProcessSection />
      <CtaSection />
    </>
  );
}
