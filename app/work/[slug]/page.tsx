import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";
import { TextReveal } from "@/components/ui/text-reveal";
import { Eyebrow } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import {
  GalleryGrid,
  GalleryOpenButton,
  GalleryProvider,
  GalleryTile,
} from "@/components/work/case-gallery";
import { ProductViewer } from "@/components/work/product-viewer";
import { WorkCard } from "@/components/work/work-card";
import { caseStudies, getCaseStudy, getService } from "@/lib/data";
import { withActualSize } from "@/lib/image-size";
import { breadcrumbSchema, caseStudySchema, JsonLd } from "@/lib/schema";

type Params = { slug: string };

const isDev = process.env.NODE_ENV !== "production";

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};

  return {
    title: `${study.title}: ${study.industry} Packaging Design Case Study`,
    description: `${study.tagline} Packaging strategy, design, dieline and production artwork for ${study.client}.`,
    alternates: { canonical: `/work/${study.slug}` },
    openGraph: {
      title: `${study.title} | Chopra Creative`,
      description: study.tagline,
      images: [{ url: study.heroImage.src, alt: study.heroImage.alt }],
    },
  };
}

/** Chapter heading: numbered, anchored, and listed in the sticky index. */
function Chapter({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-28">
      <Reveal>
        <h2 id={`${id}-title`} className="flex items-baseline gap-4">
          <span className="font-display text-3xl italic leading-none text-foreground/25">
            {number}
          </span>
          <span className="text-2xl font-bold tracking-[-0.02em] sm:text-3xl">{title}</span>
        </h2>
      </Reveal>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function Paragraphs({ items }: { items: string[] }) {
  return (
    <div className="space-y-4">
      {items.map((p) => (
        <p key={p} className="text-base leading-relaxed text-foreground/85 sm:text-[17px]">
          {p}
        </p>
      ))}
    </div>
  );
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const currentIndex = caseStudies.findIndex((s) => s.slug === slug);
  const next = caseStudies[(currentIndex + 1) % caseStudies.length];
  const service = getService(study.relatedService);
  const hasEcommerce = study.ecommerceImages.length > 0;

  // Every image on the page, once each, in reading order — the lightbox
  // browses this list no matter which image was clicked.
  const images = await withActualSize(
    [study.heroImage, ...study.gallery, study.dielineImage, ...study.ecommerceImages].filter(
      (img, i, all) => all.findIndex((other) => other.src === img.src) === i,
    ),
  );
  const indexOf = (src: string) => images.findIndex((img) => img.src === src);

  const chapters = [
    { id: "challenge", title: "Challenge" },
    { id: "strategy", title: "Strategy" },
    { id: "design", title: "Design" },
    { id: "production", title: "Production" },
    { id: "ecommerce", title: "Ecommerce" },
    { id: "result", title: "Result" },
    { id: "why-it-works", title: "Why it works" },
  ];
  const num = (id: string) =>
    String(chapters.findIndex((c) => c.id === id) + 1).padStart(2, "0");

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Work", path: "/work" },
            { name: study.title, path: `/work/${study.slug}` },
          ]),
          caseStudySchema(study),
        ]}
      />
      <GalleryProvider images={images} accent={study.accent}>
        <article>
          <section className="pt-36 pb-14 md:pt-44 md:pb-20">
            <Container>
              <Reveal>
                <Link
                  href="/work"
                  className="group inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-foreground"
                >
                  <ArrowLeft
                    className="h-4 w-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-x-1"
                    aria-hidden
                  />
                  All case studies
                </Link>
              </Reveal>

              <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
                <div>
                  <Reveal delay={0.05}>
                    <span
                      className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white"
                      style={{ backgroundColor: study.accent }}
                    >
                      {study.industry}
                    </span>
                  </Reveal>
                  <TextReveal
                    as="h1"
                    immediate
                    delay={0.1}
                    text={study.title}
                    className="mt-5 max-w-4xl text-[2.6rem] font-bold leading-[1.02] tracking-[-0.035em] sm:text-6xl lg:text-7xl"
                  />
                  <Reveal delay={0.35}>
                    <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
                      {study.tagline}
                    </p>
                  </Reveal>
                </div>

                <Reveal delay={0.45}>
                  <dl className="grid grid-cols-2 gap-x-8 gap-y-4 border-t border-border pt-6 text-sm lg:w-80 lg:border-0 lg:pt-0">
                    <div>
                      <dt className="text-muted">Client</dt>
                      <dd className="mt-1 font-medium">{study.client}</dd>
                    </div>
                    <div>
                      <dt className="text-muted">Packaging</dt>
                      <dd className="mt-1 font-medium">{study.packagingType}</dd>
                    </div>
                    <div className="col-span-2">
                      <dt className="text-muted">Deliverables</dt>
                      <dd className="mt-1 font-medium">{study.scope.join(" · ")}</dd>
                    </div>
                  </dl>
                </Reveal>
              </div>
            </Container>
          </section>

          <Reveal delay={0.5} y={60}>
            <Container>
              <div className="relative">
                <ProductViewer
                  src={study.heroImage.src}
                  alt={study.heroImage.alt}
                  aspect={study.heroImage.width / study.heroImage.height}
                  className="aspect-[16/10] w-full overflow-hidden rounded-[32px] border border-border bg-surface shadow-[0_50px_120px_-50px_color-mix(in_oklab,var(--grad-c)_55%,transparent)]"
                />
                <GalleryOpenButton className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5" />
              </div>
            </Container>
          </Reveal>

          <div className="py-20 md:py-28">
            <Container className="grid gap-14 lg:grid-cols-[13rem_1fr] lg:gap-20">
              {/* Sticky chapter index (desktop). */}
              <nav aria-label="Case study chapters" className="hidden lg:block">
                <ol className="sticky top-28 space-y-2.5 text-sm">
                  {chapters.map((c, i) => (
                    <li key={c.id}>
                      <a
                        href={`#${c.id}`}
                        className="group flex items-baseline gap-3 text-muted transition-colors hover:text-foreground"
                      >
                        <span className="font-display italic text-foreground/30 group-hover:text-foreground/60">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {c.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>

              <div className="min-w-0 max-w-3xl space-y-20 md:space-y-24">
                <Chapter id="challenge" number={num("challenge")} title="Challenge">
                  <Paragraphs items={study.challenge} />
                </Chapter>

                <Chapter id="strategy" number={num("strategy")} title="Strategy">
                  <Paragraphs items={study.direction} />
                </Chapter>

                <Chapter id="design" number={num("design")} title="Design">
                  <div className="grid gap-5 sm:grid-cols-2">
                    {study.visualStrategy.map((item) => (
                      <div key={item.title} className="rounded-3xl border border-border p-6 md:p-7">
                        <h3 className="text-lg font-semibold tracking-tight">{item.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
                      </div>
                    ))}
                  </div>
                  {study.gallery.length > 0 && (
                    <div className="mt-12">
                      <GalleryGrid
                        label="Renders & mockups"
                        indices={study.gallery.map((img) => indexOf(img.src))}
                      />
                    </div>
                  )}
                </Chapter>

                <Chapter id="production" number={num("production")} title="Production">
                  <p className="text-base leading-relaxed text-foreground/85 sm:text-[17px]">
                    {study.system}
                  </p>
                  <div className="mt-8 grid gap-8 sm:grid-cols-2">
                    <div>
                      <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                        Technical specs
                      </h3>
                      <ul className="mt-4 space-y-3">
                        {study.production.map((line) => (
                          <li key={line} className="flex gap-3 text-sm leading-relaxed text-foreground/85">
                            <span
                              aria-hidden
                              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                              style={{ backgroundColor: study.accent }}
                            />
                            {line}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                        Dieline &amp; production artwork
                      </h3>
                      <GalleryTile
                        index={indexOf(study.dielineImage.src)}
                        sizes="(min-width: 640px) 30vw, 100vw"
                        className="mt-4 aspect-[4/3]"
                      />
                    </div>
                  </div>
                </Chapter>

                <Chapter id="ecommerce" number={num("ecommerce")} title="Ecommerce">
                  <p className="mb-6 text-sm text-muted">
                    How the pack was designed to work on screen as well as on shelf.
                  </p>
                  <div className="grid gap-6 sm:grid-cols-2">
                    {study.presence.map((item) => (
                      <div key={item.title}>
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
                      </div>
                    ))}
                  </div>
                  {hasEcommerce && (
                    <div className="mt-10 grid gap-4 sm:grid-cols-2">
                      {study.ecommerceImages.map((img) => (
                        <GalleryTile key={img.src} index={indexOf(img.src)} className="aspect-[4/3]" />
                      ))}
                    </div>
                  )}
                  {!hasEcommerce && isDev && (
                    <p className="mt-8 rounded-2xl border-2 border-dashed border-highlight/50 p-5 text-sm text-muted">
                      <strong className="text-highlight">[ECOMMERCE ASSETS]</strong>: dev-only
                      placeholder. Add real Amazon / A+ / Shopify / social images to{" "}
                      <code>ecommerceImages</code> for this study to show them here.
                    </p>
                  )}
                </Chapter>

                <Chapter id="result" number={num("result")} title="Result">
                  {study.results.length > 0 ? (
                    <ul className="mb-8 space-y-3">
                      {study.results.map((r) => (
                        <li key={r} className="text-lg font-semibold tracking-tight">
                          {r}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    isDev && (
                      <p className="mb-8 rounded-2xl border-2 border-dashed border-highlight/50 p-5 text-sm text-muted">
                        <strong className="text-highlight">[CLIENT RESULT]</strong>: dev-only
                        placeholder. Add verified, client-approved results to{" "}
                        <code>results</code>; this note never renders in production.
                      </p>
                    )
                  )}
                  <blockquote className="relative overflow-hidden rounded-[32px] border border-border bg-surface p-8 font-display text-2xl italic leading-snug text-foreground sm:p-10 sm:text-3xl">
                    <span
                      aria-hidden
                      className="absolute left-0 top-0 h-full w-1"
                      style={{ backgroundColor: study.accent }}
                    />
                    <span className="relative">{study.takeaway}</span>
                  </blockquote>
                  {study.testimonial && (
                    <figure className="mt-8">
                      <blockquote className="text-lg leading-relaxed">
                        &ldquo;{study.testimonial.quote}&rdquo;
                      </blockquote>
                      <figcaption className="mt-3 text-sm text-muted">
                        {study.testimonial.name}, {study.testimonial.role}
                      </figcaption>
                    </figure>
                  )}
                </Chapter>

                <Chapter id="why-it-works" number={num("why-it-works")} title="Why this packaging works">
                  <dl className="divide-y divide-border border-y border-border">
                    {study.whyItWorks.map((w) => (
                      <div key={w.criterion} className="grid gap-1.5 py-5 sm:grid-cols-[12rem_1fr] sm:gap-6">
                        <dt className="text-sm font-semibold">{w.criterion}</dt>
                        <dd className="text-sm leading-relaxed text-foreground/85">{w.body}</dd>
                      </div>
                    ))}
                  </dl>
                </Chapter>

                <Reveal>
                  <div className="rounded-[32px] bg-foreground p-8 text-background md:p-10">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-background/60">
                      Have a similar product?
                    </p>
                    <p className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
                      Start a {study.industry.toLowerCase()} packaging project.
                    </p>
                    <p className="mt-3 max-w-lg text-sm leading-relaxed text-background/70">
                      Related service: {service.name}. {service.summary}
                    </p>
                    <div className="mt-7 flex flex-wrap gap-3">
                      <ButtonLink href="/contact" variant="inverse" arrow magnetic={false}>
                        Start a project
                      </ButtonLink>
                      <ButtonLink href={service.href} variant="outline-light" magnetic={false}>
                        {service.cta}
                      </ButtonLink>
                    </div>
                  </div>
                </Reveal>
              </div>
            </Container>
          </div>
        </article>
      </GalleryProvider>

      <section className="border-t border-border py-24 md:py-32">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <Eyebrow>Next case study</Eyebrow>
              <TextReveal
                text={next.client}
                className="mt-4 text-4xl font-bold tracking-[-0.035em] sm:text-6xl"
              />
            </div>
            <Link
              href="/work"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-accent"
            >
              All case studies
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <div className="mt-8 max-w-md">
            <WorkCard study={next} />
          </div>
        </Container>
      </section>
    </>
  );
}
