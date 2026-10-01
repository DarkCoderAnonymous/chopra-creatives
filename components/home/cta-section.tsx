import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";
import { TextReveal } from "@/components/ui/text-reveal";
import { ButtonLink } from "@/components/ui/button-link";
import { siteConfig } from "@/lib/data";

export function CtaSection() {
  return (
    <section className="px-3 py-6 md:px-5 md:py-10">
      <div className="relative isolate mx-auto max-w-[96rem] overflow-hidden rounded-[32px] bg-[#0a0917] py-24 text-white md:rounded-[48px] md:py-36">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-[10%] top-[-30%] h-[80%] w-[50%] animate-aurora rounded-full bg-[radial-gradient(closest-side,rgba(83,58,156,0.85),transparent)] blur-3xl" />
          <div className="absolute right-[5%] top-[10%] h-[70%] w-[40%] animate-aurora-slow rounded-full bg-[radial-gradient(closest-side,rgba(57,184,253,0.45),transparent)] blur-3xl" />
          <div className="absolute bottom-[-40%] left-[35%] h-[70%] w-[35%] animate-aurora rounded-full bg-[radial-gradient(closest-side,rgba(255,10,69,0.4),transparent)] blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(70%_60%_at_50%_50%,black,transparent)]" />
        </div>

        <Container className="relative text-center">
          <Reveal>
            <p className="flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
              <span aria-hidden className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-[#ff0a45]" />
              Taking new projects
            </p>
          </Reveal>
          <TextReveal
            text="Ready for packaging that earns the *shelf?*"
            accentClassName="text-[#ff8f88]"
            className="mx-auto mt-6 max-w-4xl text-[2.6rem] font-bold leading-[1.02] tracking-[-0.035em] sm:text-6xl lg:text-7xl"
          />
          <Reveal delay={0.3}>
            <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">
              Tell us about your product and we&apos;ll scope the identity,
              dieline, and 3D work it needs to launch.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="mt-11 flex flex-wrap items-center justify-center gap-3">
              <ButtonLink href="/contact" variant="light" arrow>
                Start a project
              </ButtonLink>
              <ButtonLink href={`mailto:${siteConfig.email}`} variant="outline-light">
                {siteConfig.email}
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </div>
    </section>
  );
}
