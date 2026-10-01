import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Magnetic } from "./magnetic";

type Variant = "primary" | "secondary" | "light" | "outline-light" | "inverse";
type Size = "md" | "sm";

const VARIANTS: Record<Variant, string> = {
  // Ink pill in light mode, near-white pill in dark mode; a brand-gradient
  // glow blooms underneath on hover.
  primary:
    "bg-foreground text-background shadow-[0_1px_0_0_rgba(255,255,255,0.15)_inset,0_10px_30px_-12px_color-mix(in_oklab,var(--grad-c)_70%,transparent)] hover:shadow-[0_1px_0_0_rgba(255,255,255,0.15)_inset,0_18px_44px_-14px_color-mix(in_oklab,var(--grad-b)_70%,transparent)]",
  secondary:
    "border border-border bg-surface/60 text-foreground backdrop-blur-md hover:border-foreground/30",
  light: "bg-white text-[#0a0917] hover:shadow-[0_18px_44px_-14px_rgba(255,255,255,0.45)]",
  "outline-light":
    "border border-white/20 bg-white/5 text-white backdrop-blur-md hover:border-white/50 hover:bg-white/10",
  // For use on a `bg-foreground` surface: flips with the theme.
  inverse:
    "bg-background text-foreground hover:shadow-[0_18px_44px_-14px_color-mix(in_oklab,var(--grad-b)_60%,transparent)]",
};

const SIZES: Record<Size, string> = {
  md: "h-12 px-6 text-sm",
  sm: "h-10 px-4.5 text-sm",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md") {
  return cn(
    "group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-semibold tracking-tight",
    "transition-[box-shadow,background-color,border-color,transform] duration-500 ease-[var(--ease-out-expo)] active:scale-[0.97]",
    VARIANTS[variant],
    SIZES[size],
  );
}

/** Two stacked arrows: the first exits right while the second slides in. */
export function ButtonArrow() {
  return (
    <span aria-hidden className="relative -mr-1 inline-flex h-4 w-4 overflow-hidden">
      <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/btn:translate-x-5" />
      <ArrowRight className="absolute inset-0 h-4 w-4 -translate-x-5 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/btn:translate-x-0" />
    </span>
  );
}

/** Text that rolls up to a duplicate of itself on hover. */
function RollingLabel({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-flex overflow-hidden">
      <span className="transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/btn:-translate-y-full">
        {children}
      </span>
      <span
        aria-hidden
        className="absolute inset-0 translate-y-full transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/btn:translate-y-0"
      >
        {children}
      </span>
    </span>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  arrow = false,
  magnetic = true,
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  magnetic?: boolean;
  className?: string;
}) {
  const inner = (
    <>
      <RollingLabel>{children}</RollingLabel>
      {arrow && <ButtonArrow />}
    </>
  );
  const classes = cn(buttonClasses(variant, size), className);
  const isExternal = href.startsWith("mailto:") || href.startsWith("http");

  const el = isExternal ? (
    <a href={href} className={classes}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  );

  return magnetic ? <Magnetic>{el}</Magnetic> : el;
}
