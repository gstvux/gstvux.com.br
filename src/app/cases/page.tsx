import { client } from "@/tina/__generated__/client";
import CasesPageClient from "../features/cases-page-client";

export default async function Page() {
  const isDev = process.env.NODE_ENV === "development";

  // Fetch the Cases page metadata (title, SEO, etc)
  const pageResponse = await client.queries.page(
    { relativePath: "cases.json" },
    // @ts-ignore
    {
      fetchOptions: isDev ? { cache: "no-store" } : undefined,
    }
  );

  // Fetch the actual cases collection
  const casesResponse = await client.queries.casesConnection(
    {},
    // @ts-ignore
    {
      fetchOptions: isDev ? { cache: "no-store" } : undefined,
    }
  );

  return (
    <CasesPageClient 
      pageProps={{
        data: pageResponse.data,
        variables: pageResponse.variables,
        query: pageResponse.query,
      }}
      casesProps={{
        data: casesResponse.data,
        variables: casesResponse.variables,
        query: casesResponse.query,
      }}
    />
  );
}