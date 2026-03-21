import { MediaFrame } from "@/components/ui/media/MediaFrame";
import type { PageQuery } from "@/tina/__generated__/types";
import { ButtonLink } from "@/components/ui/button/ButtonLink";
import { CmsIcon } from "@/components/ui/icon/CmsIcon";
import { HeroLocalTime } from "./HeroLocalTime";

type IconPosition = "leading" | "trailing";

function normalizeIconPosition(value?: string | null): IconPosition {
  return value === "leading" ? "leading" : "trailing";
}

function getIconNode(svg?: string | null) {
  if (!svg?.trim()) return undefined;
  return <CmsIcon svg={svg} className="size-5" />;
}

function getIconProps(svg?: string | null, position?: string | null) {
  const node = getIconNode(svg);
  if (!node) return {};

  const safePosition = normalizeIconPosition(position);

  return safePosition === "leading"
    ? { leadingIcon: node }
    : { trailingIcon: node };
}

type HeroData = NonNullable<NonNullable<PageQuery["page"]>["hero"]>;

type HeroSectionProps = {
  hero: HeroData;
};

export function HeroSection({ hero }: HeroSectionProps) {
  const bullets = hero.bullets?.filter(
    (bullet): bullet is string => Boolean(bullet)
  );

  const contactBar = hero.contactBar;

  return (
    <section className="hero-surface pt-20 lg:flex lg:flex-col lg:justify-center lg:min-h-(--hero-min-h-desktop)">
      <div className="mx-auto max-w-7xl">
        <div className="lg:flex lg:justify-between">
          <MediaFrame
            imageSrc="/images/gustavo-luciano-ux-design-product-designer-front-end-dev.png"
            imageAlt="Retrato de Gustavo Luciano"
            frameWidth="30.375rem"
            sizes="30.375rem"
          />

          <div className="lg:flex lg:flex-col lg:justify-center lg:max-w-(--hero-content-max-w)">
            {(hero.eyebrow?.icon || hero.eyebrow?.text) && (
              <div className="hero-eyebrow">
                {hero.eyebrow.icon && (
                  <span className="hero-eyebrow__icon" aria-hidden="true">
                    <span className="hero-eyebrow__wave">
                      {hero.eyebrow.icon}
                    </span>
                  </span>
                )}

                {hero.eyebrow.text && (
                  <p className="hero-eyebrow__text">{hero.eyebrow.text}</p>
                )}
              </div>
            )}

            {hero.title && (
              <h1 className="text-hero text-fg-heading-subtle uppercase">
                {hero.title}
              </h1>
            )}

            {hero.subtitle && (
              <p className="text-fg-secondary font-bold">{hero.subtitle}</p>
            )}

            {hero.description && <p>{hero.description}</p>}

            {bullets?.length ? (
              <ul className="mt-4 list-inside list-disc">
                {bullets.map((bullet, index) => (
                  <li key={index}>{bullet}</li>
                ))}
              </ul>
            ) : null}

            <div className="flex flex-wrap gap-4">
              {hero.primaryCtaLabel && hero.primaryCtaHref && (
                <ButtonLink
                  href={hero.primaryCtaHref}
                  appearance="primary"
                  {...getIconProps(hero.primaryCtaSvg, hero.primaryCtaIconPosition)}
                >
                  {hero.primaryCtaLabel}
                </ButtonLink>
              )}

              {hero.secondaryCtaLabel && hero.secondaryCtaHref && (
                <ButtonLink
                  href={hero.secondaryCtaHref}
                  appearance="secondary"
                  {...getIconProps(
                    hero.secondaryCtaSvg,
                    hero.secondaryCtaIconPosition
                  )}
                >
                  {hero.secondaryCtaLabel}
                </ButtonLink>
              )}

              {hero.whatsappLabel && hero.whatsappHref && (
                <ButtonLink
                  href={hero.whatsappHref}
                  appearance="secondary"
                  external
                  target="_blank"
                  rel="noopener noreferrer"
                  {...getIconProps(hero.whatsappSvg, hero.whatsappIconPosition)}
                >
                  {hero.whatsappLabel}
                </ButtonLink>
              )}
              {(contactBar?.locationText ||
                contactBar?.workmodeText ||
                contactBar?.linkedinHref ||
                contactBar?.email ||
                (contactBar?.showTimezone && contactBar?.timezoneLabel)) && (
                  <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                    {contactBar?.locationText && (
                      <span>{contactBar.locationText}</span>
                    )}

                    {contactBar?.workmodeText && (
                      <span>{contactBar.workmodeText}</span>
                    )}

                    {contactBar?.linkedinHref && (
                      <a
                        href={contactBar.linkedinHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-4"
                      >
                        {contactBar.linkedinText?.trim() || "LinkedIn"}
                      </a>
                    )}

                    {contactBar?.email && (
                      <a
                        href={`mailto:${contactBar.email}`}
                        className="underline underline-offset-4"
                      >
                        {contactBar.email}
                      </a>
                    )}

                    {contactBar?.showTimezone && (
                      <HeroLocalTime
                        timezoneId={contactBar?.timezoneId}
                        timezoneLabel={contactBar?.timezoneLabel}
                      />
                    )}
                  </div>
                )}


            </div>
          </div>
        </div>
      </div>
    </section>
  );
}