import type { MetadataRoute } from "next";

import { createRobots } from "@folio/seo";

import { brand } from "@/content/brand";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return createRobots({ baseUrl: brand.baseUrl });
}
