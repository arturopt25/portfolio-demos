"use client";

import { usePathname } from "next/navigation";

import { Header, type NavLink } from "@folio/ui";

import type { NavigationItem } from "@/lib/content-adapter";
import type { Dictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";

import { BrandMark } from "./brand-mark";
import { LanguageSwitcher } from "./language-switcher";

type SiteHeaderProps = {
  locale: Locale;
  brandName: string;
  links: NavigationItem[];
  dictionary: Dictionary;
};

function withTrailingSlash(path: string): string {
  return path.endsWith("/") ? path : `${path}/`;
}

function isCurrentPath(pathname: string, href: string, homeHref: string): boolean {
  const current = withTrailingSlash(pathname);
  const target = withTrailingSlash(href);

  if (target === homeHref) {
    return current === homeHref;
  }

  return current === target || current.startsWith(target);
}

export function SiteHeader({ locale, brandName, links, dictionary }: SiteHeaderProps) {
  const pathname = usePathname() ?? `/${locale}/`;
  const homeHref = `/${locale}/`;

  const navLinks: NavLink[] = links.map((link) => ({
    label: link.label,
    href: link.href,
    current: isCurrentPath(pathname, link.href, homeHref),
  }));

  return (
    <Header
      brand={<BrandMark name={brandName} />}
      brandHref={homeHref}
      links={navLinks}
      actions={<LanguageSwitcher locale={locale} labels={dictionary.language} />}
      cta={{
        label: dictionary.header.cta,
        href: `/${locale}/contact/`,
        analyticsEvent: "header_cta_click",
      }}
      labels={{
        navigation: dictionary.header.navigation,
        openMenu: dictionary.header.openMenu,
        closeMenu: dictionary.header.closeMenu,
      }}
    />
  );
}
