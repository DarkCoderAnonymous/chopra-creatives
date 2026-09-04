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
        role="tablist"
        aria-label="Filter work by industry"
        className="flex flex-wrap gap-2"
      >
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            role="tab"
            aria-selected={active === filter}
            onClick={() => setActive(filter)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              active === filter
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border bg-surface text-muted hover:text-foreground",
            )}
          >
            {filter}
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
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, delay: i * 0.03 }}
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
