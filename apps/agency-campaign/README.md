# Catalyst Studio — agency campaign demo

A single-goal, paid-campaign landing page for a **fictional** creative agency.
It is a static Next.js export built to demonstrate fast, themeable campaign
pages: one page, three CSS-variable themes, UTM capture, a consent-gated lead
form, and a noindex thank-you page.

> Catalyst Studio is a fictional demo brand. Names, quotes, metrics, and pricing
> are invented for a portfolio demonstration. No real company, client, campaign,
> testimonial, or trademark is represented.

- **Planned demo URL:** <https://catalyst-studio-demo.pages.dev>
- **Stack:** Next.js 16 App Router, static export, Tailwind CSS v3, shared
  `@folio/ui`, `@folio/seo`, and `@folio/config` packages.
- **Runtime:** none. No API routes, no server, no paid service. Deploy the
  static `dist/` output to Cloudflare Pages.

## Commands

```bash
pnpm install
pnpm --filter @folio/agency-campaign dev
pnpm --filter @folio/agency-campaign build
pnpm --filter @folio/agency-campaign start        # serve dist on :3200

pnpm --filter @folio/agency-campaign lighthouse   # LHCI against dist/, 3 themes
pnpm --filter @folio/agency-campaign lighthouse:report

pnpm format:check
pnpm lint
pnpm typecheck
pnpm build                                        # all apps
```

The Lighthouse suite runs against the **static build** (`staticDistDir`), never
the dev server, at 393×852 with 3 runs per URL and a 0.95 minimum score.

## Page map

| Route         | Purpose                                                            | Indexable                |
| ------------- | ------------------------------------------------------------------ | ------------------------ |
| `/`           | Campaign landing: hero, proof, benefits, process, offer, FAQ, form | Yes                      |
| `/thank-you/` | Confirmation, conversion event, no personal data in URL            | No (`noindex, nofollow`) |
| `/privacy/`   | Demo privacy notice                                                | Yes                      |
| `/terms/`     | Demo terms of use                                                  | Yes                      |
| `*`           | Static 404 page                                                    | No                       |

## Theming

The page is driven entirely by CSS variables in
`packages/config/tokens.css` (light + dark) and `src/app/globals.css` (default +
bold). Components never fork by theme; only tokens change.

Three themes ship:

| Theme     | How to select                   | Notes                                 |
| --------- | ------------------------------- | ------------------------------------- |
| `default` | no attribute / `?theme=default` | Light palette from shared tokens      |
| `dark`    | `?theme=dark`                   | Shared dark tokens                    |
| `bold`    | `?theme=bold`                   | Yellow-on-near-black campaign palette |

### How the runtime switch works

`src/lib/theme.ts` owns the allowlist (`THEMES`) and builds a tiny inline script
that `src/app/layout.tsx` renders in `<head>`. The script runs before first paint:

1. reads `?theme=` from the URL,
2. keeps it only if it is `default`, `dark`, or `bold`,
3. sets or removes `data-theme` on `<html>`, and
4. otherwise falls back to the build-time default.

It never reads or writes localStorage or cookies. Browser verification with the
static build measured **0.0000 CLS** for default, dark, and bold.

The build-time default is `brand.defaultTheme` (`"default"`). Override it without
touching code:

```bash
NEXT_PUBLIC_DEFAULT_THEME=dark pnpm --filter @folio/agency-campaign build
```

Invalid values fall back to the brand default.

### Add a new theme in minutes

1. Add the key to `THEMES` in `src/lib/theme.ts` (for example `"sunset"`). The
   blocking script validates against this list automatically.
2. Add a `[data-theme="sunset"]` block in `src/app/globals.css` with the same
   token names (`--color-bg`, `--color-fg`, `--color-primary`,
   `--color-primary-fg`, `--color-primary-soft`, `--color-ring`, etc.).
   Keep layout tokens (spacing, radii) unchanged.
3. Add a preview link to `themePreviewLinks` in `src/content/campaign.tsx` if you
   want it in the footer demo control.
