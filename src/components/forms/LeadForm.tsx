"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  validateLead,
  isValid,
  type LeadErrors,
  type LeadPayload,
  type LeadType,
} from "@/lib/leads";
import { products } from "@/content/products";
import { trackEvent } from "@/lib/analytics";
import { Field, TextInput, TextArea, SelectInput } from "./Field";
import { LiquidAction } from "@/components/ui/LiquidButton";

const businessTypes = [
  "Otel",
  "Restoran",
  "Kafe",
  "Pastane",
  "Catering",
  "Distribütör / Bayi",
  "Diğer",
];

const analyticsEvent: Record<LeadType, string> = {
  numune: "lead_sample_request",
  teklif: "lead_quote_request",
  bayi: "lead_dealer_request",
  iletisim: "lead_contact",
};

/**
 * Tek çekirdekli, yapılandırılabilir lead formu.
 * type'a göre alanlar değişir; doğrulama sunucuyla aynı kaynağı (leads.ts) kullanır.
 */
export function LeadForm({ type }: { type: LeadType }) {
  const [errors, setErrors] = useState<LeadErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle",
  );
  const [serverMsg, setServerMsg] = useState("");

  const showCompany = type === "teklif" || type === "bayi";
  const showBusiness = type === "numune" || type === "teklif";
  const showProducts = type === "numune" || type === "teklif";
  const showVolume = type === "numune" || type === "teklif";
  const showRegion = type === "bayi";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    const payload: Partial<LeadPayload> = {
      type,
      name: String(fd.get("name") || ""),
      company: String(fd.get("company") || "") || undefined,
      businessType: String(fd.get("businessType") || "") || undefined,
      city: String(fd.get("city") || "") || undefined,
      phone: String(fd.get("phone") || ""),
      email: String(fd.get("email") || ""),
      products: fd.getAll("products").map(String),
      volume: String(fd.get("volume") || "") || undefined,
      region: String(fd.get("region") || "") || undefined,
      message: String(fd.get("message") || "") || undefined,
      kvkk: fd.get("kvkk") === "on",
      website: String(fd.get("website") || ""), // honeypot
    };

    const clientErrors = validateLead(payload);
    if (!isValid(clientErrors)) {
      setErrors(clientErrors);
      // İlk hatalı alana odaklan.
      const first = Object.keys(clientErrors)[0];
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setErrors({});
    setStatus("sending");

    // Statik dağıtımda (GitHub Pages) sunucu yoktur. Gerçek bir uç nokta
    // (ör. Formspree) NEXT_PUBLIC_FORM_ENDPOINT ile bağlanabilir; tanımlı
    // değilse istemci tarafında başarı gösterilir (demo modu).
    const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

    try {
      if (endpoint) {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          setServerMsg("Gönderim başarısız oldu. Lütfen tekrar deneyin.");
          setStatus("error");
          return;
        }
      }
      trackEvent(analyticsEvent[type], { lead_type: type });
      setStatus("done");
      form.reset();
    } catch {
      setServerMsg("Bağlantı hatası. Lütfen tekrar deneyin.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return <SuccessScreen type={type} onReset={() => setStatus("idle")} />;
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Ad Soyad" required error={errors.name}>
          <TextInput name="name" autoComplete="name" invalid={!!errors.name} />
        </Field>

        {showCompany && (
          <Field label="İşletme / Firma Adı" required error={errors.company}>
            <TextInput
              name="company"
              autoComplete="organization"
              invalid={!!errors.company}
            />
          </Field>
        )}

        {showBusiness && (
          <Field label="İşletme Türü" error={errors.businessType}>
            <SelectInput name="businessType" defaultValue="">
              <option value="" disabled>
                Seçiniz
              </option>
              {businessTypes.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </SelectInput>
          </Field>
        )}

        <Field label="Şehir" error={errors.city}>
          <TextInput name="city" autoComplete="address-level2" />
        </Field>

        <Field label="Telefon" required error={errors.phone}>
          <TextInput
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+90 5xx xxx xx xx"
            invalid={!!errors.phone}
          />
        </Field>

        <Field label="E-posta" required error={errors.email}>
          <TextInput
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            invalid={!!errors.email}
          />
        </Field>

        {showRegion && (
          <Field label="Hizmet Verilen Bölge" required error={errors.region}>
            <TextInput name="region" placeholder="Örn. Ege Bölgesi" invalid={!!errors.region} />
          </Field>
        )}

        {showVolume && (
          <Field
            label="Aylık Tahmini Tüketim"
            error={errors.volume}
            hint="Örn. 200 lt / ay"
          >
            <TextInput name="volume" />
          </Field>
        )}
      </div>

      {showProducts && (
        <fieldset>
          <legend className="mb-2 text-sm font-medium text-ink/80">
            İlgilenilen Ürünler
          </legend>
          <div className="flex flex-wrap gap-2">
            {products.map((p) => (
              <label
                key={p.slug}
                className="cursor-pointer rounded-full border border-ink/15 px-3 py-1.5 text-sm transition-colors has-[:checked]:border-brand-green has-[:checked]:bg-brand-green/10"
              >
                <input
                  type="checkbox"
                  name="products"
                  value={p.name}
                  className="sr-only"
                />
                {p.name.replace("Favori Fresh ", "")}
              </label>
            ))}
          </div>
        </fieldset>
      )}

      <Field label="Mesaj" error={errors.message}>
        <TextArea name="message" placeholder="Talebinizi kısaca yazın." />
      </Field>

      {/* Honeypot — görünmez, erişilebilirlik ağacından çıkarılmış */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label>
          Web sitesi
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="flex items-start gap-3">
        <input
          id="kvkk"
          name="kvkk"
          type="checkbox"
          className="mt-1 h-4 w-4 shrink-0 accent-[rgb(var(--c-brand-green))]"
        />
        <label htmlFor="kvkk" className="text-sm text-ink/70">
          <a href="/kvkk" className="text-brand-green underline">
            KVKK Aydınlatma Metni
          </a>
          &apos;ni okudum, kişisel verilerimin işlenmesini onaylıyorum.
        </label>
      </div>
      {errors.kvkk && (
        <p role="alert" className="text-xs text-accent-pomegranate">
          {errors.kvkk}
        </p>
      )}

      {status === "error" && serverMsg && (
        <p role="alert" className="rounded-xl bg-accent-pomegranate/10 px-4 py-3 text-sm text-accent-pomegranate">
          {serverMsg}
        </p>
      )}

      <LiquidAction type="submit" disabled={status === "sending"} className="w-full sm:w-auto">
        {status === "sending" ? "Gönderiliyor…" : "Gönder"}
      </LiquidAction>
    </form>
  );
}

/** Başarı ekranı — dolan bardak animasyonu + net mesaj. */
function SuccessScreen({
  type,
  onReset,
}: {
  type: LeadType;
  onReset: () => void;
}) {
  const label =
    type === "bayi"
      ? "Bayilik başvurunuz"
      : type === "numune"
        ? "Numune talebiniz"
        : type === "teklif"
          ? "Teklif talebiniz"
          : "Mesajınız";
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl border border-brand-green/25 bg-brand-green/[0.06] p-10 text-center"
      >
        {/* Dolan bardak */}
        <div className="mx-auto mb-6 h-16 w-11 overflow-hidden rounded-b-2xl rounded-t-md border-2 border-brand-green/50">
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: "20%" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="h-full bg-gradient-to-t from-brand-green to-accent-lemon"
          />
        </div>
        <h3 className="font-display text-2xl">{label} alındı. Teşekkürler!</h3>
        <p className="mx-auto mt-2 max-w-sm text-ink/70">
          En kısa sürede sizinle iletişime geçeceğiz.
        </p>
        <button
          type="button"
          onClick={onReset}
          className="mt-6 text-sm font-semibold text-brand-green hover:underline"
        >
          Yeni bir talep oluştur
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
