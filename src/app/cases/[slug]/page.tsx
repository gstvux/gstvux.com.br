import { client } from "@/tina/__generated__/client";
import CaseDetailPageClient from "@/src/app/features/case-detail-page-client";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  try {
    const casesResponse = await client.queries.casesConnection();
    const edges = casesResponse.data?.casesConnection?.edges || [];
    
    const pathSet = new Set<string>();
    edges.forEach((edge) => {
      const filename = edge?.node?._sys?.filename;
      const slug = edge?.node?.slug;
      if (filename) pathSet.add(filename);
      if (slug) pathSet.add(slug);
    });

    return Array.from(pathSet).map((slug) => ({
      slug,
    }));
  } catch (error) {
    console.error("Error in generateStaticParams for /cases/[slug]:", error);
    return [];
  }
}

export default async function Page(props: Props) {
  const params = await props.params;
  const isDev = process.env.NODE_ENV === "development";
  
  if (!params.slug || params.slug === 'undefined') {
    notFound();
  }

  try {
    let response;
    
    // 1. Tentar carregar pelo filename direto (mais rápido e padrão do Tina)
    try {
      response = await client.queries.cases(
        { relativePath: `${params.slug}.md` },
        // @ts-ignore
        { fetchOptions: isDev ? { cache: "no-store" } : undefined }
      );
    } catch (e) {
      // 2. Se falhar, buscar pelo campo 'slug' no frontmatter
      const casesConnection = await client.queries.casesConnection(
        { filter: { slug: { eq: params.slug } } },
        // @ts-ignore
        { fetchOptions: isDev ? { cache: "no-store" } : undefined }
      );
      
      const edge = casesConnection.data.casesConnection.edges?.[0];
      if (!edge || !edge.node?._sys?.relativePath) {
        throw new Error("Case not found");
      }
      
      response = await client.queries.cases(
        { relativePath: edge.node._sys.relativePath },
        // @ts-ignore
        { fetchOptions: isDev ? { cache: "no-store" } : undefined }
      );
    }

    if (!response) {
      notFound();
    }

    return <CaseDetailPageClient {...response} />;
  } catch (e) {
    console.error(`Error rendering case ${params.slug}:`, e);
    return notFound();
  }
}
