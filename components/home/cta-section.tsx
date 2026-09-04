import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/lib/data";

export function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-[#0a0917] py-20 text-white md:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,color-mix(in_oklab,var(--accent-2)_35%,transparent),transparent)]"
      />
      <Container className="relative text-center">
        <Reveal>
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight sm:text-5xl">
            Ready for packaging that earns the shelf?
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/70">
            Tell us about your product and we&apos;ll scope the identity,
            dieline, and 3D work it needs to launch.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[#0a0917] transition-transform hover:scale-[1.03] active:scale-[0.98]"
            >
              Start a project
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:border-white/60"
            >
              {siteConfig.email}
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
