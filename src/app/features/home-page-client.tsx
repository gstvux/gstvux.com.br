"use client";

import { useTina } from "tinacms/dist/react";
import type {
  PageQuery,
  PageQueryVariables,
} from "@/tina/__generated__/types";

import { HeroSection } from "@/src/components/sections/home/HeroSection";
import { ProfileSection } from "@/src/components/sections/home/ProfileSection";
import { FeaturedCasesSection } from "@/src/components/sections/home/FeaturedCasesSection";
import { ProcessSection } from "@/src/components/sections/home/ProcessSection";
import { ContactSection } from "@/src/components/sections/home/ContactSection";

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

  const page = data.page;

  if (page.__typename !== 'PageHome') {
    return null;
  }

  const home = page;

  const featuredCases =
    home.featured_cases?.filter(
      (item): item is NonNullable<typeof item> => item !== null
    ) ?? [];
    
  const casesOverview = home.cases_overview;

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
      {casesOverview && !!featuredCases.length && (
        <FeaturedCasesSection 
          overview={casesOverview} 
          featuredCases={featuredCases} 
        />
      )}
      {profile && <ProfileSection profile={profile} />}
      {home.process && (
        <ProcessSection
          process={home.process}
        />
      )}
      {home.contact && <ContactSection contact={home.contact} />}
    </>
  );
}