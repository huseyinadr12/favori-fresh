"use client";

import Image from "next/image";
import { useSectionProgress } from "@/lib/useSectionProgress";
import { process } from "@/content/home";
import { AnimatedBackdrop } from "@/components/ui/AnimatedBackdrop";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Meyveden servise üretim yolculuğu — dikey, görsel-zengin zaman çizelgesi.
 * Ortadaki çizgi, bölüm kaydırıldıkça dolar; her adım sırayla iki yandan açılır.
 * Statik export ve mobilde güvenilir çalışır (karmaşık pin/yatay hesap yok).
 */
export function ProcessJourney() {
  const { ref, progress } = useSectionProgress<HTMLDivElement>();
  const steps = process.steps;

  return (
    <section
      aria-label="Üretim yolculuğu"
      ref={ref}
      className="relative overflow-hidden bg-brand-botanic text-cream"
    >
      <AnimatedBackdrop variant="dark" />

      <div className="container-fluid relative z-10 py-24 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="kicker justify-center text-cream/60">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-lemon" />
            {process.overline}
          </p>
          <h2 className="mt-3 font-display text-fluid-h2">{process.title}</h2>
          <p className="mt-4 text-cream/75">{process.body}</p>
        </div>

        {/* Zaman çizelgesi */}
        <ol className="relative mx-auto mt-16 max-w-4xl">
          {/* Merkez çizgi (masaüstü ortada, mobilde solda) */}
          <span
            aria-hidden
            className="absolute bottom-0 left-4 top-0 w-px bg-cream/15 md:left-1/2 md:-translate-x-1/2"
          />
          {/* Dolan ilerleme */}
          <span
            aria-hidden
            className="absolute left-4 top-0 w-px bg-accent-lemon md:left-1/2 md:-translate-x-1/2"
            style={{ height: `${Math.min(100, progress * 100)}%` }}
          />

          {steps.map((step, i) => {
            const right = i % 2 === 1; // masaüstünde sırayla sağ/sol
            return (
              <li
                key={step.title}
                className="relative mb-10 pl-12 last:mb-0 md:mb-16 md:pl-0"
              >
                {/* Düğüm noktası */}
                <span
                  aria-hidden
                  className="absolute left-4 top-2 z-10 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-brand-botanic bg-accent-lemon md:left-1/2"
                />
                <div className="md:grid md:grid-cols-2 md:items-center md:gap-10">
                  {/* Görsel — ürün görselleri (şeffaf şişe) açık kartta,
                      fotoğraflar object-cover ile gösterilir */}
                  <Reveal
                    className={`${right ? "md:order-2 md:pl-10" : "md:pr-10"}`}
                  >
                    {step.image.includes("/urun-") ? (
                      <div className="relative aspect-video overflow-hidden rounded-2xl bg-gradient-to-br from-cream to-[#eef0e6] ring-1 ring-cream/10">
                        <Image
                          src={step.image}
                          alt={step.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 40vw"
                          className="object-contain p-4"
                        />
                      </div>
                    ) : step.image.includes("bardak-glass") ? (
                      // Görselin doğal 9:16 oranını koru; farklı kart oranı siyah yan bant oluşturmasın.
                      <div className="relative mx-auto aspect-[9/16] w-full max-w-[250px] overflow-hidden rounded-2xl bg-cream ring-1 ring-cream/10 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.65)]">
                        <Image
                          src={step.image}
                          alt={step.title}
                          fill
                          sizes="(max-width: 768px) 72vw, 250px"
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="relative aspect-video overflow-hidden rounded-2xl ring-1 ring-cream/10">
                        <Image
                          src={step.image}
                          alt={step.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 40vw"
                          className="object-cover"
                        />
                      </div>
                    )}
                  </Reveal>
                  {/* Metin */}
                  <Reveal
                    delay={0.05}
                    className={`mt-4 md:mt-0 ${right ? "md:order-1 md:pr-10 md:text-right" : "md:pl-10"}`}
                  >
                    <span className="font-display text-4xl text-accent-lemon/80">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-2 font-display text-2xl">{step.title}</h3>
                    <p className="mt-2 text-cream/70">{step.text}</p>
                  </Reveal>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
