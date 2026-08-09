import type { Metadata, Viewport } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CursorTrail } from "@/components/ui/CursorTrail";
import { PageTransition } from "@/components/ui/PageTransition";
import { brand } from "@/content/site";

// Başlık ailesi — karakterli, premium, tam Türkçe (latin-ext).
const display = Sora({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

// Gövde ailesi — yüksek okunabilirlik, tam Türkçe.
const sans = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
});

const siteUrl = "https://favorifresh.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${brand.name} — ${brand.descriptor}`,
    template: `%s | ${brand.name}`,
  },
  description:
    "Favori Fresh, katkı maddesi içermeyen doğal reçeteleri ve ilk gün tazeliği odağıyla, meyvenin aromasını profesyonel servis kolaylığıyla buluşturur.",
  applicationName: brand.name,
  keywords: [
    "Favori Fresh",
    "doğal limonata",
    "meyve suyu",
    "HORECA içecek",
    "soğuk sıkım",
    "Bodrum mandalina limonatası",
  ],
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: siteUrl,
    siteName: brand.name,
    title: `${brand.name} — ${brand.descriptor}`,
    description:
      "Meyvenin doğal aromasını profesyonel servis kolaylığıyla buluşturan doğal içecek portföyü.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#f7f4ec",
  colorScheme: "light",
};

// Organization yapılandırılmış verisi (JSON-LD).
const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: brand.name,
  description: brand.descriptor,
  areaServed: "TR",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Erdemli",
    addressRegion: "Mersin",
    addressCountry: "TR",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={`${display.variable} ${sans.variable}`}>
      <body>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <MotionProvider>
          <SmoothScroll />
          <PageTransition />
          <CursorTrail />
          <a
            href="#icerik"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-brand-green focus:px-4 focus:py-2 focus:text-cream"
          >
            İçeriğe geç
          </a>
          <SiteHeader />
          <main id="icerik">{children}</main>
          <SiteFooter />
        </MotionProvider>
      </body>
    </html>
  );
}
