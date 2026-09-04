import Link from "next/link";
import { Container } from "@/components/layout/container";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center py-32">
      <Container className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-accent">
          404
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          This panel doesn&apos;t exist.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-muted">
          The page you’re looking for isn’t on the shelf. Head back home or
          browse our work.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground"
          >
            Back home
          </Link>
          <Link
            href="/work"
            className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground hover:border-accent hover:text-accent"
          >
            View work
          </Link>
        </div>
      </Container>
    </section>
  );
}