4. Check contrast for text, links, buttons, badges, and the focus ring. The
   lowest dark-theme pair is `primary` on `elevated` at **4.90:1**; keep every
   pair at **≥ 4.5:1** for normal text (≥ 3:1 for non-text focus indicators).
5. Run `pnpm --filter @folio/agency-campaign build`, then add
   `/?theme=sunset` to `.lighthouserc.cjs` and rerun Lighthouse.

### Add a campaign

The demo is intentionally content-driven:

1. Change `src/content/brand.ts` for the agency name, tagline, contact data, and
   build-time default theme. This is the single rename point.
2. Replace the copy in `src/content/campaign.tsx`: hero, stats, testimonials,
   benefits, process, offer, FAQ, form labels, footer links. `sectionIds` keeps
   anchors and navigation in sync.
3. Update the legal pages under `src/app/privacy/` and `src/app/terms/` if the
   campaign changes what the demo stores.
4. If the campaign needs a new route, add `src/app/<slug>/page.tsx`, add it to
   `src/app/sitemap.ts`, and reuse the shared `ContactForm` + adapter.
5. Keep the thank-you page noindexed and out of the sitemap.
6. Re-run Lighthouse for each theme and re-check contrast ratios.

## UTM capture and consent

`src/lib/attribution.ts` implements the capture rules:

