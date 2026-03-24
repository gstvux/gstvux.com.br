export type FeaturedCase = {
    slug: string;
    title: string;
    summary?: string;
    tag?: string;
};

export type HomePageData = {
    profile?: {
        imageSrc?: string;
        imageAlt?: string;
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