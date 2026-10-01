import Link from "next/link";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { caseStudies, type WhyCriterion } from "@/lib/data";

/**
 * The criteria every pack is designed against, each proven with a real
 * decision from a case study (pulled from that study's `whyItWorks`).
 */
const CRITERIA: { criterion: WhyCriterion; question: string; example: string }[] = [
  { criterion: "Shelf recognition", question: "How does it earn attention?", example: "carolina-rice" },
  { criterion: "Information hierarchy", question: "What does the customer understand first?", example: "mitrocore" },
  { criterion: "Product communication", question: "What does the pack say in seconds?", example: "hyggeoxy" },
  { criterion: "Differentiation", question: "Why does it look unlike the category?", example: "natur-paws" },
  { criterion: "Ecommerce & thumbnail", question: "Does it still work at 100px?", example: "dumbbell-nuts" },
  { criterion: "SKU scalability", question: "Can the system grow with the line?", example: "dumbbell-nuts" },
  { criterion: "Production", question: "Is it built for real manufacturing?", example: "instant-love" },
];

export function WhySection() {
  const rows = CRITERIA.map((c) => {
    const study = caseStudies.find((s) => s.slug === c.example)!;
    const point = study.whyItWorks.find((w) => w.criterion === c.criterion)!;
    return { ...c, study, body: point.body };
  });

  return (
    <section className="py-24 md:py-32">
      <Container className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            eyebrow="Why my packaging works"
            title="Designed like a product decision, not *decoration.*"
            description="Every pack is checked against the same seven questions. Here is how real projects answered them."
          />
        </div>

        <ol className="divide-y divide-border border-y border-border">
          {rows.map((row, i) => (
            <Reveal key={row.criterion} as="li" delay={(i % 3) * 0.06}>
              <div className="grid gap-2 py-7 sm:grid-cols-[13rem_1fr] sm:gap-8">
                <div>
                  <h3 className="text-base font-semibold tracking-tight">{row.criterion}</h3>
                  <p className="mt-1 text-sm text-muted">{row.question}</p>
                </div>
                <div>
                  <p className="text-sm leading-relaxed text-foreground/85">{row.body}</p>
                  <Link
                    href={`/work/${row.study.slug}`}
                    className="link-underline mt-2 inline-block pb-0.5 text-xs font-semibold text-muted hover:text-foreground"
                  >
                    {row.study.client} — {row.study.industry}
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
