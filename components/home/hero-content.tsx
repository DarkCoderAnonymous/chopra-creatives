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
          Product Packaging &amp; Ecommerce Design Studio
        </span>
      </Reveal>

      <TextReveal
        as="h1"
        immediate
        delay={0.15}
        text="Packaging that communicates, sells and is *ready for production.*"
        className="mt-7 text-[2.6rem] font-bold leading-[1.02] tracking-[-0.035em] sm:text-[3.5rem] lg:text-[3.75rem] lg:leading-[0.98] xl:text-[4.4rem]"
      />

      <Reveal delay={0.45}>
        <p className="mt-7 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          Chopra Creative is a founder-led product packaging and ecommerce
          design studio creating strategic, production-ready packaging and
          visual systems for consumer brands.
        </p>
        <p className="mt-3 max-w-xl text-sm font-medium text-foreground/75 sm:text-base">
          From packaging and production artwork to Amazon, Shopify and
          product launch creative.
        </p>
      </Reveal>

      <Reveal delay={0.55}>
        <div className="mt-9 flex flex-wrap items-center gap-3 sm:mt-10">
          <ButtonLink href="/contact" arrow>
            Start a project
          </ButtonLink>
          <ButtonLink href="/work" variant="secondary">
            View selected work
          </ButtonLink>
        </div>
      </Reveal>

      <Reveal delay={0.6}>
        <div className="mt-10 lg:hidden">
          <HeroMobileStrip />
        </div>
      </Reveal>

      <Reveal delay={0.7}>
        {/* Dropped on short desktop viewports so the hero never runs under the nav. */}
        <div className="mt-10 md:mt-14 lg:[@media(max-height:860px)]:hidden">
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
