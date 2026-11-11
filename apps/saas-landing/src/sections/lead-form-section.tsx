"use client";

import {
  ContactForm,
  Section,
  SectionHeading,
  mockFormSubmissionHandler,
  trackEvent,
  type FormSubmissionHandler,
} from "@folio/ui";

import { sectionIds } from "@/lib/anchors";

const submitLead: FormSubmissionHandler = async (payload) => {
  const result = await mockFormSubmissionHandler(payload);

  if (result.ok) {
    trackEvent("lead_form_submit", {
      hasCompany: Boolean(payload.values.company),
    });
  }

  return result;
};

export function LeadFormSection() {
  return (
    <Section id={sectionIds.contact} className="bg-surface">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title="Talk to the Casefern team."
            description="Tell us about your support workflow and we will show you the parts of Casefern that fit. This demo uses a mock adapter, so nothing is sent."
          />
          <dl className="text-muted mt-8 space-y-4 text-sm">
            <div>
              <dt className="text-fg font-semibold">Email</dt>
              <dd className="mt-1">hello@casefern.example</dd>
            </div>
            <div>
              <dt className="text-fg font-semibold">Response time</dt>
              <dd className="mt-1">Within one business day (fictional).</dd>
            </div>
            <div>
              <dt className="text-fg font-semibold">No spam</dt>
              <dd className="mt-1">
                This is a portfolio demo. Your message is not stored or transmitted.
              </dd>
            </div>
          </dl>
        </div>

        <div className="border-border bg-elevated shadow-card rounded-xl border p-6 sm:p-8">
          <ContactForm onSubmit={submitLead} />
        </div>
      </div>
    </Section>
  );
}
