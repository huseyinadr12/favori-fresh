import type { Product, ProductCategory } from "@/lib/types";

/**
 * MERKEZİ ÜRÜN VERİSİ.
 * Yeni ürün eklemek için yalnızca bu diziye kayıt eklemek yeterlidir.
 *
 * Marka gerçeği: tüm meyveler hasat edildiği gün Mersin Erdemli tesisine
 * ulaşır ve aynı gün işlenir. Katkı maddesi / koruyucu yoktur. Üretim sonrası
 * -40°C'de şoklanır, -20°C / -25°C depolarda muhafaza edilir; böylece tazelik
 * yıl boyu ilk günkü kalitesiyle korunur.
 *
 * Kategoriler:
 *  - "oz": içecek özleri — 1/4 oranında seyreltilerek tüketilir (konsantre).
 *  - "meyve-suyu": doğrudan tüketime hazır.
 *  - "profesyonel": restoran / HORECA için profesyonel kullanım.
 *
 * NOT: Doğrulanmamış sağlık/liderlik/"tek" iddiaları burada YER ALMAZ.
 */

/** Kategori başlık ve açıklamaları (yönetilebilir). */
export const categoryMeta: Record<
  ProductCategory,
  { label: string; short: string; description: string }
> = {
  oz: {
    label: "İçecek Özleri",
    short: "1/4 konsantre",
    description:
      "1/4 oranında seyreltilerek tüketilen konsantre özler. Bir ölçü öz, üç ölçü su ya da soda ile hazırlanır.",
  },
  "meyve-suyu": {
    label: "Meyve Suları",
    short: "İçime hazır",
    description: "Doğrudan tüketime hazır, öz formda meyve suları.",
  },
  profesyonel: {
    label: "Profesyonel Kullanım İçin",
    short: "HORECA",
    description:
      "Restoranlar ve limon suyu kullanan profesyonel işletmeler için üretilir.",
  },
};

