"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { useLenis } from "lenis/react";
import { Logo } from "./logo";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { ButtonLink } from "@/components/ui/button-link";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/insights", label: "Insights" },
  { href: "/about", label: "About" },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export function Navbar() {
  const pathname = usePathname();
  const lenis = useLenis();
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [lastPathname, setLastPathname] = useState(pathname);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
    setHidden(false);
  }

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 12);
    // Tuck the bar away while reading down; bring it back on any upward scroll.
    setHidden(y > 240 && y > prev + 2);
    if (y < prev - 2) setHidden(false);
  });

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (open) lenis?.stop();
    else lenis?.start();
    return () => {
      document.documentElement.style.overflow = "";
      lenis?.start();
    };
  }, [open, lenis]);

  return (
    <motion.header
      initial={false}
      animate={{ y: hidden && !open ? "-120%" : "0%" }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.5, ease: EASE }}
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-5 md:pt-4"
    >
      <div
        className={cn(
          "mx-auto flex h-14 max-w-7xl items-center justify-between rounded-full border pl-5 pr-2 transition-[background-color,border-color,box-shadow,max-width] duration-500 ease-[var(--ease-out-expo)] md:h-16 md:pl-6",
          scrolled || open
            ? "max-w-5xl border-border bg-background/70 shadow-[0_8px_32px_-12px_rgba(10,9,23,0.25)] backdrop-blur-xl backdrop-saturate-150"
            : "border-transparent bg-transparent",
        )}
      >
        <Logo />

        <nav
          className="hidden items-center xl:flex"
          onPointerLeave={() => setHovered(null)}
        >
          {NAV_LINKS.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onPointerEnter={() => setHovered(link.href)}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-colors duration-300",
                  active ? "text-foreground" : "text-muted hover:text-foreground",
                )}
              >
                {hovered === link.href && (
                  <motion.span
                    layoutId="nav-hover"
                    aria-hidden
                    className="absolute inset-0 rounded-full bg-foreground/[0.06]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{link.label}</span>
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    aria-hidden
                    className="absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[var(--grad-b)]"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 xl:flex">
          <ThemeToggle />
          <ButtonLink href="/contact" size="sm" magnetic={false}>
            Start a Project
          </ButtonLink>
        </div>

        <div className="flex items-center gap-2 xl:hidden">
          {/* Wrapped: the button's own inline-flex would override `hidden`. */}
          <span className="hidden sm:block">
            <ButtonLink href="/contact" size="sm" magnetic={false}>
              Start a project
            </ButtonLink>
          </span>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground"
          >
            <span
              aria-hidden
              className={cn(
                "absolute h-px w-4 bg-current transition-transform duration-500 ease-[var(--ease-out-expo)]",
                open ? "rotate-45" : "-translate-y-[3px]",
              )}
            />
            <span
              aria-hidden
              className={cn(
                "absolute h-px w-4 bg-current transition-transform duration-500 ease-[var(--ease-out-expo)]",
                open ? "-rotate-45" : "translate-y-[3px]",
              )}
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0 round 28px)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0 round 28px)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0 round 28px)" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mx-auto mt-2 max-w-5xl overflow-hidden rounded-[28px] border border-border bg-background/95 backdrop-blur-xl xl:hidden"
          >
            <nav className="flex flex-col px-6 pt-6 pb-7">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.08 + i * 0.06, ease: EASE }}
                >
                  <Link
                    href={link.href}
                    aria-current={pathname.startsWith(link.href) ? "page" : undefined}
                    className="flex items-baseline justify-between border-b border-border py-4 text-4xl font-semibold tracking-tight text-foreground"
                  >
                    {link.label}
                    <span className="font-display text-base italic text-muted">
                      0{i + 1}
                    </span>
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
                className="mt-7"
              >
                <ButtonLink
                  href="/contact"
                  arrow
                  magnetic={false}
                  className="w-full"
                >
                  Start a Project
                </ButtonLink>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
