import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { LeadForm } from "@/components/forms/LeadForm";
import { LocationMap } from "@/components/ui/LocationMap";
import { contact } from "@/content/site";

export const metadata: Metadata = {
  title: "İletişim",
  description:
    "Favori Fresh ile iletişime geçin. Telefon, e-posta, WhatsApp ve konum bilgileri.",
  alternates: { canonical: "/iletisim" },
};

export default function ContactPage() {
  const items = [
    { label: "Telefon", value: contact.phone, href: `tel:${contact.phone.replace(/\s/g, "")}` },
    { label: "E-posta", value: contact.email, href: `mailto:${contact.email}` },
    {
      label: "WhatsApp",
      value: contact.whatsapp,
      href: `https://wa.me/${contact.whatsapp.replace(/[^\d]/g, "")}`,
    },
    { label: "Adres", value: contact.address },
  ];

  return (
    <>
      <PageHeader
        overline="İletişim"
        title="Bize ulaşın"
        description="Sorularınız, numune ve iş birliği talepleriniz için buradayız."
      />

      <section className="container-fluid grid gap-12 py-16 md:grid-cols-[1fr_1.4fr] md:items-start">
        <div className="space-y-6">
          {contact.isPlaceholder && (
            <p className="rounded-xl bg-accent-lemon/15 px-4 py-3 text-sm text-ink/70">
              Not: İletişim bilgileri marka tarafından güncellenecek örnek
              verilerdir.
            </p>
          )}
          <ul className="space-y-5">
            {items.map((i) => (
              <li key={i.label}>
                <p className="text-sm text-ink/50">{i.label}</p>
                {i.href ? (
                  <a
                    href={i.href}
                    className="font-display text-lg text-ink hover:text-brand-green"
                  >
                    {i.value}
                  </a>
                ) : (
                  <p className="font-display text-lg">{i.value}</p>
                )}
              </li>
            ))}
          </ul>

          {/* Konum — gerçek harita üzerinde adres */}
          <LocationMap />

          <div className="flex gap-4 text-sm">
            <a
              href={contact.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-green hover:underline"
            >
              Instagram
            </a>
            <a
              href={contact.social.trendyol}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-green hover:underline"
            >
              Trendyol
            </a>
          </div>
        </div>

        <div>
          <h2 className="mb-6 font-display text-fluid-h3">Mesaj gönderin</h2>
          <LeadForm type="iletisim" />
        </div>
      </section>
    </>
  );
}
