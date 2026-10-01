"use client";

import Image from "next/image";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  type PanInfo,
} from "framer-motion";
import { useLenis } from "lenis/react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";
import type { CaseImage } from "@/lib/data";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;
const TILE_RADIUS = 24;
const SLIDE_RADIUS = 20;
const TILE_SIZES = "(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw";

type GalleryContextValue = {
  images: CaseImage[];
  open: (index: number, trigger: HTMLElement | null) => void;
};

const GalleryContext = createContext<GalleryContextValue | null>(null);

function useGallery() {
  const ctx = useContext(GalleryContext);
  if (!ctx) throw new Error("Gallery components must sit inside <GalleryProvider>.");
  return ctx;
}

const noopSubscribe = () => () => {};
/** True after hydration, so the portal never renders on the server. */
const useIsClient = () =>
  useSyncExternalStore(noopSubscribe, () => true, () => false);

const pad = (n: number) => String(n).padStart(2, "0");

/** A tile is only worth flying from/to when it's actually on screen. */
function visibleRect(el: HTMLElement | null) {
  if (!el) return null;
  const rect = el.getBoundingClientRect();
  const onScreen =
    rect.width > 0 &&
    rect.bottom > 0 &&
    rect.right > 0 &&
    rect.top < window.innerHeight &&
    rect.left < window.innerWidth;
  return onScreen ? rect : null;
}

/**
 * Owns the lightbox for one case study. Every image the page shows can open
 * it at its own index, so visitors can browse the whole project in one place.
 */
export function GalleryProvider({
  images,
  accent,
  children,
}: {
  images: CaseImage[];
  accent: string;
  children: ReactNode;
}) {
  const [index, setIndex] = useState<number | null>(null);
  const [morph, setMorph] = useState<{ index: number; from: DOMRect } | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const frameRef = useRef<HTMLElement | null>(null);
  const isClient = useIsClient();

  const open = useCallback((i: number, trigger: HTMLElement | null) => {
    triggerRef.current = trigger;
    // Fly from the tile that was actually clicked (the same image can
    // appear twice on a page).
    const frame = trigger?.querySelector<HTMLElement>("[data-gallery-frame]") ?? null;
    const from = visibleRect(frame);
    frameRef.current = from ? frame : null;
    setMorph(from ? { index: i, from } : null);
    setIndex(i);
  }, []);

  const close = useCallback(() => {
    setIndex(null);
    setMorph(null);
    triggerRef.current?.focus({ preventScroll: true });
  }, []);

  const go = useCallback(
    (step: number) => {
      setIndex((current) =>
        current === null ? current : (current + step + images.length) % images.length,
      );
      // Once the visitor moves on, the image no longer belongs to the tile
      // it came from, so closing fades instead of flying back.
      setMorph(null);
    },
    [images.length],
  );

  const jump = useCallback((i: number) => {
    setIndex(i);
    setMorph(null);
  }, []);

  const lifted = index !== null && morph?.index === index ? morph : null;
  const isLifted = lifted !== null;

  // Hide the source tile while its image is "lifted" into the lightbox.
  useEffect(() => {
    const frame = frameRef.current;
    if (!isLifted || !frame) return;
    frame.style.visibility = "hidden";
    return () => {
      frame.style.visibility = "";
    };
  }, [isLifted]);

  return (
    <GalleryContext.Provider value={{ images, open }}>
      {children}
      {isClient &&
        index !== null &&
        createPortal(
          <Lightbox
            images={images}
            accent={accent}
            index={index}
            morphFrom={lifted?.from ?? null}
            morphTargetRef={frameRef}
            onClose={close}
            onStep={go}
            onJump={jump}
          />,
          document.body,
        )}
    </GalleryContext.Provider>
  );
}

/** A plain button that opens the lightbox at `index` (e.g. over the hero). */
export function GalleryOpenButton({
  index = 0,
  className,
}: {
  index?: number;
  className?: string;
}) {
  const { images, open } = useGallery();
  return (
    <button
      type="button"
      onClick={(e) => open(index, e.currentTarget)}
      className={cn(
        "group inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/45 py-2 pl-3 pr-4 text-xs font-semibold text-white backdrop-blur-md transition-colors duration-300 hover:bg-black/65",
        className,
      )}
    >
      <Expand
        aria-hidden
        className="h-3.5 w-3.5 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-110"
      />
      View gallery
      <span className="text-white/60">· {images.length}</span>
    </button>
  );
}

/**
 * A clickable image tile. It reveals with a clip-path wipe as it scrolls
 * in, and its image flies into the lightbox when opened.
 */
