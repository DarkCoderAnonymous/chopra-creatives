import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";
import { TextReveal } from "@/components/ui/text-reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { PrinciplesSection } from "@/components/home/principles-section";
import { CtaSection } from "@/components/home/cta-section";
import {
  caseStudies,
  getService,
  inquirySteps,
  pricingNote,
  servicePackages,
} from "@/lib/data";
import { breadcrumbSchema, faqSchema, JsonLd, serviceSchema } from "@/lib/schema";

const PATH = "/production-ready-packaging-design";

export const metadata: Metadata = {
  title: "Production-Ready Packaging Design Services",
  description:
    "Product packaging design that communicates, sells and is ready for production: packaging strategy, design, dielines, print-ready artwork and 3D visualization.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "Production-Ready Packaging Design — Chopra Creative",
    description:
      "Strategic product packaging design delivered as accurate, production-ready artwork and dielines.",
  },
};

/** What "production-ready" means, illustrated with real project specs. */
const REQUIREMENTS = [
  {
    title: "Built on the real dieline",
    body: "Artwork is laid out on the structure's actual geometry — panels, gussets, seals, zippers and tear notches — not on a flat rectangle.",
    proof: "Dumbbell Nuts: 160 × 230mm pouch, 45mm bottom gusset, 13mm zipper 25mm below the top edge.",
    slug: "dumbbell-nuts",
  },
  {
    title: "Bleed, trim and safe margins",
    body: "Backgrounds extend past the cut line and critical copy stays inside a safe zone, so die-cutting variance never leaves white edges or clips text.",
    proof: "MitroCore: 230 × 45mm trim, 236 × 51mm bleed, 3mm safe margin.",
    slug: "mitrocore",
  },
  {
    title: "Separated, labelled layers",
    body: "Dieline, background art, visual elements and live text sit on their own layers, with the dieline on a non-printing layer, for a clean prepress handoff.",
    proof: "MitroCore: 0.25pt overprint dieline on a dedicated non-printing layer.",
    slug: "mitrocore",
  },
  {
    title: "Panels that survive forming",
    body: "Barcodes, batch codes and regulatory copy are placed on flat, stable zones, and continuous graphics are planned across folds and seams.",
    proof: "Carolina: continuous artwork across front, gussets and back with a full 0.125in bleed for bag forming.",
    slug: "carolina-rice",
  },
];

const STRUCTURES = [
  { slug: "mitrocore", label: "Wrap-around jar label" },
  { slug: "natur-paws", label: "Flat-bottom gusset pouch" },
  { slug: "dumbbell-nuts", label: "Stand-up pouch, multi-SKU" },
  { slug: "carolina-rice", label: "Flexographic gusset pouch" },
  { slug: "hyggeoxy", label: "Tuck-end folding carton" },
  { slug: "instant-love", label: "Cup sleeve for a tapered cup" },
];

const FAQS = [
  {
    q: "What does production-ready packaging design mean?",
    a: "It means the approved design is delivered as accurate artwork built on the packaging's real dieline — with correct bleed, trim and safe margins, separated layers and stable zones for barcodes and regulatory copy — so it can go to a printer without being rebuilt.",
  },
  {
    q: "Which packaging structures do you design for?",
    a: "The portfolio includes wrap-around jar labels, flat-bottom and stand-up gusset pouches, flexographic printed pouches, tuck-end folding cartons and a cup sleeve. Each case study shows the dieline and production specs.",
  },
  {
    q: "Can you design a packaging system for multiple SKUs?",
    a: "Yes. The Dumbbell Nuts project is a five-flavor cashew line built on a modular visual matrix with color-coded flavor banners, so new SKUs can be added without losing brand recognition.",
  },
  {
    q: "Do you also create Amazon, A+ Content and Shopify creative?",
    a: "Yes. The Product Launch and Brand Growth System services extend the packaging into Amazon images, A+ Content, Shopify product creative and launch creative, using the same visual system.",
  },
  {
    q: "How much does packaging design cost?",
    a: `Packages start at ${servicePackages.map((p) => `${p.price} (${p.name})`).join(", ")}. ${pricingNote} Every project is scoped in a written proposal before payment.`,
  },
  {
    q: "How does a project start?",
    a: `${inquirySteps.map((s) => s.title).join(" → ")}. You share the product, channels, timeline and budget; after a consultation you receive a written proposal.`,
  },
];

