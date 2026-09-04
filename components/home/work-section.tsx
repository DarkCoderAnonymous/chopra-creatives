import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { WorkCard } from "@/components/work/work-card";
import { caseStudies } from "@/lib/data";

export function WorkSection() {
  const featured = caseStudies.slice(0, 6);

  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Selected work"
            title="Recent packaging systems, built for retail."
            description="Six brands, six structures — from a liposomal supplement jar to a flexographic rice pouch — each engineered from identity through print-ready dieline."
            className="max-w-2xl"
          />
          <Reveal>
            <Link
              href="/work"
              className="group hidden shrink-0 items-center gap-2 text-sm font-semibold text-foreground hover:text-accent sm:inline-flex"
            >
              View all work
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((study, i) => (
            <Reveal key={study.slug} delay={(i % 3) * 0.08}>
              <WorkCard study={study} priority={i < 3} />
            </Reveal>
          ))}
        </div>

        <div className="mt-10 sm:hidden">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-accent"
          >
            View all work
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