export const products: Product[] = [
  // ————— İÇECEK ÖZLERİ (1/4) —————
  {
    slug: "lamas-limonatasi",
    name: "Favori Fresh Lamas Limonatası Özü",
    category: "oz",
    tagline: "Lamas limonundan ilk gün ferahlığı",
    story:
      "İnce kabuklu Lamas limonunun keskin ferahlığını, ev yapımı limonatanın berrak sitrus dengesiyle korur. Hasat günü işlenir, -40°C'de şoklanır; 1/4 oranında hazırlandığında ilk günkü tazeliğini verir.",
    fruitSource: "Mersin / Erdemli — Lamas limonu",
    accent: "lemon",
    serving: "Buzla; bardağın kenarına ince limon kabuğu spiraliyle servis edilir.",
    dilution: "1 ölçü öz + 4 ölçü su ya da soda (1/4) ile hazırlanır.",
    storage: "-20°C / -25°C'de saklanır; çözüldükten sonra +4°C'de servis edilir.",
    packaging: ["1 lt cam şişe"],
    horecaBenefit:
      "Her bardakta aynı sitrus dengesi — barista ve servis ekibi için hazırlık süresi çok kısa.",
    uses: ["Kahvaltı servisi", "Öğle menüsü", "Bar & mixology bazı"],
    notes: [
      { label: "İçerik odağı", value: "Katkı maddesi içermez (%100 doğal)" },
      { label: "Hazırlama", value: "1/4 oranında" },
    ],
    scene: {
      transition:
        "Kamera limon kabuğunun spiral formunun içinden geçer; sarı sıvı dalgası şişedeki limonataya dönüşür.",
      bottleModel: null,
      poster: null,
      liquidColor: "#e6c22c",
      accentColor: "#f4e08a",
    },
    bottleImage: "/img/urun-limonata.jpg",
    orchardImage: "/img/bahce-limon.jpg",
    isPlaceholder: false,
  },
  {
    slug: "bodrum-mandalina-limonatasi",
    name: "Favori Fresh Bodrum Mandalina Limonatası Özü",
    category: "oz",
    tagline: "Ege güneşinin sıcak mandalina aroması",
    story:
      "Bodrum mandalinasının tatlı-mayhoş dengesini limonatanın ferahlığıyla buluşturur. İlk yudumda Ege bahçelerinin güneşli, çiçeksi aromasını taşır. 1/4 oranında hazırlanır.",
    fruitSource: "Muğla / Bodrum — Bodrum mandalinası",
    accent: "mandarin",
    serving: "Soğuk servis; bardağa bir dilim taze mandalina ile sunulabilir.",
    dilution: "1 ölçü öz + 4 ölçü su ya da soda (1/4) ile hazırlanır.",
    storage: "-20°C / -25°C'de saklanır; çözüldükten sonra +4°C'de servis edilir.",
    packaging: ["1 lt cam şişe"],
    horecaBenefit:
      "Mevsimsel mandalina tedarik derdi olmadan yıl boyu tutarlı bir imza lezzet.",
    uses: ["Brunch menüsü", "Otel açık büfe", "İkramlık welcome drink"],
    notes: [
      { label: "İçerik odağı", value: "Katkı maddesi içermez (%100 doğal)" },
      { label: "Hazırlama", value: "1/4 oranında" },
    ],
    scene: {
      transition:
        "Mandalina dilimleri katman katman açılır; sıcak Ege ışığı turuncu-sarı kırılmalarla ürüne taşır.",
      bottleModel: null,
      poster: null,
      liquidColor: "#e8852d",
      accentColor: "#f6b26b",
    },
    bottleImage: "/img/urun-mandalina.jpg",
    orchardImage: "/img/bahce-mandalina.png",
    isPlaceholder: false,
  },
  {
    slug: "karadut-suyu",
    name: "Favori Fresh Karadut Suyu Özütü",
    category: "oz",
    tagline: "İzmir karadutundan koyu mürdüm yoğunluk",
    story:
      "İzmir karadutunun kadifemsi, derin aromasını korur. Krem ışıklı, sıcak bir yoğunluk; koyu ama asla ağır değil. 1/4 oranında hazırlanan yoğun bir özdür.",
    fruitSource: "İzmir — olgun karadut",
    accent: "mulberry",
    serving: "Soğuk servis; parçacıkların dağılması için hafifçe çalkalanır.",
    dilution: "1 ölçü öz + 4 ölçü su ya da soda (1/4) ile hazırlanır.",
    storage: "-20°C / -25°C'de saklanır; çözüldükten sonra +4°C'de servis edilir.",
    packaging: ["1 lt cam şişe"],
    horecaBenefit:
      "Tatlı ve pasta eşleşmelerinde imza bir renk ve aroma bileşeni.",
    uses: ["Tatlı & pasta eşleşmesi", "Kahvaltı", "İmza mocktail"],
    notes: [
      { label: "İçerik odağı", value: "Katkı maddesi içermez (%100 doğal)" },
      { label: "Hazırlama", value: "1/4 oranında" },
    ],
    scene: {
      transition:
        "Mürdüm sıvı girdabı meyve parçacıklarıyla birleşir; koyu mürdüm ve krem gün ışığı dengesinde dramatik bir geçiş.",
      bottleModel: null,
      poster: null,
      liquidColor: "#5e2a5c",
      accentColor: "#8a4a86",
    },
    bottleImage: "/img/urun-karadut.jpg",
    orchardImage: null,
    isPlaceholder: false,
  },

  // ————— MEYVE SULARI (içime hazır) —————
  {
    slug: "portakal-suyu",
    name: "Favori Fresh Portakal Suyu",
    category: "meyve-suyu",
    tagline: "Valencia portakalından dolu gövdeli tazelik",
    story:
      "Valencia portakalının gözeneklerinden gelen dolgun aromayı, taze sıkılmış hissini bozmadan şişeye taşır. Öz formda, içime hazır; meyvenin kendi dokusunu korur.",
    fruitSource: "Akdeniz kuşağı — Valencia portakalı",
    accent: "orange",
    serving: "İyi soğutularak, içime hazır servis edilir.",
    dilution: null,
    storage: "-20°C / -25°C'de saklanır; çözüldükten sonra +4°C'de ve kısa sürede tüketilir.",
    packaging: ["1 lt cam şişe"],
    horecaBenefit:
      "İçime hazır standart gramaj; her serviste aynı yoğunlukta portakal deneyimi.",
    uses: ["Kahvaltı büfesi", "Room service", "Çocuk menüsü"],
    notes: [
      { label: "İçerik odağı", value: "Katkı maddesi içermez (%100 doğal)" },
      { label: "Form", value: "İçime hazır" },
    ],
    scene: {
      transition:
        "Portakal gözenekleri makro görünür; kamera havada asılı bir meyve suyu damlasının içine girerek turuncu evrene geçer.",
      bottleModel: null,
      poster: null,
      liquidColor: "#ec741c",
      accentColor: "#ffa94d",
    },
    bottleImage: "/img/urun-portakal.jpg",
    orchardImage: "/img/bahce-portakal.jpg",
    isPlaceholder: false,
  },
  {
    slug: "greyfurt-suyu",
    name: "Favori Fresh Greyfurt Suyu",
    category: "meyve-suyu",
    tagline: "Taze sıkım greyfurtun canlı buruk tazeliği",
    story:
      "Greyfurtun canlı, hafif buruk karakterini taze sıkım berraklığıyla korur. İçime hazır; ferah ve dengeli bir sitrus deneyimi sunar.",
    fruitSource: "Akdeniz kuşağı — kırmızı greyfurt",
    accent: "grapefruit",
    serving: "İyi soğutularak, içime hazır servis edilir.",
    dilution: null,
    storage: "-20°C / -25°C'de saklanır; çözüldükten sonra +4°C'de ve kısa sürede tüketilir.",
    packaging: ["1 lt cam şişe"],
    horecaBenefit: "Kahvaltı ve sağlıklı menülerde ferah bir sitrus alternatifi.",
    uses: ["Kahvaltı büfesi", "Sağlıklı menü", "Bar & mixology"],
    notes: [
      { label: "İçerik odağı", value: "İlave şeker içermez (%100 doğal)" },
      { label: "Form", value: "İçime hazır" },
    ],
    scene: {
      transition:
        "Greyfurt dilimleri açılır; mercan-pembe sıvı damlaları arasından ürüne geçilir.",
      bottleModel: null,
      poster: null,
      liquidColor: "#e6606a",
      accentColor: "#f39ba2",
    },
    bottleImage: "/img/urun-greyfurt.jpg",
    orchardImage: null,
    isPlaceholder: false,
  },
  {
    slug: "nar-suyu",
    name: "Favori Fresh Nar Suyu",
    category: "meyve-suyu",
    tagline: "Hicaznardan yoğun, kadifemsi tat",
    story:
      "Hicaznarın buruk-tatlı karakterini ve derin rengini olduğu gibi korur. Öz formda, içime hazır; tek başına ya da imza içeceklerin gövdesi olarak.",
    fruitSource: "Güney Anadolu — Hicaznar",
    accent: "pomegranate",
    serving: "İyi soğutularak, içime hazır servis edilir.",
    dilution: null,
    storage: "-20°C / -25°C'de saklanır; çözüldükten sonra +4°C'de servis edilir.",
    packaging: ["1 lt cam şişe"],
    horecaBenefit: "Kokteyl ve mocktail bazında tutarlı renk ve yoğunluk.",
    uses: ["Bar & mixology", "Fine dining eşleşmeleri", "Sağlıklı menü"],
    notes: [
      { label: "İçerik odağı", value: "Katkı maddesi içermez (%100 doğal)" },
      { label: "Form", value: "İçime hazır" },
    ],
    scene: {
      transition:
        "Nar taneleri ağır çekimde bir takımyıldızı gibi dağılır; bir tanenin içinden koyu kırmızı sıvıya geçilir.",
      bottleModel: null,
      poster: null,
      liquidColor: "#a8202d",
      accentColor: "#d8455a",
    },
    bottleImage: "/img/urun-nar.jpg",
    orchardImage: null,
    isPlaceholder: false,
  },

  // ————— PROFESYONEL KULLANIM —————
  {
    slug: "limon-suyu",
    name: "Favori Fresh Limon Suyu",
    category: "profesyonel",
    tagline: "Profesyonel mutfaklar için doğal limon suyu",
    story:
      "Lamas limonundan elde edilen doğal limon suyu; özellikle restoranlar ve limon suyu kullanan profesyonel işletmeler için üretilir. Aynı gün işlenir, doğal yapısı korunur.",
    fruitSource: "Mersin / Erdemli — Lamas limonu",
    accent: "lemon",
    serving: "Yemeklerde, salata ve içeceklerde doğal limon suyu olarak kullanılır.",
    dilution: null,
    storage: "-20°C / -25°C'de saklanır; çözüldükten sonra +4°C'de kullanılır.",
    packaging: ["270 ml şişe"],
    horecaBenefit:
      "Mutfakta tutarlı asit ve aroma; taze limon sıkma iş yükünü ortadan kaldırır.",
    uses: ["Restoran mutfağı", "Salata & sos", "İçecek hazırlığı"],
    notes: [
      { label: "İçerik odağı", value: "%100 doğal limon suyu" },
      { label: "Kullanım", value: "Profesyonel" },
    ],
    scene: {
      transition:
        "Limon dilimi sıkılır; berrak sarı damlalar profesyonel mutfak sahnesine akar.",
      bottleModel: null,
      poster: null,
      liquidColor: "#ead24a",
      accentColor: "#f6e69a",
    },
    bottleImage: "/img/urun-limon-suyu.jpg",
    orchardImage: "/img/lamas-limon.jpg",
    isPlaceholder: false,
  },
];

/** Slug ile ürün bulur. */
export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

/** Tüm ürün slug'ları (statik generation için). */
export function getProductSlugs(): string[] {
  return products.map((p) => p.slug);
}

/** Kategoriye göre gruplanmış ürünler (sıralı). */
export function productsByCategory(): {
  category: ProductCategory;
  items: Product[];
}[] {
  const order: ProductCategory[] = ["oz", "meyve-suyu", "profesyonel"];
  return order.map((category) => ({
    category,
    items: products.filter((p) => p.category === category),
  }));
}