- Reads `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, and `utm_content`.
- Trims, strips control/markup characters, collapses whitespace, and limits each
  value to **120 characters**.
- Records only the **presence** of `gclid` and `fbclid` as booleans. Their values
  are never stored or sent.
- Holds the values **in memory** as soon as the page loads. Reading the URL is
  not storage, so it does not require consent.
- Writes to `sessionStorage` (`catalyst-attribution`) **only after consent**.
- If consent is granted after landing, the current URL is read again and the
  in-memory value is used as a fallback, so a late decision does not lose the
  campaign. Rejecting clears the stored attribution.
- Attaches UTM values to the form's hidden fields and to the consent-gated
  events (`cta_click`, `form_start`, `form_submit`, `thank_you_view`).

Consent is stored separately in `localStorage` under `catalyst-consent` by the
shared cookie banner. The page never persists the selected theme.

## Lead form and thank-you page

- Reuses the shared `ContactForm` and `mockFormSubmissionHandler`.
- Validates name, email, company (optional), message, and the consent checkbox.
- Shows the shared success state for ~900 ms, then navigates client-side to
  `/thank-you/` with `router.push`. The URL contains no form values and no UTM
  parameters.
- `/thank-you/` sets `robots: { index: false, follow: false }` via
  `createMetadata({ noIndex: true })`, is excluded from `sitemap.xml`, and is
  **not** disallowed in `robots.txt`. Blocking it in robots.txt would prevent
  crawlers from fetching the page and seeing the noindex directive, so the demo
  uses the meta robots tag instead.

## Accessibility and contrast

- One `h1` per page, semantic sectioning, a skip link, visible focus rings, and
  keyboard-operable navigation, pricing-free offer card, FAQ disclosures, and
  form.
- `prefers-reduced-motion` disables smooth scrolling and collapses animations and
  transitions.
- All text/background pairs were measured with the WCAG relative-luminance
  formula. The lowest pair across all three themes is **4.90:1** (dark theme:
  primary link on elevated surface), above the 4.5:1 AA threshold for normal
  text.

| Pair (foreground / background)                    | Default | Dark  | Bold  |
| ------------------------------------------------- | ------- | ----- | ----- |
| Body text `fg / bg`                               | 17.85   | 18.41 | 19.64 |
| Muted text `muted / bg`                           | 7.58    | 7.87  | 11.71 |
| Link `primary / bg`                               | 7.90    | 6.76  | 13.72 |
| Link `primary / elevated`                         | 7.90    | 4.90  | 11.40 |
| Badge `primary / primary-soft`                    | 7.07    | 5.36  | 9.15  |
| Primary button `primary-fg / primary`             | 7.90    | 6.76  | 13.72 |
| Primary button hover `primary-fg / primary-hover` | 9.93    | 10.12 | 15.44 |
| Secondary button `fg / elevated`                  | 17.85   | 13.35 | 16.33 |
| Focus ring `ring / bg` (non-text 3:1)             | 5.17    | 6.76  | 13.72 |

## Lighthouse results

Static build, mobile 393×852, 3 runs per theme, assertions at 0.95.
Phase 3 baseline: **100 / 100 / 100 / 100**.

| Theme   | Run 1 (P/A/BP/SEO)    | Run 2                 | Run 3                 | Median                    | Δ vs Phase 3  |
| ------- | --------------------- | --------------------- | --------------------- | ------------------------- | ------------- |
| Default | 99 / 100 / 100 / 100  | 100 / 100 / 100 / 100 | 100 / 100 / 100 / 100 | **100 / 100 / 100 / 100** | 0 / 0 / 0 / 0 |
| Dark    | 100 / 100 / 100 / 100 | 100 / 100 / 100 / 100 | 100 / 100 / 100 / 100 | **100 / 100 / 100 / 100** | 0 / 0 / 0 / 0 |
| Bold    | 100 / 100 / 100 / 100 | 100 / 100 / 100 / 100 | 100 / 100 / 100 / 100 | **100 / 100 / 100 / 100** | 0 / 0 / 0 / 0 |

No category landed in the 90–94 range. One default-theme performance run scored
99 (normal run-to-run variance); all medians are 100. The theme-specific runs
were collected with `/?theme=dark` and `/?theme=bold` against the same static
export.

## Verification performed

- `?theme=default|dark|bold` applies the expected body colors; `?theme=evil`
  falls back to default.
- CLS measured at 0.0000 for all three themes.
- UTM values are absent from `sessionStorage` before consent and present after
  accepting; `gclid`/`fbclid` values never appear in storage.
- Empty form submit shows all validation errors; a valid submit shows the success
  state, then navigates to `/thank-you/` with no query string.
- `/thank-you/` returns `<meta name="robots" content="noindex, nofollow">` and is
  absent from `sitemap.xml`. `robots.txt` allows crawling so the noindex can be
  read.
- Unknown routes return the static 404 page.
- No horizontal overflow at 393 px or 1440 px in any theme.
- No console errors on the landing, legal, or thank-you pages.
- Anchor targets match the other demos: 72 px scroll margin, heading top at
  ~100 px from the viewport top (header is 64 px).
- JSON-LD Organization, WebSite, and FAQPage are present on the landing page.
- OG image is generated statically at `/og.png` (1200×630).

## Deployment

Cloudflare Pages, one project:

- Build command: `pnpm install --frozen-lockfile && pnpm --filter @folio/agency-campaign build`
- Output directory: `apps/agency-campaign/dist`
- No environment variables required. Set `NEXT_PUBLIC_DEFAULT_THEME` only if the
  campaign should ship with a non-default palette.

## Known limitations

- **Mock form only.** Nothing is transmitted. The adapter logs to the local
  browser console so you can inspect the payload; swap it for a real endpoint
  behind the same `FormSubmissionHandler` interface.
- **No-op analytics.** Events are emitted only after consent and are discarded by
  the default adapter. Wire a real provider where `configureAnalytics` is called.
- **Session-scoped attribution.** `sessionStorage` is per tab and cleared when the
  tab closes. It is last-touch within the session, not a cross-device identity.
- **URL-only theme selection.** The chosen theme is deliberately not persisted;
  without `?theme=` the page returns to the build-time default.
- **Click IDs are presence-only.** `gclid` and `fbclid` values are not kept, so
  this demo cannot support offline conversion uploads.
- **English-only.** No locale segment; the corporate demo covers i18n.
- **Fictional content.** Testimonials, metrics, pricing, and the 48-hour claim are
  invented for the demo.
- **Static hosting.** Cloudflare Pages serves `404.html` for unknown routes; no
  server-side redirects or personalization.
- **Lighthouse variance.** Mobile performance can move by one point between runs.
  The assertions stay at 0.95 and are never lowered silently.
