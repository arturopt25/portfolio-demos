# Deploying the demos to Cloudflare Pages

This guide deploys each app as its own **Cloudflare Pages** project using
Cloudflare's GitHub integration. Everything runs on the free plan. There are no
API tokens, account IDs, Wrangler configs, or server runtimes in this repository,
and none are needed.

All three apps are static Next.js exports (`output: "export"`). Cloudflare Pages
builds the site from source on every push and serves the generated `dist/`
folder.

## Prerequisites

- A GitHub account with this repository connected to Cloudflare.
- A free Cloudflare account.
- The repository is the same one that contains `pnpm-workspace.yaml` and
  `turbo.json` (the monorepo root).

## Project names must match the placeholder URLs

Each app currently points its canonical URLs, Open Graph tags, and JSON-LD
(plus the sitemap where one exists) at a placeholder `*.pages.dev` domain.
Create the Cloudflare project with the matching name so the deployed site
matches the code without edits:

| App                    | Brand              | Cloudflare project name | Placeholder base URL                     |
| ---------------------- | ------------------ | ----------------------- | ---------------------------------------- |
| `apps/saas-landing`    | Casefern           | `casefern-demo`         | `https://casefern-demo.pages.dev`        |
| `apps/corporate-site`  | Ferrowind Partners | `ferrowind-demo`        | `https://ferrowind-demo.pages.dev`       |
| `apps/agency-campaign` | Catalyst Studio    | `catalyst-studio-demo`  | `https://catalyst-studio-demo.pages.dev` |

