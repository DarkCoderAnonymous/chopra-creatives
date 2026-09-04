import { Container } from "@/components/layout/container";
import { HeroVisual } from "@/components/three/hero-visual";
import { HeroContent } from "./hero-content";

export function HeroSimple() {
  return (
    <section className="relative overflow-hidden pt-24 pb-14 md:flex md:min-h-[100svh] md:items-center md:pt-28 md:pb-16">
      <div className="absolute inset-0 hidden md:block">
        <HeroVisual />
        <div
          aria-hidden
          className="absolute inset-0 -z-0 bg-[linear-gradient(to_right,var(--background)_0%,var(--background)_34%,color-mix(in_oklab,var(--background)_65%,transparent)_52%,color-mix(in_oklab,var(--background)_15%,transparent)_72%,transparent_88%)]"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 -z-0 h-40 bg-gradient-to-t from-background to-transparent"
        />
      </div>

      <Container className="relative z-10">
        <HeroContent />
      </Container>
    </section>
  );
}
