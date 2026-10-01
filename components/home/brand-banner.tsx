import { Reveal } from "@/components/ui/reveal";
import { Marquee } from "@/components/ui/marquee";
import { caseStudies } from "@/lib/data";

export function BrandBanner() {
  const items = caseStudies.map((s) => ({ primary: s.client, secondary: s.industry }));

  return (
    <section className="relative overflow-hidden py-16 md:py-20">
      <Reveal delay={0.1}>
        <Marquee items={items} />
      </Reveal>
    </section>
  );
}
