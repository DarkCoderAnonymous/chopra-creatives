"use client";

import { motion, useReducedMotion, useSpring } from "framer-motion";
import { type PointerEvent, type ReactNode, useRef } from "react";
import { cn } from "@/lib/utils";

/** Pulls its child gently toward the pointer on fine-pointer devices. */
export function Magnetic({
  children,
  strength = 0.28,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const x = useSpring(0, { stiffness: 260, damping: 18, mass: 0.5 });
  const y = useSpring(0, { stiffness: 260, damping: 18, mass: 0.5 });

  function handleMove(event: PointerEvent<HTMLSpanElement>) {
    if (prefersReducedMotion || event.pointerType !== "mouse" || !ref.current)
      return;
    const rect = ref.current.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.span
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{ x, y }}
      className={cn("inline-flex", className)}
    >
      {children}
    </motion.span>
  );
}
