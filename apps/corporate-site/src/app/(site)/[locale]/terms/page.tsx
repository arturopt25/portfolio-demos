import type { Metadata } from "next";

import { breadcrumbJsonLd } from "@folio/seo";
import { JsonLd, Section } from "@folio/ui";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { LegalContent } from "@/components/legal-content";
import { contentAdapter } from "@/lib/content-adapter";
import { getDictionary } from "@/lib/dictionary";
import { isLocale, type Locale } from "@/lib/i18n";
import { pageMetadata, pageUrl } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) {
    return {};
  }

  const page = await contentAdapter.getPage(raw, "terms");

  return pageMetadata({
    locale: raw,
    path: "/terms",
    title: page.seo.title,
    description: page.seo.description,
  });
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) {
    return null;
  }

  const locale: Locale = raw;
  const dictionary = getDictionary(locale);
  const page = await contentAdapter.getPage(locale, "terms");

  const breadcrumb = breadcrumbJsonLd([
    { name: dictionary.common.home, url: pageUrl(locale) },
    { name: dictionary.footer.terms, url: pageUrl(locale, "/terms") },
  ]);

  return (
    <>
      <Section className="pb-0 pt-6">
        <Breadcrumbs
          label={dictionary.a11y.breadcrumb}
          items={[
            { label: dictionary.common.home, href: `/${locale}/` },
            { label: dictionary.footer.terms },
          ]}
        />
      </Section>

      <LegalContent
        content={page}
        updatedLabel={dictionary.legal.updated}
        demoNotice={dictionary.legal.demoNotice}
      />

      <JsonLd data={breadcrumb} />
    </>
  );
}
