/**
 * Marka hikâyesi — mevcut kurumsal içerikten uyarlanmış, doğrulanmış zaman çizelgesi.
 * Tüm veriler marka materyallerinden gelir; uydurma tarih/iddia eklenmez.
 */

export const storyIntro = {
  overline: "Geçmişten bugüne",
  title: "Bir HORECA yolculuğu, Tömük'te köklendi.",
  body: "Favori Fresh'in temel amacı insanlara %100 doğal, sağlıklı ve kaliteli ürünler sunmaktır. İstanbul'da başlayan içecek üreticiliği, Mersin Erdemli / Tömük'teki üretim yatırımıyla bugün tüm meyve grubunu aynı doğal anlayışla işleyen bir portföye dönüştü.",
};

/** Üretim anlayışı — marka tarafından doğrulanmış gerçekler. */
export const production = {
  overline: "Üretim anlayışımız",
  title: "Hasat günü işlenir, ilk günkü kalitesiyle korunur.",
  intro:
    "Tüm meyvelerimiz hasat edildiği gün Mersin Erdemli'deki tesisimize ulaştırılır ve aynı gün işlenir. Hiçbir ürünümüzde katkı maddesi veya koruyucu bulunmaz; süreç tamamen doğal yöntemlerle yürütülür. Bu anlayış belirli ürünler için değil, tüm meyve grubumuz için geçerlidir.",
  facts: [
    {
      value: "Aynı gün",
      label: "Hasat edildiği gün tesise ulaşır ve işlenir",
    },
    {
      value: "-40°C",
      label: "Üretim sonrası şoklama ile tazelik kilitlenir",
    },
    {
      value: "-20 / -25°C",
      label: "Donuk depolarda yıl boyu muhafaza",
    },
    {
      value: "Katkısız",
      label: "Koruyucu ve katkı maddesi içermez",
    },
  ],
  note: "İçecek özü ürünlerimiz 1/4 oranında seyreltilerek tüketilir; meyve suyu ürünlerimiz doğrudan içime uygundur. Türkiye'nin dört bir yanına bayilerimiz aracılığıyla hizmet veriyoruz.",
};

export interface TimelineNode {
  year: string;
  title: string;
  text: string;
  /** İlgili görsel (varsa). */
  image?: string;
  imageAlt?: string;
}

export const timeline: TimelineNode[] = [
  {
    year: "2013",
    title: "HORECA Yolculuğu",
    text: "BREMA KAHVE ve sıcak-soğuk içecek gruplarıyla İstanbul'da HORECA sektöründe üretici ve tedarikçi olarak yola çıktık.",
  },
  {
    year: "2017",
    title: "İlk Limonata Üretimi",
    text: "Ev yapımı gibi doğal limonata lezzetini profesyonel mutfaklara taşıyan üretim yaklaşımımız güçlendi.",
    image: "/img/bahce-limon.webp",
    imageAlt: "Dalında olgunlaşmış Lamas limonları",
  },
  {
    year: "2020",
    title: "Mersin – Erdemli Yatırımı",
    text: "Artan talebi karşılamak için Favori Fresh markasıyla Mersin Erdemli / Tömük'te donuk meyve suyu ve donuk limonata üretim yatırımı yaptık.",
    image: "/img/uretim-limon-2.webp",
    imageAlt: "Üretim hattında yıkanan limonlar",
  },
  {
    year: "2020–2024",
    title: "Portföy Gelişimi",
    text: "Limonata, portakal suyu, nar suyu, greyfurt, karadut ve Bodrum Mandalina Limonatası ile portföyümüz genişledi.",
    image: "/img/uretim-limonata-2.webp",
    imageAlt: "Dolum hattında Favori Fresh şişeleri",
  },
  {
    year: "2025",
    title: "Ulusal Yayılım",
    text: "Bayi ağımızla Türkiye'nin dört bir yanına hizmet veriyor; donuk muhafazayla ilk gün tazeliğini her noktaya taşıyoruz.",
    image: "/img/lojistik.webp",
    imageAlt: "Favori Fresh markalı sevkiyat aracı",
  },
];

/** Marka afişlerinden doğrulanmış slogan satırları. */
export const storySlogan = {
  line: "Doğadan gelen her damlada biraz sevgi, bolca tazelik var.",
  tag: "Doğanın hediyesi.",
};
