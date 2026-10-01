import { Box, Palette, Scan, Sparkles } from "lucide-react";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { capabilities } from "@/lib/data";

const ICONS = [Palette, Scan, Box, Sparkles];

export function CapabilitiesSection() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow="Capabilities"
          title="Everything a packaging launch needs, under *one roof.*"
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2">
          {capabilities.map((cap, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <Reveal key={cap.title} delay={(i % 2) * 0.1} className="h-full">
                <SpotlightCard className="group flex h-full gap-6 p-7 md:p-8">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-border bg-background text-foreground transition-[transform,background-color,color,border-color] duration-500 ease-[var(--ease-out-expo)] group-hover:-rotate-6 group-hover:scale-110 group-hover:border-transparent group-hover:bg-foreground group-hover:text-background">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight">
                      {cap.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted">
                      {cap.body}
                    </p>
                  </div>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
