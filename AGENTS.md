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

| App                    | Brand                  | Status                                   |
| ---------------------- | ---------------------- | ---------------------------------------- |
| `apps/saas-landing`    | **Casefern**           | Fictional B2B SaaS demo                  |
| `apps/corporate-site`  | **Ferrowind Partners** | Fictional industrial demo                |
| `apps/agency-campaign` | **Catalyst Studio**    | Fictional agency demo (Phase 4 complete) |

`Catalyst Studio` is the Phase 4 brand. Keep it isolated to
`apps/agency-campaign`; do not reuse it in other demos.

## Stack and conventions

- **Monorepo:** pnpm workspaces + Turborepo.
- **Apps:** Next.js App Router, `output: "export"`, `distDir: "dist"`,
  `trailingSlash: true`, `images.unoptimized: true`.
- **Packages:** `@folio/config`, `@folio/seo`, `@folio/ui`.
- **Language:** TypeScript strict. Avoid `any`; add a narrow cast only with a comment.
- **Styling:** Tailwind CSS **v3** (pinned), shared preset, CSS-variable design
  tokens in `packages/config/tokens.css`. All three apps ship light and dark
  themes; light is the default and the OS preference is not followed
  automatically.
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

## Lessons from Phase 4 (keep these patterns)

- **Theme allowlist:** `?theme=` is validated against a small `THEMES` array in
  `src/lib/theme.ts`. A synchronous inline script in `<head>` sets or removes
  `data-theme` on `<html>` before first paint, so theme switches are CLS-free.
  Add `suppressHydrationWarning` to `<html>` because the script mutates it before
  hydration. Never write the theme to storage without consent.
- **Build-time default theme:** read `NEXT_PUBLIC_DEFAULT_THEME` in the root
  layout and fall back to a brand config value. The same fallback is embedded in
  the blocking script; invalid env and query values must both land on the default.
- **Attribution is memory-first:** read UTM values from the URL immediately, but
  only write to `sessionStorage` after consent. On a late consent decision,
  re-read the current URL and fall back to the in-memory capture so the campaign
  is not lost. Reduce `gclid`/`fbclid` to booleans and never store their values.
  Sanitize and length-limit every value (120 chars in this demo).
- **Two consent states:** the cookie banner owns analytics/storage consent
  (`catalyst-consent`); the form has its own privacy checkbox. Keep them distinct
  but aware of each other.
- **noindex vs robots.txt:** do not disallow a noindex page in `robots.txt`.
  Crawlers must be able to fetch it to see the meta robots tag. Exclude it from
  the sitemap instead.
- **Shared UI analytics:** `Header` now forwards `cta.analyticsEvent` to
  `data-analytics` on both desktop and mobile CTAs. The change is
  backward-compatible; apps without the property render no attribute.
- **LHCI per theme:** put `/?theme=dark` and `/?theme=bold` in the LHCI `url`
  list. Group reports by `pathname + search` so themes are not merged. Run
  against `staticDistDir`; never the dev server.
- **WSL LHCI temp dir:** on WSL, `chrome-launcher` can try to create the Chrome
  profile in a Windows temp path and fail with `undefined:/Users/...`. A
  **local-only** fix is to prepend a real Windows AppData path to `PATH` and set
  `CHROME_PATH`. Do not commit machine-specific paths or wrapper scripts.
- **Contrast per theme:** compute WCAG ratios for body text, muted text, links,
  badges, primary/secondary buttons, success/danger, and the focus ring in every
  theme. The Phase 4 lowest pair is 4.90:1 (dark theme, primary link on elevated
  surface); normal text must stay ≥ 4.5:1.
- **Nested theme previews:** a swatch that should always show the light palette
  needs an explicit `[data-theme="default"]` token block. A nested element
  without a `data-theme` inherits the page's active theme.

## Lessons from Phase A (keep these patterns)

- **Shared theme script:** `buildThemeScript` in `@folio/ui/theme` validates
  `?theme=` against an allowlist, applies `data-theme`, `color-scheme`, and the
  `theme-color` meta before first paint, and is imported by all three apps.
- **Consent-gated persistence:** a stored theme is only read when the app's
  consent key is already `"granted"`. `ThemeToggle` writes the theme only after
  consent. Keys: `casefern-theme`/`folio-consent`,
  `ferrowind-theme`/`ferrowind-consent`, `catalyst-theme`/`catalyst-consent`.
- **Query-free canonicals:** `?theme=` and `?v=` are runtime/shareable only.
  Canonical and `og:url` must stay query-free; verify in the built HTML.
- **Inline SVG for themed art:** external `<img>` SVGs cannot inherit page CSS
  variables. Inline illustrations and use `var(--color-*)` (see Ferrowind's
  plant illustration).
- **LHCI per theme:** group reports by `pathname + search` so light and dark
  runs are not merged. The shared report script prints CLS per run.

## Lessons from Phase B (keep these patterns)

- **Shared logo lockup:** `BrandMark` in `@folio/ui` renders a themed icon tile
  plus a heavier wordmark. Keep each app's `app/icon.svg` in sync with the header
  mark.
- **Hero media options:** `Hero` accepts `align="start"` and `mediaClassName`.
  Use `hidden lg:block` for decorative media that should not affect mobile LCP.
- **Themed inline SVG:** the tokens are RGB triples, so use
  `rgb(var(--color-*))` in SVG CSS or inline styles. Plain
  `fill="var(--color-*)"` resolves to black.
- **Server-render decorative art:** pass the illustration from the server page
  into the client hero as a `media` prop instead of importing it into the client
  component.
- **Phase B CLS:** the `?v=b` swap remains 0.0123; the illustration is hidden on
  mobile and does not add CLS.

## Lessons from Phase C (keep these patterns)

- **Palette radiogroup:** the hero swatches are `role="radio"` buttons in a
  `radiogroup` with roving tabindex. Arrow keys move and select; Home/End jump;
  Enter/Space select. Each swatch keeps `data-theme` so its colors stay true.
- **URL merge:** use `new URL(...)` plus `searchParams` and
  `history.replaceState` to preserve the hash and UTM/click-id params. Removing
  the `theme` param means the default palette.
- **Pre-hydration active swatch:** drive the active ring from the page theme via
  CSS (`html[data-theme="dark"] [data-swatch="dark"]`) so it is correct before
  hydration.
- **Consent-gated palette persistence:** write `catalyst-theme` only when
  `catalyst-consent === "granted"`; otherwise remove it. Emit the consent-gated
  `theme_select` event.
- **One control:** the old footer theme link-list was removed; the hero
  radiogroup is the single palette control.

## Definition of Done

- [ ] `pnpm lint`, `pnpm typecheck`, and `pnpm build` pass.
- [ ] Lighthouse mobile scores meet the current phase target
      (Phase 2+: **≥95** in all four categories).
- [ ] For themeable demos, LHCI is run per theme and WCAG AA contrast is verified
      in every theme.
- [ ] Keyboard navigable; focus states visible; inactive content hidden from
      assistive tech.
- [ ] No real trademarks or unlicensed assets.
- [ ] App README updated with live-demo URL and metrics.
- [ ] Conventional commit message.
- [ ] No new paid service, server runtime, or API route.
