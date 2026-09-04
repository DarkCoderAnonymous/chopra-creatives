"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={isDark}
      className="group relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-foreground/80 transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <Sun
        aria-hidden
        className="absolute h-4 w-4 scale-100 rotate-0 transition-all duration-300 dark:scale-0 dark:-rotate-90"
      />
      <Moon
        aria-hidden
        className="absolute h-4 w-4 scale-0 rotate-90 transition-all duration-300 dark:scale-100 dark:rotate-0"
      />
    </button>
  );
}
