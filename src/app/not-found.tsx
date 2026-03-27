import { client } from "@/tina/__generated__/client";
import NotFoundClient from "./features/not-found-client";

export default async function NotFound() {
  const isDev = process.env.NODE_ENV === "development";

  // Buscamos os dados globais que contêm a configuração da página 404
  const response = await client.queries.global(
    { relativePath: "index.json" },
    // @ts-ignore
    { fetchOptions: isDev ? { cache: "no-store" } : undefined }
  );

  return <NotFoundClient {...response} />;
}
