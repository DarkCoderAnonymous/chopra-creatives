"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

/**
 * Global inertial scrolling. Lenis drives the native scroll position, so
 * sticky elements and framer-motion's useScroll keep working unchanged.
 * Touch devices keep native scrolling, and prefers-reduced-motion is
 * honored by Lenis itself.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        wheelMultiplier: 1,
        smoothWheel: true,
        anchors: false,
        respectReducedMotion: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
