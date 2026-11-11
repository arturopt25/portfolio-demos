import type { Metadata } from "next";

import { absoluteUrl, createMetadata } from "@folio/seo";

import { brand } from "@/content/brand";

import { languageAlternates, localizePath, type Locale } from "./i18n";

export type PageMetadataInput = {
  locale: Locale;
  path?: string;
  title: string;
  description: string;
};

export function pageMetadata({
  locale,
  path = "/",
  title,
  description,
}: PageMetadataInput): Metadata {
  return createMetadata({
    title,
    description,
    siteName: brand.name,
    baseUrl: brand.baseUrl,
    path: localizePath(locale, path),
    locale: locale === "en" ? "en_US" : "es_ES",
    image: `/${locale}/og.png`,
    languages: languageAlternates(brand.baseUrl, path),
  });
}

export function pageUrl(locale: Locale, path = "/"): string {
  return absoluteUrl({ baseUrl: brand.baseUrl, path: localizePath(locale, path) });
}
