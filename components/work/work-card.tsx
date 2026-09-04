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
      className="group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-3xl block"
    >
      <TiltCard className="rounded-3xl">
        <article className="relative overflow-hidden rounded-3xl border border-border bg-surface">
          <div className="relative aspect-[4/3.1] w-full overflow-hidden">
            <Image
              src={study.heroImage.src}
              alt={study.heroImage.alt}
              fill
              priority={priority}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0" />
            <span
              className="absolute left-4 top-4 [transform:translateZ(32px)] rounded-full px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm"
              style={{ backgroundColor: `${study.accent}CC` }}
            >
              {study.industry}
            </span>
            <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3 text-white [transform:translateZ(32px)]">
              <div>
                <h3 className="text-lg font-semibold leading-tight">
                  {study.client}
                </h3>
                <p className="mt-1 line-clamp-1 text-sm text-white/75">
                  {study.packagingType}
                </p>
              </div>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </span>
            </div>
          </div>
        </article>
      </TiltCard>
    </Link>
  );
}
