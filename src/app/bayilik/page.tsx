import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { LeadForm } from "@/components/forms/LeadForm";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Bayilik & Distribütörlük",
  description:
    "Favori Fresh bayilik ve distribütörlük iş birliği. Bölgenizde doğal içecek portföyünü büyütün.",
  alternates: { canonical: "/bayilik" },
};

const points = [
  {
    title: "Bölgesel iş birliği",
    text: "Hizmet verdiğiniz bölgede güçlü bir doğal içecek portföyü sunun.",
  },
  {
    title: "Tutarlı tedarik",
    text: "Standart ambalaj ve düzenli sevkiyatla planlanabilir stok yönetimi.",
  },
  {
    title: "Ticari destek",
    text: "Ürün bilgisi, servis önerileri ve saha materyalleriyle birlikte.",
  },
];

export default function DealerPage() {
  return (
    <>
      <PageHeader
        overline="Bayilik & Distribütörlük"
        title="Bölgenizde Favori Fresh'i büyütün"
        description="Dağıtım ağınızı doğal içecek portföyüyle güçlendirin. Başvurunuzu alalım, birlikte değerlendirelim."
      />

      <section className="container-fluid grid gap-4 py-16 sm:grid-cols-3">
        {points.map((p, i) => (
          <Reveal as="article" key={p.title} delay={i * 0.05}>
            <div className="h-full rounded-2xl border border-ink/10 p-6">
              <h2 className="font-display text-lg">{p.title}</h2>
              <p className="mt-2 text-sm text-ink/70">{p.text}</p>
            </div>
          </Reveal>
        ))}
      </section>

      <section className="border-t border-ink/10 bg-cream">
        <div className="container-fluid grid gap-10 py-16 md:grid-cols-[1fr_1.4fr] md:items-start">
          <div>
            <h2 className="font-display text-fluid-h3">Başvuru formu</h2>
            <p className="mt-3 max-w-sm text-ink/70">
              Firma bilgilerinizi ve dağıtım kapasitenizi paylaşın; ekibimiz
              sizinle iletişime geçsin.
            </p>
          </div>
          <LeadForm type="bayi" />
        </div>
      </section>
    </>
  );
}
