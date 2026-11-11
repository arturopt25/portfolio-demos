"use client";

import { useCallback, useEffect, useState } from "react";

import { setAnalyticsConsent, type AnalyticsConsent } from "./analytics";

export const DEFAULT_CONSENT_STORAGE_KEY = "folio-consent";

export type StoredConsent = Exclude<AnalyticsConsent, "unknown">;

function readStoredConsent(storageKey: string): AnalyticsConsent {
  if (typeof window === "undefined") {
    return "unknown";
  }

  try {
    const value = window.localStorage.getItem(storageKey);
    return value === "granted" || value === "denied" ? value : "unknown";
  } catch {
    return "unknown";
  }
}

export function useConsent(storageKey = DEFAULT_CONSENT_STORAGE_KEY): {
  consent: AnalyticsConsent;
  updateConsent: (value: StoredConsent) => void;
} {
  const [consent, setConsent] = useState<AnalyticsConsent>("unknown");

  useEffect(() => {
    const stored = readStoredConsent(storageKey);
    setConsent(stored);
    setAnalyticsConsent(stored);
  }, [storageKey]);

  const updateConsent = useCallback(
    (value: StoredConsent) => {
      try {
        window.localStorage.setItem(storageKey, value);
      } catch {
        // Storage can be unavailable in private mode. Consent still applies for this session.
      }

      setConsent(value);
      setAnalyticsConsent(value);
    },
    [storageKey],
  );

  return { consent, updateConsent };
}
