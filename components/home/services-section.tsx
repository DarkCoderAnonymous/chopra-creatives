import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { services } from "@/lib/data";
import { cn } from "@/lib/utils";

/** Packaging → ecommerce → product marketing, with packaging as the core. */
export function ServicesSection({
  eyebrow = "Services",
  title = "Packaging first. Then everywhere the product *sells.*",
}: {
  eyebrow?: string;
  title?: string;
}) {
  return (
    <section id="services" className="scroll-mt-24 py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description="Strategic packaging and production-ready artwork are the core. The same visual system then extends into 3D, Amazon, A+ Content, Shopify and launch creative."
        />

        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.id} delay={i * 0.1} className="h-full">
              <article
                id={service.id}
                className={cn(
                  "flex h-full scroll-mt-28 flex-col rounded-[28px] border p-7 md:p-8",
                  service.core ? "border-foreground/80 bg-surface" : "border-border",
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-display text-3xl italic leading-none text-foreground/25">
                    0{i + 1}
                  </span>
                  {service.core && (
                    <span className="rounded-full bg-foreground px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-background">
                      Core expertise
                    </span>
                  )}
                </div>
                <h3 className="mt-8 text-2xl font-bold tracking-[-0.02em]">{service.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{service.summary}</p>

                <ul className="mt-6 flex-1 space-y-2.5">
                  {service.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-foreground/85">
                      <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-foreground/50" />
                      {item}
                    </li>
                  ))}
                </ul>

                <Link
                  href={service.href}
                  className="group/link mt-8 inline-flex items-center gap-2 text-sm font-semibold"
                >
                  <span className="link-underline pb-0.5">{service.cta}</span>
                  <ArrowRight
                    aria-hidden
                    className="h-4 w-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/link:translate-x-0.5"
                  />
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
