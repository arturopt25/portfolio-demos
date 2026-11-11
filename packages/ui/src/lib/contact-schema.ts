import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Please enter a valid email address."),
  company: z.string().max(120, "Company name is too long.").optional().or(z.literal("")),
  message: z.string().min(10, "Please tell us a little more (at least 10 characters)."),
  consent: z.boolean().refine((value) => value, {
    message: "Please accept the privacy policy to continue.",
  }),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const emptyContactFormValues: ContactFormValues = {
  name: "",
  email: "",
  company: "",
  message: "",
  consent: false,
};
