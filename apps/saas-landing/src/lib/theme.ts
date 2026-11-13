import { buildThemeScript as buildSharedThemeScript } from "@folio/ui/theme";

export const THEMES = ["light", "dark"] as const;

export type Theme = (typeof THEMES)[number];

export const DEFAULT_THEME: Theme = "light";
export const THEME_STORAGE_KEY = "casefern-theme";
export const CONSENT_STORAGE_KEY = "folio-consent";

/** `light` is the attribute-less :root palette; `dark` uses data-theme. */
export const THEME_ATTRIBUTES: Record<Theme, string | null> = {
  light: null,
  dark: "dark",
};

export const THEME_COLORS: Record<Theme, string> = {
  light: "#ffffff",
  dark: "#020617",
};

export const COLOR_SCHEMES: Record<Theme, "light" | "dark"> = {
  light: "light",
  dark: "dark",
};

export function buildAppThemeScript(defaultTheme: Theme = DEFAULT_THEME): string {
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
