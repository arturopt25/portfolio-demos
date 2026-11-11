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
    }),
  );

  return (
    <>
      <Section className="pt-6 pb-0">
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
          <h2 className="font-display text-fg text-3xl font-bold tracking-tight sm:text-4xl">
            {page.intro.title}
          </h2>
          {page.intro.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-muted mt-4 text-base leading-7">
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
              className="border-border bg-elevated shadow-card rounded-xl border p-6 sm:p-8"
            >
              <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr] lg:gap-10">
                <div>
                  <div className="bg-primary-soft text-primary flex h-11 w-11 items-center justify-center rounded-md">
                    <ServiceIcon name={service.icon} className="h-5 w-5" />
                  </div>
                  <span
                    id={service.slug}
                    className="block h-0 scroll-mt-[5.5rem]"
                    aria-hidden="true"
                  />
                  <h2 className="font-display text-fg mt-4 text-2xl font-bold tracking-tight">
                    {service.name}
                  </h2>
                  <p className="text-muted mt-2 text-base leading-7">{service.summary}</p>
                </div>
                <div>
                  <p className="text-muted text-base leading-7">{service.description}</p>
                  <h3 className="text-fg mt-5 text-sm font-semibold">
                    {dictionary.services.outcomes}
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {service.outcomes.map((outcome) => (
                      <li key={outcome} className="text-muted flex gap-2 text-sm leading-6">
                        <CheckIcon className="text-primary mt-0.5 h-4 w-4 shrink-0" />
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
