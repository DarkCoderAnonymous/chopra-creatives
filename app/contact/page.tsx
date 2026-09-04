import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";
import { ContactForm } from "@/components/contact/contact-form";
import { readinessChecklist, siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a packaging project with Chopra Creative — brand identity, structural dielines, and 3D visualization.",
};

export default function ContactPage() {
  return (
    <section className="pt-32 pb-24 md:pt-40 md:pb-32">
      <Container className="grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">
              Contact
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
              Let&apos;s scope your packaging.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
              Send over what you’re working on and we’ll follow up with how
              we’d approach the identity, dieline, and 3D work.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-8 inline-flex items-center gap-2 text-base font-semibold text-accent hover:underline"
            >
              <Mail className="h-4 w-4" aria-hidden />
              {siteConfig.email}
            </a>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-12">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">
                Good to have ready
              </h2>
              <ul className="mt-4 space-y-3">
                {readinessChecklist.map((item) => (
                  <li
                    key={item}
                    className="text-sm leading-relaxed text-foreground/80"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="rounded-3xl border border-border bg-surface p-6 sm:p-8">
            <ContactForm />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
