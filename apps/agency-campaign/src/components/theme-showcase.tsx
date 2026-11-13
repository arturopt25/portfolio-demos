"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";

import { CheckIcon, trackEvent } from "@folio/ui";

import { brand } from "@/content/brand";

const CONSENT_KEY = "catalyst-consent";
const THEME_KEY = "catalyst-theme";

const PALETTES = [
  { key: "default", label: "Default", themeColor: "#ffffff" },
  { key: "dark", label: "Dark", themeColor: "#020617" },
  { key: "bold", label: "Bold", themeColor: "#0b0b0f" },
] as const;

type PaletteKey = (typeof PALETTES)[number]["key"];

function isPaletteKey(value: string | null | undefined): value is PaletteKey {
  return PALETTES.some((palette) => palette.key === value);
}

function readCurrentPalette(): PaletteKey {
  if (typeof document === "undefined") {
    return brand.defaultTheme;
  }

  const value = document.documentElement.getAttribute("data-theme");
  return isPaletteKey(value) ? value : "default";
}

function applyThemeColor(themeColor: string) {
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute("content", themeColor);
  }
}

/**
 * Accessible palette selector for the hero showcase.
 *
 * - `role="radiogroup"` with roving tabindex and arrow-key selection.
 * - Applies `data-theme`, `color-scheme`, and `theme-color` immediately.
 * - Merges `?theme=` into the current URL without dropping UTM/click-id params
 *   or the hash, and without a reload or scroll jump.
 * - Persists `catalyst-theme` only after consent; otherwise the theme lives in
 *   the URL only.
 */
export function ThemeShowcase() {
  const [selected, setSelected] = useState<PaletteKey>("default");
  const buttons = useRef<Record<PaletteKey, HTMLButtonElement | null>>({
    default: null,
    dark: null,
    bold: null,
  });

  useEffect(() => {
    setSelected(readCurrentPalette());
  }, []);

  function selectPalette(key: PaletteKey) {
    const palette = PALETTES.find((item) => item.key === key);

    if (!palette) {
      return;
    }

    const root = document.documentElement;

    if (key === "default") {
      root.removeAttribute("data-theme");
    } else {
      root.setAttribute("data-theme", key);
    }

    root.style.colorScheme = key === "default" ? "light" : "dark";
    applyThemeColor(palette.themeColor);

    try {
      const url = new URL(window.location.href);

      if (key === "default") {
        url.searchParams.delete("theme");
      } else {
        url.searchParams.set("theme", key);
      }

      window.history.replaceState(window.history.state, "", url.toString());
    } catch {
      // A malformed URL must never block the theme change.
    }

    try {
      if (window.localStorage.getItem(CONSENT_KEY) === "granted") {
        window.localStorage.setItem(THEME_KEY, key);
      } else {
        window.localStorage.removeItem(THEME_KEY);
      }
    } catch {
      // Storage can be unavailable in private mode. The theme still applies.
    }

    setSelected(key);
    trackEvent("theme_select", { theme: key, path: window.location.pathname });
  }

  function focusPalette(index: number) {
    const palette = PALETTES[index];
    if (palette) {
      buttons.current[palette.key]?.focus();
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown": {
        event.preventDefault();
        const next = (index + 1) % PALETTES.length;
        const palette = PALETTES[next];
        if (palette) {
          selectPalette(palette.key);
          focusPalette(next);
        }
        break;
      }
      case "ArrowLeft":
      case "ArrowUp": {
        event.preventDefault();
        const previous = (index - 1 + PALETTES.length) % PALETTES.length;
        const palette = PALETTES[previous];
        if (palette) {
          selectPalette(palette.key);
          focusPalette(previous);
        }
        break;
      }
      case "Home": {
        event.preventDefault();
        const first = PALETTES[0];
        if (first) {
          selectPalette(first.key);
          focusPalette(0);
        }
        break;
      }
      case "End": {
        event.preventDefault();
        const last = PALETTES.length - 1;
        const palette = PALETTES[last];
        if (palette) {
          selectPalette(palette.key);
          focusPalette(last);
        }
        break;
      }
      case " ":
      case "Enter": {
        event.preventDefault();
        const palette = PALETTES[index];
        if (palette) {
          selectPalette(palette.key);
        }
        break;
      }
      default:
        break;
    }
  }

  return (
    <div className="flex h-full w-full flex-col justify-between bg-bg p-5">
      <div className="flex items-center justify-between gap-3">
        <span id="theme-showcase-label" className="text-sm font-semibold text-fg">
          Three palettes. One page.
        </span>
      </div>

      <div
        role="radiogroup"
        aria-labelledby="theme-showcase-label"
        className="mt-4 grid flex-1 grid-cols-3 gap-3"
      >
        {PALETTES.map((palette, index) => {
          const active = selected === palette.key;

          return (
            <button
              key={palette.key}
              ref={(node) => {
                buttons.current[palette.key] = node;
              }}
              type="button"
              role="radio"
              aria-checked={active}
              aria-label={`${palette.label} theme`}
              tabIndex={active ? 0 : -1}
              data-swatch={palette.key}
              data-theme={palette.key}
              onClick={() => selectPalette(palette.key)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className="relative flex cursor-pointer flex-col justify-between rounded-lg border border-border bg-bg p-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              {active ? (
                <span
                  aria-hidden="true"
                  className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-bg text-primary shadow-card"
                >
                  <CheckIcon className="h-3 w-3" />
                </span>
              ) : null}

              <div className="space-y-2">
                <span className="block h-2 w-8 rounded-full bg-primary" />
                <span className="block h-1.5 w-full rounded-full bg-fg/80" />
                <span className="block h-1.5 w-3/4 rounded-full bg-muted/70" />
              </div>

              <div className="space-y-2">
                <span className="flex h-6 items-center justify-center rounded bg-primary-soft text-[11px] font-semibold text-primary">
                  CTA
                </span>
                <span className="block text-[11px] font-medium text-muted">{palette.label}</span>
              </div>
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-xs leading-5 text-muted">
        CSS variables only. Components and markup stay the same.
      </p>
    </div>
  );
}
