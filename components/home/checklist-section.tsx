import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";
import { readinessChecklist } from "@/lib/data";

export function ChecklistSection() {
  return (
    <section className="border-t border-border bg-surface py-20 md:py-28">
      <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">
              Before you reach out
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              A quick gut-check on retail readiness.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
              These are the questions every one of our packaging systems has
              had to answer. If any of them give you pause, that&apos;s
              usually where a project starts.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground transition-transform hover:scale-[1.03] active:scale-[0.98]"
            >
              Talk through your packaging
            </Link>
          </Reveal>
        </div>

        <ul className="space-y-4">
          {readinessChecklist.map((item, i) => (
            <Reveal key={item} delay={i * 0.07}>
              <li className="flex items-start gap-3 rounded-2xl border border-border bg-background p-5">
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 shrink-0 text-accent"
                  aria-hidden
                />
                <span className="text-sm leading-relaxed text-foreground/90 sm:text-base">
                  {item}
                </span>
              </li>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
