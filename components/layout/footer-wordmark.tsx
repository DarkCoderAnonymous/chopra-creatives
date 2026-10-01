"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Oversized brand wordmark that rises out of the page edge when reached. */
export function FooterWordmark() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      aria-hidden
      className="pointer-events-none mt-10 select-none overflow-hidden"
    >
      <motion.p
        initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: "60%" }}
        whileInView={{ opacity: 1, y: "0%" }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="whitespace-nowrap text-center text-[13vw] font-bold leading-[0.78] tracking-[-0.06em]"
      >
        <span className="brand-gradient-text">Chopra</span>
        <span className="font-display font-normal italic tracking-[-0.03em] text-outline">
          {" "}
          Creative
        </span>
      </motion.p>
    </div>
  );
}