export function GalleryTile({
  index,
  className,
  sizes = TILE_SIZES,
  revealDelay = 0,
}: {
  index: number;
  className?: string;
  sizes?: string;
  revealDelay?: number;
}) {
  const { images, open } = useGallery();
  const prefersReducedMotion = useReducedMotion();
  const image = images[index];

  return (
    <motion.button
      type="button"
      onClick={(e) => open(index, e.currentTarget)}
      aria-label={`Open image ${index + 1} of ${images.length}: ${image.alt}`}
      className={cn("group relative block w-full text-left", className)}
      initial={
        prefersReducedMotion
          ? { opacity: 0 }
          : { opacity: 0, clipPath: `inset(18% 6% 18% 6% round ${TILE_RADIUS + 4}px)` }
      }
      whileInView={{ opacity: 1, clipPath: `inset(0% 0% 0% 0% round ${TILE_RADIUS}px)` }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: prefersReducedMotion ? 0.3 : 1.2, delay: revealDelay, ease: EASE }}
    >
      <div
        data-gallery-frame
        style={{ borderRadius: TILE_RADIUS }}
        className="relative h-full w-full overflow-hidden border border-border bg-surface"
      >
        <motion.div
          className="absolute inset-0"
          initial={prefersReducedMotion ? false : { scale: 1.25 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: "0px 0px -12% 0px" }}
          transition={{ duration: 1.6, delay: revealDelay, ease: EASE }}
        >
          <Image
            src={image.src}
            alt=""
            fill
            sizes={sizes}
            className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.06] group-focus-visible:scale-[1.06]"
          />
        </motion.div>

        {/* Hover veil: darkens the base and lifts the index + expand pill. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(10,9,23,0.62),rgba(10,9,23,0)_55%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-4 bottom-4 flex items-end justify-between gap-3 text-white sm:inset-x-5 sm:bottom-5"
        >
          <span className="translate-y-3 font-display text-3xl italic leading-none opacity-0 transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
            {pad(index + 1)}
          </span>
          <span className="inline-flex translate-y-3 items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] opacity-0 backdrop-blur-md transition-all delay-75 duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
            <Expand className="h-3 w-3" />
            View
          </span>
        </div>
      </div>
    </motion.button>
  );
}

/** Editorial grid for the case-study shots. */
export function GalleryGrid({ indices }: { indices: number[] }) {
  const { images } = useGallery();
  const featureFirst = indices.length % 2 === 1;

  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
          <span
            aria-hidden
            className="h-px w-8 bg-[linear-gradient(90deg,var(--grad-b),var(--grad-e))]"
          />
          Gallery
        </p>
        <p className="text-xs text-muted">{images.length} images · tap to expand</p>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 sm:gap-6">
        {indices.map((imageIndex, i) => {
          const feature = featureFirst && i === 0;
          return (
            <GalleryTile
              key={images[imageIndex].src}
              index={imageIndex}
              revealDelay={feature ? 0 : (i % 2) * 0.12}
              sizes={feature ? "(min-width: 1024px) 55vw, 100vw" : undefined}
              className={cn(
                feature ? "aspect-[16/10] sm:col-span-2" : "aspect-[4/3]",
                // A gentle offset on every other column keeps the grid from
                // reading as a table.
                !feature && i % 2 === (featureFirst ? 0 : 1) && "sm:translate-y-10",
              )}
            />
          );
        })}
      </div>
      {indices.length > 1 && <div aria-hidden className="hidden h-10 sm:block" />}
    </div>
  );
}

type SlideControls = {
  /** Fly back into `target`, cropping to its aspect like the tile does. */
  morphTo: (target: DOMRect) => Promise<void>;
  fadeOut: () => Promise<void>;
};

