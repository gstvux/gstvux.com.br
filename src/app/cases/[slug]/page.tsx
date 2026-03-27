import { notFound } from "next/navigation";
import { client } from "@/tina/__generated__/client";
import CaseDetailPageClient from "../../features/case-detail-page-client";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const casesResponse = await client.queries.casesConnection();
  const edges = casesResponse.data?.casesConnection?.edges || [];
  
  // We generate paths for both filenames (internal) and slugs (public) 
  // to ensure maximum compatibility and preview functionality.
  const pathSet = new Set<string>();
  edges.forEach((edge) => {
    if (edge?.node?._sys?.filename) pathSet.add(edge.node._sys.filename);
    if (edge?.node?.slug) pathSet.add(edge.node.slug);
  });

  return Array.from(pathSet).map((slug) => ({
    slug,
  }));
}

export default async function Page(props: Props) {
  try {
    const params = await props.params;
    
    if (!params.slug || params.slug === 'undefined') {
      notFound();
    }

    // Hybrid Lookup Strategy:
    // 1. First attempt to find by filename (Standard Tina behavior, preserves SSG and live preview)
    let response;
    try {
      response = await client.queries.cases(
        { relativePath: `${params.slug}.md` },
        { fetchOptions: { next: { revalidate: 0 } } }
      );
    } catch (e) {
      // If filename lookup fails, we fall back to searching by slug field
    }

    // 2. If filename lookup failed (no response.data.cases), search by slug field
    if (!response?.data?.cases) {
      const connection = await client.queries.casesConnection({
        filter: { slug: { eq: params.slug } }
      });
      
      const caseNode = connection.data.casesConnection.edges?.[0]?.node;
      if (!caseNode) {
        notFound();
      }

      response = await client.queries.cases(
        { relativePath: caseNode._sys.relativePath },
        { fetchOptions: { next: { revalidate: 0 } } }
      );
    }

    if (!response?.data?.cases) {
      notFound();
    }

    return <CaseDetailPageClient {...response} />;
  } catch (error) {
    console.error("Error in Case Detail Page:", error);
    notFound();
  }
}


