"use client";

import { useState } from "react";

import { cn } from "../lib/utils";
import type { CtaLink } from "../lib/types";
import { LinkButton } from "./button";
import { CheckIcon } from "./icons";
import { Section, SectionHeading } from "./section";

export type PricingPlan = {
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  features: string[];
  cta: CtaLink;
  highlighted?: boolean;
  badge?: string;
};

export type PricingProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  plans: PricingPlan[];
  labels?: {
    monthly?: string;
    annual?: string;
    perMonth?: string;
    annualNote?: string;
  };
  onBillingChange?: (billing: "monthly" | "annual") => void;
  className?: string;
};

export function Pricing({
  id,
  eyebrow,
  title,
  description,
  plans,
  labels,
  onBillingChange,
  className,
}: PricingProps) {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");

  const monthlyLabel = labels?.monthly ?? "Monthly";
  const annualLabel = labels?.annual ?? "Annual";
  const perMonthLabel = labels?.perMonth ?? "/mo";
  const annualNote = labels?.annualNote ?? "billed annually";

  function changeBilling(next: "monthly" | "annual") {
    setBilling(next);
    onBillingChange?.(next);
  }

  return (
    <Section id={id} className={className}>
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />

        <div
          role="group"
          aria-label="Billing period"
          className="inline-flex self-start rounded-lg border border-border bg-surface p-1"
        >
          <button
            type="button"
            aria-pressed={billing === "monthly"}
            onClick={() => changeBilling("monthly")}
            className={cn(
              "rounded-md px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              billing === "monthly" ? "bg-elevated text-fg shadow-sm" : "text-muted hover:text-fg",
            )}
          >
            {monthlyLabel}
          </button>
          <button
            type="button"
            aria-pressed={billing === "annual"}
            onClick={() => changeBilling("annual")}
            className={cn(
              "rounded-md px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              billing === "annual" ? "bg-elevated text-fg shadow-sm" : "text-muted hover:text-fg",
            )}
          >
            {annualLabel}
          </button>
        </div>
      </div>

      <ul className="mt-10 grid gap-5 sm:mt-14 lg:grid-cols-3">
        {plans.map((plan) => {
          const price = billing === "monthly" ? plan.monthlyPrice : plan.annualPrice;

          return (
            <li key={plan.name}>
              <div
                className={cn(
                  "flex h-full flex-col rounded-xl border bg-elevated p-6 shadow-card",
                  plan.highlighted ? "border-primary ring-1 ring-primary" : "border-border",
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-fg">{plan.name}</h3>
                    <p className="mt-1 text-sm leading-6 text-muted">{plan.description}</p>
                  </div>
                  {plan.badge ? (
                    <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
                      {plan.badge}
                    </span>
                  ) : null}
                </div>

                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-bold tabular-nums tracking-tight text-fg">
                    ${price}
                  </span>
                  <span className="text-sm font-medium text-muted">{perMonthLabel}</span>
                </div>
                <p className="mt-1 min-h-5 text-xs text-muted">
                  {billing === "annual" ? annualNote : "\u00a0"}
                </p>

                <ul className="mt-6 flex-1 space-y-3 border-t border-border pt-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-3 text-sm leading-6 text-muted">
                      <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <LinkButton
                  href={plan.cta.href}
                  variant={plan.highlighted ? "primary" : "secondary"}
                  className="mt-8 w-full"
                >
                  {plan.cta.label}
                </LinkButton>
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
