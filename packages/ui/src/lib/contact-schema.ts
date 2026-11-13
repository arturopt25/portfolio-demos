import { z } from "zod";

export type ContactFormValidationMessages = {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
  consent?: string;
};

export function createContactFormSchema(messages: ContactFormValidationMessages = {}) {
  return z.object({
    name: z.string().min(2, messages.name ?? "Please enter your name."),
    email: z.string().email(messages.email ?? "Please enter a valid email address."),
    company: z
      .string()
      .max(120, messages.company ?? "Company name is too long.")
      .optional()
      .or(z.literal("")),
    message: z
      .string()
      .min(10, messages.message ?? "Please tell us a little more (at least 10 characters)."),
    consent: z.boolean().refine((value) => value, {
      message: messages.consent ?? "Please accept the privacy policy to continue.",
    }),
  });
}

export const contactFormSchema = createContactFormSchema();

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const emptyContactFormValues: ContactFormValues = {
  name: "",
  email: "",
  company: "",
  message: "",
  consent: false,
};
