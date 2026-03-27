import { client } from "@/tina/__generated__/client";
import NotFoundClient from "./features/not-found-client";

export default async function NotFound() {
  const response = await client.queries.global({ relativePath: "index.json" });
  return <NotFoundClient {...response} />;
}
