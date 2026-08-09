import Image from "next/image";
import { production } from "@/content/story";
import { Reveal } from "@/components/ui/Reveal";
import { LiquidButton } from "@/components/ui/LiquidButton";

/**
 * Üretim anlayışı — marka gerçeği: aynı gün işleme, -40°C şoklama,
 * -20/-25°C donuk muhafaza, katkısız üretim. Tüm meyve grubu için geçerli.
 */
export function ProductionEthos() {
  return (
    <section aria-label="Üretim anlayışımız" className="container-fluid py-24 md:py-28">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center">
        <Reveal>
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
            <Image
              src="/img/uretim-limon-5.webp"
              alt="Üretim hattında yıkanan taze limonlar"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="kicker text-brand-green">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
              {production.overline}
            </p>
            <h2 className="mt-3 font-display text-fluid-h2 leading-[1.08]">
              {production.title}
            </h2>
            <p className="mt-5 max-w-xl text-ink/70">{production.intro}</p>
          </Reveal>

          <dl className="mt-8 grid grid-cols-2 gap-5">
            {production.facts.map((f, i) => (
              <Reveal as="div" key={f.value} delay={i * 0.06}>
                <div className="rounded-2xl border border-ink/10 p-5">
                  <dt className="font-display text-3xl text-brand-green">
                    {f.value}
                  </dt>
                  <dd className="mt-1 text-sm text-ink/65">{f.label}</dd>
                </div>
              </Reveal>
            ))}
          </dl>

          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-sm text-ink/60">{production.note}</p>
            <div className="mt-7">
              <LiquidButton href="/uretim">Üretim & Kaliteyi İncele</LiquidButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
