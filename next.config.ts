import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // — Desenvolvimento: diagnóstico e controle de HMR —
  ...(isDev && {
    experimental: {
      // Desativa o cache HMR de Server Components. Sem isso, o Next.js
      // pode servir uma versão cacheada do Server Component durante HMR,
      // causando o dado stale que vemos após o save no TinaCMS.
      serverComponentsHmrCache: false,
    },
    logging: {
      fetches: {
        // Loga no terminal cada fetch que ocorre durante HMR refreshes.
        hmrRefreshes: true,
      },
    },
  }),
};

export default nextConfig;

