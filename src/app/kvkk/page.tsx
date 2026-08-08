import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { brand, contact } from "@/content/site";

export const metadata: Metadata = {
  title: "KVKK & Gizlilik",
  description:
    "Favori Fresh KVKK aydınlatma metni ve çerez politikası bilgilendirmesi.",
  alternates: { canonical: "/kvkk" },
  robots: { index: true, follow: true },
};

export default function KvkkPage() {
  return (
    <>
      <PageHeader
        overline="Yasal"
        title="KVKK Aydınlatma Metni & Gizlilik"
        description="Kişisel verilerinizin işlenmesine ilişkin bilgilendirme."
      />

      <section className="container-fluid max-w-3xl space-y-10 py-16 text-ink/80">
        <p className="rounded-xl bg-accent-lemon/15 px-4 py-3 text-sm">
          Bu metin örnek/şablon niteliğindedir. Nihai KVKK ve gizlilik
          metinleri, {brand.name} tarafından hukuki danışmanlık ile
          güncellenmelidir.
        </p>

        <div>
          <h2 className="font-display text-fluid-h3 text-ink">
            1. Veri Sorumlusu
          </h2>
          <p className="mt-3">
            6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;)
            uyarınca kişisel verileriniz, veri sorumlusu sıfatıyla {brand.name}{" "}
            tarafından aşağıda açıklanan kapsamda işlenmektedir.
          </p>
        </div>

        <div>
          <h2 className="font-display text-fluid-h3 text-ink">
            2. İşlenen Veriler ve Amaç
          </h2>
          <p className="mt-3">
            Web sitemizdeki formlar aracılığıyla paylaştığınız ad-soyad,
            iletişim ve işletme bilgileri; numune ve teklif taleplerinizi
            karşılamak, sizinle iletişime geçmek ve iş birliği süreçlerini
            yürütmek amacıyla işlenir.
          </p>
        </div>

        <div id="cerez" className="scroll-mt-24">
          <h2 className="font-display text-fluid-h3 text-ink">3. Çerezler</h2>
          <p className="mt-3">
            Sitemizde deneyimi iyileştirmek ve anonim kullanım istatistikleri
            elde etmek için çerezler kullanılabilir. Çerez tercihlerinizi
            tarayıcı ayarlarınızdan yönetebilirsiniz.
          </p>
        </div>

        <div>
          <h2 className="font-display text-fluid-h3 text-ink">4. Haklarınız</h2>
          <p className="mt-3">
            KVKK&apos;nın 11. maddesi kapsamındaki haklarınıza ilişkin
            taleplerinizi{" "}
            <a href={`mailto:${contact.email}`} className="text-brand-green underline">
              {contact.email}
            </a>{" "}
            adresine iletebilirsiniz.
          </p>
        </div>
      </section>
    </>
  );
}
