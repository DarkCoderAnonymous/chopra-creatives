import { Check } from "lucide-react";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button-link";
import { pricingNote, servicePackages, type ServicePackage } from "@/lib/data";
import { cn } from "@/lib/utils";

function PackageCard({ pkg }: { pkg: ServicePackage }) {
  const featured = pkg.featured === true;

  return (
    <article
      aria-labelledby={`package-${pkg.id}`}
      className={cn(
        "relative flex h-full flex-col rounded-[28px] border p-7 md:p-8",
        featured
          ? "border-transparent bg-foreground text-background shadow-[0_40px_100px_-40px_color-mix(in_oklab,var(--grad-c)_70%,transparent)] lg:-translate-y-4"
          : "border-border bg-surface",
      )}
    >
      {featured && (
        <span className="absolute right-6 top-6 rounded-full bg-background px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-foreground md:right-8 md:top-8">
          Featured
        </span>
      )}

      <h3 id={`package-${pkg.id}`} className="text-sm font-semibold uppercase tracking-[0.2em]">
        {pkg.name}
      </h3>
      <p className="mt-5 flex items-baseline gap-2">
        <span className={cn("text-sm", featured ? "text-background/60" : "text-muted")}>
          Starting at
        </span>
        <span className="text-4xl font-bold tracking-[-0.03em]">{pkg.price}</span>
      </p>
      <p className="mt-5 text-lg font-semibold leading-snug tracking-tight">{pkg.tagline}</p>
      <p
        className={cn(
          "mt-2 text-sm leading-relaxed",
          featured ? "text-background/65" : "text-muted",
        )}
      >
        {pkg.bestFor}
      </p>

      <ul
        className={cn(
          "mt-7 flex-1 space-y-3 border-t pt-6",
          featured ? "border-background/15" : "border-border",
        )}
      >
        {pkg.scope.map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm leading-relaxed">
            <span
              aria-hidden
              className={cn(
                "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                featured ? "bg-background/12 text-background" : "bg-foreground/[0.06] text-foreground",
              )}
            >
              <Check className="h-3 w-3" strokeWidth={2.5} />
            </span>
            <span className={featured ? "text-background/90" : "text-foreground/85"}>{item}</span>
          </li>
        ))}
      </ul>

      <ButtonLink
        href={`/contact?package=${pkg.id}`}
        variant={featured ? "inverse" : "secondary"}
        arrow
        magnetic={false}
        className="mt-9 w-full shrink-0"
      >
        Start a project
      </ButtonLink>
    </article>
  );
}

export function PricingSection() {
  return (
    <section id="pricing" className="scroll-mt-24 py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow="Packages"
          title="Three ways to bring a product to *market.*"
          description={`Each package is a starting point, scoped to your product. ${pricingNote}`}
        />

        <div className="mt-16 grid items-stretch gap-5 lg:grid-cols-3 lg:gap-6">
          {servicePackages.map((pkg, i) => (
            <Reveal key={pkg.id} delay={i * 0.1} className="h-full">
              <PackageCard pkg={pkg} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-10 max-w-2xl text-sm leading-relaxed text-muted">
            Packages aren&apos;t bought directly. Every project starts with a
            short qualification and consultation, then a written proposal —
            payment only happens once the scope is agreed.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
