import { client } from "@/tina/__generated__/client";
import HomePageClient from "./features/home-page-client";

export default async function Page() {
  const [response, cvResponse] = await Promise.all([
    client.queries.page({ relativePath: "home.json" }),
    client.queries.cv({ relativePath: "cv.json" }),
  ]);

  return <HomePageClient {...response} cvData={cvResponse.data.cv} />;
}