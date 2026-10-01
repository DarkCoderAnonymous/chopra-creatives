"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Image as ImagePlane, useTexture } from "@react-three/drei";
import {
  Suspense,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  type RefObject,
} from "react";
import * as THREE from "three";
import { caseStudies } from "@/lib/data";

const SOURCES = caseStudies.slice(0, 6).map((study) => study.heroImage.src);

// Card footprint matches the 4:3 hero photography so nothing is stretched.
const CARD_W = 1.86;
const CARD_H = 1.395;
const GAP = 0.3;
const PITCH = CARD_H + GAP;
const SPAN = PITCH * SOURCES.length;
const COLUMN_X = [-2.18, 0, 2.18];

// Each column shows every image in a different order, so neighbouring
// cards never repeat side by side.
const COLUMN_ORDERS = [
  [0, 1, 2, 3, 4, 5],
  [3, 5, 0, 4, 1, 2],
  [4, 2, 5, 1, 3, 0],
];
// Columns drift in alternating directions; middle one a touch slower.
const COLUMN_SPEED = [0.16, -0.12, 0.16];
// Per-column vertical stagger so rows don't line up into a grid.
const COLUMN_PHASE = [0, PITCH * 0.5, PITCH * 0.18];

const damp = THREE.MathUtils.damp;
const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);
const wrap = (v: number) => THREE.MathUtils.euclideanModulo(v + SPAN / 2, SPAN) - SPAN / 2;

/** Soft, pre-blurred drop shadow shared by every card. */
function useShadowTexture() {
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 224;
    const ctx = canvas.getContext("2d")!;
    ctx.shadowColor = "rgba(24, 14, 60, 0.55)";
    ctx.shadowBlur = 34;
    // Draw the shape off-canvas and pull only its shadow back into view.
    ctx.shadowOffsetX = 1000;
    ctx.shadowOffsetY = 14;
    ctx.fillStyle = "#000";
    ctx.beginPath();
    ctx.roundRect(48 - 1000, 44, 160, 120, 14);
    ctx.fill();
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);
  useEffect(() => () => texture.dispose(), [texture]);
  return texture;
}

type CardProps = {
  texture: THREE.Texture;
  shadow: THREE.Texture;
  column: number;
  row: number;
};

function Card({ texture, shadow, column, row }: CardProps) {
  const group = useRef<THREE.Group>(null);
  const image = useRef<THREE.Mesh>(null);
  const shadowMat = useRef<THREE.MeshBasicMaterial>(null);
  const zoom = useRef(1.12);

  const baseY = row * PITCH + COLUMN_PHASE[column];
  const delay = 0.2 + column * 0.14 + row * 0.06;

  // Per-frame transforms on three.js objects are the standard R3F pattern;
  // they run outside React's render cycle.
  useFrame((state, delta) => {
    const g = group.current;
    const mesh = image.current;
    if (!g || !mesh) return;

    // Time since the wall first rendered (textures may load after mount).
    const elapsed = (state.scene.userData.time as number | undefined) ?? 0;
    const scroll = (state.scene.userData.scroll as number | undefined) ?? 0;
    const intro = easeOutCubic(THREE.MathUtils.clamp((elapsed - delay) / 1.4, 0, 1));

    const travel = elapsed * COLUMN_SPEED[column] + scroll * 3.2 * Math.sign(COLUMN_SPEED[column]);
    const y = wrap(baseY + travel);

    // Fade cards out before they reach the wrap seam at the column ends.
    const edge = 1 - THREE.MathUtils.smoothstep(Math.abs(y), SPAN / 2 - 1.9, SPAN / 2 - 0.5);
    const opacity = edge * intro;

    g.position.set(COLUMN_X[column], y - (1 - intro) * 1.1, (1 - intro) * -1.4);

    zoom.current = damp(zoom.current, 1 + (1 - intro) * 0.25, 3, delta);
    const mat = mesh.material as THREE.ShaderMaterial & { opacity: number; zoom: number };
    mat.opacity = opacity;
    mat.zoom = zoom.current;
    if (shadowMat.current) shadowMat.current.opacity = opacity * 0.85;
  });

  return (
    <group ref={group}>
      <mesh position={[0.04, -0.1, -0.02]} renderOrder={0}>
        <planeGeometry args={[CARD_W * 1.6, CARD_H * 1.87]} />
        <meshBasicMaterial
          ref={shadowMat}
          map={shadow}
          transparent
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      <ImagePlane
        ref={image}
        texture={texture}
        scale={[CARD_W, CARD_H]}
        radius={0.1}
        transparent
        toneMapped={false}
        renderOrder={1}
      />
    </group>
  );
}

