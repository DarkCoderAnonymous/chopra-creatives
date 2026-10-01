"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/** Horizontal hairline that draws itself left-to-right when scrolled into view. */
export function DrawLine({ className }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div aria-hidden className={cn("h-px bg-border", className)}>
      <motion.div
        className="h-full origin-left bg-[linear-gradient(90deg,var(--grad-b),var(--grad-c),var(--grad-e))]"
        initial={{ scaleX: prefersReducedMotion ? 1 : 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "0px 0px -15% 0px" }}
        transition={{ duration: 1.6, ease: [0.65, 0, 0.35, 1], delay: 0.1 }}
      />
    </div>
  );
}
