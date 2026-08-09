/**
 * Site geneli marka, navigasyon ve iletişim içeriği.
 * Doğrulanmamış iddialar (liderlik, "tek", sertifika) BİLİNÇLİ olarak boş
 * bırakılmıştır; yalnızca marka onaylı bilgi girilmelidir.
 */

export const brand = {
  name: "Favori Fresh",
  descriptor: "Doğal İçecek Portföyü",
  /** Kısa marka vaadi. */
  promise: "Doğanın içinden, ilk günkü tazeliğiyle.",
  /** Marka sloganları (marka materyallerinden doğrulanmıştır). */
  slogan: "Doğallık herkesin hakkı.",
  tagline: "Doğanın hediyesi.",
  region: "Mersin, Erdemli / Tömük",
} as const;

export interface NavItem {
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  { label: "Ürünler", href: "/urunler" },
  { label: "HORECA", href: "/horeca" },
  { label: "Üretim", href: "/uretim" },
  { label: "Hikâyemiz", href: "/hikayemiz" },
  { label: "Tarifler", href: "/tarifler" },
  { label: "İletişim", href: "/iletisim" },
];

export const primaryCta = { label: "Teklif Al", href: "/horeca#teklif" } as const;

export const contact = {
  // Marka materyallerinden doğrulanmış iletişim bilgileri.
  phone: "0545 353 85 50",
  email: "info@favorifresh.com",
  whatsapp: "0545 353 85 50",
  address: "405 Sokak No:42/A, Tömük Köyü, 33730 Erdemli / Mersin",
  // Tömük, Erdemli / Mersin yaklaşık konumu (harita için).
  coords: { lat: 36.6155, lng: 34.282 },
  social: {
    instagram: "https://www.instagram.com/favori_fresh/",
  },
  // Adres/telefon doğrulanmıştır; sosyal medya bağlantıları marka tarafından güncellenmelidir.
  isPlaceholder: false,
} as const;

/** Footer bölümleri — nav ile senkron. */
export const footerLinks = {
  Kurumsal: [
    { label: "Hikâyemiz", href: "/hikayemiz" },
    { label: "Üretim & Kalite", href: "/uretim" },
    { label: "Bayilik & Distribütörlük", href: "/bayilik" },
    { label: "Blog", href: "/blog" },
  ],
  Ürünler: [
    { label: "Tüm Ürünler", href: "/urunler" },
    { label: "HORECA Çözümleri", href: "/horeca" },
    { label: "Tarifler & Servis", href: "/tarifler" },
  ],
  Yasal: [
    { label: "KVKK Aydınlatma Metni", href: "/kvkk" },
    { label: "Gizlilik & Çerezler", href: "/kvkk#cerez" },
    { label: "İletişim", href: "/iletisim" },
  ],
};
