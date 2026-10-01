import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { ecosystemSteps } from "@/lib/data";
import { cn } from "@/lib/utils";

/**
 * Packaging → Production → Amazon → A+ Content → Shopify → Product launch
 * → Social. Packaging is highlighted as the core the rest is built from.
 */
export function EcosystemFlow({ className }: { className?: string }) {
  return (
    <ol
      aria-label="From packaging to ecommerce"
      className={cn(
        "grid gap-px overflow-hidden rounded-[28px] border border-border bg-border sm:grid-cols-2 lg:grid-cols-7",
        className,
      )}
    >
      {ecosystemSteps.map((step, i) => (
        <Reveal
          key={step.name}
          as="li"
          delay={i * 0.05}
          className={cn(
            "relative flex flex-col p-5 md:p-6",
            step.core ? "bg-foreground text-background sm:col-span-2 lg:col-span-1" : "bg-background",
          )}
        >
          <div className="flex items-center justify-between">
            <span className="font-display text-2xl italic leading-none opacity-40">0{i + 1}</span>
            {i < ecosystemSteps.length - 1 && (
              <ArrowRight aria-hidden className="hidden h-4 w-4 opacity-30 lg:block" />
            )}
          </div>
          <p className="mt-4 text-base font-semibold tracking-tight">{step.name}</p>
          {step.core && (
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-background/60">
              Core expertise
            </p>
          )}
          <p
            className={cn(
              "mt-2 text-sm leading-relaxed",
              step.core ? "text-background/70" : "text-muted",
            )}
          >
            {step.body}
          </p>
        </Reveal>
      ))}
    </ol>
  );
}
