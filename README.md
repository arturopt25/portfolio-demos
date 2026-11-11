# Folio Demo Monorepo

Portfolio demos for a freelance white-label web development service. The repo
contains three static landing-page demos that double as the reference
implementations for a reusable "48-hour landing starter kit".

Everything is designed for **$0 hosting**: static Next.js exports deployed to
Cloudflare Pages. There is no server runtime, no API route, and no paid service.

> All brands, names, testimonials, metrics, and pricing are fictional demo
> content. Nothing in this repository represents a real company or commercial
> offer.

## Monorepo structure

```text
apps/
  saas-landing/      Casefern — B2B SaaS landing demo
  corporate-site/    Ferrowind Partners — industrial engineering demo
  agency-campaign/   Catalyst Studio — agency campaign demo
packages/
  config/            Shared TypeScript, ESLint, Prettier, Tailwind preset, tokens
  seo/               Metadata, JSON-LD, sitemap and robots helpers
  ui/                Shared components, form adapter, analytics hooks
```

## Commands

```bash
pnpm install
pnpm dev                 # run all apps in parallel
pnpm lint                # ESLint across all workspaces
pnpm typecheck           # tsc --noEmit across all workspaces
pnpm build               # Turbo build for all apps
pnpm format              # Prettier write
pnpm format:check        # Prettier check

# Per-app build
pnpm --filter @folio/saas-landing build
pnpm --filter @folio/corporate-site build
pnpm --filter @folio/agency-campaign build
```

Node LTS is required (see `.nvmrc`). pnpm is pinned through `packageManager`.

## Deployment

One Cloudflare Pages project per app, connected to this GitHub repository.
Static output only; no server runtime.

| App               | Build command                                                                  | Output directory            |
| ----------------- | ------------------------------------------------------------------------------ | --------------------------- |
| `saas-landing`    | `pnpm install --frozen-lockfile && pnpm --filter @folio/saas-landing build`    | `apps/saas-landing/dist`    |
| `corporate-site`  | `pnpm install --frozen-lockfile && pnpm --filter @folio/corporate-site build`  | `apps/corporate-site/dist`  |
| `agency-campaign` | `pnpm install --frozen-lockfile && pnpm --filter @folio/agency-campaign build` | `apps/agency-campaign/dist` |

All apps use `output: "export"`, `distDir: "dist"`, `trailingSlash: true`, and
`images.unoptimized: true`.

## Demo status

| Demo                   | Brand              | Status   | Notes                                                                |
| ---------------------- | ------------------ | -------- | -------------------------------------------------------------------- |
| `apps/saas-landing`    | Casefern           | **Done** | Hero A/B, pricing, FAQ, lead form, metadata, JSON-LD, OG image       |
| `apps/corporate-site`  | Ferrowind Partners | **Done** | EN/ES routes, MDX content adapter, case studies, sitemap, hreflang   |
| `apps/agency-campaign` | Catalyst Studio    | **Done** | Default/dark/bold themes, UTM + consent, thank-you page, LHCI 99–100 |

## Quality gates

- TypeScript strict
- ESLint + Prettier
- Static production build
- Lighthouse mobile target: **≥95** in all four categories
- Campaign themes checked with LHCI per theme (`?theme=dark`, `?theme=bold`)
- Keyboard-accessible interactions and visible focus states
- Consent-gated analytics with a no-op default
- Mock form adapter by default

## Fictional brands

- **Casefern** — fictional B2B SaaS support product
- **Ferrowind Partners** — fictional industrial engineering and consulting company
- **Catalyst Studio** — fictional creative agency campaign demo

Do not present these demos as real products or imply affiliation with a real
company.
