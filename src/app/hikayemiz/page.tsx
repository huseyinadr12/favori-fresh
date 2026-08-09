import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { LiquidButton } from "@/components/ui/LiquidButton";
import { brand } from "@/content/site";
import { storyIntro, storySlogan, production } from "@/content/story";
import { StoryTimeline } from "@/components/sections/StoryTimeline";

export const metadata: Metadata = {
  title: "Hikâyemiz",
  description:
    "İstanbul'da başlayan HORECA yolculuğundan Mersin Erdemli / Tömük'teki donuk üretim yatırımına Favori Fresh'in hikâyesi.",
  alternates: { canonical: "/hikayemiz" },
};

export default function StoryPage() {
  return (
    <>
      <PageHeader
        overline={storyIntro.overline}
        title={storyIntro.title}
        description={storyIntro.body}
      />

      {/* Slogan bandı — hazır marka görseli (slogan metni görselin içinde) */}
      <section aria-label={storySlogan.line} className="bg-brand-botanic">
        <Image
          src="/img/grup.webp"
          alt={`${storySlogan.line} ${storySlogan.tag}`}
          width={3240}
          height={1350}
          priority
          sizes="100vw"
          className="h-auto w-full"
        />
      </section>

      {/* Zaman çizelgesi — katmanlı parallax geçişler */}
      <section className="container-fluid py-20 md:py-28">
        <StoryTimeline />
      </section>

      {/* Üretim anlayışı */}
      <section className="border-t border-ink/10 bg-cream">
        <div className="container-fluid grid gap-10 py-16 md:grid-cols-[1.5fr_1fr] md:items-center">
          <div>
            <p className="kicker text-brand-green">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
              {production.overline}
            </p>
            <h2 className="mt-3 font-display text-fluid-h3">
              {production.title}
            </h2>
            <p className="mt-4 text-ink/70">{production.intro}</p>
            <dl className="mt-8 grid gap-4 sm:grid-cols-2">
              {production.facts.map((f) => (
                <div
                  key={f.value}
                  className="rounded-2xl border border-ink/10 p-5"
                >
                  <dt className="font-display text-3xl text-brand-green">
                    {f.value}
                  </dt>
                  <dd className="mt-1 text-sm text-ink/65">{f.label}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-sm text-ink/60">{production.note}</p>
          </div>
          <Reveal delay={0.1}>
            <div className="relative aspect-[3/4] overflow-hidden rounded-3xl">
              <Image
                src="/img/uretim-limon.webp"
                alt="Yıkama hattında taze limonlar"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Üretim bölgesi kartı */}
      <section className="border-t border-ink/10 bg-cream">
        <div className="container-fluid grid gap-10 py-16 md:grid-cols-2 md:items-center">
          <Reveal>
            <p className="kicker text-brand-green">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
              Üretim bölgesi
            </p>
            <h2 className="mt-3 font-display text-fluid-h3">{brand.region}</h2>
            <p className="mt-4 max-w-md text-ink/70">
              Üretimimizi ürünlerin hasat edildiği bölgeye yakın konumlandırarak
              aroma ve renk kaybını azaltır, ilk gün tazeliğini donuk zincirle
              koruruz.
            </p>
            <div className="mt-7">
              <LiquidButton href="/uretim">Üretim & Kaliteyi İncele</LiquidButton>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
              <Image
                src="/img/marka-polar.webp"
                alt="Favori Fresh markalı ekip kıyafeti detayı"
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