function Slide({
  image,
  morphFrom,
  direction,
  registry,
  draggable,
  onDragEnd,
}: {
  image: CaseImage;
  morphFrom: DOMRect | null;
  direction: number;
  registry: RefObject<Map<string, SlideControls>>;
  draggable: boolean;
  onDragEnd: (_: unknown, info: PanInfo) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [sharp, setSharp] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);
  const rotate = useMotionValue(0);
  const opacity = useMotionValue(0);
  const insetX = useMotionValue(0);
  const insetY = useMotionValue(0);
  const radius = useMotionValue(SLIDE_RADIUS);
  const clipPath = useMotionTemplate`inset(${insetY}px ${insetX}px ${insetY}px ${insetX}px round ${radius}px)`;

  // Transform that makes this slide sit exactly over `target`, showing the
  // same centre crop an object-cover tile shows.
  const coverTransform = useCallback(
    (target: DOMRect) => {
      const el = ref.current!;
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      const box = el.getBoundingClientRect();
      const cx = box.left + box.width / 2 - x.get();
      const cy = box.top + box.height / 2 - y.get();
      const s = Math.max(target.width / w, target.height / h);
      return {
        x: target.left + target.width / 2 - cx,
        y: target.top + target.height / 2 - cy,
        scale: s,
        insetX: Math.max(0, (w - target.width / s) / 2),
        insetY: Math.max(0, (h - target.height / s) / 2),
        radius: TILE_RADIUS / s,
      };
    },
    [x, y],
  );

  const values = { x, y, scale, rotate, opacity, insetX, insetY, radius };
  const valuesRef = useRef(values);

  const animateTo = useCallback(
    (to: Partial<Record<keyof typeof values, number>>, duration: number) =>
      Promise.all(
        Object.entries(to).map(([key, v]) =>
          animate(valuesRef.current[key as keyof typeof values], v, { duration, ease: EASE }),
        ),
      ).then(() => undefined),
    [],
  );

  // Set the starting pose before first paint, then play the entrance.
  useLayoutEffect(() => {
    const identity = { x: 0, y: 0, scale: 1, rotate: 0, opacity: 1, insetX: 0, insetY: 0, radius: SLIDE_RADIUS };
    const v = valuesRef.current;
    if (prefersReducedMotion) {
      animateTo({ opacity: 1 }, 0.25);
      return;
    }
    if (morphFrom) {
      const from = coverTransform(morphFrom);
      (Object.keys(from) as (keyof typeof from)[]).forEach((k) => v[k].set(from[k]));
      v.opacity.set(1);
      animateTo(identity, 0.85);
    } else {
      v.x.set(direction * 140);
      v.rotate.set(direction * 2.5);
      v.scale.set(direction === 0 ? 0.88 : 0.94);
      animateTo(identity, direction === 0 ? 0.7 : 0.75);
    }
    // Entrance runs once per slide.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const map = registry.current;
    map.set(image.src, {
      morphTo: (target) => animateTo(coverTransform(target), prefersReducedMotion ? 0.01 : 0.65),
      fadeOut: () =>
        animateTo(prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94 }, 0.4),
    });
    return () => {
      map.delete(image.src);
    };
  }, [registry, image.src, animateTo, coverTransform, prefersReducedMotion]);

  return (
    <motion.div
      ref={ref}
      custom={direction}
      variants={{
        exit: (dir: number) =>
          prefersReducedMotion
            ? { opacity: 0, transition: { duration: 0.2 } }
            : {
                x: dir * -140,
                rotate: dir * -2.5,
                scale: 0.94,
                opacity: 0,
                transition: { duration: 0.6, ease: EASE },
              },
      }}
      exit="exit"
      drag={draggable ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.35}
      onDragEnd={onDragEnd}
      style={{
        x,
        y,
        scale,
        rotate,
        opacity,
        clipPath,
        aspectRatio: `${image.width} / ${image.height}`,
        width: `min(100%, calc((100svh - 15rem) * ${image.width / image.height}))`,
      }}
      className="relative cursor-grab overflow-hidden bg-white/5 [grid-area:1/1] active:cursor-grabbing"
    >
      {/* The tile-sized rendition is usually cached, so the morph never
          flies an empty frame; the full-size one fades in over it. */}
      <Image
        src={image.src}
        alt=""
        fill
        draggable={false}
        sizes={TILE_SIZES}
        className="pointer-events-none select-none object-cover"
      />
      <Image
        src={image.src}
        alt={image.alt}
        fill
        draggable={false}
        sizes="(min-width: 1280px) 1200px, 100vw"
        onLoad={() => setSharp(true)}
        className={cn(
          "pointer-events-none select-none object-cover transition-opacity duration-500",
          sharp ? "opacity-100" : "opacity-0",
        )}
      />
    </motion.div>
  );
}

