"use client";

import Image from "next/image";
import { useSectionProgress } from "@/lib/useSectionProgress";
import { useMotion } from "@/components/providers/MotionProvider";
import { process } from "@/content/home";
import { Reveal } from "@/components/ui/Reveal";
import { AnimatedBackdrop } from "@/components/ui/AnimatedBackdrop";

/**
 * Meyveden servise üretim yolculuğu.
 * 3D uygunsa: yatay ilerleyen, scroll ile kontrol edilen bir "kamera hattı".
 * Değilse: erişilebilir dikey adım listesi.
 * Gerçek fabrika görselleri/videoları geldiğinde her adıma medya eklenebilir
 * (media alanı için hazır yapı).
 */
export function ProcessJourney() {
  const { shouldRender3D } = useMotion();
  const { ref, progress } = useSectionProgress<HTMLDivElement>();

  if (!shouldRender3D) return <ProcessStatic />;

  const steps = process.steps;
  // Yatay kaydırma: rayı ilerleme oranında kaydır.
  const travel = (steps.length - 1) * 78; // her adım ~78vw
  const x = -progress * travel;
  const activeIndex = Math.round(progress * (steps.length - 1));

  return (
    <section
      aria-label="Üretim yolculuğu"
      ref={ref}
      className="relative bg-brand-botanic text-cream"
      style={{ height: `${steps.length * 42}vh` }}
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <AnimatedBackdrop variant="dark" />
        <div className="container-fluid relative z-10 mb-10">
          <p className="kicker text-cream/60">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-lemon" />
            {process.overline}
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-fluid-h2">
            {process.title}
          </h2>
        </div>

        {/* İlerleme çizgisi */}
        <div className="container-fluid relative z-10 mb-8">
          <div className="h-0.5 w-full overflow-hidden rounded-full bg-cream/15">
            <div
              className="h-full rounded-full bg-accent-lemon transition-[width] duration-150"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>

        {/* Yatay ray */}
        <div className="relative z-10 overflow-hidden">
          <div
            className="flex gap-[6vw] px-[11vw] transition-transform duration-150 ease-out"
            style={{ transform: `translate3d(${x}vw, 0, 0)` }}
          >
            {steps.map((step, i) => (
              <article
                key={step.title}
                className="w-[72vw] shrink-0 sm:w-[52vw] md:w-[34vw] lg:w-[26vw]"
              >
                <div
                  className={`rounded-3xl border p-8 transition-all duration-500 ${
                    i === activeIndex
                      ? "border-accent-lemon/60 bg-cream/[0.08]"
                      : "border-cream/15 bg-cream/[0.03]"
                  }`}
                >
                  <span className="font-display text-5xl text-accent-lemon/80">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-display text-2xl">{step.title}</h3>
                  <p className="mt-2 text-cream/70">{step.text}</p>
                  <div className="relative mt-5 aspect-video overflow-hidden rounded-xl">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      sizes="(max-width: 768px) 72vw, 26vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessStatic() {
  return (
    <section
      aria-label="Üretim yolculuğu"
      className="bg-brand-botanic text-cream"
    >
      <div className="container-fluid py-24">
        <p className="kicker text-cream/60">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-lemon" />
          {process.overline}
        </p>
        <h2 className="mt-3 max-w-2xl font-display text-fluid-h2">
          {process.title}
        </h2>
        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {process.steps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 0.04}>
              <div className="h-full rounded-2xl border border-cream/15 bg-cream/[0.04] p-6">
                <span className="font-display text-3xl text-accent-lemon/80">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-lg">{step.title}</h3>
                <p className="mt-1.5 text-sm text-cream/70">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
