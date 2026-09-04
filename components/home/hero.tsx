"use client";

import { useCanRender3D } from "@/lib/use-can-render-3d";
import { HeroFlythrough } from "./hero-flythrough";
import { HeroSimple } from "./hero-simple";

export function Hero() {
  const canRender3D = useCanRender3D();
  return canRender3D ? <HeroFlythrough /> : <HeroSimple />;
}
