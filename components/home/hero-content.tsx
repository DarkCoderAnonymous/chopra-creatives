import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { TextReveal } from "@/components/ui/text-reveal";
import { ButtonLink } from "@/components/ui/button-link";
import { HeroMobileStrip } from "@/components/three/hero-mobile-strip";
import { caseStudies } from "@/lib/data";

export function HeroContent() {
  return (
    <div className="max-w-2xl">
      <Reveal>
        <span className="inline-flex items-center gap-2.5 rounded-full border border-border bg-surface/60 py-1.5 pl-2.5 pr-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted backdrop-blur-md">
          <span
            aria-hidden
            className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-[var(--grad-b)]"
          />
          Packaging Design Studio
        </span>
      </Reveal>

      <TextReveal
        as="h1"
        immediate
        delay={0.15}
        text="Packaging that gets *picked* off crowded shelves."
        className="mt-7 text-[2.75rem] font-bold leading-[1.02] tracking-[-0.035em] sm:text-6xl lg:text-[5.25rem] lg:leading-[0.98]"
      />

      <Reveal delay={0.45}>
        <p className="mt-7 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
          We design brand identity, structural dielines, and 3D-ready
          artwork for food, supplement, and consumer-goods packaging — built
          to hold up on a shelf and on a thumbnail.
        </p>
      </Reveal>

      <Reveal delay={0.55}>
        <div className="mt-9 flex flex-wrap items-center gap-3 sm:mt-10">
          <ButtonLink href="/work" arrow>
            View our work
          </ButtonLink>
          <ButtonLink href="/contact" variant="secondary">
            Start a project
          </ButtonLink>
        </div>
      </Reveal>

      <Reveal delay={0.6}>
        <div className="mt-10 md:hidden">
          <HeroMobileStrip />
        </div>
      </Reveal>

      <Reveal delay={0.7}>
        <div className="mt-10 md:mt-14">
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
            <span aria-hidden className="h-px w-8 bg-border" />
            Selected work
          </p>
          <div className="mt-4 flex flex-wrap gap-x-7 gap-y-3">
            {caseStudies.map((study) => (
              <Link
                key={study.slug}
                href={`/work/${study.slug}`}
                className="link-underline pb-0.5 text-sm font-medium text-foreground/65 hover:text-foreground"
              >
                {study.client}
              </Link>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
}
