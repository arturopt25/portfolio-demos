# @folio/config

Shared TypeScript, ESLint, Prettier, Tailwind, and design-token configuration for
the Folio demos. It contains configuration only; it has no runtime code.

## Install

It is a private workspace package:

```json
{
  "devDependencies": {
    "@folio/config": "workspace:*"
  }
}
```

## Exports

| Export                                | What it provides                                            |
| ------------------------------------- | ----------------------------------------------------------- |
| `@folio/config/tsconfig/base.json`    | Strict base TypeScript config                               |
| `@folio/config/tsconfig/next.json`    | Next.js app TypeScript config (extends `base.json`)         |
| `@folio/config/tsconfig/library.json` | Library/package TypeScript config                           |
| `@folio/config/eslint`                | Flat ESLint config with Next.js, TypeScript, and a11y rules |
| `@folio/config/tailwind-preset`       | Tailwind preset mapping CSS variables to utility classes    |
| `@folio/config/tokens.css`            | Light and dark CSS-variable design tokens                   |

## Usage

### TypeScript

```json
{
  "extends": "@folio/config/tsconfig/next.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts", "dist/types/**/*.ts"],
  "exclude": ["node_modules", "dist"]
}
```

### ESLint

```js
// eslint.config.mjs
import config from "@folio/config/eslint";

export default config;
```

### Tailwind

```js
// tailwind.config.ts
import type { Config } from "tailwindcss";
import preset from "@folio/config/tailwind-preset";

export default {
  presets: [preset],
  content: ["./src/**/*.{ts,tsx}"],
} satisfies Config;
```

### Design tokens

Import the tokens once in the root layout or global stylesheet:

```css
@import "@folio/config/tokens.css";
```

The token names are stable: `--color-bg`, `--color-fg`, `--color-muted`,
`--color-surface`, `--color-elevated`, `--color-border`, `--color-primary`,
`--color-primary-hover`, `--color-primary-fg`, `--color-primary-soft`,
`--color-secondary`, `--color-accent`, `--color-success`, `--color-danger`, and
`--color-ring`. Dark values are defined under `[data-theme="dark"]`; the demos
activate light mode by default.

## Notes

- Tailwind CSS is pinned to v3. The preset is written for v3.
- The ESLint config ignores `dist`, `.next`, `.turbo`, `coverage`, and
  `next-env.d.ts`.
- Prettier configuration lives at the repository root (`.prettierrc.json`), not
  in this package.
