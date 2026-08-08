import Link from "next/link";
import { brand, contact, footerLinks } from "@/content/site";
import { Logo } from "@/components/ui/Logo";
import { ExperienceToggle } from "@/components/ui/ExperienceToggle";

export function SiteFooter() {
  return (
    <footer className="bg-brand-botanic text-cream">
      <div className="container-fluid grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="space-y-4">
          {/* Alttaki marka logosu doğrudan Instagram hesabına yönlendirir */}
          <a
            href={contact.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${brand.name} Instagram`}
            className="inline-block rounded-md transition-opacity hover:opacity-80"
          >
            <Logo tone="light" />
          </a>
          <p className="font-display text-lg text-cream">{brand.slogan}</p>
          <p className="max-w-xs text-sm text-cream/70">
            {brand.promise} {brand.region} üretim kültüründen doğal içecekler.
          </p>
          <ExperienceToggle className="pt-2" />
        </div>

        {Object.entries(footerLinks).map(([title, links]) => (
          <nav key={title} aria-label={title}>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-cream/60">
              {title}
            </h2>
            <ul className="space-y-2.5">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-cream/85 transition-colors hover:text-cream"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-cream/15">
        <div className="container-fluid flex flex-col gap-4 py-6 text-xs text-cream/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {brand.name}. Tüm hakları saklıdır.
          </p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <a href={`mailto:${contact.email}`} className="hover:text-cream">
              {contact.email}
            </a>
            <span aria-hidden>·</span>
            <span>{contact.address}</span>
            {/* Sosyal — Instagram hesabına yönlendirir */}
            <a
              href={contact.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${brand.name} Instagram`}
              className="inline-flex items-center gap-1.5 rounded-full border border-cream/20 px-3 py-1.5 text-cream/85 transition-colors hover:border-cream/50 hover:text-cream"
            >
              <InstagramIcon />
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/** Instagram glifi (inline SVG — ağ bağımlılığı yok). */
function InstagramIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
