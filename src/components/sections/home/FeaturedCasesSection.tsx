import Link from "next/link";
import type { PageQuery } from "@/tina/__generated__/types";
import { Button } from "../../ui/button/Button";

type PageHome = Extract<PageQuery["page"], { __typename: "PageHome" }>;

type FeaturedCaseItem = NonNullable<
  PageHome["featured_cases"]
>[number];

type OverviewItem = PageHome["cases_overview"];


type Props = {
  overview?: OverviewItem;
  featuredCases?: NonNullable<FeaturedCaseItem>[];
};

export function FeaturedCasesSection({ overview, featuredCases }: Props) {
  // Filter only valid case references
  const validCases = (featuredCases || []).filter((item): item is NonNullable<FeaturedCaseItem> =>
    Boolean(item && item.case && (item.case as any).slug)
  );

  return (
    <section className="w-full bg-gradient-default py-16 lg:py-24 border-t border-fg-section-separator" id="cases-selecionados">
      <div className="mx-auto px-6 w-full max-w-7xl flex flex-col items-center">
        {overview?.title && (
          <h2 className="font-primary text-fg-heading text-size-title font-bold text-center">
            {overview.title}
          </h2>
        )}
        {overview?.lede && (
          <p className="mt-4 text-center text-fg-body max-w-2xl leading-body">
            {overview.lede}
          </p>
        )}

        <div className="mt-12 flex flex-col gap-8 lg:flex-row lg:gap-6 w-full">
          {Array.from({ length: 3 }).map((_, index) => {
            const item = validCases[index];

            if (item && item.case && (item.case as any).slug) {
              const caseData = item.case as any;
              return (
                <article key={`${caseData.slug}-${index}`} className="group flex flex-1 flex-col gap-4">
                  <Link href={`/cases/${caseData.slug}`} className="relative block w-full aspect-4/3 rounded-2xl overflow-hidden bg-surface-inverse shadow-sm" title="Explorar solução">
                    {caseData.thumbnail && (
                      <img
                        src={caseData.thumbnail}
                        alt={caseData.title || ''}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    )}
                  </Link>

                  <div className="flex flex-col gap-1 mt-2">
                    <h3 className="font-primary text-fg-heading text-size-title-sm font-bold leading-title">
                      <Link href={`/cases/${caseData.slug}`} className="hover:underline focus:outline-none">
                        {caseData.title}
                      </Link>
                    </h3>
                    {caseData.context && (
                      <p className="text-fg-body line-clamp-2 leading-body text-size-body-sm">
                        {caseData.context}
                      </p>
                    )}
                  </div>
                </article>
              );
            }

            // Empty State Placeholder
            return (
              <div key={`empty-${index}`} className="flex-1 flex flex-col gap-4">
                <div className="w-full aspect-4/3 rounded-2xl bg-page-subtle border-2 border-dashed border-fg-section-separator flex items-center justify-center opacity-40">
                  <div className="w-12 h-12 rounded-full bg-bg-surface/10 border border-fg-section-separator" />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="h-4 w-3/4 bg-surface-inverse rounded opacity-20" />
                  <div className="h-3 w-1/2 bg-surface-inverse rounded opacity-10" />
                </div>
              </div>
            );
          })}
        </div>

        {overview?.cta?.label && overview?.cta?.link && (
          <div className="mt-12">
            <Button href={overview.cta.link} size="lg">
              {overview.cta.label}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}