export type AnalyticsConsent = "granted" | "denied" | "unknown";

export type AnalyticsEvent = {
  name: string;
  properties?: Record<string, unknown>;
};

export type AnalyticsAdapter = {
  track: (event: AnalyticsEvent) => void;
};

export const noopAnalyticsAdapter: AnalyticsAdapter = {
  track: () => {
    // Intentionally empty: default no-op provider.
  },
};

let adapter: AnalyticsAdapter | null = null;
let consent: AnalyticsConsent = "unknown";

export function configureAnalytics(nextAdapter: AnalyticsAdapter | null): void {
  adapter = nextAdapter;
}

export function setAnalyticsConsent(nextConsent: AnalyticsConsent): void {
  consent = nextConsent;
}

export function trackEvent(name: string, properties?: Record<string, unknown>): void {
  if (consent !== "granted" || !adapter) {
    return;
  }

  try {
    adapter.track({ name, properties });
  } catch (error) {
    console.warn("[folio/ui] Analytics adapter failed", error);
  }
}

export function useAnalytics(): { trackEvent: typeof trackEvent } {
  return { trackEvent };
}
