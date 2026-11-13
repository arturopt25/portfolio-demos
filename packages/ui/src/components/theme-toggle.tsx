"use client";

import { useEffect, useState } from "react";

import { trackEvent } from "../hooks/analytics";
import { cn } from "../lib/utils";
import { MoonIcon, SunIcon } from "./icons";

export type ThemeToggleProps = {
  /** Theme key used for the light palette. */
  lightTheme?: string;
  /** Theme key used for the dark palette. */
  darkTheme?: string;
  /** Theme key treated as the default (no `?theme=` parameter). */
  defaultTheme?: string;
  /** Map each theme to its `data-theme` attribute value. */
  attributes: Record<string, string | null>;
  /** Optional localStorage key for the chosen theme. */
  storageKey?: string;
  /** Consent key that must equal `"granted"` before the theme is stored. */
  consentKey?: string;
  /** Optional `color-scheme` values per theme. */
  colorSchemes?: Record<string, "light" | "dark">;
  /** Optional `theme-color` meta values per theme. */
  themeColors?: Record<string, string>;
  labels?: {
    /** Accessible name for the toggle button. */
    label?: string;
  };
  className?: string;
};

function currentIsDark(darkTheme: string, attributes: Record<string, string | null>): boolean {
  if (typeof document === "undefined") {
    return false;
  }

  const darkAttribute = attributes[darkTheme] ?? "dark";
  return document.documentElement.getAttribute("data-theme") === darkAttribute;
}

/**
 * Accessible light/dark toggle.
 *
 * - Applies `data-theme` and `color-scheme` immediately, before any navigation.
 * - Keeps `?theme=` shareable via `history.replaceState`, preserving other
 *   query parameters.
 * - Writes the choice to storage only after consent is granted. The theme is
 *   never persisted before consent.
 */
export function ThemeToggle({
  lightTheme = "light",
  darkTheme = "dark",
  defaultTheme,
  attributes,
  storageKey,
  consentKey,
  colorSchemes,
  themeColors,
  labels,
  className,
}: ThemeToggleProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(currentIsDark(darkTheme, attributes));
  }, [darkTheme, attributes]);

  function applyTheme(theme: string) {
    const root = document.documentElement;
    const attribute = attributes[theme] ?? null;

    if (attribute === null) {
      root.removeAttribute("data-theme");
    } else {
      root.setAttribute("data-theme", attribute);
    }

    if (colorSchemes?.[theme]) {
      root.style.colorScheme = colorSchemes[theme];
    }

    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta && themeColors?.[theme]) {
      meta.setAttribute("content", themeColors[theme]);
    }

    try {
      const url = new URL(window.location.href);

      if (theme === (defaultTheme ?? lightTheme)) {
        url.searchParams.delete("theme");
      } else {
        url.searchParams.set("theme", theme);
      }

      window.history.replaceState(window.history.state, "", url.toString());
    } catch {
      // A malformed URL should never block the theme change.
    }

    try {
      if (consentKey && storageKey && window.localStorage.getItem(consentKey) === "granted") {
        window.localStorage.setItem(storageKey, theme);
      } else if (storageKey) {
        window.localStorage.removeItem(storageKey);
      }
    } catch {
      // Storage can be unavailable in private mode. The theme still applies.
    }

    setIsDark(theme === darkTheme);
    trackEvent("theme_select", { theme, path: window.location.pathname });
  }

  return (
    <button
      type="button"
      aria-label={labels?.label ?? "Dark mode"}
      aria-pressed={isDark}
      onClick={() => applyTheme(isDark ? lightTheme : darkTheme)}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-fg transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
    >
      {isDark ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
    </button>
  );
}
