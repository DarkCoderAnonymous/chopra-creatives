"use client";

import { type HTMLAttributes, type PointerEvent } from "react";
import { cn } from "@/lib/utils";

/**
 * Card with a cursor-following glow and a gradient hairline on hover.
 * Styling lives in `.card-premium` (globals.css); this only feeds the
 * pointer position in as CSS variables, so it never re-renders.
 */
export function SpotlightCard({
  className,
  onPointerMove,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  function handleMove(event: PointerEvent<HTMLDivElement>) {
    const el = event.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    el.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
    onPointerMove?.(event);
  }

  return (
    <div
      onPointerMove={handleMove}
      className={cn("card-premium rounded-3xl border border-border", className)}
      {...props}
    />
  );
}
