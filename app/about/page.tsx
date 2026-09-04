import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";
import { ProcessSection } from "@/components/home/process-section";
import { CapabilitiesSection } from "@/components/home/capabilities-section";
import { PaletteSection } from "@/components/about/palette-section";
import { CtaSection } from "@/components/home/cta-section";

export const metadata: Metadata = {
  title: "About",
  description:
    "Chopra Creative is a packaging design studio working across brand identity, structural dielines, and 3D visualization for retail products.",
};

export default function AboutPage() {
  return (
    <>
      <section className="pt-32 pb-16 md:pt-40 md:pb-20">
        <Container className="max-w-3xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">
              About the studio
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
              Packaging is a system, not a graphic.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-muted">
              <p>
                Chopra Creative designs packaging for brands that have to win
                on a physical shelf and on a scrolling screen at the same
                time. That means every project runs through the same
                discipline: a visual identity built around the product’s
                category, a structural dieline engineered to exact print
                specifications, and a 3D pass that catches wrapping, seam,
                and lighting problems before a print run is committed.
              </p>
              <p>
                We’ve worked across nutraceuticals, pet care, gourmet snacks,
                kitchenware, food staples, and one-off custom packaging —
                each with its own structure, from liposomal supplement jars
                to flexographic rice pouches to a hand-assembled cup sleeve.
                The category changes; the process doesn’t.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <ProcessSection />
      <CapabilitiesSection />
      <PaletteSection />
      <CtaSection />
    </>
  );
}
