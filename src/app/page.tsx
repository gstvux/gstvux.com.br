import { client } from "@/tina/__generated__/client";
import HomePageClient from "./features/home-page-client";

export default async function Page() {
  const isDev = process.env.NODE_ENV === "development";

  // Em desenvolvimento, desativamos o cache para suportar o live editing do Tina 
  // sem o "flicker" de voltar para a versão anterior ao salvar.
  const response = await client.queries.page(
    { relativePath: "home.json" },
    // @ts-ignore - Supõe suporte a fetchOptions ou similar na versão do cliente
    {
      fetchOptions: isDev ? { cache: "no-store" } : undefined,
    }
  );

  return <HomePageClient {...response} />;
}