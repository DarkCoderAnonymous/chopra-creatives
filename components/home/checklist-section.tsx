import { Check } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";
import { TextReveal } from "@/components/ui/text-reveal";
import { ButtonLink } from "@/components/ui/button-link";
import { Eyebrow } from "@/components/ui/section-heading";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { readinessChecklist } from "@/lib/data";

export function ChecklistSection() {
  return (
    <section className="py-24 md:py-32">
      <Container className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <Eyebrow>Before you reach out</Eyebrow>
          </Reveal>
          <TextReveal
            text="A quick gut-check on *retail readiness.*"
            className="mt-4 text-[2.1rem] font-bold leading-[1.05] tracking-[-0.03em] sm:text-5xl"
          />
          <Reveal delay={0.2}>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg">
              These are the questions every one of our packaging systems has
              had to answer. If any of them give you pause, that&apos;s
              usually where a project starts.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-9">
              <ButtonLink href="/contact" arrow>
                Talk through your packaging
              </ButtonLink>
            </div>
          </Reveal>
        </div>

        <ul className="space-y-4">
          {readinessChecklist.map((item, i) => (
            <Reveal key={item} as="li" delay={i * 0.08}>
              <SpotlightCard className="group flex items-start gap-5 p-6 md:p-7">
                <span className="font-display text-2xl italic leading-none text-muted/70">
                  0{i + 1}
                </span>
                <span className="flex-1 text-base leading-relaxed text-foreground/90">
                  {item}
                </span>
                <span
                  aria-hidden
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-muted transition-[background-color,color,border-color,transform] duration-500 ease-[var(--ease-out-expo)] group-hover:scale-110 group-hover:border-transparent group-hover:bg-[var(--grad-b)] group-hover:text-white"
                >
                  <Check className="h-4 w-4" />
                </span>
              </SpotlightCard>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
