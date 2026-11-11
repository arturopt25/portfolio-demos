# Ferrowind Partners — corporate site demo

A fictional B2B industrial engineering and consulting site built with the Folio
starter kit. Ferrowind Partners is **not** a real company. Clients, case studies,
metrics, and contact details are invented for portfolio purposes.

## Live demo

- **URL:** `https://ferrowind-demo.pages.dev` (Cloudflare Pages placeholder)
- **Status:** static export, no server runtime, no API routes
- **Stack:** Next.js App Router, TypeScript strict, Tailwind CSS v3, `@folio/ui`,
  `@folio/seo`, `next-mdx-remote/rsc`, `gray-matter`

## Routes

Both locales are generated at build time (`dynamicParams = false`):

- `/en/`, `/es/` — home
- `/en/services/`, `/es/services/` — services
- `/en/case-studies/`, `/es/case-studies/` — case study list
- `/en/case-studies/[slug]/`, `/es/case-studies/[slug]/` — three detail pages per locale
- `/en/contact/`, `/es/contact/` — contact
- `/en/privacy/`, `/es/privacy/` — privacy notice
- `/en/terms/`, `/es/terms/` — terms of use
- `/` — meta-refresh redirect to `/en/` (plus `public/_redirects` for Cloudflare)
- Unknown locale, slug, or path → branded `404.html`

## What this demo shows

- `[locale]` routing with `<html lang>` per locale and a keyboard-friendly
  language switcher that keeps the current route.
- A content adapter (`src/lib/content-adapter.ts`) with
  `getNavigation`, `getPage`, `getCaseStudies`, and `getCaseStudy`. The local
  implementation reads JSON and MDX, so a headless CMS can replace it without
  touching page components.
- English and Spanish dictionaries in `src/messages/`.
- Brand name, tagline, contact details, and base URL centralized in
  `src/content/brand.ts`.
- Metadata per page and locale, canonical + `hreflang` alternates, `sitemap.xml`,
  `robots.txt`, and JSON-LD (`Organization`, `WebSite`, `BreadcrumbList`,
  `Article`, `Service`).
- Locale-specific OG images at `/en/og.png` and `/es/og.png`, generated at build
  time by a static route handler.
- Shared `ContactForm` with the mock submission adapter and an inline success
  state.
- Consent-gated analytics with a no-op default and `data-analytics` click hooks.
- Local SVG illustration with explicit dimensions; self-hosted fonts via
  `next/font`.

## Lighthouse metrics

Mobile Lighthouse CI, static production build, 393×852, 3 runs per URL.
Baseline is the Phase 2 `saas-landing` result (100 / 100 / 100 / 100).

### Home — `/en/`

| Run        | Performance | Accessibility | Best Practices |     SEO |
| ---------- | ----------: | ------------: | -------------: | ------: |
| 1          |         100 |           100 |            100 |     100 |
| 2          |         100 |           100 |            100 |     100 |
| 3          |         100 |           100 |            100 |     100 |
| **Median** |     **100** |       **100** |        **100** | **100** |

Delta vs Phase 2: **0 / 0 / 0 / 0**.

### Case study — `/en/case-studies/foundry-throughput/`

| Run        | Performance | Accessibility | Best Practices |     SEO |
| ---------- | ----------: | ------------: | -------------: | ------: |
| 1          |         100 |           100 |            100 |     100 |
| 2          |         100 |           100 |            100 |     100 |
| 3          |         100 |           100 |            100 |     100 |
| **Median** |     **100** |       **100** |        **100** | **100** |

Delta vs Phase 2: **0 / 0 / 0 / 0**.

All categories meet the **≥95** target. `errors-in-console` was `0` for every
run. An earlier pass on the same page code measured 98 / 98 / 100 for
performance (median 98); LCP varied between 0.9s and 2.3s, which is the only
run-to-run variance observed. The final pass measured 100 in all three runs.

## Reproduce

```bash
pnpm --filter @folio/corporate-site build
npx serve apps/corporate-site/dist -l 3100
```

Then open `http://localhost:3100/`.

Lighthouse CI:

```bash
pnpm --filter @folio/corporate-site build
pnpm --filter @folio/corporate-site lighthouse
pnpm --filter @folio/corporate-site lighthouse:report
```

The config (`apps/corporate-site/.lighthouserc.cjs`) uses `staticDistDir:
"./dist"`, relative URLs (`/en/` and one case study), 3 runs, mobile 393×852,
and `0.95` assertions in all four categories. It never uses the dev server.

> WSL note: `chrome-launcher` can fail with a Windows temp path. Point
> `CHROME_PATH` at a **local** wrapper that rewrites `--user-data-dir` to a Linux
> path. Do not commit that wrapper or any absolute home path.

## Known limitations

- The base URL (`https://ferrowind-demo.pages.dev`) is a placeholder. Update it
  in `src/content/brand.ts` after the Cloudflare Pages project exists. It drives
  canonical URLs, `hreflang`, OG URLs, JSON-LD, `sitemap.xml`, and `robots.txt`.
- A static export cannot emit server redirects. `/` uses a meta-refresh page plus
  `public/_redirects` for Cloudflare. Locally, `serve` returns `200` for `/`
  before the refresh.
- `global-not-found` is an experimental Next.js 16.4 feature. It is enabled in
  `next.config.ts` to give the multi-root-layout app a branded `404.html`.
  Re-check this flag when upgrading Next.js.
- OG images are generated at build time through
  `src/app/(site)/[locale]/og.png/route.tsx`. They are real `.png` files, so
  static hosts infer the content type correctly.
- The contact form uses `mockFormSubmissionHandler`. It logs to the console in
  development and sends nothing. Replace the adapter before using the form for a
  real site.
- Analytics is a consent-gated no-op. No third-party provider is configured.
- Spanish copy was written for the demo and is not a professional translation.
- The content adapter reads local files with `node:fs` at build time. It is not
  edge-runtime compatible by design; swap in a CMS adapter if that changes.

## Manual checks

At 393×852 and 1440×900:

- [ ] `/` redirects to `/en/` (meta refresh and `_redirects`).
- [ ] `/en/` and `/es/` render with the correct `<html lang>` and no horizontal
      overflow.
- [ ] Language switcher keeps the current route (including case study detail)
      and exposes `hrefLang`, `lang`, and `aria-current`.
- [ ] Header nav marks the current section, including case study detail pages.
- [ ] Deep links `/#services`, `/#case-studies`, `/#contact`, and
      `/en/services/#energy-programs` land below the sticky header.
- [ ] Case study cards open the detail page; MDX content and before/after table
      render.
- [ ] Contact form shows validation errors for empty fields and an inline
      success state for a valid submission.
- [ ] `/en/og.png` and `/es/og.png` return `image/png`; metadata contains
      `og:image` and `twitter:image`.
- [ ] Canonical and `hreflang` alternates are present in the HTML source.
- [ ] `/sitemap.xml` contains 18 URLs with `xhtml:link` alternates.
- [ ] `/robots.txt` points to the sitemap.
- [ ] Unknown locale, slug, and path return the branded 404 page.
- [ ] No console errors on valid pages.
- [ ] Ferrowind Partners is clearly presented as a fictional demo.

## Deploy

Cloudflare Pages project settings:

- **Build command:** `pnpm install --frozen-lockfile && pnpm --filter @folio/corporate-site build`
- **Output directory:** `apps/corporate-site/dist`
- **Framework preset:** None / static
