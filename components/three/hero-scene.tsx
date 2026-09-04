"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, RoundedBox, Sparkles, useTexture } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, type RefObject } from "react";
import * as THREE from "three";
import { caseStudies } from "@/lib/data";

const CARDS: {
  src: string;
  position: [number, number, number];
  rotation: [number, number, number];
  size: [number, number];
  floatSpeed: number;
}[] = [
  {
    src: caseStudies[0].heroImage.src,
    position: [1.0, 1.0, 1.5],
    rotation: [0, 0.34, 0.05],
    size: [1.95, 1.45],
    floatSpeed: 1.05,
  },
  {
    src: caseStudies[1].heroImage.src,
    position: [2.6, -1.2, -0.6],
    rotation: [0, 0.16, -0.03],
    size: [1.7, 1.3],
    floatSpeed: 1.25,
  },
  {
    src: caseStudies[2].heroImage.src,
    position: [4.3, 1.1, -2.6],
    rotation: [0, -0.22, 0.04],
    size: [2.0, 1.5],
    floatSpeed: 0.85,
  },
  {
    src: caseStudies[3].heroImage.src,
    position: [5.6, -0.3, -4.6],
    rotation: [0, -0.32, -0.05],
    size: [2.1, 1.55],
    floatSpeed: 1.15,
  },
  {
    src: caseStudies[4].heroImage.src,
    position: [2.9, 2.3, -6.2],
    rotation: [0, 0.06, 0.02],
    size: [1.6, 1.2],
    floatSpeed: 0.95,
  },
  {
    src: caseStudies[5].heroImage.src,
    position: [3.5, -2.4, -3.3],
    rotation: [0, -0.08, 0.03],
    size: [1.75, 1.35],
    floatSpeed: 1.35,
  },
];

// Camera flight path — sampled 0 (top of hero) to 1 (end of pinned scroll).
const PATH_POINTS: [number, number, number][] = [
  [0, 0.3, 9.5],
  [0.8, 0.5, 4.5],
  [1.6, -0.2, 0.5],
  [1.0, 0.6, -3.5],
  [0.5, -0.1, -7.5],
];

function Card({
  src,
  position,
  rotation,
  size,
  floatSpeed,
}: (typeof CARDS)[number]) {
  const texture = useTexture(src);

  useEffect(() => {
    // three.js Texture instances are mutable GPU-resource handles by design —
    // setting colorSpace after load is the standard three.js/R3F pattern and
    // has no bearing on React's render output or memoization.
    // eslint-disable-next-line react-hooks/immutability
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
  }, [texture]);

  return (
    <Float
      speed={floatSpeed}
      rotationIntensity={0.4}
      floatIntensity={0.9}
      position={position}
    >
      <group rotation={rotation}>
        <RoundedBox args={[size[0], size[1], 0.07]} radius={0.09} smoothness={4}>
          <meshStandardMaterial color="#0a0917" roughness={0.55} metalness={0.05} />
        </RoundedBox>
        <mesh position={[0, 0, 0.04]}>
          <planeGeometry args={[size[0] - 0.07, size[1] - 0.07]} />
          <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>
      </group>
    </Float>
  );
}

function FlightRig({ scrollProgress }: { scrollProgress: RefObject<number> }) {
  const { camera, pointer } = useThree();
  const curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3(
        PATH_POINTS.map((p) => new THREE.Vector3(...p)),
        false,
        "catmullrom",
        0.5,
      ),
    [],
  );
  const smoothed = useRef(0);
  const tmpPos = useRef(new THREE.Vector3());
  const tmpLook = useRef(new THREE.Vector3());

  // Imperatively driving the camera transform inside useFrame is the
  // standard react-three-fiber pattern for per-frame camera control; it
  // runs outside React's render/commit cycle and has no bearing on
  // component re-rendering or memoization.
  /* eslint-disable react-hooks/immutability */
  useFrame((_, delta) => {
    const target = scrollProgress.current ?? 0;
    smoothed.current += (target - smoothed.current) * Math.min(delta * 4, 1);
    const t = THREE.MathUtils.clamp(smoothed.current, 0, 1);

    curve.getPoint(t, tmpPos.current);
    curve.getPoint(Math.min(t + 0.1, 1), tmpLook.current);

    camera.position.x = tmpPos.current.x + pointer.x * 0.35;
    camera.position.y = tmpPos.current.y - pointer.y * 0.22;
    camera.position.z = tmpPos.current.z;
    camera.lookAt(tmpLook.current);
  });
  /* eslint-enable react-hooks/immutability */

  return null;
}

function Scene({ scrollProgress }: { scrollProgress: RefObject<number> }) {
  return (
    <>
      <FlightRig scrollProgress={scrollProgress} />
      {CARDS.map((card) => (
        <Card key={card.src} {...card} />
      ))}
      <Sparkles
        count={70}
        scale={[10, 7, 16]}
        size={2.2}
        speed={0.2}
        opacity={0.45}
        color="#8ec9ff"
      />
    </>
  );
}

export function HeroScene({
  scrollProgress,
}: {
  scrollProgress: RefObject<number>;
}) {
  return (
    <Canvas
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: PATH_POINTS[0], fov: 48 }}
      className="!touch-none"
    >
      <ambientLight intensity={1.15} />
      <directionalLight position={[4, 5, 6]} intensity={1.5} />
      <directionalLight position={[-5, -3, -4]} intensity={0.45} color="#6ea8ff" />
      <Suspense fallback={null}>
        <Scene scrollProgress={scrollProgress} />
      </Suspense>
    </Canvas>
  );
}
