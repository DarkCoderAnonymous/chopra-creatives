import type { Metadata } from "next";
import Link from "next/link";
import { Mail } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";
import { TextReveal } from "@/components/ui/text-reveal";
import { Eyebrow } from "@/components/ui/section-heading";
import { ContactForm } from "@/components/contact/contact-form";
import { readinessChecklist, siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "Start a Project — Packaging & Ecommerce Design",
  description:
    "Start a product packaging or ecommerce design project with Chopra Creative. Share your product, SKUs, channels, timeline and budget to get a proposal.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <section className="pt-36 pb-24 md:pt-48 md:pb-32">
      {/* Mobile order: intro → form → checklist. Desktop: intro and
          checklist on the left, the form sticky on the right. */}
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-x-20 lg:gap-y-0">
        <div className="lg:col-start-1 lg:row-start-1">
          <Reveal>
            <Eyebrow>Start a project</Eyebrow>
          </Reveal>
          <TextReveal
            as="h1"
            immediate
            delay={0.1}
            text="Let's bring your product to *market.*"
            className="mt-4 text-[2.6rem] font-bold leading-[1.02] tracking-[-0.035em] sm:text-6xl lg:text-7xl"
          />
          <Reveal delay={0.35}>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
              Tell me about the product, where it sells and what it needs.
              After a short qualification and consultation you&apos;ll get a
              written proposal — payment only once the scope is agreed.
            </p>
          </Reveal>

          <Reveal delay={0.45}>
            <a
              href={`mailto:${siteConfig.email}`}
              className="group mt-9 inline-flex items-center gap-3 text-foreground"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-border transition-colors duration-300 group-hover:border-transparent group-hover:bg-foreground group-hover:text-background">
                <Mail className="h-4 w-4" aria-hidden />
              </span>
              <span className="link-underline pb-0.5 font-display text-2xl italic">
                {siteConfig.email}
              </span>
            </a>
          </Reveal>
        </div>

        <Reveal
          delay={0.3}
          className="lg:sticky lg:top-28 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-start"
        >
          <div className="relative overflow-hidden rounded-[32px] border border-border bg-surface p-6 shadow-[0_40px_100px_-50px_color-mix(in_oklab,var(--grad-c)_50%,transparent)] sm:p-10">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--grad-e)_25%,transparent),transparent)] blur-2xl"
            />
            <ContactForm />
          </div>
        </Reveal>

        <div className="lg:col-start-1 lg:row-start-2">
          <Reveal delay={0.55}>
            <div className="lg:mt-14">
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
                Good to have ready
              </h2>
              <ul className="mt-5 divide-y divide-border border-y border-border">
                {readinessChecklist.map((item, i) => (
                  <li
                    key={item}
                    className="flex gap-4 py-4 text-sm leading-relaxed text-foreground/80"
                  >
                    <span className="font-display text-lg italic leading-6 text-muted">
                      0{i + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-sm text-muted">
                Not ready for a full project?{" "}
                <Link href="/services#product-launch-audit" className="link-underline text-foreground">
                  Start with a Product Launch Audit
                </Link>
                .
              </p>
            </div>
          </Reveal>
        </div>

      </Container>
    </section>
  );
}
