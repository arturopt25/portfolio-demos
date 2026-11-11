import type { MetadataRoute } from "next";

import { createRobots } from "@folio/seo";

import { brand } from "@/content/brand";

export const dynamic = "force-static";

/**
 * /thank-you/ is deliberately NOT disallowed here. A robots.txt block would
 * stop crawlers from fetching the page, which means they could never see its
 * noindex metadata. The page sets robots: { index: false, follow: false } and
 * is excluded from the sitemap instead.
 */
export default function robots(): MetadataRoute.Robots {
  return createRobots({ baseUrl: brand.baseUrl });
}
