"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { navItems, primaryCta, brand } from "@/content/site";
import { products } from "@/content/products";
import { accentRgb } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { LiquidButton } from "@/components/ui/LiquidButton";
import { Logo } from "@/components/ui/Logo";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Anasayfada hero üzerinde şeffaf; scroll sonrası yüzey belirir.
  const onHome = pathname === "/";
  const solid = scrolled || !onHome;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Rota değişince menüleri kapat.
  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500 ease-fluid",
        solid
          ? "bg-cream/85 text-ink backdrop-blur-md shadow-[0_1px_0_0_rgb(var(--c-ink)/0.06)]"
          : "bg-transparent text-cream",
      )}
    >
      <div className="container-fluid flex h-16 items-center justify-between md:h-20">
        <Link href="/" aria-label={`${brand.name} ana sayfa`} className="shrink-0">
          <Logo tone={solid ? "dark" : "light"} />
        </Link>

        {/* Masaüstü navigasyon */}
        <nav aria-label="Ana menü" className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const isProducts = item.href === "/urunler";
            return (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => isProducts && setMegaOpen(true)}
                onMouseLeave={() => isProducts && setMegaOpen(false)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    "hover:bg-current/10",
                    pathname.startsWith(item.href) && "text-current",
                  )}
                  aria-expanded={isProducts ? megaOpen : undefined}
                >
                  {item.label}
                </Link>

                {isProducts && (
                  <AnimatePresence>
                    {megaOpen && <MegaMenu />}
                  </AnimatePresence>
                )}
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <LiquidButton
            href={primaryCta.href}
            variant={solid ? "solid" : "outline"}
            className="hidden sm:inline-flex"
          >
            {primaryCta.label}
          </LiquidButton>

          {/* Mobil menü tetikleyici */}
          <button
            type="button"
            aria-label={mobileOpen ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-current/20 lg:hidden"
          >
            <BurgerIcon open={mobileOpen} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} />}
      </AnimatePresence>
    </header>
  );
}

/** Ürünler görsel mega menüsü — meyve rengi + kısa açıklama + sayfa bağlantısı. */
function MegaMenu() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="absolute left-1/2 top-full w-[min(90vw,720px)] -translate-x-1/2 pt-3"
    >
      <div className="grid grid-cols-2 gap-1 rounded-2xl border border-ink/10 bg-cream p-3 text-ink shadow-2xl md:grid-cols-3">
        {products.map((p) => (
          <Link
            key={p.slug}
            href={`/urunler/${p.slug}`}
            className="group flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-ink/[0.04]"
          >
            <span
              aria-hidden
              className="h-10 w-10 shrink-0 rounded-full ring-1 ring-black/5"
              style={{
                background: `radial-gradient(circle at 35% 30%, rgb(${accentRgb[p.accent]} / 0.95), rgb(${accentRgb[p.accent]} / 0.55))`,
              }}
            />
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold">
                {p.name.replace("Favori Fresh ", "")}
              </span>
              <span className="block truncate text-xs text-ink/60">
                {p.tagline}
              </span>
            </span>
          </Link>
        ))}
        <Link
          href="/urunler"
          className="flex items-center justify-center rounded-xl bg-brand-green p-3 text-sm font-semibold text-cream transition-opacity hover:opacity-90"
        >
          Tüm ürünler →
        </Link>
      </div>
    </motion.div>
  );
}

/** Tam ekran mobil menü — ağır 3D animasyon yok. */
function MobileMenu({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 top-16 z-40 bg-cream text-ink lg:hidden"
    >
      <nav
        aria-label="Mobil menü"
        className="container-fluid flex h-[calc(100dvh-4rem)] flex-col gap-1 overflow-y-auto py-6"
      >
        {navItems.map((item, i) => (
          <motion.div
            key={item.href}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.04 * i }}
          >
            <Link
              href={item.href}
              onClick={onClose}
              className="block border-b border-ink/10 py-4 font-display text-2xl"
            >
              {item.label}
            </Link>
          </motion.div>
        ))}
        <div className="mt-6">
          <LiquidButton href={primaryCta.href} className="w-full">
            {primaryCta.label}
          </LiquidButton>
        </div>
      </nav>
    </motion.div>
  );
}

function BurgerIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block h-3.5 w-5">
      <span
        className={cn(
          "absolute left-0 h-0.5 w-full bg-current transition-all duration-300",
          open ? "top-1.5 rotate-45" : "top-0",
        )}
      />
      <span
        className={cn(
          "absolute left-0 top-1.5 h-0.5 w-full bg-current transition-all duration-300",
          open && "opacity-0",
        )}
      />
      <span
        className={cn(
          "absolute left-0 h-0.5 w-full bg-current transition-all duration-300",
          open ? "top-1.5 -rotate-45" : "top-3",
        )}
      />
    </span>
  );
}
