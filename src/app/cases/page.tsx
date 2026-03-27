import { client } from "@/tina/__generated__/client";
import CasesPageClient from "../features/cases-page-client";

export default async function Page() {
  const pageResponse = await client.queries.page({ relativePath: "cases.json" });
  const casesResponse = await client.queries.casesConnection({});

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