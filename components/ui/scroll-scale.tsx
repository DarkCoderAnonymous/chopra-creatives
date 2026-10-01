"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { type ReactNode, useRef } from "react";
import { cn } from "@/lib/utils";

/** Grows from slightly inset to full size as it scrolls into the viewport. */
export function ScrollScale({
  children,
  className,
  from = 0.88,
}: {
  children: ReactNode;
  className?: string;
  from?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [from, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], [48, 28]);

  return (
    <motion.div
      ref={ref}
      style={
        prefersReducedMotion ? undefined : { scale, borderRadius: radius }
      }
      className={cn("overflow-hidden will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
}
