"use client";

import {
  ContactForm,
  mockFormSubmissionHandler,
  trackEvent,
  type ContactFormLabels,
} from "@folio/ui";

type ContactFormSectionProps = {
  labels: ContactFormLabels;
  privacyHref: string;
  locale: string;
};

export function ContactFormSection({ labels, privacyHref, locale }: ContactFormSectionProps) {
  return (
    <ContactForm
      labels={labels}
      privacyHref={privacyHref}
      hiddenFields={{ locale, source: "corporate-site-contact" }}
      onSubmit={async (payload) => {
        const result = await mockFormSubmissionHandler(payload);

        if (result.ok) {
          trackEvent("contact_form_submit", {
            locale,
            hasCompany: Boolean(payload.values.company),
          });
        }

        return result;
      }}
    />
  );
}
