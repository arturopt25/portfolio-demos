import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { Inter } from "next/font/google";
import { notFound } from "next/navigation";

import "@folio/config/tokens.css";
import "../../globals.css";

import { organizationJsonLd, websiteJsonLd } from "@folio/seo";
import { CookieBanner, Footer, JsonLd, type FooterColumn } from "@folio/ui";

import { AnalyticsBridge } from "@/components/analytics-bridge";
import { SiteHeader } from "@/components/site-header";
import { brand } from "@/content/brand";
import { contentAdapter } from "@/lib/content-adapter";
import { getDictionary } from "@/lib/dictionary";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { pageUrl } from "@/lib/seo";
import { buildAppThemeScript } from "@/lib/theme";

const themeScript = buildAppThemeScript();

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const dynamicParams = false;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const dictionary = getDictionary(locale);

  return {
    metadataBase: new URL(brand.baseUrl),
    title: dictionary.meta.defaultTitle,
    description: dictionary.meta.defaultDescription,
    applicationName: brand.name,
    authors: [{ name: brand.name }],
    openGraph: {
      type: "website",
      siteName: brand.name,
      locale: locale === "en" ? "en_US" : "es_ES",
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;

  if (!isLocale(raw)) {
    notFound();
  }

  const locale = raw;
  const dictionary = getDictionary(locale);
  const navigation = await contentAdapter.getNavigation(locale);

  const columns: FooterColumn[] = [
    {
      title: dictionary.footer.columns.company,
      links: [
        { label: dictionary.nav.home, href: `/${locale}/` },
        { label: dictionary.nav.services, href: `/${locale}/services/` },
        { label: dictionary.nav.caseStudies, href: `/${locale}/case-studies/` },
        { label: dictionary.nav.contact, href: `/${locale}/contact/` },
      ],
    },
    {
      title: dictionary.footer.columns.legal,
      links: [
        { label: dictionary.footer.privacy, href: `/${locale}/privacy/` },
        { label: dictionary.footer.terms, href: `/${locale}/terms/` },
      ],
    },
    {
      title: dictionary.footer.columns.office,
      links: [
        ...dictionary.footer.office.addressLines.map((line) => ({ label: line })),
        { label: brand.email, href: `mailto:${brand.email}` },
        { label: brand.phone, href: `tel:${brand.phoneHref}` },
      ],
    },
  ];

  const organization = organizationJsonLd({
    name: brand.name,
    url: brand.baseUrl,
    logo: `${brand.baseUrl}/icon.svg`,
    description: brand.tagline[locale],
  });

  const website = websiteJsonLd({
    name: brand.name,
    url: pageUrl(locale),
    inLanguage: locale,
    description: brand.tagline[locale],
  });

  return (
    <html lang={locale} className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans">
        <a href="#main" className="skip-link">
          {dictionary.a11y.skipToContent}
        </a>

        <SiteHeader
          locale={locale}
          brandName={brand.name}
          links={navigation}
          dictionary={dictionary}
        />

        <main id="main">{children}</main>

        <Footer
          brand={brand.name}
          description={dictionary.footer.description}
          columns={columns}
          legal={<p>{dictionary.footer.legal}</p>}
        />

        <CookieBanner
          storageKey="ferrowind-consent"
          title={dictionary.cookie.title}
          description={dictionary.cookie.description}
          acceptLabel={dictionary.cookie.accept}
          rejectLabel={dictionary.cookie.reject}
          policyHref={`/${locale}/privacy/`}
          policyLabel={dictionary.cookie.policy}
        />

        <AnalyticsBridge />
        <JsonLd data={[organization, website]} />
      </body>
    </html>
  );
}
