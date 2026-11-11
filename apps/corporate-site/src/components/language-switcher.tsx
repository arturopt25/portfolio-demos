"use client";

import { usePathname } from "next/navigation";

import { cn } from "@folio/ui";

import type { Dictionary } from "@/lib/dictionary";
import { locales, switchLocalePath, type Locale } from "@/lib/i18n";

type LanguageSwitcherProps = {
  locale: Locale;
  labels: Dictionary["language"];
};

export function LanguageSwitcher({ locale, labels }: LanguageSwitcherProps) {
  const pathname = usePathname() ?? `/${locale}/`;

  return (
    <nav
      aria-label={labels.label}
      className="border-border bg-elevated inline-flex items-center rounded-md border p-0.5"
    >
      {locales.map((target) => {
        const isCurrent = target === locale;

        return (
          <a
            key={target}
            href={switchLocalePath(pathname, target)}
            hrefLang={target}
            lang={target}
            aria-current={isCurrent ? "true" : undefined}
            aria-label={`${labels.switchTo} ${labels[target]}`}
            className={cn(
              "focus-visible:ring-ring rounded-sm px-2 py-1 text-xs font-semibold tracking-wide uppercase transition-colors focus-visible:ring-2 focus-visible:outline-none",
              isCurrent ? "bg-primary text-primary-fg" : "text-muted hover:text-fg",
            )}
          >
            {target}
          </a>
        );
      })}
    </nav>
  );
}
