import Image from "next/image";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";
import { Marquee } from "@/components/ui/marquee";
import { caseStudies } from "@/lib/data";

export function BrandBanner() {
  const items = caseStudies.map((s) => `${s.client} — ${s.industry}`);

  return (
    <section className="overflow-hidden border-y border-border bg-surface py-16 md:py-20">
      <Container>
        <Reveal>
          <p className="text-center text-xs font-semibold uppercase tracking-wider text-muted">
            One studio, one packaging discipline
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <div className="relative mx-auto mt-8 aspect-[21/9] w-full max-w-4xl overflow-hidden rounded-3xl border border-border shadow-2xl shadow-black/10">
            <Image
              src="/images/brand/banner.png"
              alt="Chopra Creative brand mark on a deep indigo field"
              fill
              sizes="(min-width: 1024px) 900px, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </Container>

      <div className="mt-14">
        <Reveal delay={0.1}>
          <Marquee items={items} />
        </Reveal>
      </div>
    </section>
  );
}
