import type { Metadata } from "next";

import { breadcrumbJsonLd } from "@folio/seo";
import { Cta, Hero, JsonLd, Section } from "@folio/ui";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { CaseStudyGrid } from "@/sections/case-study-grid";
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

  const page = await contentAdapter.getPage(raw, "case-studies");

  return pageMetadata({
    locale: raw,
    path: "/case-studies",
    title: page.seo.title,
    description: page.seo.description,
  });
}

export default async function CaseStudiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) {
    return null;
  }

  const locale: Locale = raw;
  const dictionary = getDictionary(locale);
  const page = await contentAdapter.getPage(locale, "case-studies");
  const studies = await contentAdapter.getCaseStudies(locale);

  const breadcrumb = breadcrumbJsonLd([
    { name: dictionary.common.home, url: pageUrl(locale) },
    { name: dictionary.nav.caseStudies, url: pageUrl(locale, "/case-studies") },
  ]);

  return (
    <>
      <Section className="pt-6 pb-0">
        <Breadcrumbs
          label={dictionary.a11y.breadcrumb}
          items={[
            { label: dictionary.common.home, href: `/${locale}/` },
            { label: dictionary.nav.caseStudies },
          ]}
        />
      </Section>

      <Hero
        variant="corporate"
        compact
        eyebrow={page.hero.eyebrow}
        title={page.hero.title}
        description={page.hero.description}
        primaryCta={{
          label: dictionary.common.bookCall,
          href: `/${locale}/contact/`,
          analyticsEvent: "case_studies_hero_cta",
        }}
      />

      <CaseStudyGrid
        studies={studies}
        locale={locale}
        readLabel={dictionary.caseStudies.read}
        metricLabels={{
          before: dictionary.caseStudies.before,
          after: dictionary.caseStudies.after,
        }}
        heading={{ title: dictionary.common.allCaseStudies }}
      />

      <Cta
        eyebrow={dictionary.nav.caseStudies}
        title={page.cta.title}
        description={page.cta.description}
        primaryCta={{
          label: dictionary.common.bookCall,
          href: `/${locale}/contact/`,
          analyticsEvent: "case_studies_cta_click",
        }}
        secondaryCta={{
          label: dictionary.common.exploreServices,
          href: `/${locale}/services/`,
        }}
      />

      <JsonLd data={breadcrumb} />
    </>
  );
}
