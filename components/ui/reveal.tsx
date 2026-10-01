"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "span" | "li";
  once?: boolean;
};

export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  once = true,
  as = "div",
}: RevealProps) {
  const Component = motion[as];
  const prefersReducedMotion = useReducedMotion();

  const variants: Variants = {
    hidden: prefersReducedMotion
      ? { opacity: 0 }
      : { opacity: 0, y, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: prefersReducedMotion ? 0.3 : 0.9,
        delay,
        ease: [0.22, 1, 0.36, 1],
      },
      // A lingering filter would flatten 3D children (TiltCard) and create
      // a stacking context, so drop it once the reveal finishes.
      transitionEnd: { filter: "none" },
    },
  };

  return (
    <Component
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "0px 0px -10% 0px" }}
      variants={variants}
    >
      {children}
    </Component>
  );
}
