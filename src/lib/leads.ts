/**
 * Lead (numune / teklif / bayi / iletişim) veri sözleşmesi ve doğrulama.
 * Hem istemci hem sunucu tarafında kullanılır (tek kaynak).
 */

export type LeadType = "numune" | "teklif" | "bayi" | "iletisim";

export interface LeadPayload {
  type: LeadType;
  name: string;
  company?: string;
  businessType?: string;
  city?: string;
  phone: string;
  email: string;
  products?: string[];
  volume?: string;
  region?: string;
  message?: string;
  kvkk: boolean;
  /** Bal küpü (honeypot) — botlar doldurur, insanlar boş bırakır. */
  website?: string;
}

export type LeadErrors = Partial<Record<keyof LeadPayload, string>>;

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRe = /^[+()\d\s-]{7,20}$/;

/** Sunucu ve istemcide ortak doğrulama. Alan → hata mesajı döndürür. */
export function validateLead(data: Partial<LeadPayload>): LeadErrors {
  const e: LeadErrors = {};

  if (!data.name || data.name.trim().length < 2)
    e.name = "Lütfen adınızı ve soyadınızı girin.";
  if (!data.email || !emailRe.test(data.email))
    e.email = "Geçerli bir e-posta adresi girin.";
  if (!data.phone || !phoneRe.test(data.phone))
    e.phone = "Geçerli bir telefon numarası girin.";
  if (!data.kvkk) e.kvkk = "Devam etmek için KVKK metnini onaylamalısınız.";

  if (data.type === "teklif" || data.type === "bayi") {
    if (!data.company || data.company.trim().length < 2)
      e.company = "İşletme / firma adı gereklidir.";
  }
  if (data.type === "bayi" && !data.region)
    e.region = "Hizmet verdiğiniz bölgeyi belirtin.";

  return e;
}

export const isValid = (e: LeadErrors) => Object.keys(e).length === 0;
