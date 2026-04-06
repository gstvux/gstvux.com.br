import React from "react";
import { MediaFrame } from "@/src/components/ui/media/MediaFrame";
import type { PageQuery } from "@/tina/__generated__/types";
import { ButtonLink } from "@/src/components/ui/button/ButtonLink";
import { CmsIcon } from "@/src/components/ui/icon/CmsIcon";
import { HeroLocalTime } from "./HeroLocalTime";
import { Typewriter } from "@/src/components/ui/typewriter/Typewriter";
import { formatMonthYearPtBr } from "@/src/utils/cv-publisher";

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

type PageHome = Extract<PageQuery["page"], { __typename: "PageHome" }>;
type HeroData = NonNullable<PageHome["hero"]>;

type HeroSectionProps = {
  hero: HeroData;
  cvData?: any; // Will be properly typed once Tina generates the Cv types
};

export function HeroSection({ hero, cvData }: HeroSectionProps) {

  const contactBar = hero.contactBar;

  return (
    <section className="hero-surface pt-20 lg:flex lg:flex-col lg:justify-center lg:min-h-(--hero-min-h-desktop)">
      <div className="mx-auto p-6 lg:p-0 w-full max-w-7xl flex flex-col lg:flex-row lg:items-center lg:justify-between">

        <div className="w-full lg:max-w-121.5 ">

          {hero?.imageSrc && (
            <MediaFrame
              imageSrc={hero.imageSrc}
              imageAlt={hero.imageAlt || ""}
              animatePolygon
              priority={true}
            />
          )}
        </div>

        <div className="tracking-hero flex flex-col gap-4 lg:flex-col  lg:gap-10 lg:justify-center lg:max-w-(--hero-content-max-w)">
          {(hero.eyebrow?.icon || hero.eyebrow?.text) && (
            <div className="hero-eyebrow flex flex-col gap-4 lg:flex-col lg:gap-4">
              {hero.eyebrow.icon && (
                <span className="hero-eyebrow__icon" aria-hidden="true">
                  <span className="hero-eyebrow__wave">
                    {hero.eyebrow.icon}
                  </span>
                  {hero.eyebrow.text && (
                    <span className="hero-eyebrow__text">{hero.eyebrow.text}</span>
                  )}
                </span>
              )}



              {hero.title && (
                <h1 className="text-trim-cap uppercase font-bold font-primary text-size-hero text-fg-heading-subtle leading-none" data-testid="hero-title">
                  {hero.title}
                </h1>
              )}

              {hero.subtitle && (
                <p className="text-trim-cap font-utils text-size-title-sm text-fg-heading">
                  <Typewriter text={hero.subtitle} />
                </p>
              )}
            </div>
          )}



          <div className="flex flex-col gap-4 lg:flex-col lg:gap-4">
            {hero.description && <p>{hero.description}</p>}
          </div>

          <div className="flex flex-col gap-4 lg:flex-row">
            {hero.primaryCtaLabel && hero.primaryCtaHref && (
              <ButtonLink
                id="hero-primary-cta"
                data-analytics="hero-primary-cta"
                href={hero.primaryCtaHref}
                appearance="primary"
                {...getIconProps(hero.primaryCtaSvg, hero.primaryCtaIconPosition)}
              >
                {hero.primaryCtaLabel}
              </ButtonLink>
            )}

            {hero.secondaryCtaLabel && (cvData?.href || hero.secondaryCtaHref) && (
              <div className="flex flex-col gap-1">

                <ButtonLink
                  id="hero-cv-download"
                  data-analytics="hero-cv-download"
                  href={cvData?.href || hero.secondaryCtaHref}
                  appearance="secondary"
                  download={cvData?.href ? cvData.href.split('/').pop() : true}
                  {...getIconProps(
                    hero.secondaryCtaSvg,
                    hero.secondaryCtaIconPosition
                  )}
                >
                  {hero.secondaryCtaLabel}
                </ButtonLink>
                {cvData?.updatedAt && (
                  <div className="flex justify-center gap-2 text-size-body-xs text-fg-body-subtle">
                    <span className="text-fg-body">{cvData.extension || 'pdf'}</span>
                    <span>•</span>
                    <span>última versão <span className="text-fg-body">{formatMonthYearPtBr(cvData.updatedAt)}</span></span>
                  </div>
                )}

              </div>
            )}

            {hero.whatsappLabel && hero.whatsappHref && (
              <ButtonLink
                id="hero-whatsapp"
                data-analytics="hero-whatsapp"
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
          </div>
          {(contactBar?.locationText ||
            contactBar?.workmodeText ||
            contactBar?.linkedinHref ||
            contactBar?.email ||
            (contactBar?.showTimezone && contactBar?.timezoneLabel)) && (
              <div className="text-size-body-xs flex flex-col lg:flex-row items-center lg:justify-between text-fg-body-subtle justify-center  gap-4 text-sm">
                <div className="flex gap-2">
                  {contactBar?.email && (
                    <a
                      id="hero-email"
                      data-analytics="hero-email"
                      href={`mailto:${contactBar.email}`}
                      className="underline underline-offset-4"
                    >
                      {contactBar.email}
                    </a>
                  )}
                  {contactBar?.linkedinHref && (
                    <a
                      id="hero-linkedin"
                      data-analytics="hero-linkedin"
                      href={contactBar.linkedinHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-4"
                    >
                      {contactBar.linkedinText?.trim() || "LinkedIn"}
                    </a>
                  )}
                </div>

                <hr className="flex-1 text-fg-section-separator" />


                <div className="flex gap-2">
                  {contactBar?.locationText && (
                    <span>{contactBar.locationText}</span>
                  )}

                  {contactBar?.workmodeText && (
                    <span>{contactBar.workmodeText}</span>
                  )}



                  {contactBar?.showTimezone && (
                    <HeroLocalTime
                      timezoneId={contactBar?.timezoneId}
                      timezoneLabel={contactBar?.timezoneLabel}
                    />
                  )}
                </div>
              </div>
            )}
        </div>

      </div>
    </section>
  );
}