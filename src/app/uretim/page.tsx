import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { LiquidButton } from "@/components/ui/LiquidButton";
import { production } from "@/content/story";

export const metadata: Metadata = {
  title: "Üretim & Kalite",
  description:
    "Aynı gün işleme, katkısız üretim, -40°C şoklama ve -20/-25°C donuk muhafaza ile Favori Fresh üretim anlayışı.",
  alternates: { canonical: "/uretim" },
};

// Kalite başlıkları — yalnızca marka onaylı bilgiyle doldurulur.
const topics = [
  {
    title: "Aynı gün işleme",
    text: "Meyveler hasat edildiği gün Mersin Erdemli tesisimize ulaşır ve aynı gün işlenir.",
  },
  {
    title: "Katkısız üretim",
    text: "Hiçbir ürünümüzde katkı maddesi veya koruyucu bulunmaz; süreç tamamen doğaldır.",
  },
  {
    title: "-40°C şoklama",
    text: "Üretim sonrası hızla şoklanarak aroma, renk ve doğal yapı kilitlenir.",
  },
  {
    title: "-20 / -25°C muhafaza",
    text: "Donuk depolarımızda yıl boyu ilk günkü kalitesiyle korunur.",
  },
  {
    title: "Tüm meyve grubu",
    text: "Bu anlayış belirli ürünler için değil, tüm meyve grubumuz için geçerlidir.",
  },
  {
    title: "İzlenebilirlik",
    text: "Meyvenin kaynağından servise kadar süreç izlenebilir tutulur.",
  },
];

export default function ProductionPage() {
  return (
    <>
      <PageHeader
        overline={production.overline}
        title={production.title}
        description={production.intro}
      />

      {/* Öne çıkan gerçekler */}
      <section className="container-fluid py-16">
        <dl className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {production.facts.map((f, i) => (
            <Reveal as="div" key={f.value} delay={i * 0.05}>
              <div className="h-full rounded-2xl border border-ink/10 p-6">
                <dt className="font-display text-3xl text-brand-green">
                  {f.value}
                </dt>
                <dd className="mt-1 text-sm text-ink/65">{f.label}</dd>
              </div>
            </Reveal>
          ))}
        </dl>
        <p className="mt-6 max-w-2xl text-sm text-ink/60">{production.note}</p>
      </section>

      {/* Kalite başlıkları */}
      <section className="container-fluid grid gap-6 pb-8 sm:grid-cols-2 lg:grid-cols-3">
        {topics.map((t, i) => (
          <Reveal as="article" key={t.title} delay={i * 0.05}>
            <div className="h-full rounded-2xl border border-ink/10 p-6">
              <span className="font-display text-3xl text-brand-green/70">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="mt-3 font-display text-lg">{t.title}</h2>
              <p className="mt-2 text-sm text-ink/70">{t.text}</p>
            </div>
          </Reveal>
        ))}
      </section>

      {/* Üretim hattından — gerçek görseller */}
      <section className="border-t border-ink/10 bg-cream">
        <div className="container-fluid py-16">
          <p className="kicker text-brand-green">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
            Üretim hattından
          </p>
          <h2 className="mt-3 max-w-xl font-display text-fluid-h3">
            Bekletmeden, doğal yöntemlerle
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              { src: "/img/uretim-limon-2.png", alt: "Yıkama hattında limonlar" },
              { src: "/img/uretim-limonata.png", alt: "Dolum ve etiketleme hattı" },
              { src: "/img/uretim-limonata-4.png", alt: "Şişeleme hattında ürünler" },
            ].map((img, i) => (
              <Reveal key={img.src} delay={i * 0.06}>
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Lojistik / bayi ağı */}
      <section className="border-t border-ink/10">
        <div className="container-fluid grid gap-10 py-16 md:grid-cols-2 md:items-center">
          <Reveal>
            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl">
              <Image
                src="/img/lojistik.png"
                alt="Favori Fresh markalı sevkiyat aracı"
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-fluid-h3">
              Türkiye'nin dört bir yanına
            </h2>
            <p className="mt-3 max-w-md text-ink/70">
              Bayilerimiz aracılığıyla ürünlerimizi donuk zincirde taşıyor, ilk
              gün tazeliğini her noktaya ulaştırıyoruz.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <LiquidButton href="/bayilik">Bayi Ol</LiquidButton>
              <LiquidButton href="/horeca#numune" variant="outline">
                Numune Talep Et
              </LiquidButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Sertifika alanı — yalnızca doğrulanmış logolar eklenir (şimdilik boş). */}
      <section className="border-t border-ink/10 bg-cream">
        <div className="container-fluid py-14">
          <h2 className="font-display text-fluid-h3">Belgeler & sertifikalar</h2>
          <p className="mt-3 max-w-xl text-ink/60">
            Yalnızca marka tarafından doğrulanmış belgeler burada yayımlanır. Bu
            alan, resmî belgeler sağlandığında güncellenecektir.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[3/2] rounded-xl border border-dashed border-ink/20 bg-ink/[0.02] [display:grid] [place-items:center] text-xs text-ink/40"
              >
                Sertifika alanı
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
