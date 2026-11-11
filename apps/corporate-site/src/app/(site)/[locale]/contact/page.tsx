import type { Metadata } from "next";

import { breadcrumbJsonLd } from "@folio/seo";
import { Cta, Hero, JsonLd, Section } from "@folio/ui";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { ContactFormSection } from "@/components/contact-form-section";
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

  const page = await contentAdapter.getPage(raw, "contact");

  return pageMetadata({
    locale: raw,
    path: "/contact",
    title: page.seo.title,
    description: page.seo.description,
  });
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) {
    return null;
  }

  const locale: Locale = raw;
  const dictionary = getDictionary(locale);
  const page = await contentAdapter.getPage(locale, "contact");

  const breadcrumb = breadcrumbJsonLd([
    { name: dictionary.common.home, url: pageUrl(locale) },
    { name: dictionary.nav.contact, url: pageUrl(locale, "/contact") },
  ]);

  return (
    <>
      <Section className="pb-0 pt-6">
        <Breadcrumbs
          label={dictionary.a11y.breadcrumb}
          items={[
            { label: dictionary.common.home, href: `/${locale}/` },
            { label: dictionary.nav.contact },
          ]}
        />
      </Section>

      <Hero
        variant="corporate"
        compact
        eyebrow={page.hero.eyebrow}
        title={page.hero.title}
        description={page.hero.description}
        secondaryCta={{
          label: dictionary.common.viewCaseStudies,
          href: `/${locale}/case-studies/`,
        }}
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-fg sm:text-3xl">
              {dictionary.contact.detailsTitle}
            </h2>
            <dl className="mt-8 space-y-5 text-sm">
              {page.details.map((detail) => (
                <div key={detail.label}>
                  <dt className="font-semibold text-fg">{detail.label}</dt>
                  <dd className="mt-1 leading-6 text-muted">
                    {detail.href ? (
                      <a
                        href={detail.href}
                        className="rounded-sm underline-offset-4 transition-colors hover:text-fg hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        {detail.value}
                      </a>
                    ) : (
                      detail.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-xl border border-border bg-elevated p-6 shadow-card sm:p-8">
            <h2 className="font-display text-2xl font-bold tracking-tight text-fg">
              {page.form.title}
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted">{page.form.description}</p>
            <div className="mt-6">
              <ContactFormSection
                locale={locale}
                privacyHref={`/${locale}/privacy/`}
                labels={{
                  name: dictionary.form.name,
                  email: dictionary.form.email,
                  company: dictionary.form.company,
                  message: dictionary.form.message,
                  consent: dictionary.form.consent,
                  privacy: dictionary.form.privacy,
                  submit: dictionary.form.submit,
                  submitting: dictionary.form.submitting,
                  success: dictionary.form.success,
                  error: dictionary.form.error,
                }}
              />
            </div>
          </div>
        </div>
      </Section>

      <Cta
        eyebrow={dictionary.nav.contact}
        title={page.cta.title}
        description={page.cta.description}
        primaryCta={{
          label: dictionary.common.viewCaseStudies,
          href: `/${locale}/case-studies/`,
          analyticsEvent: "contact_cta_click",
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
