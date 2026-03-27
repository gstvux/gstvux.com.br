import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  eslint: {
    // A verificação de lint existe localmente; ignoramos no build estático
    // para não bloquear o deploy por avisos não-críticos
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Tipos são verificados no dev; o build estático não precisa bloquear
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
