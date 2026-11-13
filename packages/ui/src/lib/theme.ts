/**
 * Shared theme bootstrap for static exports.
 *
 * The generated script is intentionally tiny and synchronous so it can run in
 * `<head>` before first paint. It never writes to storage. A stored theme is
 * only read when the matching consent key is already `"granted"`, so nothing
 * is read or written before consent.
 */

export type ThemeScriptOptions = {
  /** Allowlist of valid theme keys. */
  themes: readonly string[];
  /** Theme used when nothing valid is requested. */
  defaultTheme: string;
  /** Map each theme to its `data-theme` value. `null` removes the attribute. */
  attributes: Record<string, string | null>;
  /** Optional localStorage key for the chosen theme. */
  storageKey?: string;
  /** Consent key that must equal `"granted"` before storage is read. */
  consentKey?: string;
  /** Optional `color-scheme` values per theme. */
  colorSchemes?: Record<string, "light" | "dark">;
  /** Optional `theme-color` meta values per theme. */
  themeColors?: Record<string, string>;
};

export function buildThemeScript({
  themes,
  defaultTheme,
  attributes,
  storageKey,
  consentKey,
  colorSchemes,
  themeColors,
}: ThemeScriptOptions): string {
  const allowed = JSON.stringify(themes);
  const fallback = JSON.stringify(defaultTheme);
  const attrMap = JSON.stringify(attributes);
  const storage = JSON.stringify(storageKey ?? null);
  const consent = JSON.stringify(consentKey ?? null);
  const schemes = JSON.stringify(colorSchemes ?? {});
  const colors = JSON.stringify(themeColors ?? {});

  return `(function(){try{var a=${allowed},d=${fallback},m=${attrMap},s=${storage},c=${consent},cs=${schemes},tc=${colors},p=new URLSearchParams(window.location.search),q=p.get("theme"),t=a.indexOf(q)>-1?q:null;if(!t&&s&&c){try{if(window.localStorage.getItem(c)==="granted"){var r=window.localStorage.getItem(s);if(a.indexOf(r)>-1){t=r}}}catch(e){}}if(!t){t=d}var e=document.documentElement,v=m[t];if(v===null||v===undefined){e.removeAttribute("data-theme")}else{e.setAttribute("data-theme",v)}if(cs[t]){e.style.colorScheme=cs[t]}var n=document.querySelector('meta[name="theme-color"]');if(n&&tc[t]){n.setAttribute("content",tc[t])}}catch(e){}})();`;
}

export function isTheme<T extends string>(
  value: string | null | undefined,
  themes: readonly T[],
): value is T {
  return value !== null && value !== undefined && (themes as readonly string[]).includes(value);
}

export function normalizeTheme<T extends string>(
  value: string | null | undefined,
  themes: readonly T[],
  fallback: T,
): T {
  return isTheme(value, themes) ? value : fallback;
}
