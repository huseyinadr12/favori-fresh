import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Blog & İçerikler",
  description:
    "Favori Fresh'ten doğal içecekler, servis önerileri ve marka hikâyeleri.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <>
      <PageHeader
        overline="Blog & İçerikler"
        title="Doğallık üzerine notlar"
        description="Ürünler, servis kültürü ve üretim yaklaşımımıza dair içerikler yakında burada."
      />

      <section className="container-fluid py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <article
              key={i}
              className="flex h-full flex-col rounded-3xl border border-dashed border-ink/20 p-6"
            >
              <div className="mb-5 aspect-video rounded-xl bg-ink/[0.03]" />
              <p className="text-xs uppercase tracking-wider text-ink/40">
                İçerik yakında
              </p>
              <h2 className="mt-2 font-display text-lg text-ink/70">
                Yakında yayımlanacak
              </h2>
              <p className="mt-2 flex-1 text-sm text-ink/50">
                Blog içerik altyapısı hazır; yazılar CMS üzerinden
                yönetilecektir.
              </p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
