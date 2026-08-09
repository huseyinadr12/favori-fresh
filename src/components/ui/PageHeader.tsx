import Image from "next/image";

/**
 * İç sayfalar için tutarlı üst başlık.
 * Sağ tarafta atmosferik, solmuş gerçek bir bahçe görseli (yapay 3D balon yok);
 * soldan gelen degrade ile metin her zaman okunur kalır.
 */
export function PageHeader({
  overline,
  title,
  description,
  image = "/img/bahce-limon.webp",
}: {
  overline?: string;
  title: string;
  description?: string;
  image?: string;
}) {
  return (
    <header className="relative overflow-hidden bg-brand-botanic text-cream">
      {/* Sağda solmuş bahçe görseli */}
      <div aria-hidden className="absolute inset-y-0 right-0 hidden w-[55%] md:block">
        <Image
          src={image}
          alt=""
          fill
          priority
          sizes="55vw"
          className="object-cover"
        />
        {/* Soldan sağa degrade: sol taraf tamamen yeşil, sağa doğru açılır */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(var(--c-botanic))_0%,rgb(var(--c-botanic)/0.85)_30%,rgb(var(--c-botanic)/0.35)_100%)]" />
      </div>

      <div className="container-fluid relative z-10 pb-16 pt-32 md:pb-20 md:pt-40">
        {overline && (
          <p className="kicker text-cream/70">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-lemon" />
            {overline}
          </p>
        )}
        <h1 className="mt-3 max-w-[18ch] font-display text-fluid-h2 leading-[1.05]">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-xl text-fluid-lead text-cream/80">
            {description}
          </p>
        )}
      </div>
    </header>
  );
}
