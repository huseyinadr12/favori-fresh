"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Lightformer, Float } from "@react-three/drei";

/**
 * Başlık 3D sahnesi — havada süzülen premium CAM meyve damlaları.
 * Parlak plastik yerine yüksek geçirgenlikli (transmission) cam malzeme;
 * içine hafif meyve rengi işlenir. Ağ bağımlılığı yok (Lightformer ortam ışığı).
 */

interface OrbCfg {
  pos: [number, number, number];
  r: number;
  tint: string;
  speed: number;
  frost?: number;
}

const ORBS: OrbCfg[] = [
  { pos: [1.15, 0.45, 0], r: 0.92, tint: "#e6c22c", speed: 0.9 },
  { pos: [-1.05, -0.35, 0.5], r: 0.6, tint: "#ec741c", speed: 1.2, frost: 0.12 },
  { pos: [0.15, 1.2, -0.5], r: 0.46, tint: "#e6606a", speed: 1.5 },
  { pos: [-1.55, 0.95, -0.3], r: 0.42, tint: "#a8202d", speed: 1.1 },
  { pos: [0.85, -1.05, 0.3], r: 0.66, tint: "#3aa564", speed: 0.85, frost: 0.1 },
  { pos: [-0.25, 0.05, 0.85], r: 0.34, tint: "#5e2a5c", speed: 1.7 },
  { pos: [1.75, -0.3, -0.4], r: 0.36, tint: "#e8852d", speed: 1.4 },
];

function Orb({ pos, r, tint, speed, frost = 0.04 }: OrbCfg) {
  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={1.1}>
      <mesh position={pos}>
        <sphereGeometry args={[r, 64, 64]} />
        <meshPhysicalMaterial
          transmission={1}
          thickness={r * 2}
          roughness={frost}
          ior={1.34}
          color="#ffffff"
          attenuationColor={tint}
          attenuationDistance={r * 2.6}
          clearcoat={1}
          clearcoatRoughness={0.08}
          envMapIntensity={1.1}
        />
      </mesh>
    </Float>
  );
}

export default function Header3DScene() {
  return (
    <Canvas
      dpr={[1, 1.8]}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 5.4], fov: 42 }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 4, 3]} intensity={1.1} />
      <directionalLight position={[-4, -2, -2]} intensity={0.35} color="#f4e08a" />

      <group>
        {ORBS.map((o, i) => (
          <Orb key={i} {...o} />
        ))}
      </group>

      {/* Ağsız yumuşak stüdyo ortamı — cam yansımaları için */}
      <Environment resolution={256}>
        <Lightformer intensity={2.4} position={[0, 3, 3]} scale={[8, 3, 1]} color="#ffffff" />
        <Lightformer intensity={1.1} position={[-3, 1, 2]} scale={[3, 5, 1]} color="#f4e08a" />
        <Lightformer intensity={0.9} position={[3, -1, 2]} scale={[3, 3, 1]} color="#bfe8cf" />
        <Lightformer intensity={0.6} position={[0, -3, 1]} scale={[6, 2, 1]} color="#ffffff" />
      </Environment>
    </Canvas>
  );
}
