"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Billboard,
  Html,
  RoundedBox,
  useCursor,
  useTexture,
} from "@react-three/drei";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { caseStudies, type CaseStudy } from "@/lib/data";

const RADIUS = 4.4;
const COUNT = caseStudies.length;

function Card({
  study,
  angle,
  hoveredIndex,
  setHoveredIndex,
  index,
}: {
  study: CaseStudy;
  angle: number;
  index: number;
  hoveredIndex: number | null;
  setHoveredIndex: (i: number | null) => void;
}) {
  const router = useRouter();
  const groupRef = useRef<THREE.Group>(null);
  const texture = useTexture(study.heroImage.src);
  const hovered = hoveredIndex === index;
  useCursor(hovered);

  useEffect(() => {
    // three.js Texture instances are mutable GPU-resource handles by design.
    // eslint-disable-next-line react-hooks/immutability
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
  }, [texture]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const targetScale = hovered ? 1.14 : 1;
    const s = groupRef.current.scale;
    s.x += (targetScale - s.x) * Math.min(delta * 8, 1);
    s.y = s.x;
    s.z = s.x;
    const targetY = hovered ? 0.25 : 0;
    groupRef.current.position.y +=
      (targetY - groupRef.current.position.y) * Math.min(delta * 8, 1);
  });

  const x = Math.sin(angle) * RADIUS;
  const z = Math.cos(angle) * RADIUS;

  return (
    <group position={[x, 0, z]}>
      <group ref={groupRef}>
        <Billboard>
          <group
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/work/${study.slug}`);
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHoveredIndex(index);
            }}
            onPointerOut={() => setHoveredIndex(null)}
          >
            <RoundedBox args={[1.9, 1.42, 0.07]} radius={0.09} smoothness={4}>
              <meshStandardMaterial color="#0a0917" roughness={0.55} />
            </RoundedBox>
            <mesh position={[0, 0, 0.04]}>
              <planeGeometry args={[1.83, 1.35]} />
              <meshBasicMaterial map={texture} toneMapped={false} />
            </mesh>
            {hovered && (
              <Html
                center
                position={[0, -1.05, 0.1]}
                distanceFactor={7}
                style={{ pointerEvents: "none" }}
              >
                <div className="w-48 rounded-xl border border-white/15 bg-black/80 px-3 py-2 text-center backdrop-blur-sm">
                  <p className="text-sm font-semibold text-white">
                    {study.client}
                  </p>
                  <p className="mt-0.5 text-[11px] text-white/60">
                    {study.industry}
                  </p>
                </div>
              </Html>
            )}
          </group>
        </Billboard>
      </group>
    </group>
  );
}

function Ring() {
  const ringRef = useRef<THREE.Group>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useFrame((_, delta) => {
    if (!ringRef.current) return;
    if (hoveredIndex === null) {
      ringRef.current.rotation.y += delta * 0.14;
    }
  });

  return (
    <group ref={ringRef}>
      {caseStudies.map((study, i) => (
        <Card
          key={study.slug}
          study={study}
          index={i}
          angle={(i / COUNT) * Math.PI * 2}
          hoveredIndex={hoveredIndex}
          setHoveredIndex={setHoveredIndex}
        />
      ))}
    </group>
  );
}

export function WorkShowcase3D() {
  return (
    <Canvas
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0.9, 9.5], fov: 42 }}
    >
      <ambientLight intensity={1.2} />
      <directionalLight position={[4, 5, 6]} intensity={1.4} />
      <directionalLight position={[-4, -2, -4]} intensity={0.4} color="#6ea8ff" />
      <Suspense fallback={null}>
        <Ring />
      </Suspense>
    </Canvas>
  );
}
