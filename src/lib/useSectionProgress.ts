"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Bir bölümün, ekran boyunca sabitlenmiş (sticky) kaydırma ilerlemesini
 * 0..1 aralığında döndürür. Lenis ile uyumludur (gerçek scrollTop okur).
 * rAF ile throttle edilir; görünür değilken hesaplamayı durdurur.
 */
export function useSectionProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let active = false;

    const compute = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrollable = rect.height - vh;
      if (scrollable <= 0) {
        setProgress(0);
        return;
      }
      // rect.top: 0 iken başlangıç, -(scrollable) iken bitiş.
      const p = Math.min(1, Math.max(0, -rect.top / scrollable));
      setProgress(p);
    };

    const request = () => {
      if (!active || raf) return;
      raf = requestAnimationFrame(compute);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        active = entry.isIntersecting;
        if (active) request();
      },
      { threshold: 0 },
    );
    io.observe(el);

    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    compute();

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return { ref, progress };
}
