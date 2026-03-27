import React from "react";
import { MediaFrame } from "@/src/components/ui/media/MediaFrame";
import type { PageQuery } from "@/tina/__generated__/types";
import { ButtonLink } from "@/src/components/ui/button/ButtonLink";
import { CmsIcon } from "@/src/components/ui/icon/CmsIcon";
import { HeroLocalTime } from "./HeroLocalTime";
import { Typewriter } from "@/src/components/ui/typewriter/Typewriter";

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
};

export function HeroSection({ hero }: HeroSectionProps) {
  const bullets = hero.bullets?.filter(
    (bullet: string | null): bullet is string => Boolean(bullet)
  );

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

            {bullets?.length ? (
              <ul className="list-none lg:flex lg:flex-col lg:gap-2">
                {bullets.map((bullet: string, index: number) => (
                  <li key={index} className="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-[0.785em] before:size-2 before:-translate-y-1/2 before:rounded-r-sm before:bg-bullet-fg">{bullet}</li>
                ))}
              </ul>
            ) : null}
          </div>

          <div className="flex flex-col gap-4 lg:flex-row">
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
                      href={`mailto:${contactBar.email}`}
                      className="underline underline-offset-4"
                    >
                      {contactBar.email}
                    </a>
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