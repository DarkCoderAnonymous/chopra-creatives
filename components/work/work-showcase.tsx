"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { useMediaQuery } from "@/lib/use-media-query";
import { useWebglSupport } from "@/lib/use-webgl-support";
import { caseStudies } from "@/lib/data";

const WorkShowcase3D = dynamic(
  () => import("./work-showcase-3d").then((mod) => mod.WorkShowcase3D),
  { ssr: false, loading: () => null },
);

function FlatShowcase() {
  return (
    <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
      {caseStudies.map((study) => (
        <Link
          key={study.slug}
          href={`/work/${study.slug}`}
          className="group relative aspect-[3/4] w-48 shrink-0 snap-start overflow-hidden rounded-2xl border border-border shadow-lg sm:w-56"
        >
          <Image
            src={study.heroImage.src}
            alt={study.heroImage.alt}
            fill
            sizes="224px"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
          <div className="absolute inset-x-3 bottom-3 text-white">
            <p className="text-sm font-semibold">{study.client}</p>
            <p className="text-xs text-white/70">{study.industry}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export function WorkShowcase() {
  const prefersReducedMotion = useReducedMotion();
  const webglSupported = useWebglSupport();
  const isSmallScreen = useMediaQuery("(max-width: 900px)");

  const canRender3D =
    webglSupported === true && !prefersReducedMotion && !isSmallScreen;

  return (
    <div className="relative">
      {canRender3D ? (
        <div aria-hidden className="h-[440px] w-full select-none">
          <WorkShowcase3D />
        </div>
      ) : (
        <FlatShowcase />
      )}
      {canRender3D && (
        <p className="mt-2 text-center text-xs text-muted">
          Hover a panel to preview it, click to open the full case study.
        </p>
      )}
    </div>
  );
}
