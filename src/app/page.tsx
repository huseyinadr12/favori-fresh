import { Hero } from "@/components/sections/Hero";
import { ProductUniverse } from "@/components/sections/ProductUniverse";
import { ProcessJourney } from "@/components/sections/ProcessJourney";
import { ProductionEthos } from "@/components/sections/ProductionEthos";
import { HorecaBlock } from "@/components/sections/HorecaBlock";
import { StoryTeaser } from "@/components/sections/StoryTeaser";
import { Finale } from "@/components/sections/Finale";
import { AngledDivider } from "@/components/ui/AngledDivider";

/**
 * Ana sayfa — sinematik akış:
 * Açılış (slideshow) → Ürün Evreni → Üretim Yolculuğu → Üretim Anlayışı →
 * HORECA → Hikâye → Final. Bölümler arası çapraz (diagonal) geçişler.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <AngledDivider topClass="bg-brand-botanic" bottomClass="bg-cream" />

      <ProductUniverse />
      <AngledDivider topClass="bg-cream" bottomClass="bg-brand-botanic" flip />

      <ProcessJourney />
      <AngledDivider topClass="bg-brand-botanic" bottomClass="bg-cream" />

      <ProductionEthos />
      <HorecaBlock />
      <AngledDivider topClass="bg-cream" bottomClass="bg-brand-botanic" flip />

      <StoryTeaser />
      <AngledDivider topClass="bg-brand-botanic" bottomClass="bg-cream" />

      <Finale />
    </>
  );
}
