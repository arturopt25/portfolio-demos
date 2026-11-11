import { Suspense } from "react";

import { CookieBanner, Faq, Features, Footer, Header, Hero, JsonLd } from "@folio/ui";
import { faqJsonLd, softwareApplicationJsonLd } from "@folio/seo";

import { AnalyticsBridge } from "@/components/analytics-bridge";
import { SaasHero } from "@/components/saas-hero";
import { brand, faqItems, features, heroCtas, heroVariants } from "@/content/saas";
import { footerColumns, mainNavLinks, sectionIds } from "@/lib/anchors";
import { LeadFormSection } from "@/sections/lead-form-section";
import { PricingSection } from "@/sections/pricing-section";
import { SocialProof } from "@/sections/social-proof";

const siteUrl = "https://casefern-demo.pages.dev";

const softwareLd = softwareApplicationJsonLd({
  name: brand,
  description:
    "A fictional shared inbox, automations, and reporting demo for modern support teams.",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: siteUrl,
  price: "24",
  priceCurrency: "USD",
});

const faqLd = faqJsonLd(faqItems);

function HeroFallback() {
  return (
    <Hero
      compact
      variant="saas"
      {...heroVariants.a}
      primaryCta={heroCtas.primary}
      secondaryCta={heroCtas.secondary}
    />
  );
}

export default function HomePage() {
  return (
    <>
      <Header
        brand={<span>{brand}</span>}
        links={mainNavLinks}
        cta={{
          label: "Get started",
          href: `#${sectionIds.contact}`,
          analyticsEvent: "header_cta_click",
        }}
      />

      <AnalyticsBridge />

      <main id="main">
        <Suspense fallback={<HeroFallback />}>
          <SaasHero />
        </Suspense>

        <SocialProof />

        <Features
          id={sectionIds.features}
          eyebrow="Why teams switch"
          title="Less busywork. More conversations resolved."
          description="A focused product demo for a fictional SaaS launch. Replace the copy and tokens to rebrand."
          items={features}
        />

        <PricingSection />

        <Faq
          id={sectionIds.faq}
          eyebrow="FAQ"
          title="Questions worth asking."
          description="Short answers for the most common objections."
          items={faqItems}
        />

        <LeadFormSection />
      </main>

      <Footer
        brand={brand}
        description="A fictional B2B SaaS demo built with the Folio starter kit."
        columns={footerColumns}
      />

      <CookieBanner />
      <JsonLd data={[softwareLd, faqLd]} />
    </>
  );
}
