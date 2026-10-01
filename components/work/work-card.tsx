import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { TiltCard } from "@/components/ui/tilt-card";
import type { CaseStudy } from "@/lib/data";

export function WorkCard({
  study,
  priority = false,
}: {
  study: CaseStudy;
  priority?: boolean;
}) {
  return (
    <Link
      href={`/work/${study.slug}`}
      className="group block rounded-[28px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <TiltCard className="rounded-[28px]">
        <article className="relative overflow-hidden rounded-[28px] border border-border bg-surface shadow-[0_20px_50px_-30px_rgba(10,9,23,0.5)] transition-shadow duration-700 group-hover:shadow-[0_40px_80px_-30px_color-mix(in_oklab,var(--grad-c)_55%,transparent)]">
          <div className="relative aspect-[4/3.1] w-full overflow-hidden">
            <Image
              src={study.heroImage.src}
              alt={study.heroImage.alt}
              fill
              priority={priority}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.07]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/0 transition-opacity duration-700 group-hover:opacity-90" />
            <span
              className="absolute left-4 top-4 rounded-full border border-white/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-md [transform:translateZ(32px)]"
              style={{ backgroundColor: `${study.accent}B3` }}
            >
              {study.industry}
            </span>
            <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-3 text-white [transform:translateZ(32px)]">
              <div className="min-w-0">
                <h3 className="text-xl font-semibold leading-tight tracking-tight">
                  {study.client}
                </h3>
                <p className="mt-1 line-clamp-1 text-sm text-white/70 transition-colors duration-500 group-hover:text-white/90">
                  {study.packagingType}
                </p>
              </div>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10 backdrop-blur-md transition-[background-color,color,transform] duration-500 ease-[var(--ease-out-expo)] group-hover:scale-110 group-hover:bg-white group-hover:text-[#0a0917]">
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:rotate-45"
                  aria-hidden
                />
              </span>
            </div>
          </div>
        </article>
      </TiltCard>
    </Link>
  );
}
