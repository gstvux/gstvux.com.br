import Link from "next/link";
import type { HomePageData } from "@/lib/content/types";

type Props = {
  featuredCases?: HomePageData["featuredCases"];
};

export function FeaturedCasesSection({ featuredCases }: Props) {
  if (!featuredCases?.length) return null;

  return (
    <section>
      {featuredCases.map((item) => (
        <article key={item.slug}>
          {item.tag && <p>{item.tag}</p>}
          <h3>{item.title}</h3>
          <p>{item.summary}</p>
          <Link href={`/cases/${item.slug}`}>Ver case</Link>
        </article>
      ))}
    </section>
  );
}