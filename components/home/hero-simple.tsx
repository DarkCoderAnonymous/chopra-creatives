import { Container } from "@/components/layout/container";
import { HeroVisual } from "@/components/three/hero-visual";
import { HeroContent } from "./hero-content";
import { HeroAmbient } from "./hero-ambient";

export function HeroSimple() {
  return (
    <section className="relative overflow-hidden pt-28 pb-14 md:flex md:min-h-[100svh] md:items-center md:pt-28 md:pb-16">
      <HeroAmbient />
      <div className="absolute inset-0 hidden md:block">
        <HeroVisual />
        <div
          aria-hidden
          className="absolute inset-0 -z-0 bg-[linear-gradient(to_right,var(--background)_0%,var(--background)_30%,color-mix(in_oklab,var(--background)_80%,transparent)_44%,color-mix(in_oklab,var(--background)_20%,transparent)_62%,transparent_78%)]"
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
