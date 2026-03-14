export type FeaturedCase = {
  slug: string;
  title: string;
  summary: string;
  tag?: string;
};

export type HomePageData = {
  hero: {
    eyebrow?: string;
    title: string;
    subtitle?: string;
    primaryCtaLabel?: string;
    primaryCtaHref?: string;
    secondaryCtaLabel?: string;
    secondaryCtaHref?: string;
  };
  intro?: {
    kicker?: string;
    headline?: string;
    body?: string;
  };
  featuredCases?: FeaturedCase[];
  cta?: {
    title?: string;
    body?: string;
    buttonLabel?: string;
    buttonHref?: string;
  };
};