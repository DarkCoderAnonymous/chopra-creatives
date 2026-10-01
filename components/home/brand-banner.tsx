import Image from "next/image";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";
import { Marquee } from "@/components/ui/marquee";
import { ScrollScale } from "@/components/ui/scroll-scale";
import { Eyebrow } from "@/components/ui/section-heading";
import { caseStudies } from "@/lib/data";

export function BrandBanner() {
  const items = caseStudies.map((s) => ({ primary: s.client, secondary: s.industry }));

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <Container>
        <Reveal>
          <Eyebrow centered>One studio, one packaging discipline</Eyebrow>
        </Reveal>
        <ScrollScale className="relative mx-auto mt-10 aspect-[21/9] w-full max-w-5xl rounded-[28px] border border-border shadow-[0_40px_120px_-40px_color-mix(in_oklab,var(--grad-c)_60%,transparent)]">
          <Image
            src="/images/brand/banner.png"
            alt="Chopra Creative brand mark on a deep indigo field"
            fill
            sizes="(min-width: 1024px) 1024px, 100vw"
            className="object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(115deg,transparent_40%,rgba(255,255,255,0.08)_50%,transparent_60%)]"
          />
        </ScrollScale>
      </Container>

      <div className="mt-16 md:mt-20">
        <Reveal delay={0.1}>
          <Marquee items={items} />
        </Reveal>
      </div>
    </section>
  );
}
