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

  return (
    <section>
      {featuredCases.map((item) => (
        <article key={item.slug}>
          {item.tag && <p>{item.tag}</p>}
          <h3>{item.title}</h3>
          {item.summary && <p>{item.summary}</p>}
          <Link href={`/cases/${item.slug}`}>Ver case</Link>
        </article>
      ))}
    </section>
  );
}