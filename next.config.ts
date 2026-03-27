import type { NextConfig } from "next";

const isGhPages = process.env.IS_GH_PAGES === "true";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isGhPages ? "/gstvux.com.br" : "",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
