import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { LeadForm } from "@/components/forms/LeadForm";
import { horeca } from "@/content/home";

export const metadata: Metadata = {
  title: "HORECA Çözümleri",
  description:
    "Oteller, restoranlar, kafeler, pastaneler ve catering için standart servis kalitesi ve operasyon kolaylığı. Numune ve kurumsal teklif talebi.",
  alternates: { canonical: "/horeca" },
};

const audiences = [
  "Oteller",
  "Restoranlar",
  "Kafeler",
  "Pastaneler",
  "Catering şirketleri",
  "Distribütörler",
  "Bayiler",
];

export default function HorecaPage() {
  return (
    <>
      <PageHeader
        overline={horeca.overline}
        title="Her serviste aynı lezzet, her işletmede daha pratik çözüm"
        description={horeca.body}
      />

      {/* Faydalar */}
      <section className="container-fluid py-20">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {horeca.benefits.map((b, i) => (
            <Reveal as="article" key={b.title} delay={i * 0.05}>
              <div className="h-full rounded-2xl border border-ink/10 p-6">
                <div className="mb-4 h-9 w-9 rounded-xl bg-brand-green/12 [display:grid] [place-items:center]">
                  <span className="h-2 w-2 rounded-full bg-brand-green" />
                </div>
                <h2 className="font-display text-lg">{b.title}</h2>
                <p className="mt-2 text-sm text-ink/70">{b.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-2">
          <span className="text-sm text-ink/50">Kimlere uygun:</span>
          {audiences.map((a) => (
            <span
              key={a}
              className="rounded-full border border-ink/15 px-3 py-1 text-sm text-ink/75"
            >
              {a}
            </span>
          ))}
        </div>
      </section>

      {/* Profesyonel sunum ambiyansı */}
      <section className="border-t border-ink/10 bg-cream">
        <div className="container-fluid grid gap-10 py-16 md:grid-cols-2 md:items-center">
          <Reveal>
            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl">
              <Image
                src="/img/gorsel.png"
                alt="Sıcak ışıklı bir mekânda çerçeveli botanik illüstrasyonlar"
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-fluid-h3">
              Menünüze yakışan bir sunum
            </h2>
            <p className="mt-3 max-w-md text-ink/70">
              İçecek özleri 1/4 oranında pratikçe hazırlanır, meyve suları
              doğrudan servis edilir. Sıcak bir kafe köşesinden fine dining
              masasına kadar aynı doğal kalite.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Numune formu */}
      <section id="numune" className="border-t border-ink/10 bg-cream scroll-mt-24">
        <div className="container-fluid grid gap-10 py-16 md:grid-cols-[1fr_1.4fr] md:items-start">
          <div>
            <p className="kicker text-brand-green">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
              Numune talebi
            </p>
            <h2 className="mt-3 font-display text-fluid-h3">
              İşletmenize özel numune isteyin
            </h2>
            <p className="mt-3 max-w-sm text-ink/70">
              Ürünlerimizi kendi servis koşullarınızda deneyin. Size uygun ürün
              ve ambalajları birlikte belirleyelim.
            </p>
          </div>
          <LeadForm type="numune" />
        </div>
      </section>

      {/* Teklif formu */}
      <section
        id="teklif"
        className="border-t border-ink/10 bg-brand-botanic text-cream scroll-mt-24"
      >
        <div className="container-fluid grid gap-10 py-16 md:grid-cols-[1fr_1.4fr] md:items-start">
          <div>
            <p className="kicker text-cream/60">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-lemon" />
              Kurumsal teklif
            </p>
            <h2 className="mt-3 font-display text-fluid-h3">
              Kurumsal teklif alın
            </h2>
            <p className="mt-3 max-w-sm text-cream/75">
              Hacim ve servis ihtiyacınıza göre kurumsal fiyatlandırma için
              bilgilerinizi paylaşın.
            </p>
          </div>
          <div className="rounded-3xl bg-cream p-6 text-ink md:p-8">
            <LeadForm type="teklif" />
          </div>
        </div>
      </section>
    </>
  );
}
