"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/layout/container";
import { HeroContent } from "./hero-content";

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
  const hintOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  return (
    <section ref={trackRef} className="relative h-[250vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0">
          <HeroScene scrollProgress={scrollProgress} />
        </div>

        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_right,var(--background)_0%,var(--background)_34%,color-mix(in_oklab,var(--background)_65%,transparent)_52%,color-mix(in_oklab,var(--background)_15%,transparent)_72%,transparent_88%)]"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent"
        />

        <motion.div
          style={{ opacity: contentOpacity }}
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
          <span className="text-[11px] font-semibold uppercase tracking-wider">
            Scroll to explore
          </span>
          <ChevronDown className="h-4 w-4 animate-bounce" aria-hidden />
        </motion.div>
      </div>
    </section>
  );
}
