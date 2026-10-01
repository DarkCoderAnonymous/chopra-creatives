import { Layers, ScanEye, Signal } from "lucide-react";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";

const POINTS = [
  {
    icon: ScanEye,
    title: "Invisible at thumbnail size",
    body: "A pack that only works at arm's length loses on a 100px e-commerce thumbnail before a shopper ever reads the claim.",
  },
  {
    icon: Layers,
    title: "Inconsistent across SKUs",
    body: "Every flavor or variant designed in isolation costs brand recognition the moment a line grows past two or three products.",
  },
  {
    icon: Signal,
    title: "No production discipline",
    body: "A flat comp isn't a dieline. Without trim, bleed, and safe-margin specs, a great layout can still fail on press.",
  },
];

export function ProblemSection() {
  return (
    <section className="relative py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow="The problem"
          title="Most packaging doesn't lose on taste. It loses on *shelf.*"
          description="A striking flat comp is only half the job. Packaging has to survive a crowded shelf, a small screen, and a print run — all at once."
        />

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {POINTS.map((point, i) => (
            <Reveal key={point.title} delay={i * 0.1} className="h-full">
              <SpotlightCard className="group flex h-full flex-col p-7 md:p-8">
                <div className="flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-background text-foreground transition-colors duration-500 group-hover:border-transparent group-hover:bg-foreground group-hover:text-background">
                    <point.icon className="h-5 w-5" aria-hidden />
                  </div>
                  <span className="font-display text-3xl italic text-muted/60">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-14 text-xl font-semibold tracking-tight">
                  {point.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {point.body}
                </p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
