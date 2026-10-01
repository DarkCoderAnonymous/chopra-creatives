import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { caseStudies } from "@/lib/data";
import { getInsight, insights, type InsightBlock } from "@/lib/insights";
import { articleSchema, breadcrumbSchema, JsonLd } from "@/lib/schema";

type Params = { slug: string };

export function generateStaticParams() {
  return insights.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getInsight(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `/insights/${post.slug}` },
    openGraph: { type: "article", title: post.title, description: post.description },
  };
}

function Block({ block }: { block: InsightBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="mt-12 text-2xl font-bold leading-snug tracking-[-0.02em] sm:text-3xl">
          {block.text}
        </h2>
      );
    case "list":
      return (
        <ul className="mt-5 space-y-2.5 pl-5 text-base leading-relaxed text-foreground/85 marker:text-foreground/40 [list-style:disc]">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "callout":
      return (
        <aside className="mt-8 rounded-[24px] border border-border bg-surface p-6 text-base font-medium leading-relaxed sm:p-7">
          {block.text}
        </aside>
      );
    default:
      return <p className="mt-5 text-base leading-[1.75] text-foreground/85 sm:text-[17px]">{block.text}</p>;
  }
}

export default async function InsightPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getInsight(slug);
  if (!post) notFound();

  const path = `/insights/${post.slug}`;
  const related = post.relatedWork
    .map((s) => caseStudies.find((c) => c.slug === s))
    .filter((s) => s !== undefined);
  const others = insights.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Insights", path: "/insights" },
            { name: post.title, path },
          ]),
          articleSchema({ title: post.title, description: post.description, path }),
        ]}
      />

      <article className="pt-36 pb-20 md:pt-44">
        <Container className="max-w-3xl">
          <Reveal>
            <Link
              href="/insights"
              className="group inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground"
            >
              <ArrowLeft aria-hidden className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              All insights
            </Link>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
              {post.topic} · {post.readingMinutes} min read
            </p>
            <h1 className="mt-4 text-[2.2rem] font-bold leading-[1.06] tracking-[-0.03em] sm:text-5xl">
              {post.title}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted">{post.excerpt}</p>
          </Reveal>

          <div className="mt-6 border-t border-border pt-4">
            {post.blocks.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </div>

          {/* Each article hands off to the service it relates to. */}
          <div className="mt-14 rounded-[28px] bg-foreground p-7 text-background md:p-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-background/60">
              Related service
            </p>
            <p className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
              {post.relatedService.label}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink href="/contact" variant="inverse" arrow magnetic={false}>
                Start a project
              </ButtonLink>
              <ButtonLink href={post.relatedService.href} variant="outline-light" magnetic={false}>
                Explore the service
              </ButtonLink>
            </div>
          </div>

          {related.length > 0 && (
            <div className="mt-14">
              <Eyebrow>See it in practice</Eyebrow>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {related.map((s) => (
                  <Link key={s.slug} href={`/work/${s.slug}`} className="group block">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[22px] border border-border">
                      <Image
                        src={s.heroImage.src}
                        alt={s.heroImage.alt}
                        fill
                        sizes="(min-width: 640px) 40vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                    </div>
                    <p className="mt-3 text-sm font-semibold">{s.title}</p>
                    <p className="text-sm text-muted">{s.industry}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </Container>
      </article>

      <section className="border-t border-border py-16 md:py-20">
        <Container className="max-w-3xl">
          <Eyebrow>Keep reading</Eyebrow>
          <ul className="mt-6 divide-y divide-border">
            {others.map((p) => (
              <li key={p.slug}>
                <Link href={`/insights/${p.slug}`} className="block py-4 text-base font-semibold hover:text-foreground/70">
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
