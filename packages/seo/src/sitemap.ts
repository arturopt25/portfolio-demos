import type { MetadataRoute } from "next";

export type ChangeFrequency =
  "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

export type SitemapEntryInput = {
  path: string;
  lastModified?: Date | string;
  changeFrequency?: ChangeFrequency;
  priority?: number;
  languages?: Record<string, string>;
};

export function createSitemap(
  baseUrl: string,
  entries: SitemapEntryInput[],
): MetadataRoute.Sitemap {
  return entries.map((entry) => ({
    url: new URL(entry.path, baseUrl).toString(),
    lastModified: entry.lastModified,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
    alternates: entry.languages ? { languages: entry.languages } : undefined,
  }));
}
