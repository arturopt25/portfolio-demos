import type { MetadataRoute } from "next";

import { createSitemap, type SitemapEntryInput } from "@folio/seo";

import { brand } from "@/content/brand";

export const dynamic = "force-static";

/**
 * The landing page and the two legal pages are indexable.
 * /thank-you/ is intentionally absent: it is a noindex conversion page.
 */
const entries: SitemapEntryInput[] = [
  { path: "/", changeFrequency: "monthly", priority: 1 },
  { path: "/privacy/", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms/", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return createSitemap(brand.baseUrl, entries);
}
