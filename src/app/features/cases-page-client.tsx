"use client";

import { useTina } from "tinacms/dist/react";
import type {
  CasesConnectionQuery,
  CasesConnectionQueryVariables,
  PageQuery,
  PageQueryVariables,
} from "@/tina/__generated__/types";
import { CasesListSection } from "@/src/components/sections/cases/CasesListSection";

type CasesPageClientProps = {
  pageProps: {
    data: PageQuery;
    variables: PageQueryVariables;
    query: string;
  };
  casesProps: {
    data: CasesConnectionQuery;
    variables: CasesConnectionQueryVariables;
    query: string;
  };
};

export default function CasesPageClient({ pageProps, casesProps }: CasesPageClientProps) {
  // Hook for the page metadata (title, etc)
  const { data: pageData } = useTina({
    query: pageProps.query,
    variables: pageProps.variables,
    data: pageProps.data,
  });

  // Hook for the cases collection
  const { data: casesData } = useTina({
    query: casesProps.query,
    variables: casesProps.variables,
    data: casesProps.data,
  });

  const rawCases = casesData.casesConnection.edges?.map((edge) => edge?.node).filter((c): c is NonNullable<typeof c> => Boolean(c)) || [];

  // Filter only published cases
  const publishedCases = rawCases.filter((c) => c.status === "published");

  // Extract title from the page data (handling template structure)
  const pageTitle = pageData.page.__typename === 'PageCases' 
    ? pageData.page.title 
    : "Projetos onde atuei de ponta a ponta";

  return (
    <main className="flex-1 w-full flex flex-col pt-20">
      <CasesListSection title={pageTitle} cases={publishedCases} />
    </main>
  );
}

