"use client";

import { useTina } from "tinacms/dist/react";
import type {
  PageQuery,
  PageQueryVariables,
} from "@/tina/__generated__/types";

import { HeroSection } from "@/src/components/sections/home/HeroSection";
import { ProfileSection } from "@/src/components/sections/home/ProfileSection";
import { FeaturedCasesSection } from "@/src/components/sections/home/FeaturedCasesSection";
import { CtaSection } from "@/src/components/sections/home/CtaSection";

type HomePageClientProps = {
  query: string;
  variables: PageQueryVariables;
  data: PageQuery;
};

export default function HomePageClient(props: HomePageClientProps) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const home = data.page;

  const featuredCases =
    home.featuredCases?.filter(
      (item): item is NonNullable<typeof item> => item !== null
    ) ?? [];

  if (!home) {
    return null;
  }

  const profile = home.profile
    ? {
      imageSrc: home.profile.imageSrc ?? undefined,
      imageAlt: home.profile.imageAlt ?? undefined,
      kicker: home.profile.kicker ?? undefined,
      headline: home.profile.headline ?? undefined,
      body: home.profile.body ?? undefined,
    }
    : undefined;

  return (
    <>
      {home.hero && <HeroSection hero={home.hero} />}
      {!!featuredCases.length && (
        <FeaturedCasesSection featuredCases={featuredCases} />
      )}
      {profile && <ProfileSection profile={profile} />}
      {home.cta && <CtaSection cta={home.cta} />}
    </>
  );
}