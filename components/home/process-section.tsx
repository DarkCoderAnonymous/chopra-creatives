import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { processSteps } from "@/lib/data";

export function ProcessSection() {
  return (
    <section className="border-t border-border bg-surface py-20 md:py-28">
      <Container>
        <SectionHeading
          eyebrow="How we work"
          title="From flat artwork to retail-ready product."
          description="The same four-stage process runs across every packaging structure — pouch, jar label, or rigid carton."
        />

        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, i) => (
            <Reveal key={step.number} delay={i * 0.08} className="h-full">
              <div className="h-full bg-background p-7">
                <span className="text-sm font-semibold text-accent">
                  {step.number}
                </span>
                <h3 className="mt-3 text-lg font-semibold leading-snug">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
