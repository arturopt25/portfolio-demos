"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";

import {
  ContactForm,
  Section,
  SectionHeading,
  mockFormSubmissionHandler,
  trackEvent,
  type FormSubmissionHandler,
} from "@folio/ui";

import { contactDetails, formLabels, sectionIds } from "@/content/campaign";
import { attributionToEventProperties, attributionToHiddenFields } from "@/lib/attribution";

import { useCampaignRuntime } from "./runtime-context";

export function LeadFormSection() {
  const { attribution } = useCampaignRuntime();
  const router = useRouter();
  const formStarted = useRef(false);

  const hiddenFields = attributionToHiddenFields(attribution);

  const submit: FormSubmissionHandler = async (payload) => {
    // Rebuild the hidden fields at submit time so a late attribution update is
    // included even if the hidden inputs rendered before hydration.
    const result = await mockFormSubmissionHandler({
      values: payload.values,
      hidden: { ...payload.hidden, ...hiddenFields },
    });

    if (result.ok) {
      trackEvent("form_submit", {
        hasCompany: Boolean(payload.values.company),
        ...attributionToEventProperties(attribution),
      });

      // Show the shared success state briefly, then navigate client-side.
      // The destination is static and carries no personal data.
      window.setTimeout(() => {
        router.push("/thank-you/");
      }, 900);
    }

    return result;
  };

  function handleFormStart() {
    if (formStarted.current) {
      return;
    }

    formStarted.current = true;
    trackEvent("form_start", attributionToEventProperties(attribution));
  }

  return (
    <Section id={sectionIds.contact} className="bg-surface">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Next step"
            title="Tell us what you are launching."
            description="A short brief is enough. This demo uses a mock form adapter, so nothing is transmitted, stored, or sent to a third party."
          />

          <dl className="mt-8 space-y-4 text-sm text-muted">
            {contactDetails.map((detail) => (
              <div key={detail.label}>
                <dt className="font-semibold text-fg">{detail.label}</dt>
                <dd className="mt-1">{detail.value}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-8 border-t border-border pt-5 text-xs leading-6 text-muted">
            Fictional demo. No real client, campaign, or personal data is collected.
          </p>
        </div>

        <div
          className="rounded-xl border border-border bg-elevated p-6 shadow-card sm:p-8"
          onFocusCapture={handleFormStart}
          onChangeCapture={handleFormStart}
        >
          <ContactForm
            labels={formLabels}
            privacyHref="/privacy/"
            hiddenFields={hiddenFields}
            onSubmit={submit}
          />
        </div>
      </div>
    </Section>
  );
}
