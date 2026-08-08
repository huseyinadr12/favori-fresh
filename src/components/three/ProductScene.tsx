"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Lightformer, ContactShadows } from "@react-three/drei";
import { Bottle } from "./Bottle";

interface ProductSceneProps {
  liquidColor: string;
  accentColor: string;
  targetRotation: number;
  fill?: number;
  autoRotate?: boolean;
}

/**
 * Ürün 3D sahnesi. Şeffaf arka plan (alpha) ile bölümün morph olan
 * arka plan rengi şişenin arkasından görünür.
 * Ağ (network) bağımlılığı yoktur: ortam ışığı Lightformer'larla üretilir.
 */
export default function ProductScene({
  liquidColor,
  accentColor,
  targetRotation,
  fill,
  autoRotate,
}: ProductSceneProps) {
  return (
    <Canvas
      dpr={[1, 1.8]}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 5.2], fov: 38 }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 3]} intensity={1.6} castShadow />
      <directionalLight position={[-4, 2, -2]} intensity={0.5} color={accentColor} />

      <Bottle
        liquidColor={liquidColor}
        accentColor={accentColor}
        targetRotation={targetRotation}
        fill={fill}
        autoRotate={autoRotate}
      />

      <ContactShadows
        position={[0, -1.65, 0]}
        opacity={0.35}
        scale={6}
        blur={2.6}
        far={3}
      />

      {/* Ağsız ortam yansıması (cam gövde için) */}
      <Environment resolution={128}>
        <Lightformer
          intensity={2}
          position={[0, 3, 2]}
          scale={[6, 3, 1]}
          color="#ffffff"
        />
        <Lightformer
          intensity={1.2}
          position={[-3, 1, 1]}
          scale={[3, 4, 1]}
          color={accentColor}
        />
        <Lightformer
          intensity={0.8}
          position={[3, -1, 1]}
          scale={[3, 3, 1]}
          color="#f7f4ec"
        />
      </Environment>
    </Canvas>
  );
}
