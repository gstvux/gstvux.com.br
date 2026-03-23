import type { PageQuery } from "@/tina/__generated__/types";
import type { FeaturedCase, HomePageData } from "@/lib/content/types";

export function mapHomePageData(data: PageQuery): HomePageData {
    const page = data.page;

    const featuredCases: FeaturedCase[] =
        page.featuredCases
            ?.filter((item): item is NonNullable<typeof item> => item !== null)
            .map((item) => ({
                slug: item.slug,
                title: item.title,
                summary: item.summary ?? undefined,
                tag: item.tag ?? undefined,
            })) ?? [];

    return {
        intro: page.intro
            ? {
                kicker: page.intro.kicker ?? undefined,
                headline: page.intro.headline ?? undefined,
                body: page.intro.body ?? undefined,
            }
            : undefined,

        featuredCases,

        cta: page.cta
            ? {
                title: page.cta.title ?? undefined,
                body: page.cta.body ?? undefined,
                buttonLabel: page.cta.buttonLabel ?? undefined,
                buttonHref: page.cta.buttonHref ?? undefined,
            }
            : undefined,
    };
}