function Wall({ scrollProgress }: { scrollProgress: RefObject<number> }) {
  const textures = useTexture(SOURCES);
  const shadow = useShadowTexture();
  const wall = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const smoothPointer = useRef({ x: 0, y: 0 });
  const smoothScroll = useRef(0);
  const startedAt = useRef<number | null>(null);
  const { camera, scene } = useThree();

  useLayoutEffect(() => {
    // Mutating loaded three.js textures is the intended API.
    textures.forEach((t) => {
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = 8;
      t.needsUpdate = true;
    });
  }, [textures]);

  // The hero copy sits above the canvas and swallows its pointer events,
  // so parallax listens on the window instead.
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  /* eslint-disable react-hooks/immutability */
  useFrame((state, delta) => {
    const g = wall.current;
    if (!g) return;

    startedAt.current ??= state.clock.elapsedTime;
    const time = state.clock.elapsedTime - startedAt.current;
    scene.userData.time = time;

    smoothScroll.current = damp(smoothScroll.current, scrollProgress.current ?? 0, 4, delta);
    smoothPointer.current.x = damp(smoothPointer.current.x, pointer.current.x, 2.5, delta);
    smoothPointer.current.y = damp(smoothPointer.current.y, pointer.current.y, 2.5, delta);
    scene.userData.scroll = smoothScroll.current;

    const p = smoothScroll.current;
    const s = THREE.MathUtils.smootherstep(p, 0, 1);
    // Only drift toward centre once the copy has started fading out.
    const late = THREE.MathUtils.smootherstep(p, 0.5, 1);
    const intro = easeOutCubic(THREE.MathUtils.clamp(time / 2.2, 0, 1));
    const px = smoothPointer.current.x;
    const py = smoothPointer.current.y;

    // Tilted at rest, flattening and sliding toward centre as the copy
    // scrolls away, so the right side is never left empty.
    g.position.set(THREE.MathUtils.lerp(1.95, 0.6, late), -0.05, 0);
    g.rotation.set(
      THREE.MathUtils.lerp(0.32, 0.12, s) + py * 0.05 + (1 - intro) * 0.18,
      THREE.MathUtils.lerp(-0.5, -0.2, s) + px * 0.08 - (1 - intro) * 0.25,
      THREE.MathUtils.lerp(0.13, 0.05, s),
    );

    camera.position.set(px * 0.25, -py * 0.18, THREE.MathUtils.lerp(9.2, 7.8, s));
    camera.lookAt(0, 0, 0);
  });
  /* eslint-enable react-hooks/immutability */

  return (
    <group ref={wall}>
      {COLUMN_ORDERS.map((order, column) =>
        order.map((src, row) => (
          <Card
            key={`${column}-${row}`}
            texture={textures[src]}
            shadow={shadow}
            column={column}
            row={row}
          />
        )),
      )}
    </group>
  );
}

export function HeroScene({
  scrollProgress,
}: {
  scrollProgress: RefObject<number>;
}) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 9.2], fov: 40 }}
      className="!touch-none"
    >
      <Suspense fallback={null}>
        <Wall scrollProgress={scrollProgress} />
      </Suspense>
    </Canvas>
  );
}
