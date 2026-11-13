import {
  buildThemeScript as buildSharedThemeScript,
  isTheme as isSharedTheme,
  normalizeTheme as normalizeSharedTheme,
} from "@folio/ui/theme";

export const THEMES = ["default", "dark", "bold"] as const;

export type Theme = (typeof THEMES)[number];

export const DEFAULT_THEME: Theme = "default";
export const THEME_STORAGE_KEY = "catalyst-theme";
export const CONSENT_STORAGE_KEY = "catalyst-consent";

/** `default` is the attribute-less :root palette; dark and bold use data-theme. */
const THEME_ATTRIBUTES: Record<Theme, string | null> = {
  default: null,
  dark: "dark",
  bold: "bold",
};

const THEME_COLORS: Record<Theme, string> = {
  default: "#ffffff",
  dark: "#020617",
  bold: "#0b0b0f",
};

const COLOR_SCHEMES: Record<Theme, "light" | "dark"> = {
  default: "light",
  dark: "dark",
  bold: "dark",
};

export function isTheme(value: string | null | undefined): value is Theme {
  return isSharedTheme(value, THEMES);
}

/**
 * Unknown or missing values always fall back to the build-time default.
 * Used by both the server-rendered <html> attribute and the blocking script.
 */
export function normalizeTheme(
  value: string | null | undefined,
  fallback: Theme = DEFAULT_THEME,
): Theme {
  return normalizeSharedTheme(value, THEMES, fallback);
}

/**
 * Minimal synchronous script for <head>. It runs before first paint, validates
 * `?theme=` against the allowlist, and reads a remembered theme only when
 * consent has already been granted. It never writes to storage.
 */
export function buildThemeScript(defaultTheme: Theme): string {
  return buildSharedThemeScript({
    themes: THEMES,
    defaultTheme,
    attributes: THEME_ATTRIBUTES,
    storageKey: THEME_STORAGE_KEY,
    consentKey: CONSENT_STORAGE_KEY,
    colorSchemes: COLOR_SCHEMES,
    themeColors: THEME_COLORS,
  });
}
