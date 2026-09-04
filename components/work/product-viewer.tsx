"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";
import { useMediaQuery } from "@/lib/use-media-query";
import { useWebglSupport } from "@/lib/use-webgl-support";
import { ParallaxImage } from "@/components/ui/parallax-image";

const ProductViewer3D = dynamic(
  () => import("./product-viewer-3d").then((mod) => mod.ProductViewer3D),
  { ssr: false, loading: () => null },
);

export function ProductViewer({
  src,
  alt,
  aspect,
  className,
}: {
  src: string;
  alt: string;
  aspect: number;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  const webglSupported = useWebglSupport();
  const isSmallScreen = useMediaQuery("(max-width: 640px)");

  const canRender3D =
    webglSupported === true && !prefersReducedMotion && !isSmallScreen;

  if (!canRender3D) {
    return <ParallaxImage src={src} alt={alt} priority className={className} />;
  }

  return (
    <div className={className} role="img" aria-label={alt}>
      <div aria-hidden className="relative h-full w-full">
        <div
          className="absolute inset-0 bg-[radial-gradient(60%_70%_at_50%_50%,color-mix(in_oklab,var(--accent)_16%,transparent),transparent)]"
        />
        <ProductViewer3D src={src} aspect={aspect} />
        <p className="pointer-events-none absolute bottom-4 right-5 text-[11px] font-medium uppercase tracking-wider text-muted">
          Move to tilt
        </p>
      </div>
    </div>
  );
}
