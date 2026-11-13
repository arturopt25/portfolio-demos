import type { Metadata } from "next";

export type CreateMetadataInput = {
  title: string;
  description: string;
  siteName: string;
  baseUrl: string;
  path?: string;
  locale?: string;
  image?: string;
  noIndex?: boolean;
  languages?: Record<string, string>;
  alternateLocale?: string[];
};

export function createMetadata({
  title,
  description,
  siteName,
  baseUrl,
  path = "/",
  locale,
  image,
  noIndex = false,
  languages,
  alternateLocale,
}: CreateMetadataInput): Metadata {
  const canonical = new URL(path, baseUrl).toString();
  const imageUrl = image ? new URL(image, baseUrl).toString() : undefined;

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      type: "website",
      title,
      description,
      url: canonical,
      siteName,
      locale,
      alternateLocale,
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630, alt: title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : undefined,
  };
}
