import { Faq, Features, Hero, JsonLd, Testimonials } from "@folio/ui";
import { faqJsonLd, organizationJsonLd, websiteJsonLd } from "@folio/seo";

import { LeadFormSection } from "@/components/lead-form-section";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { ThemeShowcase } from "@/components/theme-showcase";
import { brand } from "@/content/brand";
import {
  benefits,
  faqItems,
  heroCopy,
  heroCta,
  sectionIds,
  testimonials,
} from "@/content/campaign";
import { HowItWorks, OfferTeaser, StatsStrip } from "@/sections/page-sections";

const organization = organizationJsonLd({
  name: brand.name,
  url: brand.baseUrl,
  logo: `${brand.baseUrl}/icon.svg`,
  description: brand.description,
});

const website = websiteJsonLd({
  name: brand.name,
  url: `${brand.baseUrl}/`,
  inLanguage: "en",
  description: brand.tagline,
});

const faqLd = faqJsonLd(faqItems);

export default function HomePage() {
  return (
    <>
      <SiteHeader />

      <main id="main">
        <Hero
          variant="agency"
          eyebrow={heroCopy.eyebrow}
          title={heroCopy.title}
          description={heroCopy.description}
          primaryCta={heroCta}
          media={<ThemeShowcase />}
          mediaAspect="wide"
        />

        <StatsStrip />

        <Testimonials
          eyebrow="Social proof (fictional)"
          title="Fictional teams, familiar campaign problems."
          description="Every quote below is invented for this demo. The pattern is the point: a focused page, a fast handoff, and a clean conversion path."
          items={testimonials}
        />

        <Features
          id={sectionIds.benefits}
          eyebrow="Why it works"
          title="A campaign page with one job."
          description="Fewer sections, clearer intent, and a theme layer that lets the same page serve different campaigns."
          items={benefits}
        />

        <HowItWorks />

        <OfferTeaser />

        <Faq
          id={sectionIds.faq}
          eyebrow="FAQ"
          title="Questions worth asking."
          description="Short answers for the objections that usually slow a campaign down."
          items={faqItems}
        />

        <LeadFormSection />
      </main>

      <SiteFooter />

      <JsonLd data={[organization, website, faqLd]} />
    </>
  );
}
