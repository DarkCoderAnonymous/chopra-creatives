import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { principles } from "@/lib/data";

/** Communicate → Sell → Produce: the core differentiator. */
export function PrinciplesSection() {
  return (
    <section className="relative py-24 md:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <SectionHeading
            eyebrow="Packaging is product communication"
            title="Beautiful isn't *enough.*"
            description="Packaging has to do more than look good. It has to communicate what the product is, why it matters and why someone should choose it — while ultimately becoming a real package that can be produced."
          />

          <ol className="divide-y divide-border border-y border-border">
            {principles.map((p, i) => (
              <Reveal key={p.title} as="li" delay={i * 0.1}>
                <div className="grid gap-3 py-8 sm:grid-cols-[5rem_1fr] sm:gap-6 md:py-10">
                  <span className="font-display text-4xl italic leading-none text-foreground/25">
                    {p.number}
                  </span>
                  <div>
                    <h3 className="text-2xl font-bold tracking-[-0.02em] sm:text-3xl">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-base font-medium text-foreground/85">
                      {p.lead}
                    </p>
                    <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted">
                      {p.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
