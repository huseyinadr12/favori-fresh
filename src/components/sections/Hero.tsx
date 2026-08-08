"use client";

import { motion } from "motion/react";
import { intro, hero } from "@/content/home";
import { LiquidButton } from "@/components/ui/LiquidButton";
import { HeaderVisual } from "@/components/three/HeaderVisual";
import { HeroSlideshow } from "./HeroSlideshow";

/**
 * Açılış + marka hero.
 * Arka planda ~15 sn'de bir değişen otomatik görsel slideshow; üzerinde koyu
 * degrade örtü ve solda güçlü tipografi. Hızlı yüklenir (metin anında görünür,
 * ilk görsel öncelikli).
 */
export function Hero() {
  return (
    <section
      aria-label="Açılış"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-brand-botanic text-cream"
    >
      <HeroSlideshow />
      {/* Sağ tarafta 3D süzülen meyve küreleri */}
      <HeaderVisual />

      <div className="container-fluid relative z-10 py-28">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="kicker text-cream/80"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent-lemon" />
            {intro.overline}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 whitespace-pre-line font-display text-fluid-hero font-bold leading-[0.98] drop-shadow-[0_2px_20px_rgba(0,0,0,0.25)]"
          >
            {hero.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 max-w-xl text-fluid-lead text-cream/85"
          >
            {hero.body}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <LiquidButton href={intro.primaryCta.href}>
              {intro.primaryCta.label}
            </LiquidButton>
            <LiquidButton href={hero.secondaryCta.href} variant="outline">
              {hero.secondaryCta.label}
            </LiquidButton>
          </motion.div>

          {/* İstatistik / vaat şeridi */}
          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-14 grid max-w-2xl grid-cols-3 gap-4 border-t border-cream/20 pt-6"
          >
            {hero.stats.map((s) => (
              <div key={s.label}>
                <dt className="font-display text-xl text-cream">{s.value}</dt>
                <dd className="text-sm text-cream/70">{s.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>

      {/* Su damlası scroll göstergesi */}
      <a
        href="#urun-evreni"
        aria-label="Aşağı kaydır"
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
      >
        <span className="relative block h-10 w-6 rounded-full border border-cream/50">
          <span className="absolute left-1/2 top-2 h-2 w-2 -translate-x-1/2 animate-drop-fall rounded-full bg-cream" />
        </span>
      </a>
    </section>
  );
}
