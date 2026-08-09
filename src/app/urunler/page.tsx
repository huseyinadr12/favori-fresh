import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { productsByCategory, categoryMeta } from "@/content/products";
import { accentRgb, cssVars } from "@/lib/utils";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Ürünler",
  description:
    "Favori Fresh doğal içecek portföyü: içecek özleri (1/4), içime hazır meyve suları ve profesyonel kullanım için limon suyu.",
  alternates: { canonical: "/urunler" },
};

export default function ProductsPage() {
  const groups = productsByCategory();

  return (
    <>
      <PageHeader
        overline="Ürün portföyü"
        title="Her meyvenin kendi karakteri"
        description="Katkısız reçeteler, aynı gün işleme ve donuk muhafazayla korunan ilk gün tazeliği — üç kategoride."
      />

      {groups.map(({ category, items }) => {
        const meta = categoryMeta[category];
        return (
          <section key={category} className="container-fluid py-16">
            <div className="mb-8 max-w-2xl">
              <h2 className="font-display text-fluid-h3">{meta.label}</h2>
              <p className="mt-2 text-ink/65">{meta.description}</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((p, i) => (
                <Reveal as="article" key={p.slug} delay={i * 0.05}>
                  <Link
                    href={`/urunler/${p.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-3xl border border-ink/10 transition-all duration-500 ease-fluid hover:-translate-y-1 hover:border-accentnow/40 hover:shadow-[0_24px_60px_-30px_rgb(var(--c-accent)/0.6)]"
                    style={cssVars({ "--c-accent": accentRgb[p.accent] })}
                  >
                    {/* Ürün görseli — koyu stüdyo sahnesi (siyah zeminli render'lar için) */}
                    <div
                      className="relative aspect-[4/5]"
                      style={{
                        background:
                          "radial-gradient(circle at 50% 32%, rgb(var(--c-accent) / 0.16), rgb(var(--c-cream)) 72%)",
                      }}
                    >
                      {p.bottleImage && (
                        <Image
                          src={p.bottleImage}
                          alt={`${p.name} ürün görseli`}
                          fill
                          sizes="(max-width: 640px) 100vw, 33vw"
                          className="object-contain p-7 transition-transform duration-700 ease-fluid group-hover:scale-105"
                        />
                      )}
                      <span className="absolute left-4 top-4 rounded-full bg-white/85 px-2.5 py-1 text-[11px] font-medium text-ink/70 backdrop-blur">
                        {meta.short}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="font-display text-xl">
                        {p.name.replace("Favori Fresh ", "")}
                      </h3>
                      <p className="mt-1 text-sm text-ink/60">{p.tagline}</p>
                      <p className="mt-3 flex-1 text-sm text-ink/70 line-clamp-3">
                        {p.story}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-accentnow">
                        Ürünü İncele
                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                          →
                        </span>
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </section>
        );
      })}

      {/* Marka banner'ı — dalından bardağa */}
      <section aria-label="Dalından bardağa, sadece meyvenin özü" className="bg-brand-botanic">
        <Image
          src="/img/banner-genis.webp"
          alt="Dalından bardağa, sadece meyvenin özü — Doğallık Herkesin Hakkı"
          width={3240}
          height={1080}
          sizes="100vw"
          className="h-auto w-full"
        />
      </section>
    </>
  );
}
