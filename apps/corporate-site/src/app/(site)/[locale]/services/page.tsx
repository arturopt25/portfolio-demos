import type { Metadata } from "next";

import { breadcrumbJsonLd, serviceJsonLd } from "@folio/seo";
import { CheckIcon, Cta, Hero, JsonLd, Section } from "@folio/ui";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { ServiceIcon } from "@/components/service-icon";
import { ProcessSection } from "@/sections/process-section";
import { brand } from "@/content/brand";
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

  const page = await contentAdapter.getPage(raw, "services");

  return pageMetadata({
    locale: raw,
    path: "/services",
    title: page.seo.title,
    description: page.seo.description,
  });
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) {
    return null;
  }

  const locale: Locale = raw;
  const dictionary = getDictionary(locale);
  const page = await contentAdapter.getPage(locale, "services");

  const breadcrumb = breadcrumbJsonLd([
    { name: dictionary.common.home, url: pageUrl(locale) },
    { name: dictionary.nav.services, url: pageUrl(locale, "/services") },
  ]);

  const servicesLd = page.services.map((service) =>
    serviceJsonLd({
      name: service.name,
      description: service.summary,
      providerName: brand.name,
      providerUrl: brand.baseUrl,
      inLanguage: locale,
    }),
  );

  return (
    <>
      <Section className="pb-0 pt-6">
        <Breadcrumbs
          label={dictionary.a11y.breadcrumb}
          items={[
            { label: dictionary.common.home, href: `/${locale}/` },
            { label: dictionary.nav.services },
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
          analyticsEvent: "services_hero_cta",
        }}
        secondaryCta={{
          label: dictionary.common.viewCaseStudies,
          href: `/${locale}/case-studies/`,
        }}
      />

      <Section>
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-3xl font-bold tracking-tight text-fg sm:text-4xl">
            {page.intro.title}
          </h2>
          {page.intro.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mt-4 text-base leading-7 text-muted">
              {paragraph}
            </p>
          ))}
        </div>
      </Section>

      <Section className="bg-surface">
        <div className="grid gap-6">
          {page.services.map((service) => (
            <article
              key={service.slug}
              className="rounded-xl border border-border bg-elevated p-6 shadow-card sm:p-8"
            >
              <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr] lg:gap-10">
                <div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-md bg-primary-soft text-primary">
                    <ServiceIcon name={service.icon} className="h-5 w-5" />
                  </div>
                  <span
                    id={service.slug}
                    className="block h-0 scroll-mt-[5.5rem]"
                    aria-hidden="true"
                  />
                  <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-fg">
                    {service.name}
                  </h2>
                  <p className="mt-2 text-base leading-7 text-muted">{service.summary}</p>
                </div>
                <div>
                  <p className="text-base leading-7 text-muted">{service.description}</p>
                  <h3 className="mt-5 text-sm font-semibold text-fg">
                    {dictionary.services.outcomes}
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {service.outcomes.map((outcome) => (
                      <li key={outcome} className="flex gap-2 text-sm leading-6 text-muted">
                        <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        {outcome}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <ProcessSection content={page.process} />

      <Cta
        eyebrow={dictionary.nav.services}
        title={page.cta.title}
        description={page.cta.description}
        primaryCta={{
          label: dictionary.common.bookCall,
          href: `/${locale}/contact/`,
          analyticsEvent: "services_cta_click",
        }}
        secondaryCta={{
          label: dictionary.common.viewCaseStudies,
          href: `/${locale}/case-studies/`,
        }}
      />

      <JsonLd data={[breadcrumb, ...servicesLd]} />
    </>
  );
}
