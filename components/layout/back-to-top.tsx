"use client";

import { ArrowUp } from "lucide-react";
import { useLenis } from "lenis/react";

export function BackToTop() {
  const lenis = useLenis();

  return (
    <button
      type="button"
      onClick={() => {
        if (lenis) lenis.scrollTo(0, { duration: 1.6 });
        else window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      aria-label="Back to top"
      className="group flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-colors duration-300 hover:border-foreground/40"
    >
      <ArrowUp
        aria-hidden
        className="h-4 w-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5"
      />
    </button>
  );
}
