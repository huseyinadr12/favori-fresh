"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useMotion } from "@/components/providers/MotionProvider";
import type { Product } from "@/lib/types";
import { accentRgb, cssVars } from "@/lib/utils";

const ProductScene = dynamic(() => import("./ProductScene"), { ssr: false });

/**
 * Ürün detay vitrini.
 * Öncelik sırası:
 *  1) Gerçek ürün fotoğrafı (varsa) — premium ürün fotoğrafçılığı.
 *  2) Procedural 3D şişe (3D uygunsa) — yavaş dönen.
 *  3) Renk kimliğiyle statik, erişilebilir kompozisyon (fallback).
 */
export function ProductShowcase3D({ product }: { product: Product }) {
  const { shouldRender3D } = useMotion();

  const backdrop = cssVars({
    "--c-accent": accentRgb[product.accent],
    background:
      "radial-gradient(120% 90% at 40% 25%, rgb(var(--c-accent) / 0.2), rgb(var(--c-accent) / 0.05))",
  });

  // 1) Gerçek fotoğraf — siyah zeminli render için koyu stüdyo sahnesi
  if (product.bottleImage) {
    return (
      <div
        className="relative aspect-[4/5] overflow-hidden rounded-3xl"
        style={cssVars({
          "--c-accent": accentRgb[product.accent],
          background:
            "radial-gradient(circle at 50% 40%, rgb(var(--c-accent) / 0.26), rgba(7,9,8,1) 72%)",
        })}
      >
        <Image
          src={product.bottleImage}
          alt={`${product.name} ürün görseli`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 45vw"
          className="object-contain p-6"
        />
      </div>
    );
  }

  // 2) Procedural 3D
  if (shouldRender3D) {
    return (
      <div className="relative aspect-square overflow-hidden rounded-3xl" style={backdrop}>
        <ProductScene
          liquidColor={product.scene.liquidColor}
          accentColor={product.scene.accentColor}
          targetRotation={0}
          autoRotate
          fill={0.72}
        />
      </div>
    );
  }

  // 3) Statik fallback (varsa bahçe görseli, yoksa renk lekesi)
  return (
    <div
      className="relative grid aspect-square place-items-center overflow-hidden rounded-3xl"
      style={backdrop}
    >
      {product.orchardImage ? (
        <Image
          src={product.orchardImage}
          alt={`${product.fruitSource}`}
          fill
          sizes="(max-width: 768px) 100vw, 45vw"
          className="object-cover opacity-90"
        />
      ) : (
        <span
          aria-hidden
          className="h-40 w-40 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 35% 30%, rgb(var(--c-accent)), rgb(var(--c-accent) / 0.55))",
          }}
        />
      )}
    </div>
  );
}
