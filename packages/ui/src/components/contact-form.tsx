"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useId, useState } from "react";
import { useForm } from "react-hook-form";

import {
  emptyContactFormValues,
  contactFormSchema,
  type ContactFormValues,
} from "../lib/contact-schema";
import { cn } from "../lib/utils";
import { mockFormSubmissionHandler, type FormSubmissionHandler } from "../adapters/form-submission";
import { Button } from "./button";

export type ContactFormLabels = {
  name: string;
  email: string;
  company: string;
  message: string;
  consent: string;
  privacy: string;
  submit: string;
  submitting: string;
  success: string;
  error: string;
};

const defaultLabels: ContactFormLabels = {
  name: "Name",
  email: "Email",
  company: "Company (optional)",
  message: "How can we help?",
  consent: "I agree to the",
  privacy: "privacy policy",
  submit: "Send message",
  submitting: "Sending...",
  success: "Thanks! Your message has been received. We will be in touch shortly.",
  error: "Something went wrong. Please try again.",
};

export type ContactFormProps = {
  onSubmit?: FormSubmissionHandler;
  labels?: Partial<ContactFormLabels>;
  hiddenFields?: Record<string, string>;
  privacyHref?: string;
  className?: string;
};

const inputStyles =
  "mt-2 block w-full rounded-md border border-border bg-elevated px-3 py-2.5 text-sm text-fg shadow-sm transition-colors placeholder:text-muted/70 focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export function ContactForm({
  onSubmit = mockFormSubmissionHandler,
  labels: labelOverrides,
  hiddenFields = {},
  privacyHref = "/privacy/",
  className,
}: ContactFormProps) {
  const labels = { ...defaultLabels, ...labelOverrides };
  const formId = useId();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: emptyContactFormValues,
    mode: "onBlur",
  });

  const submit = handleSubmit(async (values) => {
    setStatus("idle");
    setServerError(null);

    try {
      const result = await onSubmit({ values, hidden: hiddenFields });

      if (result.ok) {
        reset(emptyContactFormValues);
        setStatus("success");
        return;
      }

      setServerError(result.message);
      setStatus("error");
    } catch {
      setServerError(labels.error);
      setStatus("error");
    }
  });

  const fieldId = (name: keyof ContactFormValues) => `${formId}-${name}`;
  const errorId = (name: keyof ContactFormValues) => `${formId}-${name}-error`;

  return (
    <form noValidate onSubmit={submit} className={cn("space-y-5", className)}>
      {Object.entries(hiddenFields).map(([name, value]) => (
        <input key={name} type="hidden" name={name} value={value} />
      ))}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={fieldId("name")} className="block text-sm font-medium text-fg">
            {labels.name}
          </label>
          <input
            id={fieldId("name")}
            type="text"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? errorId("name") : undefined}
            className={inputStyles}
            {...register("name")}
          />
          {errors.name ? (
            <p id={errorId("name")} className="mt-1 text-sm text-danger">
              {errors.name.message}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor={fieldId("email")} className="block text-sm font-medium text-fg">
            {labels.email}
          </label>
          <input
            id={fieldId("email")}
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? errorId("email") : undefined}
            className={inputStyles}
            {...register("email")}
          />
          {errors.email ? (
            <p id={errorId("email")} className="mt-1 text-sm text-danger">
              {errors.email.message}
            </p>
          ) : null}
        </div>
      </div>

      <div>
        <label htmlFor={fieldId("company")} className="block text-sm font-medium text-fg">
          {labels.company}
        </label>
        <input
          id={fieldId("company")}
          type="text"
          autoComplete="organization"
          aria-invalid={Boolean(errors.company)}
          aria-describedby={errors.company ? errorId("company") : undefined}
          className={inputStyles}
          {...register("company")}
        />
        {errors.company ? (
          <p id={errorId("company")} className="mt-1 text-sm text-danger">
            {errors.company.message}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor={fieldId("message")} className="block text-sm font-medium text-fg">
          {labels.message}
        </label>
        <textarea
          id={fieldId("message")}
          rows={5}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? errorId("message") : undefined}
          className={inputStyles}
          {...register("message")}
        />
        {errors.message ? (
          <p id={errorId("message")} className="mt-1 text-sm text-danger">
            {errors.message.message}
          </p>
        ) : null}
      </div>

      <div>
        <div className="flex items-start gap-3">
          <input
            id={fieldId("consent")}
            type="checkbox"
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? errorId("consent") : undefined}
            className="mt-1 h-4 w-4 rounded border-border text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            {...register("consent")}
          />
          <label htmlFor={fieldId("consent")} className="text-sm leading-6 text-muted">
            {labels.consent}{" "}
            <a
              href={privacyHref}
              className="rounded-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {labels.privacy}
            </a>
            .
          </label>
        </div>
        {errors.consent ? (
          <p id={errorId("consent")} className="mt-1 text-sm text-danger">
            {errors.consent.message}
          </p>
        ) : null}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? labels.submitting : labels.submit}
      </Button>

      {status === "success" ? (
        <p role="status" className="text-sm font-medium text-success">
          {labels.success}
        </p>
      ) : null}

      {status === "error" ? (
        <p role="alert" className="text-sm font-medium text-danger">
          {serverError ?? labels.error}
        </p>
      ) : null}
    </form>
  );
}