export default function ProductionReadyPage() {
  const service = getService("packaging-design");
  const dielines = ["mitrocore", "dumbbell-nuts", "carolina-rice"].map(
    (slug) => caseStudies.find((s) => s.slug === slug)!,
  );

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: "Production-Ready Packaging Design", path: PATH },
          ]),
          serviceSchema(
            { name: "Production-Ready Packaging Design", summary: service.summary, includes: service.includes },
            PATH,
          ),
          faqSchema(FAQS),
        ]}
      />

      <section className="pt-36 pb-16 md:pt-48 md:pb-20">
        <Container className="max-w-4xl">
          <Reveal>
            <nav aria-label="Breadcrumb" className="text-sm text-muted">
              <Link href="/services" className="hover:text-foreground">
                Services
              </Link>
              <span aria-hidden> / </span>
              <span className="text-foreground">Production-ready packaging design</span>
            </nav>
          </Reveal>
          <TextReveal
            as="h1"
            immediate
            delay={0.1}
            text="Production-ready packaging *design.*"
            className="mt-6 text-[2.6rem] font-bold leading-[1.02] tracking-[-0.035em] sm:text-6xl lg:text-7xl"
          />
          <Reveal delay={0.35}>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted">
              Strategic product packaging design that communicates what the
              product is, gives people a reason to choose it — and arrives at
              your printer as accurate, production-ready artwork.
            </p>
          </Reveal>
          <Reveal delay={0.45}>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/contact?package=launch" arrow>
                Start a project
              </ButtonLink>
              <ButtonLink href="/work" variant="secondary">
                See the dielines
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="pb-24 md:pb-32">
        <Container>
          <SectionHeading
            eyebrow="Design + production"
            title="What *production-ready* actually means."
            description="A beautiful flat comp is not a dieline. These are the requirements every pack is built to — shown with real specs from the portfolio."
          />
          <ol className="mt-14 grid gap-5 md:grid-cols-2">
            {REQUIREMENTS.map((r, i) => (
              <Reveal key={r.title} as="li" delay={(i % 2) * 0.08} className="h-full">
                <div className="flex h-full flex-col rounded-[28px] border border-border p-7 md:p-8">
                  <span className="font-display text-3xl italic leading-none text-foreground/25">
                    0{i + 1}
                  </span>
                  <h3 className="mt-6 text-xl font-bold tracking-tight">{r.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{r.body}</p>
                  <Link
                    href={`/work/${r.slug}`}
                    className="mt-6 block rounded-2xl bg-foreground/[0.04] p-4 text-sm leading-relaxed text-foreground/85 hover:bg-foreground/[0.07]"
                  >
                    {r.proof}
                  </Link>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <section className="pb-24 md:pb-32">
        <Container>
          <SectionHeading
            eyebrow="Real production files"
            title="Dielines from the *portfolio.*"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {dielines.map((s) => (
              <Reveal key={s.slug}>
                <Link href={`/work/${s.slug}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] border border-border bg-white">
                    <Image
                      src={s.dielineImage.src}
                      alt={s.dielineImage.alt}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-contain p-3 transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                  <p className="mt-4 text-sm font-semibold">{s.client}</p>
                  <p className="text-sm text-muted">{s.packagingType}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <PrinciplesSection />

      <section className="py-24 md:py-32">
        <Container className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading eyebrow="What's included" title="From strategy to *print-ready* files." />
            <ul className="mt-10 space-y-3">
              {service.includes.map((item) => (
                <li key={item} className="flex items-start gap-3 border-b border-border pb-3 text-base">
                  <Check aria-hidden className="mt-1 h-4 w-4 shrink-0 text-foreground/50" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-muted">
              Need the ecommerce side too? See{" "}
              <Link href="/services#product-launch" className="link-underline text-foreground">
                Product Launch
              </Link>{" "}
              and{" "}
              <Link href="/services#brand-growth-system" className="link-underline text-foreground">
                Brand Growth System
              </Link>
              .
            </p>
          </div>
          <div>
            <SectionHeading eyebrow="Structures" title="Packaging I've *designed.*" />
            <ul className="mt-10 divide-y divide-border border-y border-border">
              {STRUCTURES.map((item) => {
                const s = caseStudies.find((c) => c.slug === item.slug)!;
                return (
                  <li key={item.slug}>
                    <Link
                      href={`/work/${s.slug}`}
                      className="group flex items-center justify-between gap-4 py-4"
                    >
                      <span>
                        <span className="block text-base font-semibold">{item.label}</span>
                        <span className="text-sm text-muted">
                          {s.client} · {s.industry}
                        </span>
                      </span>
                      <ArrowRight
                        aria-hidden
                        className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1"
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
            <p className="mt-8 text-sm leading-relaxed text-muted">
              For food packaging design, supplement packaging design, pet,
              beauty and personal-care, and other consumer product brands.
            </p>
          </div>
        </Container>
      </section>

      <section className="pb-24 md:pb-32">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="FAQ" title="Production-ready packaging, *answered.*" />
          <div className="mt-10 divide-y divide-border border-y border-border">
            {FAQS.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-base font-semibold [&::-webkit-details-marker]:hidden">
                  <h3>{f.q}</h3>
                  <span
                    aria-hidden
                    className="text-xl leading-none text-muted transition-transform duration-300 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
