import { absoluteUrl } from "@folio/seo";

export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/**
 * Build a locale-prefixed path with a trailing slash.
 * `localizePath("en")` -> `/en/`
 * `localizePath("es", "/case-studies")` -> `/es/case-studies/`
 */
export function localizePath(locale: Locale, path = "/"): string {
  const clean = path === "/" ? "" : path.replace(/^\/+|\/+$/g, "");

  return clean ? `/${locale}/${clean}/` : `/${locale}/`;
}

/**
 * Swap the locale segment of the current pathname while keeping the rest of
 * the route intact. Used by the header language switcher.
 */
export function switchLocalePath(pathname: string, nextLocale: Locale): string {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) {
    return `/${nextLocale}/`;
  }

  segments[0] = nextLocale;
  return `/${segments.join("/")}/`;
}

export function getOtherLocale(locale: Locale): Locale {
  return locale === "en" ? "es" : "en";
}

export function languageAlternates(baseUrl: string, path = "/"): Record<string, string> {
  return Object.fromEntries([
    ...locales.map((locale) => [
      locale,
      absoluteUrl({ baseUrl, path: localizePath(locale, path) }),
    ]),
    ["x-default", absoluteUrl({ baseUrl, path: localizePath(defaultLocale, path) })],
  ] as const);
}
