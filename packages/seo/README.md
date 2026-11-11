# @folio/seo

Shared metadata, JSON-LD, sitemap, robots, and URL helpers for the Folio demos.
It has a peer dependency on Next.js (`>=15`).

## Install

It is a private workspace package:

```json
{
  "dependencies": {
    "@folio/seo": "workspace:*"
  }
}
```

## Exports

### Metadata

```ts
createMetadata({
  title: "Page title",
  description: "Page description",
  siteName: "Site name",
  baseUrl: "https://example.com",
  path: "/",
  locale: "en_US",
  image: "/og.png",
  noIndex: false,
  languages: { "en-US": "/en/", "es-ES": "/es/" },
});
```

Returns a Next.js `Metadata` object with `metadataBase`, canonical URL,
Open Graph, Twitter card, `hreflang` alternates, and optional `noindex`.

### JSON-LD

- `organizationJsonLd`
- `websiteJsonLd`
- `breadcrumbJsonLd`
- `faqJsonLd`
- `serviceJsonLd`
- `softwareApplicationJsonLd`

Each returns a plain object that can be rendered with the shared `JsonLd`
component from `@folio/ui`.

### Sitemap and robots

```ts
// app/sitemap.ts
import { createSitemap } from "@folio/seo";

export default function sitemap() {
  return createSitemap("https://example.com", [
    { path: "/", changeFrequency: "weekly", priority: 1 },
    { path: "/privacy/", changeFrequency: "yearly", priority: 0.3 },
  ]);
}
```

```ts
// app/robots.ts
import { createRobots } from "@folio/seo";

export default function robots() {
  return createRobots({ baseUrl: "https://example.com" });
}
```

`createSitemap` accepts per-entry `languages` for `xhtml:link` alternates.
`createRobots` points at `/sitemap.xml` and sets the host.

### URL helpers

- `absoluteUrl({ baseUrl, path })` — joins a path to a base URL.
- `normalizePath(path)` — removes trailing slashes (except for the root `/`).

## Notes

- The package is source-only (`src/index.ts`); consuming apps transpile it via
  `transpilePackages`.
- It does not fetch anything at runtime. Sitemap and robots are generated at
  build time by Next.js metadata routes.
