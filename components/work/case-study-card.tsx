import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CaseStudy } from "@/lib/data";
import { cn } from "@/lib/utils";

/**
 * Case-study preview that reads like a brief, not a thumbnail:
 * product, category, challenge, solution and deliverables.
 */
export function CaseStudyCard({
  study,
  index,
  reverse = false,
  priority = false,
}: {
  study: CaseStudy;
  index: number;
  reverse?: boolean;
  priority?: boolean;
}) {
  return (
    <article className="group grid items-center gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
      <Link
        href={`/work/${study.slug}`}
        aria-label={`${study.title} case study`}
        className={cn(
          "relative block aspect-[4/3] overflow-hidden rounded-[28px] border border-border bg-surface",
          reverse && "md:order-2",
        )}
      >
        <Image
          src={study.heroImage.src}
          alt={study.heroImage.alt}
          fill
          priority={priority}
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
        />
      </Link>

      <div>
        <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
          <span className="font-display text-base normal-case italic tracking-normal text-foreground/40">
            {String(index + 1).padStart(2, "0")}
          </span>
          {study.industry}
          <span aria-hidden className="h-px w-6 bg-border" />
          {study.packagingType}
        </p>

        <h3 className="mt-4 text-2xl font-bold leading-tight tracking-[-0.02em] sm:text-3xl">
          <Link href={`/work/${study.slug}`} className="hover:text-foreground/80">
            {study.title}
          </Link>
        </h3>

        <dl className="mt-6 space-y-4 text-sm leading-relaxed">
          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
              Challenge
            </dt>
            <dd className="mt-1 text-foreground/85">{study.summary.challenge}</dd>
          </div>
          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
              Solution
            </dt>
            <dd className="mt-1 text-foreground/85">{study.summary.solution}</dd>
          </div>
          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
              Deliverables
            </dt>
            <dd className="mt-2 flex flex-wrap gap-1.5">
              {study.scope.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-border px-2.5 py-1 text-xs text-foreground/80"
                >
                  {item}
                </span>
              ))}
            </dd>
          </div>
        </dl>

        <Link
          href={`/work/${study.slug}`}
          className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-foreground"
        >
          <span className="link-underline pb-0.5">View case study</span>
          <ArrowUpRight
            aria-hidden
            className="h-4 w-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:rotate-45"
          />
        </Link>
      </div>
    </article>
  );
}
