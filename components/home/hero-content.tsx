import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { HeroMobileStrip } from "@/components/three/hero-mobile-strip";
import { caseStudies } from "@/lib/data";

export function HeroContent() {
  return (
    <div className="max-w-2xl">
      <Reveal>
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted backdrop-blur-sm">
          Packaging Design Studio
        </span>
      </Reveal>

      <Reveal delay={0.05}>
        <h1 className="mt-6 text-[2.5rem] font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-[4.25rem] lg:leading-[1.03]">
          Packaging that gets{" "}
          <span className="brand-gradient-text">picked</span> off crowded
          shelves.
        </h1>
      </Reveal>

      <Reveal delay={0.1}>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          We design brand identity, structural dielines, and 3D-ready
          artwork for food, supplement, and consumer-goods packaging — built
          to hold up on a shelf and on a thumbnail.
        </p>
      </Reveal>

      <Reveal delay={0.15}>
        <div className="mt-8 flex flex-wrap items-center gap-4 sm:mt-9">
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground shadow-[0_0_0_1px_rgba(255,255,255,0.08)] transition-transform hover:scale-[1.03] active:scale-[0.98]"
          >
            View our work
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-6 py-3.5 text-sm font-semibold text-foreground backdrop-blur-sm transition-colors hover:border-accent hover:text-accent"
          >
            Start a project
          </Link>
        </div>
      </Reveal>

      <Reveal delay={0.18}>
        <div className="mt-10 md:hidden">
          <HeroMobileStrip />
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <div className="mt-10 md:mt-14">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">
            Selected work
          </p>
          <div className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
            {caseStudies.map((study) => (
              <Link
                key={study.slug}
                href={`/work/${study.slug}`}
                className="text-sm font-medium text-foreground/70 transition-colors hover:text-accent"
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
