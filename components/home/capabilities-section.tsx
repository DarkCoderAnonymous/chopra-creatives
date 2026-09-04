import { Box, Palette, Scan, Sparkles } from "lucide-react";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { capabilities } from "@/lib/data";

const ICONS = [Palette, Scan, Box, Sparkles];

export function CapabilitiesSection() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <SectionHeading
          eyebrow="Capabilities"
          title="Everything a packaging launch needs, under one roof."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {capabilities.map((cap, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <Reveal key={cap.title} delay={i * 0.06}>
                <div className="flex h-full gap-5 rounded-2xl border border-border bg-surface p-6">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{cap.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {cap.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
