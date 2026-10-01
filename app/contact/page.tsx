import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";
import { TextReveal } from "@/components/ui/text-reveal";
import { Eyebrow } from "@/components/ui/section-heading";
import { ContactForm } from "@/components/contact/contact-form";
import { readinessChecklist, siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a packaging project with Chopra Creative — brand identity, structural dielines, and 3D visualization.",
};

export default function ContactPage() {
  return (
    <section className="pt-36 pb-24 md:pt-48 md:pb-32">
      <Container className="grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <Reveal>
            <Eyebrow>Contact</Eyebrow>
          </Reveal>
          <TextReveal
            as="h1"
            immediate
            delay={0.1}
            text="Let's scope your *packaging.*"
            className="mt-4 text-[2.6rem] font-bold leading-[1.02] tracking-[-0.035em] sm:text-6xl lg:text-7xl"
          />
          <Reveal delay={0.35}>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
              Send over what you’re working on and we’ll follow up with how
              we’d approach the identity, dieline, and 3D work.
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

          <Reveal delay={0.55}>
            <div className="mt-14">
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
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.3} className="lg:sticky lg:top-28 lg:self-start">
          <div className="relative overflow-hidden rounded-[32px] border border-border bg-surface p-6 shadow-[0_40px_100px_-50px_color-mix(in_oklab,var(--grad-c)_50%,transparent)] sm:p-10">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--grad-e)_25%,transparent),transparent)] blur-2xl"
            />
            <ContactForm />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
