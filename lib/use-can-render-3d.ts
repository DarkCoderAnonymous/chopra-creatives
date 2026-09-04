"use client";

import { useReducedMotion } from "framer-motion";
import { useMediaQuery } from "./use-media-query";
import { useWebglSupport } from "./use-webgl-support";

/**
 * Gate for any heavy WebGL/R3F scene: requires WebGL support, no
 * prefers-reduced-motion, and a viewport at or above `md` (768px).
 */
export function useCanRender3D() {
  const prefersReducedMotion = useReducedMotion();
  const webglSupported = useWebglSupport();
  const isSmallScreen = useMediaQuery("(max-width: 767px)");

  return webglSupported === true && !prefersReducedMotion && !isSmallScreen;
}
