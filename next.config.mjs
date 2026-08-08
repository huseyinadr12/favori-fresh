/** @type {import('next').NextConfig} */

// GitHub Pages proje reposu alt yolda yayınlanır (kullanıcı/repo).
// Deploy akışı NEXT_PUBLIC_BASE_PATH'i repo adına göre ayarlar; yerelde boştur.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  // Statik dışa aktarım — GitHub Pages gibi sunucusuz ortamlarda barındırılır.
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  // Alt sayfaların /rota/ -> index.html olarak çözülmesi (Pages uyumu).
  trailingSlash: true,
  images: {
    // Statik export'ta optimizasyon sunucusu yoktur; özel yükleyici
    // basePath'i src'ye ekler (GitHub Pages alt yolu için gerekli).
    loader: "custom",
    loaderFile: "./image-loader.js",
  },
  reactStrictMode: true,
  transpilePackages: ["three"],
  experimental: {
    optimizePackageImports: ["@react-three/drei", "motion"],
  },
};

export default nextConfig;
