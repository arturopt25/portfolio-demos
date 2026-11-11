import type { MetadataRoute } from "next";

export type CreateRobotsInput = {
  baseUrl: string;
  disallow?: string[];
  allow?: string[];
};

export function createRobots({
  baseUrl,
  disallow = [],
  allow = ["/"],
}: CreateRobotsInput): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow,
        disallow,
      },
    ],
    sitemap: new URL("/sitemap.xml", baseUrl).toString(),
    host: new URL(baseUrl).origin,
  };
}
