export const THEMES = ["default", "dark", "bold"] as const;

export type Theme = (typeof THEMES)[number];

export function isTheme(value: string | null | undefined): value is Theme {
  return value !== null && value !== undefined && THEMES.includes(value as Theme);
}

/**
 * Unknown or missing values always fall back to the build-time default.
 * Used by both the server-rendered <html> attribute and the blocking script.
 */
export function normalizeTheme(
  value: string | null | undefined,
  fallback: Theme = "default",
): Theme {
  return isTheme(value) ? value : fallback;
}

/**
 * Minimal synchronous script for <head>. It runs before first paint, validates
 * `?theme=` against the allowlist, and never writes to storage. Invalid values
 * fall back to the build-time default.
 */
export function buildThemeScript(defaultTheme: Theme): string {
  const fallback = JSON.stringify(defaultTheme);
  const allowed = JSON.stringify(THEMES);

  return `(function(){try{var d=${fallback},a=${allowed},p=new URLSearchParams(location.search).get("theme"),t=a.indexOf(p)>-1?p:d,e=document.documentElement;if(t==="default"){e.removeAttribute("data-theme")}else{e.setAttribute("data-theme",t)}}catch(e){}})();`;
}
