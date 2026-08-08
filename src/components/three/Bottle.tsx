"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface BottleProps {
  /** Sıvı rengi (hex). */
  liquidColor: string;
  /** Etiket/kapak vurgu rengi (hex). */
  accentColor: string;
  /** Hedef Y ekseni dönüşü (radyan) — scroll ile sürülür. */
  targetRotation: number;
  /** Dolum oranı 0..1. */
  fill?: number;
  /** Sürekli yavaş dönüş (ürün detay sahnesi için). */
  autoRotate?: boolean;
}

/**
 * PROCEDURAL ŞİŞE — gerçek GLB modeli gelene kadar placeholder.
 * LatheGeometry ile cam gövde, içinde renkli sıvı, kapak ve etiket bandı.
 * Değiştirmek için: bu bileşeni <primitive object={gltf.scene} /> ile değiştirin.
 */
export function Bottle({
  liquidColor,
  accentColor,
  targetRotation,
  fill = 0.72,
  autoRotate = false,
}: BottleProps) {
  const group = useRef<THREE.Group>(null);

  // Şişe gövdesi profili (2B kesit) → LatheGeometry.
  const bottleProfile = useMemo(() => {
    const pts: THREE.Vector2[] = [];
    // taban → omuz → boyun → ağız
    pts.push(new THREE.Vector2(0.0, -1.5));
    pts.push(new THREE.Vector2(0.55, -1.5));
    pts.push(new THREE.Vector2(0.6, -1.35));
    pts.push(new THREE.Vector2(0.6, 0.35));
    pts.push(new THREE.Vector2(0.58, 0.7));
    pts.push(new THREE.Vector2(0.42, 1.05));
    pts.push(new THREE.Vector2(0.22, 1.25));
    pts.push(new THREE.Vector2(0.2, 1.55));
    pts.push(new THREE.Vector2(0.24, 1.6));
    return pts;
  }, []);

  const glassGeo = useMemo(
    () => new THREE.LatheGeometry(bottleProfile, 64),
    [bottleProfile],
  );

  // Sıvı profili — cam iç yüzeyinden biraz içeride, fill seviyesine kadar.
  const liquidGeo = useMemo(() => {
    const top = -1.5 + 3.0 * fill; // taban -1.5, üst ~+0.9 aralığı
    const pts: THREE.Vector2[] = [
      new THREE.Vector2(0.0, -1.42),
      new THREE.Vector2(0.52, -1.42),
      new THREE.Vector2(0.55, -1.3),
      new THREE.Vector2(0.55, top),
      new THREE.Vector2(0.0, top),
    ];
    return new THREE.LatheGeometry(pts, 48);
  }, [fill]);

  // Yumuşak dönüş + çok hafif salınım (canlı ama abartısız).
  useFrame((state, delta) => {
    if (!group.current) return;
    const g = group.current;
    if (autoRotate) {
      g.rotation.y += delta * 0.35;
    } else {
      g.rotation.y += (targetRotation - g.rotation.y) * Math.min(1, delta * 3);
    }
    g.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.04;
  });

  return (
    <group ref={group} rotation={[0.04, 0, 0.02]}>
      {/* Cam gövde */}
      <mesh geometry={glassGeo} castShadow>
        <meshPhysicalMaterial
          transmission={0.9}
          thickness={0.6}
          roughness={0.12}
          ior={1.33}
          clearcoat={1}
          clearcoatRoughness={0.15}
          color="#ffffff"
          attenuationColor={liquidColor}
          attenuationDistance={2.2}
        />
      </mesh>

      {/* Sıvı */}
      <mesh geometry={liquidGeo}>
        <meshPhysicalMaterial
          color={liquidColor}
          roughness={0.25}
          transmission={0.35}
          thickness={1.2}
          ior={1.34}
          emissive={liquidColor}
          emissiveIntensity={0.08}
        />
      </mesh>

      {/* Etiket bandı */}
      <mesh position={[0, -0.35, 0]}>
        <cylinderGeometry args={[0.615, 0.615, 0.95, 48, 1, true]} />
        <meshStandardMaterial
          color="#f7f4ec"
          roughness={0.6}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Etiket üzerindeki vurgu şeridi */}
      <mesh position={[0, -0.72, 0]}>
        <cylinderGeometry args={[0.62, 0.62, 0.12, 48, 1, true]} />
        <meshStandardMaterial
          color={accentColor}
          roughness={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Kapak */}
      <mesh position={[0, 1.68, 0]}>
        <cylinderGeometry args={[0.26, 0.26, 0.22, 32]} />
        <meshStandardMaterial color={accentColor} roughness={0.35} metalness={0.1} />
      </mesh>
    </group>
  );
}