function Lightbox({
  images,
  accent,
  index,
  morphFrom,
  morphTargetRef,
  onClose,
  onStep,
  onJump,
}: {
  images: CaseImage[];
  accent: string;
  index: number;
  morphFrom: DOMRect | null;
  /** Tile to fly back into on close, while the visitor hasn't moved on. */
  morphTargetRef: RefObject<HTMLElement | null>;
  onClose: () => void;
  onStep: (step: number) => void;
  onJump: (index: number) => void;
}) {
  const lenis = useLenis();
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const registry = useRef(new Map<string, SlideControls>());
  const [direction, setDirection] = useState(0);
  const [closing, setClosing] = useState(false);
  const closingRef = useRef(false);
  const current = images[index];

  const step = useCallback(
    (dir: number) => {
      if (closingRef.current) return;
      setDirection(dir);
      onStep(dir);
    },
    [onStep],
  );

  const requestClose = useCallback(async () => {
    if (closingRef.current) return;
    closingRef.current = true;
    setClosing(true);
    const slide = registry.current.get(current.src);
    const target = morphFrom ? visibleRect(morphTargetRef.current) : null;
    if (slide) await (target ? slide.morphTo(target) : slide.fadeOut());
    onClose();
  }, [current.src, morphFrom, morphTargetRef, onClose]);

  // Freeze the page (Lenis and native) while the lightbox is up.
  useEffect(() => {
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    lenis?.stop();
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      root.style.overflow = previous;
      lenis?.start();
    };
  }, [lenis]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") requestClose();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "Tab" && dialogRef.current) {
        // Keep keyboard focus inside the dialog.
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>("button");
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [requestClose, step]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const swipe = info.offset.x + info.velocity.x * 0.2;
    if (swipe < -80) step(1);
    else if (swipe > 80) step(-1);
  };

  const chrome = (delay: number) => ({
    initial: { opacity: 0 },
    animate: { opacity: closing ? 0 : 1 },
    transition: { duration: closing ? 0.35 : 0.5, delay: closing ? 0 : delay, ease: EASE },
  });

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Project gallery"
      className="fixed inset-0 z-[100] flex flex-col"
      data-lenis-prevent
    >
      <motion.div
        aria-hidden
        onClick={requestClose}
        className="absolute inset-0 bg-[#07061a]/90 backdrop-blur-xl"
        {...chrome(0)}
        transition={{ duration: closing ? 0.6 : 0.5, ease: EASE }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(60% 55% at 50% 45%, color-mix(in oklab, ${accent} 28%, transparent), transparent 70%)`,
        }}
        {...chrome(0.1)}
      />

      {/* Top bar */}
      <motion.div
        className="relative z-10 flex items-center justify-between px-4 pt-4 text-white sm:px-8 sm:pt-6"
        {...chrome(0.2)}
      >
        <p className="flex items-baseline gap-2 tabular-nums" aria-live="polite">
          <span className="font-display text-3xl italic leading-none">{pad(index + 1)}</span>
          <span className="text-sm text-white/50">/ {pad(images.length)}</span>
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={requestClose}
          aria-label="Close gallery"
          className="group grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/10 backdrop-blur-md transition-colors duration-300 hover:bg-white/20"
        >
          <X className="h-5 w-5 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:rotate-90" />
        </button>
      </motion.div>

      {/* Stage: slides share one grid cell so they can cross over. */}
      <div className="pointer-events-none relative flex min-h-0 flex-1 items-center justify-center px-4 py-4 sm:px-24">
        <div className="pointer-events-auto grid w-full grid-cols-[minmax(0,1fr)] place-items-center">
          <AnimatePresence initial={false} custom={direction}>
            <Slide
              key={current.src}
              image={current}
              morphFrom={morphFrom}
              direction={direction}
              registry={registry}
              draggable={images.length > 1 && !closing}
              onDragEnd={onDragEnd}
            />
          </AnimatePresence>
        </div>

        {images.length > 1 && (
          <motion.div {...chrome(0.25)}>
            <NavButton side="left" onClick={() => step(-1)} />
            <NavButton side="right" onClick={() => step(1)} />
          </motion.div>
        )}
      </div>

      {/* Caption + thumbnails */}
      <motion.div className="relative z-10 px-4 pb-5 text-white sm:px-8 sm:pb-7" {...chrome(0.25)}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={current.src}
            className="mx-auto max-w-2xl text-center text-sm leading-relaxed text-white/70"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            {current.alt}
          </motion.p>
        </AnimatePresence>

        {images.length > 1 && (
          <div className="mx-auto mt-4 flex max-w-full justify-center gap-2 overflow-x-auto px-1 py-1 sm:gap-3">
            {images.map((img, i) => (
              <button
                key={img.src}
                type="button"
                onClick={() => {
                  if (i === index || closingRef.current) return;
                  setDirection(i > index ? 1 : -1);
                  onJump(i);
                }}
                aria-label={`Show image ${i + 1}`}
                aria-current={i === index}
                className={cn(
                  "relative h-12 w-16 shrink-0 overflow-hidden rounded-xl transition-opacity duration-500 sm:h-14 sm:w-20",
                  i === index ? "opacity-100" : "opacity-45 hover:opacity-80",
                )}
              >
                <Image src={img.src} alt="" fill sizes="80px" className="object-cover" />
                {i === index && (
                  <motion.span
                    layoutId="case-gallery-thumb-ring"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    className="absolute inset-0 rounded-xl ring-2 ring-inset ring-white"
                  />
                )}
              </button>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}

function NavButton({ side, onClick }: { side: "left" | "right"; onClick: () => void }) {
  const Icon = side === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === "left" ? "Previous image" : "Next image"}
      className={cn(
        "group pointer-events-auto absolute top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-md transition-colors duration-300 hover:bg-white/20 sm:grid",
        side === "left" ? "left-6" : "right-6",
      )}
    >
      <Icon
        className={cn(
          "h-5 w-5 transition-transform duration-500 ease-[var(--ease-out-expo)]",
          side === "left" ? "group-hover:-translate-x-0.5" : "group-hover:translate-x-0.5",
        )}
      />
    </button>
  );
}
