# Casefern — SaaS landing demo

A fictional B2B SaaS landing page built with the Folio starter kit. Casefern is
not a real product; all names, pricing, and claims are demo content.

## Live demo

- **URL:** `https://casefern-demo.pages.dev` (pending deploy)
- **Status:** static export, no server runtime
- **Stack:** Next.js App Router, TypeScript, Tailwind CSS v3, `@folio/ui`

## What this demo shows

- Hero A/B copy via `?v=a` / `?v=b`
- Light and dark themes with a keyboard-accessible header toggle
- Original fern logo lockup in the header and footer
- Decorative support-inbox hero illustration (static inline SVG)
- Social proof, features, monthly/annual pricing, FAQ, and lead form
- Shared `@folio/ui` components and design tokens
- Consent-gated analytics with a no-op default
- Mock form-submission adapter with an inline success state
- Metadata, `SoftwareApplication` + `FAQPage` JSON-LD, and a generated OG image
- Static pages for `/privacy/` and `/terms/`

## Themes

Light is the default. `?theme=dark` is shareable and applies before first paint.
The header toggle changes the theme immediately, updates the URL with
`history.replaceState`, and writes the choice to `localStorage` (`casefern-theme`)
only after the cookie banner has granted consent (`folio-consent`). Before
consent, the theme is never persisted; it lives only in the URL.

`color-scheme` and the `theme-color` meta tag follow the active theme. Canonical
and `og:url` never include `?theme=` or `?v=`.

## Brand and hero illustration

The header and footer use a shared logo lockup: an original fern/leaf mark in a
themed primary tile next to a heavier "Casefern" wordmark. The mark uses
`--color-primary` and `--color-primary-soft`, so it adapts to light and dark.
`app/icon.svg` is the same mark at 64×64.

The hero illustration is a static, decorative inline SVG of a support inbox:
three conversation rows with status pills, a ticket-flow arrow, a three-step
pipeline, a response metric card, and a small status chip. It is server-rendered,
has no scripts or animation, and makes no network requests. It is hidden below
`lg` so the mobile LCP stays text-based; on desktop it sits in the right column
with `align="start"` so the `?v=a|b` headline swap does not move it.

## Lighthouse metrics

Mobile Lighthouse, static production build, 393×852, 3 runs.

| Category       | Baseline (Phase 1 shell) | Phase 2 run 1 | Run 2 | Run 3 |  Median | Delta |
| -------------- | -----------------------: | ------------: | ----: | ----: | ------: | ----: |
| Performance    |                       99 |           100 |   100 |   100 | **100** |    +1 |
| Accessibility  |                      100 |           100 |   100 |   100 | **100** |     0 |
| Best Practices |                       96 |           100 |   100 |   100 | **100** |    +4 |
| SEO            |                      100 |           100 |   100 |   100 | **100** |     0 |

Target: **≥95** in every category. All categories meet the target.

### Phase A theme verification

Static build, mobile 393×852, 3 runs per URL, medians:

| URL                | Performance | Accessibility | Best Practices | SEO | CLS    |
| ------------------ | ----------: | ------------: | -------------: | --: | ------ |
| `/`                |         100 |           100 |            100 | 100 | 0      |
| `/?theme=dark`     |         100 |           100 |            100 | 100 | 0      |
| `/?v=b`            |         100 |           100 |            100 | 100 | 0.0123 |
| `/?v=b&theme=dark` |         100 |           100 |            100 | 100 | 0.0123 |

The `?v=b` CLS comes from the existing client-side headline swap, not the theme
toggle. It is unchanged from the previous baseline (0.012 at three decimals).

### Phase B verification

Static build, mobile 393×852, 3 runs per URL, medians:

| URL                | Performance | Accessibility | Best Practices | SEO | CLS    |
| ------------------ | ----------: | ------------: | -------------: | --: | ------ |
| `/`                |         100 |           100 |            100 | 100 | 0      |
| `/?theme=dark`     |          99 |           100 |            100 | 100 | 0      |
| `/?v=b`            |          99 |           100 |            100 | 100 | 0.0123 |
| `/?v=b&theme=dark` |         100 |           100 |            100 | 100 | 0.0123 |

The 99 runs had TBT 98–114 ms; FCP/LCP (~760 ms) and CLS are unchanged from
Phase A. All categories remain above the 95 target. The illustration is
`display:none` below `lg`, so it is not painted in the mobile run.

## Reproduce manually

```bash
pnpm --filter @folio/saas-landing build
npx serve apps/saas-landing/dist -l 3000
```

Then either:

1. Open `http://localhost:3000` in an incognito Chrome window, open DevTools →
   Lighthouse → **Mobile** → Analyze page reload.
2. Or run:

```bash
npx lighthouse http://localhost:3000 --view
```

## Lighthouse CI

```bash
pnpm --filter @folio/saas-landing build
pnpm --filter @folio/saas-landing lighthouse
pnpm --filter @folio/saas-landing lighthouse:report
```

The config is `apps/saas-landing/.lighthouserc.cjs`:

- `staticDistDir: "./dist"`
- `url: ["/", "/?theme=dark", "/?v=b", "/?v=b&theme=dark"]` (relative; no
  hardcoded localhost URL)
- 3 runs
- Mobile emulation at 393×852
- Assertions at `0.95` for all four categories

On WSL, `chrome-launcher` may fail with an invalid Windows temp path. In that
case, point `CHROME_PATH` to a wrapper that rewrites `--user-data-dir` to a Linux
path, or run Lighthouse manually with `--port` against a Chrome started with
`--remote-debugging-port=9222`.

## Known limitations

- The `?v=b` hero variant is applied client-side after hydration. A static
  export cannot read the query string at build time, so the server fallback uses
  variant A and the client swaps in variant B. Measured CLS impact: 0.0123
  (0.012 at three decimals). The themed hero illustration does not add CLS.
- The hero illustration is hidden below `lg` to protect the mobile LCP. Desktop
  visitors get the full illustration; mobile visitors get the text-first hero.
- The `og:image` and canonical base URL currently use
  `https://casefern-demo.pages.dev` as a placeholder. Update them to the final
  Cloudflare Pages URL after deployment.
- `robots.txt` and `sitemap.xml` are not implemented in this demo. Add Next.js
  metadata routes if the demo is attached to a real domain.
- Theme persistence is consent-gated. Without consent, the theme is shareable
  through `?theme=` but is not remembered across navigation or reloads.
- The OS color-scheme preference is intentionally ignored; light is always the
  default until the visitor chooses dark.

## Manual checks

- `/` renders Casefern as a fictional demo brand.
- `/?v=b` swaps the hero headline; the inactive headline is not rendered.
- Pricing toggles between monthly and annual prices.
- FAQ items open and close natively.
- Form shows validation errors for empty fields and an inline success state after
  a valid submission.
- `/privacy/` and `/terms/` are reachable and marked as demo pages.
- Deep links `/#pricing`, `/#faq`, and `/#contact` land below the sticky header.
- `/favicon.ico` and `/icon.svg` return 200.
- No console errors.

## Deploy

Cloudflare Pages project settings:

- **Project name:** `casefern-demo`
- **Build command:** `pnpm install --frozen-lockfile && pnpm --filter @folio/saas-landing build`
- **Output directory:** `apps/saas-landing/dist`
- **Framework preset:** None / static
- **Environment variables:** `NODE_VERSION=24.15.0`, `PNPM_VERSION=11.5.1`

See [`docs/DEPLOY.md`](../../docs/DEPLOY.md) for the full walkthrough and
post-deploy checklist.
