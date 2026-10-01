import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export function Container({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  // A caller-supplied max-w-* replaces the default instead of competing with
  // it (without tailwind-merge, CSS order would decide which one wins).
  const customWidth = className?.split(/\s+/).some((c) => c.startsWith("max-w-"));
  return (
    <div
      className={cn("mx-auto w-full container-px", !customWidth && "max-w-7xl", className)}
      {...props}
    />
  );
}
