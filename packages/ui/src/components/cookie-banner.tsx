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
      <div className="border-border bg-elevated shadow-float mx-auto max-w-3xl rounded-lg border p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xl">
            <h2 className="text-fg text-sm font-semibold">{title}</h2>
            <p className="text-muted mt-1 text-sm leading-6">{description}</p>
            <a
              href={policyHref}
              className="text-primary focus-visible:ring-ring mt-2 inline-block rounded-sm text-sm font-medium underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:outline-none"
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
