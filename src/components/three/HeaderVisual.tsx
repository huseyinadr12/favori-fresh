"use client";

import dynamic from "next/dynamic";
import { useMotion } from "@/components/providers/MotionProvider";
import { cn } from "@/lib/utils";

// 3D sahne yalnızca istemcide ve gerektiğinde yüklenir.
const Header3DScene = dynamic(() => import("./Header3DScene"), { ssr: false });

/**
 * Başlık/hero sağ tarafındaki 3D görsel katmanı.
 * WebGL yok / hareket azaltma / kullanıcı 3D'yi kapatmışsa hiçbir şey render
 * etmez (arkadaki AnimatedBackdrop zaten boşluğu doldurur). Dekoratiftir.
 */
export function HeaderVisual({ className }: { className?: string }) {
  const { shouldRender3D } = useMotion();
  if (!shouldRender3D) return null;

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-y-0 right-0 hidden w-[55%] md:block lg:w-[48%]",
        className,
      )}
    >
      <Header3DScene />
    </div>
  );
}
