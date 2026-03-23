"use client";

import { useTina } from "tinacms/dist/react";
import type {
  PageQuery,
  PageQueryVariables,
} from "@/tina/__generated__/types";

import { HeroSection } from "@/src/components/sections/home/HeroSection";
import { IntroSection } from "@/src/components/sections/home/IntroSection";
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

  const intro = home.intro
    ? {
      kicker: home.intro.kicker ?? undefined,
      headline: home.intro.headline ?? undefined,
      body: home.intro.body ?? undefined,
    }
    : undefined;

  return (
    <>
      {home.hero && <HeroSection hero={home.hero} />}
      {intro && <IntroSection intro={intro} />}
      {!!featuredCases.length && (
        <FeaturedCasesSection featuredCases={featuredCases} />
      )}
      {home.cta && <CtaSection cta={home.cta} />}
    </>
  );
}