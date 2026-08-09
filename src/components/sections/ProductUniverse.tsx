"use client";

import { useMemo } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { products, categoryMeta } from "@/content/products";
import { universe } from "@/content/home";
import { useSectionProgress } from "@/lib/useSectionProgress";
import { mixRgbString } from "@/lib/color";
import { cssVars } from "@/lib/utils";
import { LiquidButton } from "@/components/ui/LiquidButton";

const total = products.length;

/**
 * Ürün evreni — merkezde gerçek ürün şişesi; kaydırdıkça ürün değişir,
 * arka plan ilgili meyvenin rengine morph olur. Şişe görselleri SİMETRİK
 * geçişlerle (aynı ölçek/opaklık ile giriş-çıkış) değişir.
 */
export function ProductUniverse() {
  const { ref, progress } = useSectionProgress<HTMLDivElement>();

  const pos = progress * (total - 1);
  const segIndex = Math.min(total - 2, Math.max(0, Math.floor(pos)));
  const segFrac = Math.min(1, Math.max(0, pos - segIndex));
  const activeIndex = Math.round(pos);

  const from = products[segIndex];
  const to = products[Math.min(total - 1, segIndex + 1)];
  const active = products[activeIndex];

  // Arka plan vurgu rengi meyveler arasında yumuşakça geçer.
  const accentVar = useMemo(
    () => mixRgbString(from.scene.liquidColor, to.scene.liquidColor, segFrac),
    [from, to, segFrac],
  );

  const cat = categoryMeta[active.category];

  return (
    <section
      id="urun-evreni"
      ref={ref}
      aria-label="Ürün evreni"
      className="relative"
      style={cssVars({ height: `${total * 82}vh`, "--c-accent": accentVar })}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Morph olan arka plan */}
        <div
          aria-hidden
          className="absolute inset-0 transition-colors duration-300"
          style={{
            background:
              "radial-gradient(120% 90% at 72% 18%, rgb(var(--c-accent) / 0.18), transparent 55%), radial-gradient(90% 90% at 15% 95%, rgb(var(--c-accent) / 0.1), transparent 50%)",
          }}
        />

        <div className="container-fluid relative grid h-full grid-rows-[1fr_auto] items-center gap-6 py-24 md:grid-cols-2 md:grid-rows-1 md:gap-10">
          {/* Sol: metin */}
          <div className="relative z-10 order-2 md:order-1">
            <p className="kicker text-accentnow">
              <span className="h-1.5 w-1.5 rounded-full bg-accentnow" />
              {universe.overline}
            </p>
            <AnimatePresence mode="wait">
              <motion.div
                key={active.slug}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="mt-3 inline-flex items-center gap-2 rounded-full border border-current/25 px-3 py-1 text-xs font-semibold text-accentnow">
                  {cat.label}
                  <span className="text-ink/40">·</span>
                  <span className="text-ink/60">{cat.short}</span>
                </span>
                <h2 className="mt-3 font-display text-fluid-h2 leading-[1.05]">
                  {active.name.replace("Favori Fresh ", "")}
                </h2>
                <p className="mt-2 text-fluid-lead text-ink/70">
                  {active.tagline}
                </p>
                <p className="mt-4 max-w-md text-ink/70">{active.story}</p>

                <dl className="mt-6 grid max-w-md grid-cols-2 gap-4 text-sm">
                  <div>
                    <dt className="text-ink/50">Meyve kaynağı</dt>
                    <dd className="font-medium">{active.fruitSource}</dd>
                  </div>
                  <div>
                    <dt className="text-ink/50">
                      {active.dilution ? "Hazırlama" : "Kullanım"}
                    </dt>
                    <dd className="font-medium">
                      {active.dilution ? "1/4 oranında" : "İçime hazır"}
                    </dd>
                  </div>
                </dl>

                <div className="mt-7 flex flex-wrap gap-3">
                  <LiquidButton href={`/urunler/${active.slug}`}>
                    Ürünü İncele
                  </LiquidButton>
                  <LiquidButton href="/horeca#numune" variant="outline">
                    Numune Talep Et
                  </LiquidButton>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Sağ: ürün şişesi — tüm görseller yığılı, aktif olan crossfade +
              hafif ölçek/dönüşle açılır (mount/unmount yok → akıcı, takılmasız) */}
          <div className="relative order-1 h-[40vh] md:order-2 md:h-[76vh]">
            <div
              className="relative h-full w-full overflow-hidden rounded-[2rem]"
              style={{
                background:
                  "radial-gradient(circle at 50% 32%, rgb(var(--c-accent) / 0.2), rgb(var(--c-cream)) 70%)",
              }}
            >
              {products.map((p, i) => {
                const isActive = i === activeIndex;
                return (
                  <div
                    key={p.slug}
                    aria-hidden={!isActive}
                    className="absolute inset-0 will-change-[transform,opacity]"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: isActive
                        ? "scale(1) rotate(0deg)"
                        : "scale(0.86) rotate(-3deg)",
                      transition:
                        "opacity 700ms cubic-bezier(0.22,1,0.36,1), transform 800ms cubic-bezier(0.22,1,0.36,1)",
                    }}
                  >
                    {p.bottleImage && (
                      <Image
                        src={p.bottleImage}
                        alt={`${p.name} ürün görseli`}
                        fill
                        sizes="(max-width: 768px) 90vw, 45vw"
                        className="object-contain p-8"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* İlerleme göstergesi */}
        <div className="pointer-events-none absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {products.map((p, i) => (
            <span
              key={p.slug}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: i === activeIndex ? 28 : 8,
                background:
                  i === activeIndex
                    ? "rgb(var(--c-accent))"
                    : "rgb(var(--c-ink) / 0.2)",
              }}
            />
          ))}
        </div>

        <p className="absolute bottom-8 right-6 z-10 hidden text-xs text-ink/40 md:block">
          Kaydırarak keşfedin
        </p>
      </div>
    </section>
  );
}
