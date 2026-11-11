/**
 * Campaign attribution (UTM + click-id presence).
 *
 * Privacy rules for this demo:
 * - The URL is read in memory as soon as the page loads. Reading the URL is not
 *   storage, so it does not need consent.
 * - Nothing is written to sessionStorage until analytics/storage consent is
 *   granted. On consent, the current URL is read again so a late decision does
 *   not lose the campaign parameters.
 * - gclid and fbclid are reduced to booleans. Their values are never stored.
 */

export const ATTRIBUTION_STORAGE_KEY = "catalyst-attribution";
export const CONSENT_STORAGE_KEY = "catalyst-consent";

const MAX_VALUE_LENGTH = 120;

export const UTM_KEYS = ["source", "medium", "campaign", "term", "content"] as const;

export type UtmKey = (typeof UTM_KEYS)[number];

export type UtmParams = Partial<Record<UtmKey, string>>;

export type Attribution = {
  utm: UtmParams;
  gclid: boolean;
  fbclid: boolean;
  capturedAt: string;
};

const UTM_PARAM_NAMES: Record<UtmKey, string> = {
  source: "utm_source",
  medium: "utm_medium",
  campaign: "utm_campaign",
  term: "utm_term",
  content: "utm_content",
};

function sanitizeValue(value: string | null): string | undefined {
  if (!value) {
    return undefined;
  }

  const cleaned = value
    .replace(/\p{Cc}/gu, "")
    .replace(/[<>"']/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, MAX_VALUE_LENGTH)
    .trim();

  return cleaned.length > 0 ? cleaned : undefined;
}

/**
 * Reads attribution from a query string. Returns null when there is nothing
 * campaign-related, so events are not padded with empty properties.
 */
export function readAttributionFromSearch(search: string): Attribution | null {
  let params: URLSearchParams;

  try {
    params = new URLSearchParams(search);
  } catch {
    return null;
  }

  const utm: UtmParams = {};

  for (const key of UTM_KEYS) {
    const value = sanitizeValue(params.get(UTM_PARAM_NAMES[key]));

    if (value) {
      utm[key] = value;
    }
  }

  const hasUtm = Object.keys(utm).length > 0;
  const gclid = params.has("gclid");
  const fbclid = params.has("fbclid");

  if (!hasUtm && !gclid && !fbclid) {
    return null;
  }

  return {
    utm,
    gclid,
    fbclid,
    capturedAt: new Date().toISOString(),
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Parses a stored attribution value defensively. Only known keys survive and
 * every string is re-sanitized, so a tampered sessionStorage entry cannot inject
 * markup or unbounded values into a form payload.
 */
export function parseAttribution(raw: string | null): Attribution | null {
  if (!raw) {
    return null;
  }

  let parsed: unknown;

  try {
    parsed = JSON.parse(raw);
  } catch {
    return null;
  }

  if (!isRecord(parsed) || !isRecord(parsed.utm)) {
    return null;
  }

  const utm: UtmParams = {};

  for (const key of UTM_KEYS) {
    const value = parsed.utm[key];

    if (typeof value === "string") {
      const cleaned = sanitizeValue(value);

      if (cleaned) {
        utm[key] = cleaned;
      }
    }
  }

  const hasUtm = Object.keys(utm).length > 0;
  const gclid = parsed.gclid === true;
  const fbclid = parsed.fbclid === true;

  if (!hasUtm && !gclid && !fbclid) {
    return null;
  }

  return {
    utm,
    gclid,
    fbclid,
    capturedAt:
      typeof parsed.capturedAt === "string" ? parsed.capturedAt : new Date().toISOString(),
  };
}

export function readStoredAttribution(): Attribution | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    return parseAttribution(window.sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY));
  } catch {
    return null;
  }
}

/** Only call this after consent has been granted. */
export function persistAttribution(attribution: Attribution): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.sessionStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(attribution));
  } catch {
    // Private mode or a full quota. The in-memory value still works for this page.
  }
}

export function clearAttribution(): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.sessionStorage.removeItem(ATTRIBUTION_STORAGE_KEY);
  } catch {
    // Nothing to clear.
  }
}

/** Hidden form fields. No click-id values, only presence flags. */
export function attributionToHiddenFields(attribution: Attribution | null): Record<string, string> {
  if (!attribution) {
    return {};
  }

  const fields: Record<string, string> = {};

  for (const key of UTM_KEYS) {
    const value = attribution.utm[key];

    if (value) {
      fields[UTM_PARAM_NAMES[key]] = value;
    }
  }

  if (attribution.gclid) {
    fields.gclid_present = "true";
  }

  if (attribution.fbclid) {
    fields.fbclid_present = "true";
  }

  return fields;
}

/** Analytics properties. Same data as the hidden fields, typed for events. */
export function attributionToEventProperties(
  attribution: Attribution | null,
): Record<string, unknown> {
  if (!attribution) {
    return {};
  }

  const properties: Record<string, unknown> = {};

  for (const key of UTM_KEYS) {
    const value = attribution.utm[key];

    if (value) {
      properties[UTM_PARAM_NAMES[key]] = value;
    }
  }

  if (attribution.gclid) {
    properties.gclid_present = true;
  }

  if (attribution.fbclid) {
    properties.fbclid_present = true;
  }

  return properties;
}
