import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  distDir: "dist",
  trailingSlash: true,
  agentRules: false,
  experimental: {
    globalNotFound: true,
  },
  images: {
    unoptimized: true,
  },
  transpilePackages: ["@folio/ui", "@folio/seo", "@folio/config"],
  reactStrictMode: true,
};

export default nextConfig;
