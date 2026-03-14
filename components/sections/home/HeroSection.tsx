import Link from "next/link";
import type { HomePageData } from "@/lib/content/types";

type Props = {
  hero: HomePageData["hero"];
};

export function HeroSection({ hero }: Props) {
  return (
    <section>
      {hero.eyebrow && <p>{hero.eyebrow}</p>}

      <h1>{hero.title}</h1>

      {hero.subtitle && <p>{hero.subtitle}</p>}

      <div>
        {hero.primaryCtaLabel && hero.primaryCtaHref && (
          <Link href={hero.primaryCtaHref}>{hero.primaryCtaLabel}</Link>
        )}

        {hero.secondaryCtaLabel && hero.secondaryCtaHref && (
          <Link href={hero.secondaryCtaHref}>{hero.secondaryCtaLabel}</Link>
        )}
      </div>
    </section>
  );
}