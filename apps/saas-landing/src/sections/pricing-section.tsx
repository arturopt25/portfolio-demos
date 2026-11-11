"use client";

import { Pricing, trackEvent } from "@folio/ui";

import { pricingPlans } from "@/content/saas";
import { sectionIds } from "@/lib/anchors";

export function PricingSection() {
  return (
    <Pricing
      id={sectionIds.pricing}
      eyebrow="Pricing"
      title="Plans that fit your team."
      description="Simple monthly or annual pricing. Every plan starts with a fictional 14-day trial."
      plans={pricingPlans}
      onBillingChange={(billing) => trackEvent("pricing_billing_change", { billing })}
    />
  );
}
