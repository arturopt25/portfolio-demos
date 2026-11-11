# AGENTS.md — Folio Demo Monorepo

This file is the primary instruction set for AI agents working in this repository.
`next dev` agent-rule generation is disabled in every app (`agentRules: false`).

## Project context

- Freelance web-dev portfolio monorepo with three static Next.js demos.
- Long-term goal: extract `@folio/ui`, `@folio/config`, and `@folio/seo` into a
  "48-hour landing starter kit".
- Budget is **$0**: every app deploys as a static site on Cloudflare Pages.
- No server runtime, no API routes, no paid services.
- All demo brands and content are fictional. Do not use real trademarks.

Current demo brands:

| App                    | Brand                  | Status                    |
| ---------------------- | ---------------------- | ------------------------- |
| `apps/saas-landing`    | **Casefern**           | Fictional B2B SaaS demo   |
| `apps/corporate-site`  | **Ferrowind Partners** | Fictional industrial demo |
| `apps/agency-campaign` | **Catalyst Studio**    | Fictional agency demo     |

`Catalyst Studio` is a provisional name reserved for Phase 4 only. Do not use it
in Phase 3 work.

## Stack and conventions

- **Monorepo:** pnpm workspaces + Turborepo.
- **Apps:** Next.js App Router, `output: "export"`, `distDir: "dist"`,
  `trailingSlash: true`, `images.unoptimized: true`.
- **Packages:** `@folio/config`, `@folio/seo`, `@folio/ui`.
- **Language:** TypeScript strict. Avoid `any`; add a narrow cast only with a comment.
- **Styling:** Tailwind CSS **v3** (pinned), shared preset, CSS-variable design
  tokens in `packages/config/tokens.css`. Light mode is active; dark tokens exist
  but are not activated.
- **Components:** functional, named exports, semantic HTML, visible focus states.
- **Forms:** use the shared `ContactForm` and form-submission adapter. The default
  adapter is a mock; real endpoints must be isolated inside the adapter.
- **Analytics:** use `trackEvent` from `@folio/ui`; the default provider is a
  no-op and every event is consent-gated.
- **Images:** locally generated SVG/WebP only. Always set explicit dimensions.
- **Fonts:** self-hosted via `next/font`; no third-party render-blocking scripts.
- **i18n:** only `apps/corporate-site` uses a `[locale]` segment. SaaS and agency
  are English-only unless explicitly requested.
- **Commits:** Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`).

## Next.js version note

This repo uses **Next.js 16**. APIs and conventions may differ from older training
data. Before changing Next.js behavior, read the version-matched docs in
`node_modules/next/dist/docs/` (resolved from this repo's `node_modules`).

## Commands

```bash
pnpm install
pnpm dev                 # all apps in parallel
pnpm build               # turbo build all apps
pnpm lint                # eslint all workspaces
pnpm lint:fix            # eslint --fix
pnpm typecheck           # tsc --noEmit all workspaces
pnpm format              # prettier --write
pnpm format:check        # prettier --check

pnpm --filter @folio/saas-landing build
pnpm --filter @folio/saas-landing start   # serve dist locally
```

Node LTS is required (see `.nvmrc`). pnpm is pinned through `packageManager`.

## Shared UI change protocol

When changing anything in `packages/ui`:

1. List the shared change explicitly in the final report.
2. Run `pnpm build` for **all three apps**:
   - `@folio/saas-landing`
   - `@folio/corporate-site`
   - `@folio/agency-campaign`
3. Confirm no app shell regressed.

## Lessons from Phase 2 (keep these patterns)

- **Anchor wrapper:** `Section` and `Hero` render an inner
  `<span id={id} class="block h-0 scroll-mt-[4.5rem]" aria-hidden="true" />`
  instead of putting `id`/`scroll-mt` on the `<section>`. This avoids stacked
  offsets and lands section headings ~80–100px below the sticky header. Use the
  same pattern for any new anchor target.
- **Analytics:** pass `analyticsEvent` on `CtaLink`; shared CTAs render it as
  `data-analytics`. The app-level `AnalyticsBridge` listens for clicks and calls
  consent-gated `trackEvent`. Do not wire analytics functions into server
  components.
- **Lighthouse:** run LHCI against the **static build** (`staticDistDir`), never
  the dev server. Mobile 393×852, 3 runs, assertions at `0.95`. Report all four
  categories per run plus the median.
- **WSL Chrome path:** `chrome-launcher` can fail on WSL with a Windows temp
  path. The `CHROME_PATH` wrapper is a **local-only** workaround. Never commit
  machine-specific paths, wrapper scripts, or absolute home directories.
- **Public repo hygiene:** run a secret/absolute-path scan before every commit.
  Keep placeholder URLs centralized in one brand/config file.

## Definition of Done

- [ ] `pnpm lint`, `pnpm typecheck`, and `pnpm build` pass.
- [ ] Lighthouse mobile scores meet the current phase target
      (Phase 2+: **≥95** in all four categories).
- [ ] Keyboard navigable; focus states visible; inactive content hidden from
      assistive tech.
- [ ] No real trademarks or unlicensed assets.
- [ ] App README updated with live-demo URL and metrics.
- [ ] Conventional commit message.
- [ ] No new paid service, server runtime, or API route.
