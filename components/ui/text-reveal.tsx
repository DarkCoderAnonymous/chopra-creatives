"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Fragment } from "react";
import { cn } from "@/lib/utils";

type Tag = "h1" | "h2" | "h3" | "p";

const EASE = [0.22, 1, 0.36, 1] as const;

/** `*...*` may span several words; punctuation inside the markers stays accented. */
function parseWords(text: string) {
  let inAccent = false;
  return text.split(" ").map((raw) => {
    let word = raw;
    let accent = inAccent;
    if (word.startsWith("*")) {
      word = word.slice(1);
      accent = inAccent = true;
    }
    if (word.endsWith("*")) {
      word = word.slice(0, -1);
      inAccent = false;
    }
    return { word, accent };
  });
}

/**
 * Headline reveal: each word rises out of its own mask, staggered.
 * Wrap a word in asterisks (`*picked*`) to render it as the serif-italic
 * gradient accent. Screen readers get the plain sentence once.
 */
export function TextReveal({
  text,
  as = "h2",
  className,
  delay = 0,
  stagger = 0.055,
  accentClassName = "brand-gradient-text",
  immediate = false,
}: {
  text: string;
  as?: Tag;
  className?: string;
  delay?: number;
  stagger?: number;
  accentClassName?: string;
  /** Animate on mount instead of when scrolled into view (above-the-fold copy). */
  immediate?: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();
  const Component = motion[as];

  const words = parseWords(text);
  const plain = words.map((w) => w.word).join(" ");

  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };

  const child: Variants = {
    hidden: prefersReducedMotion
      ? { opacity: 0 }
      : { y: "110%", rotate: 4, opacity: 0 },
    visible: {
      y: "0%",
      rotate: 0,
      opacity: 1,
      transition: prefersReducedMotion
        ? { duration: 0.3 }
        : { duration: 0.95, ease: EASE },
    },
  };

  const trigger = immediate
    ? { animate: "visible" as const }
    : {
        whileInView: "visible" as const,
        viewport: { once: true, margin: "0px 0px -12% 0px" },
      };

  return (
    <Component
      className={className}
      initial="hidden"
      variants={container}
      {...trigger}
    >
      <span className="sr-only">{plain}</span>
      <span aria-hidden>
        {words.map(({ word, accent }, i) => (
          <Fragment key={`${word}-${i}`}>
            <span className="-mb-[0.12em] inline-flex overflow-hidden pb-[0.12em] align-bottom">
              <motion.span
                variants={child}
                className={cn(
                  "inline-block origin-bottom-left will-change-transform",
                  accent && cn("accent-word", accentClassName),
                )}
              >
                {word}
              </motion.span>
            </span>
            {i < words.length - 1 && " "}
          </Fragment>
        ))}
      </span>
    </Component>
  );
}
