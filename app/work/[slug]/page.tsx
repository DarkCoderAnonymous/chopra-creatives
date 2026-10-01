import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";
import { TextReveal } from "@/components/ui/text-reveal";
import { Eyebrow } from "@/components/ui/section-heading";
import {
  GalleryGrid,
  GalleryOpenButton,
  GalleryProvider,
  GalleryTile,
} from "@/components/work/case-gallery";
import { ProductViewer } from "@/components/work/product-viewer";
import { WorkCard } from "@/components/work/work-card";
import { caseStudies, getCaseStudy } from "@/lib/data";
import { withActualSize } from "@/lib/image-size";

type Params = { slug: string };

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
    title: study.title,
    description: study.tagline,
    openGraph: {
      title: `${study.title} — Chopra Creative`,
      description: study.tagline,
      images: [{ url: study.heroImage.src }],
    },
  };
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

  // Every image on the page, once each, in reading order — the lightbox
  // browses this list no matter which image was clicked.
  const images = await withActualSize(
    [study.heroImage, ...study.gallery, study.dielineImage].filter(
      (img, i, all) => all.findIndex((other) => other.src === img.src) === i,
    ),
  );
  const indexOf = (src: string) => images.findIndex((img) => img.src === src);

  return (
    <>
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
                  All work
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
                      <dt className="text-muted">Packaging type</dt>
                      <dd className="mt-1 font-medium">
                        {study.packagingType}
                      </dd>
                    </div>
                    <div className="col-span-2">
                      <dt className="text-muted">Scope</dt>
                      <dd className="mt-1 font-medium">
                        {study.scope.join(" · ")}
                      </dd>
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

          <section className="py-20 md:py-32">
            <Container className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr]">
              <div className="space-y-12 lg:sticky lg:top-28 lg:self-start">
                <div>
                  <Eyebrow as="h2">The challenge</Eyebrow>
                  <div className="mt-4 space-y-4">
                    {study.challenge.map((p) => (
                      <p
                        key={p}
                        className="text-base leading-relaxed text-foreground/85"
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                </div>

                <div>
                  <Eyebrow as="h2">Creative direction</Eyebrow>
                  <div className="mt-4 space-y-4">
                    {study.direction.map((p) => (
                      <p
                        key={p}
                        className="text-base leading-relaxed text-foreground/85"
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-16">
                <div>
                  <Eyebrow as="h2">Visual strategy</Eyebrow>
                  <div className="mt-6 grid gap-6 sm:grid-cols-2">
                    {study.visualStrategy.map((item) => (
                      <div
                        key={item.title}
                        className="card-premium rounded-3xl border border-border p-6 md:p-7"
                      >
                        <h3 className="text-lg font-semibold tracking-tight">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted">
                          {item.body}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {study.gallery.length > 0 && (
                  <GalleryGrid
                    indices={study.gallery.map((img) => indexOf(img.src))}
                  />
                )}

                <div>
                  <Eyebrow as="h2">Packaging system</Eyebrow>
                  <p className="mt-4 text-base leading-relaxed text-foreground/85">
                    {study.system}
                  </p>
                </div>

                <div className="grid gap-10 sm:grid-cols-2">
                  <div>
                    <Eyebrow as="h2">Structure & production</Eyebrow>
                    <ul className="mt-4 space-y-3">
                      {study.production.map((line) => (
                        <li
                          key={line}
                          className="flex gap-3 text-sm leading-relaxed text-foreground/85"
                        >
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

                  <GalleryTile
                    index={indexOf(study.dielineImage.src)}
                    sizes="(min-width: 640px) 30vw, 100vw"
                    className="aspect-[4/3]"
                  />
                </div>

                <div>
                  <Eyebrow as="h2">Digital & physical presence</Eyebrow>
                  <div className="mt-6 grid gap-6 sm:grid-cols-2">
                    {study.presence.map((item) => (
                      <div key={item.title}>
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted">
                          {item.body}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <Reveal>
                  <blockquote
                    className="relative overflow-hidden rounded-[32px] border border-border bg-surface p-8 font-display text-2xl italic leading-snug text-foreground sm:p-12 sm:text-3xl"
                  >
                    <span
                      aria-hidden
                      className="absolute left-0 top-0 h-full w-1"
                      style={{ backgroundColor: study.accent }}
                    />
                    <span
                      aria-hidden
                      className="absolute -right-2 -top-10 font-display text-[10rem] leading-none text-foreground/5"
                    >
                      &rdquo;
                    </span>
                    <span className="relative">{study.takeaway}</span>
                  </blockquote>
                </Reveal>
              </div>
            </Container>
          </section>
        </article>
      </GalleryProvider>

      <section className="border-t border-border py-24 md:py-32">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <Eyebrow>Next project</Eyebrow>
              <TextReveal
                text={next.client}
                className="mt-4 text-4xl font-bold tracking-[-0.035em] sm:text-6xl"
              />
            </div>
            <Link
              href="/work"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-accent"
            >
              View all work
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
