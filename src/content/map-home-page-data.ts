import type { PageQuery } from "@/tina/__generated__/types";
import type { FeaturedCase, HomePageData } from "@/src/lib/content/types";

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
        profile: page.profile
            ? {
                imageSrc: page.profile.imageSrc ?? undefined,
                imageAlt: page.profile.imageAlt ?? undefined,
                kicker: page.profile.kicker ?? undefined,
                headline: page.profile.headline ?? undefined,
                body: page.profile.body ?? undefined,
            }
            : undefined,

        featuredCases,

        contact: page.contact
            ? {
                imageSrc: page.contact.imageSrc ?? undefined,
                imageAlt: page.contact.imageAlt ?? undefined,
                headline: page.contact.headline ?? undefined,
                body: page.contact.body ?? undefined,
                bullets: page.contact.bullets as (string | null)[] | null | undefined,
            }
            : undefined,
    };
}