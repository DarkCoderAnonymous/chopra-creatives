"use client";

import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { type PointerEvent, type ReactNode, useRef } from "react";
import { cn } from "@/lib/utils";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
};

export function TiltCard({ children, className }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const rotateX = useSpring(0, { stiffness: 220, damping: 20, mass: 0.4 });
  const rotateY = useSpring(0, { stiffness: 220, damping: 20, mass: 0.4 });
  const glowX = useSpring(50, { stiffness: 220, damping: 24 });
  const glowY = useSpring(50, { stiffness: 220, damping: 24 });

  const transform = useMotionTemplate`perspective(900px) scale3d(1.02, 1.02, 1.02) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  const glowBackground = useMotionTemplate`radial-gradient(320px circle at ${glowX}% ${glowY}%, color-mix(in oklab, var(--accent) 22%, transparent), transparent 70%)`;

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (prefersReducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    rotateY.set((px - 0.5) * 16);
    rotateX.set((0.5 - py) * 16);
    glowX.set(px * 100);
    glowY.set(py * 100);
  }

  function handlePointerLeave() {
    rotateX.set(0);
    rotateY.set(0);
    glowX.set(50);
    glowY.set(50);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={prefersReducedMotion ? undefined : { transform }}
      className={cn("relative [transform-style:preserve-3d]", className)}
    >
      {!prefersReducedMotion && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: glowBackground }}
        />
      )}
      {children}
    </motion.div>
  );
}
