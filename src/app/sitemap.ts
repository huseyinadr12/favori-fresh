import type { MetadataRoute } from "next";
import { getProductSlugs } from "@/content/products";

const siteUrl = "https://favorifresh.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/urunler",
    "/horeca",
    "/uretim",
    "/hikayemiz",
    "/tarifler",
    "/bayilik",
    "/blog",
    "/iletisim",
    "/kvkk",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const productRoutes = getProductSlugs().map((slug) => ({
    url: `${siteUrl}/urunler/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...productRoutes];
}
