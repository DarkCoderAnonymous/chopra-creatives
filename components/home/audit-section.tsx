import { Check } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button-link";
import { launchAudit } from "@/lib/data";

/** Lower-risk entry offer into the main services. */
export function AuditSection() {
  const href = launchAudit.checkoutUrl ?? "/contact?package=audit";

  return (
    <section id="product-launch-audit" className="scroll-mt-24 py-12 md:py-16">
      <Container>
        <Reveal>
          <div className="grid gap-10 rounded-[32px] border border-border bg-surface p-7 md:p-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <div className="flex flex-col">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
                Not ready for a full project?
              </p>
              <h2 className="mt-4 text-3xl font-bold leading-[1.05] tracking-[-0.03em] sm:text-5xl">
                {launchAudit.name}
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
                {launchAudit.tagline}
              </p>

              <p className="mt-8 flex items-baseline gap-2">
                <span className="text-sm text-muted">Price</span>
                <span className="text-3xl font-bold tracking-[-0.03em]">{launchAudit.price}</span>
              </p>

              <ul className="mt-6 flex flex-wrap gap-2" aria-label="Deliverables">
                {launchAudit.deliverables.map((d) => (
                  <li key={d} className="rounded-full border border-border px-3 py-1.5 text-xs font-medium">
                    {d}
                  </li>
                ))}
              </ul>

              <div className="mt-9">
                <ButtonLink href={href} arrow magnetic={false}>
                  Book a launch audit
                </ButtonLink>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold">What the audit reviews</h3>
              <ul className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {launchAudit.covers.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 border-b border-border pb-3 text-sm text-foreground/85"
                  >
                    <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-foreground/50" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
