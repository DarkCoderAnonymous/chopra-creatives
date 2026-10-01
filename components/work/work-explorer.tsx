"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { WorkCard } from "./work-card";
import type { CaseStudy } from "@/lib/data";
import { cn } from "@/lib/utils";

export function WorkExplorer({
  studies,
  industries,
}: {
  studies: CaseStudy[];
  industries: string[];
}) {
  const [active, setActive] = useState<string>("All");

  const filtered = useMemo(() => {
    if (active === "All") return studies;
    return studies.filter((s) => s.industry === active);
  }, [studies, active]);

  const filters = ["All", ...industries];

  return (
    <div>
      <div
        role="group"
        aria-label="Filter work by industry"
        className="inline-flex max-w-full flex-wrap gap-1 rounded-[28px] border border-border bg-surface/70 p-1.5 backdrop-blur-md"
      >
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            aria-pressed={active === filter}
            onClick={() => setActive(filter)}
            className={cn(
              "relative h-10 rounded-full px-4 text-sm font-medium transition-colors duration-300",
              active === filter
                ? "text-background"
                : "text-muted hover:text-foreground",
            )}
          >
            {active === filter && (
              <motion.span
                layoutId="work-filter"
                aria-hidden
                className="absolute inset-0 rounded-full bg-foreground"
                transition={{ type: "spring", stiffness: 400, damping: 34 }}
              />
            )}
            <span className="relative">{filter}</span>
          </button>
        ))}
      </div>

      <motion.div
        layout
        className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((study, i) => (
            <motion.div
              key={study.slug}
              layout
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
              transition={{
                duration: 0.6,
                delay: i * 0.05,
                ease: [0.22, 1, 0.36, 1],
                layout: { type: "spring", stiffness: 300, damping: 34 },
              }}
            >
              <WorkCard study={study} priority={i < 3} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="mt-16 text-center text-sm text-muted">
          No projects in this category yet.
        </p>
      )}
    </div>
  );
}
