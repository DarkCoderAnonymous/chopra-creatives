"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { Container } from "@/components/layout/container";
import { HeroContent } from "./hero-content";
import { HeroAmbient } from "./hero-ambient";

const HeroScene = dynamic(
  () => import("@/components/three/hero-scene").then((mod) => mod.HeroScene),
  { ssr: false, loading: () => null },
);

export function HeroFlythrough() {
  const trackRef = useRef<HTMLElement>(null);
  const scrollProgress = useRef(0);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    scrollProgress.current = v;
  });

  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.7, 0.9],
    [1, 1, 0],
  );
  const contentY = useTransform(scrollYProgress, [0, 0.9], [0, -80]);
  const contentBlur = useTransform(
    scrollYProgress,
    [0.75, 0.9],
    ["blur(0px)", "blur(8px)"],
  );
  const hintOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  return (
    <section ref={trackRef} className="relative h-[250vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <HeroAmbient />

        <div className="absolute inset-y-0 right-0 left-[34%] xl:left-[22%]">
          <HeroScene scrollProgress={scrollProgress} />
        </div>

        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_right,var(--background)_0%,var(--background)_30%,color-mix(in_oklab,var(--background)_80%,transparent)_44%,color-mix(in_oklab,var(--background)_20%,transparent)_62%,transparent_78%)]"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent"
        />

        <motion.div
          style={{ opacity: contentOpacity, y: contentY, filter: contentBlur }}
          className="relative z-10 flex h-full items-center pt-20 pb-16"
        >
          <Container>
            <HeroContent />
          </Container>
        </motion.div>

        <motion.div
          style={{ opacity: hintOpacity }}
          className="pointer-events-none absolute inset-x-0 bottom-6 z-10 flex flex-col items-center gap-1 text-muted"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em]">
            Scroll to explore
          </span>
          <span
            aria-hidden
            className="relative mt-1 h-10 w-px overflow-hidden bg-border"
          >
            <span className="absolute inset-x-0 top-0 h-1/2 animate-[scroll-hint_2s_var(--ease-out-expo)_infinite] bg-foreground/70" />
          </span>
        </motion.div>
      </div>
    </section>
  );
}
