import { Container } from "@/components/layout/container";
import { ButtonLink } from "@/components/ui/button-link";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center py-32">
      <Container className="text-center">
        <p className="font-display text-[7rem] italic leading-none brand-gradient-text sm:text-[10rem]">
          404
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-[-0.03em] sm:text-5xl">
          This panel doesn&apos;t exist.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-muted">
          The page you’re looking for isn’t on the shelf. Head back home or
          browse our work.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <ButtonLink href="/" arrow>
            Back home
          </ButtonLink>
          <ButtonLink href="/work" variant="secondary">
            View work
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
