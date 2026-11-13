# Ferrowind Partners — corporate site demo

A fictional B2B industrial engineering and consulting site built with the Folio
starter kit. Ferrowind Partners is **not** a real company. Clients, case studies,
metrics, and contact details are invented for portfolio purposes.

## Live demo

- **URL:** `https://ferrowind-demo.pages.dev` (pending deploy)
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

## Themes

Light is the default. `?theme=dark` is shareable and applies before first paint.
The header toggle changes the theme immediately, updates the URL with
`history.replaceState`, and writes the choice to `localStorage`
(`ferrowind-theme`) only after the cookie banner has granted consent
(`ferrowind-consent`). Before consent, the theme is never persisted; it lives
only in the URL.

`color-scheme` and the `theme-color` meta tag follow the active theme. Canonical
and `og:url` never include `?theme=`. The hero illustration is inline SVG and
uses the shared color tokens, so it adapts to both palettes.

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

## Localization (EN/ES)

Visible copy lives in `src/messages/{en,es}.json`,
`src/content/pages/{en,es}/*.json`, `src/content/services/{en,es}.json`, and
`src/content/case-studies/{en,es}/*.mdx`.

- Metrics store a number plus a format (`percent`, `number`, `text`) and render
  through `src/lib/format.ts` with `Intl.NumberFormat`. Spanish uses comma
  decimals, a space before `%`, a thousands point, and U+2212 for negatives
  (`8,4 %`, `−11 %`); English keeps `8.4%` and `-11%`.
- Spanish terminology uses “Casos de éxito” and “Reservar una llamada”. Routes
  remain `/case-studies/` and `/contact/`.
- Footer columns are **Empresa / Legal / Oficina** in Spanish and
  **Company / Legal / Office** in English. The Spanish address uses
  “Oficina 400”.
- Form labels and validation messages are localized through the shared
  `ContactForm`, `ContactFormLabels.validation`, and
  `createContactFormSchema`.
- The global 404 and the root redirect are bilingual because they sit outside
  the `[locale]` segment.
- `scripts/check-i18n.mjs` runs before `tsc` in `typecheck` and fails on en/es
  dictionary or content key mismatches.

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

### Phase A theme verification

Static build, mobile 393×852, 3 runs per URL, medians:

| URL                                               | Performance | Accessibility | Best Practices | SEO | CLS |
| ------------------------------------------------- | ----------: | ------------: | -------------: | --: | --- |
| `/en/`                                            |         100 |           100 |            100 | 100 | 0   |
| `/en/?theme=dark`                                 |         100 |           100 |            100 | 100 | 0   |
| `/es/`                                            |         100 |           100 |            100 | 100 | 0   |
| `/es/?theme=dark`                                 |          99 |           100 |            100 | 100 | 0   |
| `/en/case-studies/foundry-throughput/`            |         100 |           100 |            100 | 100 | 0   |
| `/en/case-studies/foundry-throughput/?theme=dark` |         100 |           100 |            100 | 100 | 0   |

The `/es/?theme=dark` performance median is 99 because TBT measured 92–105 ms
across the three runs; FCP/LCP and CLS are identical to the light page. All
categories remain above the 95 target.

### Phase D i18n verification

Static build, mobile 393×852, 3 runs per URL, medians:

| URL                                               | Performance | Accessibility | Best Practices | SEO | CLS |
| ------------------------------------------------- | ----------: | ------------: | -------------: | --: | --- |
| `/en/`                                            |         100 |           100 |            100 | 100 | 0   |
| `/en/?theme=dark`                                 |         100 |           100 |            100 | 100 | 0   |
| `/es/`                                            |          99 |           100 |            100 | 100 | 0   |
| `/es/?theme=dark`                                 |         100 |           100 |            100 | 100 | 0   |
| `/en/case-studies/foundry-throughput/`            |         100 |           100 |            100 | 100 | 0   |
| `/en/case-studies/foundry-throughput/?theme=dark` |         100 |           100 |            100 | 100 | 0   |

`/es/` measured 99 on runs 1 and 3 (TBT variance); FCP/LCP and CLS are unchanged.
All categories remain above the 95 target.

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
"./dist"`, relative URLs for `/en/`, `/es/`, and the foundry case study in light
and dark, 3 runs, mobile 393×852, and `0.95` assertions in all four categories.
It never uses the dev server.

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
- Theme persistence is consent-gated. Without consent, `?theme=dark` is
  shareable but is not remembered across navigation or reloads.
- The OS color-scheme preference is intentionally ignored; light is always the
  default until the visitor chooses dark.
- The hero illustration is inline SVG rather than an external image so it can
  inherit theme tokens. It is decorative and hidden from assistive technology.
- The content adapter reads local files with `node:fs` at build time. It is not
  edge-runtime compatible by design; swap in a CMS adapter if that changes.
- Metric values are data-driven: each `before`/`after` needs a `format` plus a
  numeric `value` or a `text` fallback. The formatter is the single source of
  percent, decimal, thousands, and sign formatting.
- The en/es parity check compares key structures in dictionaries, page JSON,
  services JSON, and MDX frontmatter. It does not compare translated values.
- The global 404 and root redirect are bilingual because they sit outside the
  `[locale]` segment and cannot know the visitor's locale.

## Manual checks

At 393×852 and 1440×900:

- [ ] `/` redirects to `/en/` (meta refresh and `_redirects`).
- [ ] `/en/` and `/es/` render with the correct `<html lang>` and no horizontal
      overflow.
- [ ] `/es/` uses “Casos de éxito”, “Reservar una llamada”, “Empresa / Legal /
      Oficina”, and “Oficina 400”.
- [ ] Spanish percentages use comma decimals and a space before `%`; negative
      values use `−`.
- [ ] English case study metrics still read `61%`, `8.4%`, `9,400 t/yr`,
      `2.6 years`, `-11%`, and `+38%`.
- [ ] Language switcher keeps the current route (including case study detail)
      and exposes `hrefLang`, `lang`, and `aria-current`; the current language
      link is labelled with its language name, not “Switch language to …”.
- [ ] Header nav marks the current section, including case study detail pages.
- [ ] Deep links `/#services`, `/#case-studies`, `/#contact`, and
      `/en/services/#energy-programs` land below the sticky header.
- [ ] Case study cards open the detail page; MDX content and before/after table
      render.
- [ ] Contact form shows validation errors for empty fields and an inline
      success state for a valid submission, in the page language.
- [ ] Testimonial avatars are decorative; a screen reader reads the name only.
- [ ] The global 404 and root redirect show both English and Spanish.
- [ ] `pnpm typecheck` prints `[i18n] en/es dictionary and content key parity
OK`.
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

- **Project name:** `ferrowind-demo`
- **Build command:** `pnpm install --frozen-lockfile && pnpm --filter @folio/corporate-site build`
- **Output directory:** `apps/corporate-site/dist`
- **Framework preset:** None / static
- **Environment variables:** `NODE_VERSION=24.15.0`, `PNPM_VERSION=11.5.1`

See [`docs/DEPLOY.md`](../../docs/DEPLOY.md) for the full walkthrough and
post-deploy checklist.
