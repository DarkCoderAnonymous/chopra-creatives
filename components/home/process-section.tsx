import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { DrawLine } from "@/components/ui/draw-line";
import { inquirySteps, processSteps } from "@/lib/data";

export function ProcessSection() {
  return (
    <section id="process" className="scroll-mt-24 py-6 md:py-10">
      <Container>
        <div className="relative overflow-hidden rounded-[32px] border border-border bg-surface px-6 py-16 sm:px-10 md:rounded-[40px] md:px-14 md:py-24">
          <SectionHeading
            eyebrow="Process"
            title="From product brief to *production-ready* files."
            description="The same discipline runs across every structure (pouch, jar label, carton or sleeve) and then extends into ecommerce."
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
                    className="absolute -top-[5px] left-0 hidden h-[11px] w-[11px] rounded-full border-2 border-surface bg-foreground lg:block"
                  />
                  <span className="font-display text-6xl italic leading-none text-foreground/15 transition-colors duration-500 group-hover:text-foreground/40">
                    {step.number}
                  </span>
                  <h3 className="mt-5 text-lg font-semibold leading-snug tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">{step.body}</p>
                </Reveal>
              ))}
            </ol>
          </div>

          <Reveal delay={0.1}>
            <div className="mt-16 border-t border-border pt-10 md:mt-20">
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
                How a project starts
              </h3>
              <ol className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
                {inquirySteps.map((step, i) => (
                  <li key={step.title}>
                    <span className="font-display text-2xl italic leading-none text-foreground/30">
                      0{i + 1}
                    </span>
                    <p className="mt-2 text-sm font-semibold">{step.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{step.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
