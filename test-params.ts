import { client } from "./tina/__generated__/client";

async function test() {
  try {
    console.log("Fetching cases...");
    const casesResponse = await client.queries.casesConnection();
    const edges = casesResponse.data?.casesConnection?.edges || [];
    console.log("Found edges:", edges.length);
    const pathSet = new Set<string>();
    edges.forEach((edge) => {
      const filename = edge?.node?._sys?.filename;
      const slug = edge?.node?.slug;
      if (filename) pathSet.add(filename);
      if (slug) pathSet.add(slug);
    });
    console.log("Paths:", Array.from(pathSet));
  } catch (error) {
    console.error("Test failed:", error);
  }
}

test();
