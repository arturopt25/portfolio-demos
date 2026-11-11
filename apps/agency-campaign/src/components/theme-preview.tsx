import { themePreviewLinks } from "@/content/campaign";

/**
 * Demo-only control. Theme selection is a URL parameter, so these are plain
 * links. The blocking head script applies the choice before paint.
 */
export function ThemePreview() {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
      <span className="text-muted text-xs font-semibold tracking-[0.14em] uppercase">
        Theme preview
      </span>
      <ul className="flex flex-wrap items-center gap-x-3 gap-y-1">
        {themePreviewLinks.map((theme) => (
          <li key={theme.key}>
            <a
              href={theme.href}
              className="text-primary focus-visible:ring-ring rounded-sm text-xs font-medium underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:outline-none"
            >
              {theme.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
