import { LiquidButton } from "@/components/ui/LiquidButton";

export default function NotFound() {
  return (
    <section className="grid min-h-[70vh] place-items-center px-6 pt-24 text-center">
      <div>
        <p className="font-display text-7xl text-brand-green">404</p>
        <h1 className="mt-4 font-display text-fluid-h3">Sayfa bulunamadı</h1>
        <p className="mx-auto mt-3 max-w-sm text-ink/70">
          Aradığınız sayfa taşınmış veya kaldırılmış olabilir.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <LiquidButton href="/">Ana Sayfa</LiquidButton>
          <LiquidButton href="/urunler" variant="outline">
            Ürünler
          </LiquidButton>
        </div>
      </div>
    </section>
  );
}
