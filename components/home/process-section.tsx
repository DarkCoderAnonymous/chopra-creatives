import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { DrawLine } from "@/components/ui/draw-line";
import { processSteps } from "@/lib/data";

export function ProcessSection() {
  return (
    <section className="py-6 md:py-10">
      <Container>
        <div className="relative overflow-hidden rounded-[32px] border border-border bg-surface px-6 py-16 sm:px-10 md:rounded-[40px] md:px-14 md:py-24">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--grad-c)_22%,transparent),transparent)] blur-2xl"
          />
          <SectionHeading
            eyebrow="How we work"
            title="From flat artwork to *retail-ready* product."
            description="The same four-stage process runs across every packaging structure — pouch, jar label, or rigid carton."
            className="relative"
          />

          <div className="relative mt-16 md:mt-20">
            <DrawLine className="absolute inset-x-0 top-0 hidden lg:block" />
            <ol className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {processSteps.map((step, i) => (
                <Reveal
                  key={step.number}
                  as="li"
                  delay={0.15 + i * 0.12}
                  className="group relative h-full lg:pt-10"
                >
                  <span
                    aria-hidden
                    className="absolute -top-[5px] left-0 hidden h-[11px] w-[11px] rounded-full border-2 border-surface bg-[var(--grad-b)] shadow-[0_0_0_4px_color-mix(in_oklab,var(--grad-b)_18%,transparent)] lg:block"
                  />
                  <span className="font-display text-6xl italic leading-none text-foreground/15 transition-colors duration-500 group-hover:text-foreground/40">
                    {step.number}
                  </span>
                  <h3 className="mt-5 text-lg font-semibold leading-snug tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">
                    {step.body}
                  </p>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}
