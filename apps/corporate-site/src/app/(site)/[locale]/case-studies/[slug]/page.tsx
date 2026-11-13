import type { Metadata } from "next";

import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";

import { breadcrumbJsonLd } from "@folio/seo";
import { Cta, JsonLd, LinkButton, Section } from "@folio/ui";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { mdxComponents } from "@/components/mdx-components";
import { brand } from "@/content/brand";
import { contentAdapter } from "@/lib/content-adapter";
import { getDictionary } from "@/lib/dictionary";
import { formatDate, formatMetric } from "@/lib/format";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { pageMetadata, pageUrl } from "@/lib/seo";

export const dynamicParams = false;

export async function generateStaticParams() {
  const entries = await Promise.all(
    locales.map(async (locale) => {
      const studies = await contentAdapter.getCaseStudies(locale);

      return studies.map((study) => ({ locale, slug: study.slug }));
    }),
  );

  return entries.flat();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) {
    return {};
  }

  const study = await contentAdapter.getCaseStudy(raw, slug);

  if (!study) {
    return {};
  }

  return pageMetadata({
    locale: raw,
    path: `/case-studies/${study.slug}`,
    title: `${study.title} — ${brand.name}`,
    description: study.summary,
  });
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) {
    return null;
  }

  const locale: Locale = raw;
  const dictionary = getDictionary(locale);
  const study = await contentAdapter.getCaseStudy(locale, slug);

  if (!study) {
    notFound();
  }

  const publishedLabel = formatDate(study.publishedAt, locale);

  const breadcrumb = breadcrumbJsonLd([
    { name: dictionary.common.home, url: pageUrl(locale) },
    { name: dictionary.nav.caseStudies, url: pageUrl(locale, "/case-studies") },
    {
      name: study.title,
      url: pageUrl(locale, `/case-studies/${study.slug}`),
    },
  ]);

  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: study.title,
    description: study.summary,
    datePublished: study.publishedAt,
    dateModified: study.publishedAt,
    inLanguage: locale,
    author: {
      "@type": "Organization",
      name: brand.name,
      url: brand.baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: brand.name,
      url: brand.baseUrl,
      logo: {
        "@type": "ImageObject",
        url: `${brand.baseUrl}/icon.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl(locale, `/case-studies/${study.slug}`),
    },
    about: study.sector,
    articleSection: dictionary.nav.caseStudies,
  };

  return (
    <>
      <Section className="pb-0 pt-6">
        <Breadcrumbs
          label={dictionary.a11y.breadcrumb}
          items={[
            { label: dictionary.common.home, href: `/${locale}/` },
            { label: dictionary.nav.caseStudies, href: `/${locale}/case-studies/` },
            { label: study.title },
          ]}
        />
      </Section>

      <Section className="pt-8">
        <article className="mx-auto max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            {study.sector} · {study.year}
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-fg sm:text-5xl">
            {study.title}
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">{study.summary}</p>

          <dl className="mt-8 grid gap-4 border-y border-border py-5 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-muted">{dictionary.caseStudies.client}</dt>
              <dd className="mt-1 font-semibold text-fg">{study.client}</dd>
            </div>
            <div>
              <dt className="text-muted">{dictionary.caseStudies.published}</dt>
              <dd className="mt-1 font-semibold text-fg">
                <time dateTime={study.publishedAt}>{publishedLabel}</time>
              </dd>
            </div>
          </dl>

          <h2 className="mt-10 font-display text-2xl font-bold tracking-tight text-fg">
            {dictionary.caseStudies.metrics}
          </h2>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse border-border text-left text-sm">
              <caption className="sr-only">{dictionary.caseStudies.metrics}</caption>
              <thead>
                <tr className="border-b border-border">
                  <th scope="col" className="py-3 pr-4 font-semibold">
                    {dictionary.caseStudies.metrics}
                  </th>
                  <th scope="col" className="py-3 pr-4 font-semibold">
                    {dictionary.caseStudies.before}
                  </th>
                  <th scope="col" className="py-3 font-semibold">
                    {dictionary.caseStudies.after}
                  </th>
                </tr>
              </thead>
              <tbody>
                {study.metrics.map((metric) => (
                  <tr key={metric.label} className="border-b border-border last:border-0">
                    <th scope="row" className="py-3 pr-4 font-medium text-muted">
                      {metric.label}
                    </th>
                    <td className="py-3 pr-4 tabular-nums">
                      {formatMetric(metric.before, locale)}
                    </td>
                    <td className="py-3 font-semibold tabular-nums text-fg">
                      {formatMetric(metric.after, locale)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-10">
            <MDXRemote source={study.body} components={mdxComponents} />
          </div>

          <p className="mt-10 border-t border-border pt-6 text-sm leading-6 text-muted">
            {dictionary.caseStudies.fictional}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <LinkButton href={`/${locale}/case-studies/`} variant="secondary">
              {dictionary.common.allCaseStudies}
            </LinkButton>
            <LinkButton href={`/${locale}/contact/`}>{dictionary.common.bookCall}</LinkButton>
          </div>
        </article>
      </Section>

      <Cta
        eyebrow={dictionary.nav.caseStudies}
        title={dictionary.caseStudies.ctaTitle}
        description={dictionary.caseStudies.ctaDescription}
        primaryCta={{
          label: dictionary.common.bookCall,
          href: `/${locale}/contact/`,
          analyticsEvent: "case_study_cta_click",
        }}
        secondaryCta={{
          label: dictionary.common.exploreServices,
          href: `/${locale}/services/`,
        }}
      />

      <JsonLd data={[breadcrumb, article]} />
    </>
  );
}
