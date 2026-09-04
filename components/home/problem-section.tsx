import { Layers, ScanEye, Signal } from "lucide-react";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

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
    <section className="border-t border-border bg-surface py-20 md:py-28">
      <Container>
        <SectionHeading
          eyebrow="The problem"
          title="Most packaging doesn't lose on taste. It loses on shelf."
          description="A striking flat comp is only half the job. Packaging has to survive a crowded shelf, a small screen, and a print run — all at once."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {POINTS.map((point, i) => (
            <Reveal key={point.title} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-border bg-background p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <point.icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="mt-5 text-lg font-semibold">{point.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {point.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
