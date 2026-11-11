"use client";

import { useEffect, useState } from "react";

import { cn } from "../lib/utils";
import { Button } from "./button";
import { useConsent, type StoredConsent } from "../hooks/use-consent";

export type CookieBannerProps = {
  storageKey?: string;
  title?: string;
  description?: string;
  acceptLabel?: string;
  rejectLabel?: string;
  policyHref?: string;
  policyLabel?: string;
  onDecision?: (value: StoredConsent) => void;
  className?: string;
};

export function CookieBanner({
  storageKey,
  title = "Cookies & privacy",
  description = "We use a privacy-friendly analytics setup. You can accept or reject optional cookies.",
  acceptLabel = "Accept",
  rejectLabel = "Reject",
  policyHref = "/privacy/",
  policyLabel = "Privacy policy",
  onDecision,
  className,
}: CookieBannerProps) {
  const { consent, updateConsent } = useConsent(storageKey);
  const [mounted, setMounted] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || dismissed || consent !== "unknown") {
    return null;
  }

  function decide(value: StoredConsent) {
    updateConsent(value);
    setDismissed(true);
    onDecision?.(value);
  }

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className={cn("fixed inset-x-0 bottom-0 z-50 p-4", className)}
    >
      <div className="mx-auto max-w-3xl rounded-lg border border-border bg-elevated p-5 shadow-float">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xl">
            <h2 className="text-sm font-semibold text-fg">{title}</h2>
            <p className="mt-1 text-sm leading-6 text-muted">{description}</p>
            <a
              href={policyHref}
              className="mt-2 inline-block rounded-sm text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {policyLabel}
            </a>
          </div>
          <div className="flex shrink-0 gap-2">
            <Button variant="secondary" size="sm" onClick={() => decide("denied")}>
              {rejectLabel}
            </Button>
            <Button size="sm" onClick={() => decide("granted")}>
              {acceptLabel}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
