"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RoundedBox, useTexture } from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";

function Card({ src, aspect }: { src: string; aspect: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const texture = useTexture(src);
  const { pointer } = useThree();
  const clock = useRef(0);

  useEffect(() => {
    // three.js Texture instances are mutable GPU-resource handles by design.
    // eslint-disable-next-line react-hooks/immutability
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
  }, [texture]);

  const height = 3.4;
  const width = height * aspect;

  useFrame((_, delta) => {
    clock.current += delta;
    if (!groupRef.current) return;
    const idleY = Math.sin(clock.current * 0.4) * 0.03;
    const targetY = pointer.x * 0.28 + idleY;
    const targetX = -pointer.y * 0.16;
    groupRef.current.rotation.y +=
      (targetY - groupRef.current.rotation.y) * Math.min(delta * 3.5, 1);
    groupRef.current.rotation.x +=
      (targetX - groupRef.current.rotation.x) * Math.min(delta * 3.5, 1);
  });

  return (
    <group ref={groupRef}>
      <RoundedBox args={[width, height, 0.12]} radius={0.05} smoothness={4}>
        <meshStandardMaterial color="#0a0917" roughness={0.5} />
      </RoundedBox>
      <mesh position={[0, 0, 0.07]}>
        <planeGeometry args={[width - 0.06, height - 0.06]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
    </group>
  );
}

export function ProductViewer3D({
  src,
  aspect,
}: {
  src: string;
  aspect: number;
}) {
  return (
    <Canvas
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 6.4], fov: 38 }}
      className="!touch-none"
    >
      <ambientLight intensity={1.2} />
      <directionalLight position={[4, 5, 6]} intensity={1.4} />
      <directionalLight position={[-4, -3, -4]} intensity={0.4} color="#6ea8ff" />
      <Suspense fallback={null}>
        <Card src={src} aspect={aspect} />
      </Suspense>
    </Canvas>
  );
}
