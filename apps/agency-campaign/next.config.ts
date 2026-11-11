import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  distDir: "dist",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  transpilePackages: ["@folio/ui", "@folio/seo", "@folio/config"],
  reactStrictMode: true,
};

export default nextConfig;
