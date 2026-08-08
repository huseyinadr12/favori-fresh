import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, getProductSlugs, products, categoryMeta } from "@/content/products";
import { ProductShowcase3D } from "@/components/three/ProductShowcase3D";
import { LeadForm } from "@/components/forms/LeadForm";
import { LiquidButton } from "@/components/ui/LiquidButton";
import { accentRgb, cssVars } from "@/lib/utils";

// Tüm ürünler statik olarak üretilir (SSG).
export function generateStaticParams() {
  return getProductSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const product = getProduct(params.slug);
  if (!product) return { title: "Ürün bulunamadı" };
  return {
    title: product.name,
    description: product.story,
    alternates: { canonical: `/urunler/${product.slug}` },
    openGraph: {
      title: product.name,
      description: product.tagline,
      type: "website",
    },
  };
}

export default function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  const similar = products.filter((p) => p.slug !== product.slug).slice(0, 3);

  // Product + Breadcrumb yapılandırılmış verisi.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.story,
    brand: { "@type": "Brand", name: "Favori Fresh" },
    category: "Doğal içecek",
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: "/" },
      { "@type": "ListItem", position: 2, name: "Ürünler", item: "/urunler" },
      { "@type": "ListItem", position: 3, name: product.name },
    ],
  };

  const specs: { label: string; value: string }[] = [
    { label: "Meyve kaynağı", value: product.fruitSource },
    { label: "Servis", value: product.serving },
    ...(product.dilution
      ? [{ label: "Hazırlama / sulandırma", value: product.dilution }]
      : []),
    { label: "Saklama", value: product.storage },
    { label: "Ambalaj / hacim", value: product.packaging.join(", ") },
    { label: "HORECA avantajı", value: product.horecaBenefit },
  ];

  return (
    <div style={cssVars({ "--c-accent": accentRgb[product.accent] })}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      {/* Üst kısım — 3D vitrin + künye */}
      <section className="bg-brand-botanic text-cream">
        <div className="container-fluid grid gap-10 pb-16 pt-32 md:grid-cols-2 md:items-center md:pt-40">
          <ProductShowcase3D product={product} />

          <div>
            <nav aria-label="İçerik yolu" className="mb-4 text-sm text-cream/60">
              <Link href="/urunler" className="hover:text-cream">
                Ürünler
              </Link>
              <span className="mx-2">/</span>
              <span>{product.name.replace("Favori Fresh ", "")}</span>
            </nav>
            <span className="inline-flex items-center gap-2 rounded-full border border-cream/25 px-3 py-1 text-xs font-semibold text-cream/85">
              {categoryMeta[product.category].label}
              <span className="text-cream/40">·</span>
              <span className="text-cream/60">
                {categoryMeta[product.category].short}
              </span>
            </span>
            <h1 className="mt-3 font-display text-fluid-h2 leading-[1.05]">
              {product.name}
            </h1>
            <p className="mt-3 text-fluid-lead text-cream/80">{product.tagline}</p>
            <p className="mt-5 max-w-md text-cream/75">{product.story}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <LiquidButton href="#numune" variant="outline">
                Numune Talep Et
              </LiquidButton>
              {/* PDF ürün föyü — dosya eklendiğinde /public/foy altına konur */}
              <a
                href={`/foy/${product.slug}.pdf`}
                className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold text-cream/80 underline decoration-cream/30 underline-offset-4 hover:text-cream"
              >
                Ürün föyü (PDF)
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Künye / özellikler */}
      <section className="container-fluid py-16">
        <dl className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {specs.map((s) => (
            <div key={s.label} className="border-t border-ink/10 pt-4">
              <dt className="text-sm text-ink/50">{s.label}</dt>
              <dd className="mt-1 font-medium">{s.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-10 flex flex-wrap gap-2">
          <span className="text-sm text-ink/50">Kullanım alanları:</span>
          {product.uses.map((u) => (
            <span
              key={u}
              className="rounded-full border border-accentnow/40 px-3 py-1 text-sm text-accentnow"
            >
              {u}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-6">
          {product.notes.map((n) => (
            <div key={n.label}>
              <p className="text-sm text-ink/50">{n.label}</p>
              <p className="font-medium">{n.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Numune / teklif formu */}
      <section id="numune" className="border-y border-ink/10 bg-cream">
        <div className="container-fluid grid gap-10 py-16 md:grid-cols-[1fr_1.4fr] md:items-start">
          <div>
            <h2 className="font-display text-fluid-h3">
              {product.name.replace("Favori Fresh ", "")} için numune isteyin
            </h2>
            <p className="mt-3 max-w-sm text-ink/70">
              İşletmenize özel numune ve fiyat teklifi için formu doldurun; kısa
              sürede dönüş yapalım.
            </p>
          </div>
          <LeadForm type="numune" />
        </div>
      </section>

      {/* Benzer ürünler */}
      <section className="container-fluid py-16">
        <h2 className="mb-8 font-display text-fluid-h3">Benzer ürünler</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {similar.map((p) => (
            <Link
              key={p.slug}
              href={`/urunler/${p.slug}`}
              className="group flex items-center gap-4 rounded-2xl border border-ink/10 p-4 transition-colors hover:border-ink/25"
              style={cssVars({ "--c-accent": accentRgb[p.accent] })}
            >
              <span
                aria-hidden
                className="h-14 w-14 shrink-0 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 35% 30%, rgb(var(--c-accent)), rgb(var(--c-accent) / 0.55))",
                }}
              />
              <span>
                <span className="block font-medium">
                  {p.name.replace("Favori Fresh ", "")}
                </span>
                <span className="block text-sm text-ink/55">{p.tagline}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
