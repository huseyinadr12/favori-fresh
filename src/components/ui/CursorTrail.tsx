"use client";

import { useEffect, useRef } from "react";
import { useMotion } from "@/components/providers/MotionProvider";

/**
 * İmlecin arkasından gelen abartısız, şeffaf sıvı izi.
 * Yalnızca ince işaretçi (mouse) olan cihazlarda ve hareket azaltma kapalıyken çalışır.
 */
export function CursorTrail() {
  const { prefersReducedMotion } = useMotion();
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const dot = dotRef.current;
    if (!dot) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let x = mouseX;
    let y = mouseY;
    let visible = false;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) {
        visible = true;
        dot.style.opacity = "1";
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    let raf = 0;
    const loop = () => {
      // Yumuşak takip (lerp).
      x += (mouseX - x) * 0.12;
      y += (mouseY - y) * 0.12;
      dot.style.transform = `translate3d(${x - 20}px, ${y - 20}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [prefersReducedMotion]);

  return (
    <div
      ref={dotRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[90] h-10 w-10 rounded-full opacity-0 blur-md transition-opacity duration-500 mix-blend-multiply"
      style={{
        background:
          "radial-gradient(circle, rgb(var(--c-accent) / 0.35), transparent 70%)",
      }}
    />
  );
}
