"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { useMotion } from "./MotionProvider";

/**
 * Lenis tabanlı kontrollü smooth scroll.
 * Hareket azaltma tercihinde devre dışı kalır (native scroll'a düşer).
 * Agresif scroll-jacking YAPMAZ — yalnızca akışı yumuşatır.
 */
export function SmoothScroll() {
  const { prefersReducedMotion } = useMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Hash bağlantıları için yumuşak kaydırma köprüsü.
    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(
        'a[href^="#"]',
      ) as HTMLAnchorElement | null;
      if (!target) return;
      const id = target.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        lenis.scrollTo(el as HTMLElement, { offset: -80 });
      }
    };
    document.addEventListener("click", onClick);

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, [prefersReducedMotion]);

  return null;
}
