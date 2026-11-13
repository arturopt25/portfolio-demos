import type { Metadata } from "next";

import { Cta, Features, Hero, Section, Testimonials } from "@folio/ui";

import { PlantIllustration } from "@/components/plant-illustration";
import { ServiceIcon } from "@/components/service-icon";
import { CaseStudyGrid } from "@/sections/case-study-grid";
import { ClientsStrip } from "@/sections/clients-strip";
import { ProcessSection } from "@/sections/process-section";
import { StatsSection } from "@/sections/stats-section";
import { contentAdapter } from "@/lib/content-adapter";
import { getDictionary } from "@/lib/dictionary";
import { isLocale, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) {
    return {};
  }

  const page = await contentAdapter.getPage(raw, "home");

  return pageMetadata({
    locale: raw,
    title: page.seo.title,
    description: page.seo.description,
  });
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) {
    return null;
  }

  const locale: Locale = raw;
  const dictionary = getDictionary(locale);
  const page = await contentAdapter.getPage(locale, "home");
  const studies = await contentAdapter.getCaseStudies(locale);

  return (
    <>
      <Hero
        variant="corporate"
        compact
        eyebrow={page.hero.eyebrow}
        title={page.hero.title}
        description={page.hero.description}
        primaryCta={{
          label: dictionary.common.bookCall,
          href: `/${locale}/contact/`,
          analyticsEvent: "home_hero_cta",
        }}
        secondaryCta={{
          label: dictionary.common.viewCaseStudies,
          href: `/${locale}/case-studies/`,
        }}
        media={<PlantIllustration />}
      />

      <ClientsStrip title={page.clients.title} items={page.clients.items} />

      <Features
        id="services"
        eyebrow={page.services.eyebrow}
        title={page.services.title}
        description={page.services.description}
        items={page.services.items.map((service) => ({
          title: service.name,
          description: service.summary,
          icon: <ServiceIcon name={service.icon} className="h-5 w-5" />,
        }))}
      />

      <StatsSection stats={page.stats} />

      <ProcessSection content={page.process} />

      <CaseStudyGrid
        id="case-studies"
        studies={studies}
        locale={locale}
        readLabel={dictionary.caseStudies.read}
        metricLabels={{
          before: dictionary.caseStudies.before,
          after: dictionary.caseStudies.after,
        }}
        heading={{
          eyebrow: page.caseStudies.eyebrow,
          title: page.caseStudies.title,
          description: page.caseStudies.description,
        }}
      />

      <Testimonials
        eyebrow={page.testimonials.eyebrow}
        title={page.testimonials.title}
        items={page.testimonials.items}
      />

      <Cta
        id="contact"
        eyebrow={dictionary.nav.contact}
        title={page.cta.title}
        description={page.cta.description}
        primaryCta={{
          label: dictionary.common.bookCall,
          href: `/${locale}/contact/`,
          analyticsEvent: "home_cta_click",
        }}
        secondaryCta={{
          label: dictionary.common.viewCaseStudies,
          href: `/${locale}/case-studies/`,
        }}
      />

      <Section className="border-t border-border bg-surface py-6">
        <p className="text-center text-xs leading-6 text-muted">{dictionary.footer.legal}</p>
      </Section>
    </>
  );
}
