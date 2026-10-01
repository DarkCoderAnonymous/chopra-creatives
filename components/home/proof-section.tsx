import Link from "next/link";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { caseStudies, industries, testimonials } from "@/lib/data";

const isDev = process.env.NODE_ENV !== "production";

/**
 * Proof built only from verifiable portfolio facts. Testimonials render
 * once real ones are added to `testimonials` in lib/data.ts; until then a
 * marked placeholder shows in development and nothing ships to production.
 */
export function ProofSection() {
  const largestSkuLine = caseStudies.find((s) => s.slug === "dumbbell-nuts")!;
  const facts = [
    { value: String(caseStudies.length), label: "Published case studies" },
    { value: String(industries.length), label: "Product categories" },
    { value: "5", label: `SKUs in one system: ${largestSkuLine.client}` },
    { value: "100%", label: "Of case studies include a production dieline" },
  ];

  return (
    <section className="py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow="Proof"
          title="Real products. Real dielines. Real *production.*"
          description="Every number here comes straight from the published case studies."
        />

        <dl className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-[28px] border border-border bg-border lg:grid-cols-4">
          {facts.map((fact, i) => (
            <Reveal key={fact.label} delay={i * 0.06} className="bg-background p-6 md:p-8">
              <dt className="sr-only">{fact.label}</dt>
              <dd>
                <span className="block text-4xl font-bold tracking-[-0.03em] md:text-5xl">
                  {fact.value}
                </span>
                <span className="mt-2 block text-sm leading-snug text-muted">{fact.label}</span>
              </dd>
            </Reveal>
          ))}
        </dl>

        <Reveal delay={0.1}>
          <div className="mt-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
              Brands in the portfolio
            </p>
            <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
              {caseStudies.map((study) => (
                <li key={study.slug}>
                  <Link
                    href={`/work/${study.slug}`}
                    className="link-underline pb-0.5 text-lg font-semibold tracking-tight text-foreground/80 hover:text-foreground"
                  >
                    {study.client}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {testimonials.length > 0 ? (
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {testimonials.map((t) => (
              <figure key={t.name} className="rounded-[28px] border border-border p-7 md:p-8">
                <blockquote className="font-display text-2xl italic leading-snug">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 text-sm">
                  <span className="font-semibold">{t.name}</span>
                  <span className="text-muted">, {t.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        ) : (
          isDev && (
            <div className="mt-14 rounded-[28px] border-2 border-dashed border-highlight/50 p-7 text-sm text-muted">
              <strong className="text-highlight">[TESTIMONIAL]</strong>: dev-only
              placeholder. Add real, client-approved quotes to{" "}
              <code>testimonials</code> in <code>lib/data.ts</code>; this block is
              hidden in production until then.
            </div>
          )
        )}
      </Container>
    </section>
  );
}
