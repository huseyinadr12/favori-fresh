"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Lightformer, Float } from "@react-three/drei";

/**
 * Başlık 3D sahnesi — havada süzülen cam/sıvı meyve küreleri.
 * Şeffaf arka plan (alpha); ağ bağımlılığı yoktur (ortam ışığı Lightformer'larla).
 * Dekoratiftir; pointer-events kapalıdır.
 */

interface OrbCfg {
  pos: [number, number, number];
  r: number;
  color: string;
  glass: boolean;
  speed: number;
}

const ORBS: OrbCfg[] = [
  { pos: [1.1, 0.5, 0], r: 0.85, color: "#e6c22c", glass: true, speed: 1.1 },
  { pos: [-1.0, -0.4, 0.6], r: 0.55, color: "#ec741c", glass: false, speed: 1.5 },
  { pos: [0.1, 1.15, -0.6], r: 0.42, color: "#e6606a", glass: false, speed: 1.8 },
  { pos: [-1.5, 0.9, -0.3], r: 0.4, color: "#a8202d", glass: true, speed: 1.3 },
  { pos: [0.8, -1.0, 0.3], r: 0.62, color: "#e8852d", glass: true, speed: 1.0 },
  { pos: [-0.2, 0.0, 0.9], r: 0.32, color: "#5e2a5c", glass: false, speed: 2.0 },
  { pos: [1.7, -0.3, -0.4], r: 0.34, color: "#3aa564", glass: false, speed: 1.6 },
];

function Orb({ pos, r, color, glass, speed }: OrbCfg) {
  return (
    <Float speed={speed} rotationIntensity={0.7} floatIntensity={1.3}>
      <mesh position={pos}>
        <sphereGeometry args={[r, 48, 48]} />
        {glass ? (
          <meshPhysicalMaterial
            transmission={1}
            thickness={1.6}
            roughness={0.05}
            ior={1.3}
            color="#ffffff"
            attenuationColor={color}
            attenuationDistance={1.4}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        ) : (
          <meshStandardMaterial color={color} roughness={0.22} metalness={0.1} />
        )}
      </mesh>
    </Float>
  );
}

export default function Header3DScene() {
  return (
    <Canvas
      dpr={[1, 1.8]}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 5.2], fov: 42 }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 3]} intensity={1.5} />
      <directionalLight position={[-4, -2, -2]} intensity={0.4} color="#f4e08a" />

      <group>
        {ORBS.map((o, i) => (
          <Orb key={i} {...o} />
        ))}
      </group>

      <Environment resolution={128}>
        <Lightformer intensity={2} position={[0, 3, 2]} scale={[7, 3, 1]} color="#ffffff" />
        <Lightformer intensity={1.1} position={[-3, 1, 1]} scale={[3, 4, 1]} color="#f4e08a" />
        <Lightformer intensity={0.8} position={[3, -1, 1]} scale={[3, 3, 1]} color="#7fd6a0" />
      </Environment>
    </Canvas>
  );
}
