import { client } from "@/tina/__generated__/client";
import HomePageClient from "./features/home-page-client";

export default async function Page() {
  // @note: force cache invalidation for Turbopack
  const response = await client.queries.page(
    { relativePath: "home.json" },
    {
      fetchOptions: {
        next: { revalidate: 0 },
      },
    }
  );

  return <HomePageClient {...response} />;
}