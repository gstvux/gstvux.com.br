import Link from "next/link";
import type { PageQuery } from "@/tina/__generated__/types";

type FeaturedCaseItem = NonNullable<
  NonNullable<PageQuery["page"]>["featuredCases"]
>[number];

type Props = {
  featuredCases?: NonNullable<FeaturedCaseItem>[];
};

export function FeaturedCasesSection({ featuredCases }: Props) {
  if (!featuredCases?.length) return null;

  const validCases = featuredCases.filter((item): item is NonNullable<FeaturedCaseItem> => Boolean(item));
  if (!validCases.length) return null;

  return (
    <section className="w-full bg-page py-16 lg:py-24">
      <div className="mx-auto px-6 w-full max-w-7xl flex flex-col items-center">
        <h2 className="font-primary text-fg-heading text-size-title font-bold text-center">Cases</h2>
        <p className="mt-4 text-center text-fg-body max-w-2xl leading-body">
          Três cases para demonstrar como eu estruturo decisões e executo UI
          com rigor — de arquitetura de informação a implementação e handoff.
        </p>

        <div className="mt-12 flex flex-col gap-8 lg:flex-row lg:gap-6 w-full">
          {validCases.map((item, index) => (
            <article key={item.slug || `case-${index}`} className="group flex flex-1 flex-col gap-4">
              <Link href={`/cases/${item.slug}`} className="relative block w-full aspect-4/3 rounded-2xl overflow-hidden bg-surface-inverse">
                {item.imageSrc && (
                  <img 
                    src={item.imageSrc} 
                    alt={item.imageAlt || item.title} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                  />
                )}
                {item.tag && (
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-badge text-badge-fg text-size-body-xs font-bold px-3 py-1.5 rounded-full z-10 shadow-sm whitespace-nowrap">
                    {item.tag}
                  </div>
                )}
              </Link>
              
              <div className="flex flex-col gap-1 mt-2">
                <h3 className="font-primary text-fg-heading text-size-title-sm font-bold leading-title">
                  <Link href={`/cases/${item.slug}`} className="hover:underline focus:outline-none">
                    {item.title}
                  </Link>
                </h3>
                {item.summary && (
                  <p className="text-size-body-sm text-fg-body line-clamp-2 leading-body">
                    {item.summary}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12">
          <Link href="/cases" className="inline-flex items-center justify-center bg-cta hover:bg-cta-hover text-cta-fg h-12 px-8 rounded-button font-bold transition-colors">
            Ver Cases
          </Link>
        </div>
      </div>
    </section>
  );
}