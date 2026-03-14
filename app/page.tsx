import { homeData } from "@/lib/content/home";
import { HeroSection } from "@/components/sections/home/HeroSection";
import { IntroSection } from "@/components/sections/home/IntroSection";
import { FeaturedCasesSection } from "@/components/sections/home/FeaturedCasesSection";
import { CtaSection } from "@/components/sections/home/CtaSection";

export default function Page() {
  return (
    <>
      <HeroSection hero={homeData.hero} />
      <IntroSection intro={homeData.intro} />
      <FeaturedCasesSection featuredCases={homeData.featuredCases} />
      <CtaSection cta={homeData.cta} />
    </>
  );
}