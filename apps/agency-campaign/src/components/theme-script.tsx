import { buildThemeScript, type Theme } from "@/lib/theme";

/**
 * Synchronous inline script for <head>. It is intentionally tiny: validate the
 * allowlist, then set or remove data-theme before the first paint. It never
 * reads or writes storage.
 */
export function ThemeScript({ defaultTheme }: { defaultTheme: Theme }) {
  return <script dangerouslySetInnerHTML={{ __html: buildThemeScript(defaultTheme) }} />;
}
