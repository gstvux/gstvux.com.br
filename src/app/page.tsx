import { client } from "@/tina/__generated__/client";
import HomePageClient from "./features/home-page-client";

export default async function Page() {
  const response = await client.queries.page({ relativePath: "home.json" });
  return <HomePageClient {...response} />;
}