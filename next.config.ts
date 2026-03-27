import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/gstvux.com.br",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
