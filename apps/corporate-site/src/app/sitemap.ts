import type { MetadataRoute } from "next";

import { createSitemap, type SitemapEntryInput } from "@folio/seo";

import { brand } from "@/content/brand";
import { contentAdapter } from "@/lib/content-adapter";
import { languageAlternates, localizePath, locales } from "@/lib/i18n";

export const dynamic = "force-static";

const staticPages = [
  { path: "/", changeFrequency: "monthly", priority: 1 },
  { path: "/services", changeFrequency: "monthly", priority: 0.9 },
  { path: "/case-studies", changeFrequency: "monthly", priority: 0.9 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.7 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: SitemapEntryInput[] = [];

  for (const page of staticPages) {
    for (const locale of locales) {
      entries.push({
        path: localizePath(locale, page.path),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        languages: languageAlternates(brand.baseUrl, page.path),
      });
    }
  }

  for (const locale of locales) {
    const studies = await contentAdapter.getCaseStudies(locale);

    for (const study of studies) {
      const path = `/case-studies/${study.slug}`;

      entries.push({
        path: localizePath(locale, path),
        lastModified: study.publishedAt,
        changeFrequency: "yearly",
        priority: 0.6,
        languages: languageAlternates(brand.baseUrl, path),
      });
    }
  }

  return createSitemap(brand.baseUrl, entries);
}
