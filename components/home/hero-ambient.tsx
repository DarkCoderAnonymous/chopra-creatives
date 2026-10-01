/**
 * Slow-drifting brand-color light behind the hero. Pure CSS transforms on
 * pre-blurred layers, so it composites on the GPU and stops under
 * prefers-reduced-motion via the global rule.
 */
export function HeroAmbient() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-[20%] right-[-10%] h-[70vh] w-[55vw] animate-aurora rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--grad-c)_55%,transparent),transparent)] blur-3xl opacity-70 dark:opacity-90" />
      <div className="absolute bottom-[-25%] right-[15%] h-[60vh] w-[40vw] animate-aurora-slow rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--grad-e)_45%,transparent),transparent)] blur-3xl opacity-50 dark:opacity-70" />
      <div className="absolute top-[30%] right-[35%] h-[35vh] w-[25vw] animate-aurora rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--grad-b)_35%,transparent),transparent)] blur-3xl opacity-40 dark:opacity-50" />
    </div>
  );
}
