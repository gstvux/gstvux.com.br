"use client";

import { useTina } from "tinacms/dist/react";
import type {
  PageQuery,
  PageQueryVariables,
} from "@/tina/__generated__/types";

import { HeroSection } from "@/components/sections/home/HeroSection";
import { IntroSection } from "@/components/sections/home/IntroSection";
import { FeaturedCasesSection } from "@/components/sections/home/FeaturedCasesSection";
import { CtaSection } from "@/components/sections/home/CtaSection";

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

  if (!home?.hero) {
    throw new Error('content/pages/home.json está sem o bloco "hero".');
  }

  return (
    <>
      <HeroSection hero={home.hero} />
      {home.intro && <IntroSection intro={home.intro} />}
      {home.featuredCases && (
        <FeaturedCasesSection featuredCases={home.featuredCases} />
      )}
      {home.cta && <CtaSection cta={home.cta} />}
    </>
  );
}