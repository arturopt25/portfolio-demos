"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

import {
  CookieBanner,
  configureAnalytics,
  noopAnalyticsAdapter,
  useConsent,
  type StoredConsent,
} from "@folio/ui";

import {
  CONSENT_STORAGE_KEY,
  clearAttribution,
  persistAttribution,
  readAttributionFromSearch,
  readStoredAttribution,
  type Attribution,
} from "@/lib/attribution";

import { AnalyticsBridge } from "./analytics-bridge";
import { CampaignRuntimeContext } from "./runtime-context";

/**
 * One client runtime for the whole app:
 * - reads the campaign URL into memory immediately (no storage),
 * - persists attribution only after consent,
 * - configures the consent-gated no-op analytics adapter,
 * - renders the shared cookie banner and the delegated click bridge.
 */
export function AppProviders({ children }: { children: ReactNode }) {
  const { consent, updateConsent } = useConsent(CONSENT_STORAGE_KEY);
  const [attribution, setAttribution] = useState<Attribution | null>(null);
  const initialAttribution = useRef<Attribution | null>(null);

  useEffect(() => {
    configureAnalytics(noopAnalyticsAdapter);
  }, []);

  // Memory-only capture. Running before consent is intentional: the URL is not
  // storage, and holding it in memory avoids losing the campaign on a late
  // consent decision or a client-side route change.
  useEffect(() => {
    const current = readAttributionFromSearch(window.location.search);
    initialAttribution.current = current;
    setAttribution(current);
  }, []);

  useEffect(() => {
    if (consent === "granted") {
      // Re-read the current URL so a decision made after landing still captures
      // the parameters. Fall back to the in-memory value, then to the session.
      const current = readAttributionFromSearch(window.location.search);
      const next = current ?? initialAttribution.current ?? readStoredAttribution();

      if (next) {
        persistAttribution(next);
      }

      setAttribution(next);
      return;
    }

    if (consent === "denied") {
      clearAttribution();
      setAttribution(initialAttribution.current);
      return;
    }

    setAttribution(initialAttribution.current);
  }, [consent]);

  const handleDecision = useCallback(
    (value: StoredConsent) => {
      updateConsent(value);
    },
    [updateConsent],
  );

  return (
    <CampaignRuntimeContext.Provider value={{ attribution, consent }}>
      {children}
      <CookieBanner
        storageKey={CONSENT_STORAGE_KEY}
        title="Cookies & campaign tracking"
        description="This demo uses a no-op analytics adapter. Accept to keep UTM campaign values for this tab and attach them to form submissions and demo events. Reject and nothing is written to sessionStorage."
        acceptLabel="Accept tracking"
        rejectLabel="Reject"
        policyHref="/privacy/"
        policyLabel="Privacy notice"
        onDecision={handleDecision}
      />
      <AnalyticsBridge />
    </CampaignRuntimeContext.Provider>
  );
}
