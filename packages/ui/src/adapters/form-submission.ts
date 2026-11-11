import type { ContactFormValues } from "../lib/contact-schema";

export type FormSubmissionPayload = {
  values: ContactFormValues;
  hidden: Record<string, string>;
};

export type FormSubmissionResult = { ok: true } | { ok: false; message: string };

export type FormSubmissionHandler = (
  payload: FormSubmissionPayload,
) => Promise<FormSubmissionResult>;

/**
 * Default adapter. Swap this for a real endpoint (Formspree, Basin, etc.)
 * without touching the ContactForm component.
 */
export const mockFormSubmissionHandler: FormSubmissionHandler = async ({ values, hidden }) => {
  await new Promise((resolve) => setTimeout(resolve, 350));

  console.info("[folio/ui] Mock form submission", {
    ...values,
    hidden,
  });

  return { ok: true };
};
