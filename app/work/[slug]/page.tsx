import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";
import { ProductViewer } from "@/components/work/product-viewer";
import { WorkCard } from "@/components/work/work-card";
import { caseStudies, getCaseStudy } from "@/lib/data";

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

  return (
    <>
      <article>
        <section className="pt-32 pb-14 md:pt-40 md:pb-20">
          <Container>
            <Reveal>
              <Link
                href="/work"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden />
                All work
              </Link>
            </Reveal>

            <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <Reveal delay={0.05}>
                  <span
                    className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold text-white"
                    style={{ backgroundColor: study.accent }}
                  >
                    {study.industry}
                  </span>
                </Reveal>
                <Reveal delay={0.1}>
                  <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
                    {study.title}
                  </h1>
                </Reveal>
                <Reveal delay={0.15}>
                  <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
                    {study.tagline}
                  </p>
                </Reveal>
              </div>

              <Reveal delay={0.2}>
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

        <Reveal>
          <Container>
            <ProductViewer
              src={study.heroImage.src}
              alt={study.heroImage.alt}
              aspect={study.heroImage.width / study.heroImage.height}
              className="aspect-[16/10] w-full overflow-hidden rounded-3xl border border-border bg-surface"
            />
          </Container>
        </Reveal>

        <section className="py-16 md:py-24">
          <Container className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="space-y-12 lg:sticky lg:top-28 lg:self-start">
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-accent">
                  The challenge
                </h2>
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
                <h2 className="text-sm font-semibold uppercase tracking-wider text-accent">
                  Creative direction
                </h2>
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
                <h2 className="text-sm font-semibold uppercase tracking-wider text-accent">
                  Visual strategy
                </h2>
                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  {study.visualStrategy.map((item) => (
                    <div
                      key={item.title}
                      className="rounded-2xl border border-border bg-surface p-6"
                    >
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">
                        {item.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {study.gallery.length > 0 && (
                <div className="grid gap-6 sm:grid-cols-2">
                  {study.gallery.map((img) => (
                    <div
                      key={img.src}
                      className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border"
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(min-width: 640px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}

              <div>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-accent">
                  Packaging system
                </h2>
                <p className="mt-4 text-base leading-relaxed text-foreground/85">
                  {study.system}
                </p>
              </div>

              <div className="grid gap-10 sm:grid-cols-2">
                <div>
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-accent">
                    Structure & production
                  </h2>
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

                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border">
                  <Image
                    src={study.dielineImage.src}
                    alt={study.dielineImage.alt}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>

              <div>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-accent">
                  Digital & physical presence
                </h2>
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

              <blockquote className="rounded-2xl border-l-4 bg-surface p-6 text-lg italic leading-relaxed text-foreground/90 sm:p-8"
                style={{ borderColor: study.accent }}
              >
                {study.takeaway}
              </blockquote>
            </div>
          </Container>
        </section>
      </article>

      <section className="border-t border-border py-20">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                Next project
              </p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
                {next.client}
              </h2>
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
