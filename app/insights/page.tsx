import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";
import { TextReveal } from "@/components/ui/text-reveal";
import { Eyebrow } from "@/components/ui/section-heading";
import { CtaSection } from "@/components/home/cta-section";
import { insights } from "@/lib/insights";
import { breadcrumbSchema, JsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Insights: Packaging, Production & Ecommerce",
  description:
    "Practical notes on product packaging design: hierarchy, production-ready artwork, dielines, multi-SKU systems, Amazon images and A+ Content design.",
  alternates: { canonical: "/insights" },
};

export default function InsightsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Insights", path: "/insights" },
        ])}
      />
      <section className="pt-36 pb-16 md:pt-48 md:pb-20">
        <Container className="max-w-4xl">
          <Reveal>
            <Eyebrow>Insights</Eyebrow>
          </Reveal>
          <TextReveal
            as="h1"
            immediate
            delay={0.1}
            text="Notes on packaging that *works.*"
            className="mt-4 text-[2.6rem] font-bold leading-[1.02] tracking-[-0.035em] sm:text-6xl lg:text-7xl"
          />
          <Reveal delay={0.35}>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted">
              How packaging communicates, how it gets produced, and how it
              carries into Amazon and Shopify, written from real projects.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="pb-24 md:pb-32">
        <Container>
          <ul className="divide-y divide-border border-y border-border">
            {insights.map((post, i) => (
              <Reveal key={post.slug} as="li" delay={(i % 3) * 0.05}>
                <Link
                  href={`/insights/${post.slug}`}
                  className="group grid gap-3 py-8 md:grid-cols-[10rem_1fr_auto] md:items-baseline md:gap-10"
                >
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                    {post.topic} · {post.readingMinutes} min
                  </span>
                  <span>
                    <span className="block text-xl font-bold leading-snug tracking-tight sm:text-2xl">
                      {post.title}
                    </span>
                    <span className="mt-2 block max-w-2xl text-sm leading-relaxed text-muted">
                      {post.excerpt}
                    </span>
                  </span>
                  <ArrowUpRight
                    aria-hidden
                    className="hidden h-5 w-5 transition-transform duration-500 group-hover:rotate-45 md:block"
                  />
                </Link>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