`*.pages.dev` names are globally unique. If a name is already taken, pick a new
one and update the base URL in the code **before** deploying (see
[Changing the base URL](#changing-the-base-url)).

## Settings for all three projects

Use these values in the Cloudflare Pages "Set up builds and deployments" screen.

| Setting                | Value                                         |
| ---------------------- | --------------------------------------------- |
| Framework preset       | **None** (static site)                        |
| Production branch      | `main`                                        |
| Root directory         | Repository root (leave blank / `/`)           |
| Build command          | See the per-app table below                   |
| Build output directory | See the per-app table below                   |
| Environment variables  | `NODE_VERSION=24.15.0`, `PNPM_VERSION=11.5.1` |

Cloudflare's v3 build image defaults to Node 22 and pnpm 10. It does **not**
read the pnpm version from `package.json`'s `packageManager` field, so
`PNPM_VERSION` must be set explicitly. `NODE_VERSION` is also explicit here even
though the root `.nvmrc` (`24.15.0`) is picked up automatically.

Do **not** set `SKIP_DEPENDENCY_INSTALL`. The build command runs the install so
the frozen lockfile is honoured.

### Per-app build settings

| App               | Build command                                                                  | Output directory            |
| ----------------- | ------------------------------------------------------------------------------ | --------------------------- |
| `saas-landing`    | `pnpm install --frozen-lockfile && pnpm --filter @folio/saas-landing build`    | `apps/saas-landing/dist`    |
| `corporate-site`  | `pnpm install --frozen-lockfile && pnpm --filter @folio/corporate-site build`  | `apps/corporate-site/dist`  |
| `agency-campaign` | `pnpm install --frozen-lockfile && pnpm --filter @folio/agency-campaign build` | `apps/agency-campaign/dist` |

`agency-campaign` also accepts an optional build-time theme:

| Variable                    | Required | Value                                  |
| --------------------------- | -------- | -------------------------------------- |
| `NEXT_PUBLIC_DEFAULT_THEME` | No       | `default` (default), `dark`, or `bold` |

Invalid values fall back to `brand.defaultTheme` (`"default"`).

## Step-by-step (beginner)

Repeat these steps three times, once per app.

1. Push the repository to GitHub (this repository already has an `origin`).
2. In the Cloudflare dashboard, open **Workers & Pages**.
3. Choose **Create** → **Pages** → **Connect to Git**.
4. Authorise Cloudflare for the repository if prompted, then select the repo.
5. Enter the **project name** from the table above (for example
   `casefern-demo`).
6. Set **Production branch** to `main`.
7. Leave **Root directory** at the repository root.
8. Choose **Framework preset: None**.
9. Paste the **Build command** and **Build output directory** for the app.
10. Expand **Environment variables** and add:
    - `NODE_VERSION` = `24.15.0`
    - `PNPM_VERSION` = `11.5.1`
    - For `agency-campaign` only, optionally `NEXT_PUBLIC_DEFAULT_THEME`.
11. Choose **Save and Deploy**.
12. Wait for the first build. The log should show
    `pnpm install --frozen-lockfile`, the Next.js build, and a generated `dist/`
    folder.
13. Open the `*.pages.dev` URL shown in the dashboard.

Every later push to `main` triggers a new production deployment. Pull requests
from the same repository get preview deployments automatically; that is a
Cloudflare feature and does not require any repository configuration.

## Static hosting files

Cloudflare Pages reads `_headers` and `_redirects` from the build output
directory (they are copied from `public/` by Next.js).

### `_headers`

All three apps ship the same security headers:

```text
/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
```

There is deliberately **no Content-Security-Policy** yet. `agency-campaign`
sets a synchronous inline script in `<head>` to apply `?theme=` before first
paint. If you add a CSP later, either hash that script or allow it explicitly;
a restrictive `script-src` without the hash will block the theme switch. The
analytics and consent code is bundled, not inline.

### `_redirects`

Only `corporate-site` needs a redirect. Its root page is a meta-refresh fallback,
and `public/_redirects` makes Cloudflare return a real redirect:

```text
/ /en/ 302
```

`saas-landing` and `agency-campaign` have no `_redirects` file because their
routes do not need one. Unknown paths are served by the exported `404.html`.

Syntax reminders for Cloudflare Pages:

- One rule per line: `from to status`.
- Redirects are applied in order; the first match wins.
- Use a `302` for temporary root redirects.
- Do not add a rule for a path that should return a 404.

## Post-deploy checklist

Run through these after the first successful deployment. Replace
`<project>` with the project name.

### All apps

- [ ] `https://<project>.pages.dev/` returns `200` and renders the demo.
- [ ] `https://<project>.pages.dev/robots.txt` returns `200` and points at the
      sitemap (where the app generates one).
- [ ] `https://<project>.pages.dev/sitemap.xml` returns `200` (where the app
      generates one).
- [ ] Response headers include
      `x-content-type-options: nosniff` and
      `referrer-policy: strict-origin-when-cross-origin`.
- [ ] Canonical and `og:image` URLs use the real `*.pages.dev` hostname, not a
      leftover placeholder.
- [ ] An unknown path such as `/this-page-does-not-exist/` shows the branded 404.
- [ ] No console errors in the browser.

### `saas-landing`

- [ ] `/`, `/?v=b`, `/privacy/`, and `/terms/` load.
- [ ] Detail anchors `/#pricing`, `/#faq`, and `/#contact` land below the sticky
      header.
- [ ] `/opengraph-image` returns a `1200×630` PNG (`content-type: image/png`).
- [ ] `robots.txt` and `sitemap.xml` are **not implemented** in this demo. Add
      app routes if the demo needs them for a real domain.

### `corporate-site`

- [ ] `/` returns a `302` to `/en/`.
- [ ] `/en/` and `/es/` render with the correct `<html lang>`.
- [ ] `/en/case-studies/foundry-throughput/` and the Spanish equivalent load.
- [ ] `/en/og.png` and `/es/og.png` return `image/png`.
- [ ] `/sitemap.xml` contains 18 URLs with `xhtml:link` alternates.
- [ ] `/robots.txt` points at the sitemap.
- [ ] Unknown locale, slug, and path show the branded 404.

### `agency-campaign`

- [ ] `/`, `/?theme=dark`, and `/?theme=bold` apply the expected palette.
- [ ] `/?theme=not-a-theme` falls back to the default.
- [ ] `/thank-you/` returns `<meta name="robots" content="noindex, nofollow">`
      and is absent from `sitemap.xml`.
- [ ] `/privacy/` and `/terms/` load.
- [ ] `robots.txt` allows crawling the thank-you page so the `noindex` can be
      read.
- [ ] `/og.png` returns a 1200×630 image.

## Changing the base URL

If you use a project name other than the placeholder, or later attach a custom
domain, update the base URL and rebuild. The canonical, Open Graph, JSON-LD,
sitemap, and robots output all read from these files.

| App               | File(s) to edit                                                                                                                                        |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `saas-landing`    | `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/privacy/page.tsx`, `src/app/terms/page.tsx`, and the hostname text in `src/app/opengraph-image.tsx` |
| `corporate-site`  | `src/content/brand.ts` (`baseUrl`)                                                                                                                     |
| `agency-campaign` | `src/content/brand.ts` (`baseUrl`)                                                                                                                     |

For `saas-landing`, the base URL is currently repeated in four files, so update
all of them together. For the other two apps, `brand.ts` is the single source of
truth.

After editing, commit, push, and let Cloudflare rebuild. For a custom domain,
attach it in **Cloudflare Pages → your project → Custom domains**, then change
the base URL to the new scheme + host (for example
`https://casefern.example.com`) and redeploy. Keep the `*.pages.dev` URL as a
fallback preview if you like.

## Troubleshooting

| Symptom                                | Likely cause                                                             |
| -------------------------------------- | ------------------------------------------------------------------------ |
| Build fails on `pnpm install`          | `PNPM_VERSION` missing or set below `11.5.1`; pnpm 11 needs Node ≥ 22.13 |
| Build fails on Node syntax             | `NODE_VERSION` not set to `24.15.0`                                      |
| `dist` not found                       | Output directory missing the `apps/<app>/dist` prefix                    |
| Every route 404s                       | `output: "export"` output copied from the wrong directory                |
| Theme query does nothing               | A CSP was added without allowing the inline theme script                 |
| Canonical URLs point at the wrong host | Base URL not updated before deploying                                    |

## What not to add

- No `wrangler.toml`, `wrangler.jsonc`, or Wrangler commands.
- No Cloudflare API tokens, account IDs, or zone IDs in the repository or in
  GitHub secrets. Cloudflare's Git integration handles authentication.
- No server runtime, API routes, or `@cloudflare/next-on-pages`. These apps are
  static exports.
