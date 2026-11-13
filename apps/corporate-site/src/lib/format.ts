import type { Locale } from "./i18n";

export type MetricFormat = "percent" | "number" | "text";

/**
 * A data-driven metric value. Content stores the number plus its format, and
 * pages render it with Intl so English and Spanish stay consistent.
 */
export type MetricValue = {
  format: MetricFormat;
  value?: number;
  text?: string;
  /** Maximum fraction digits. Defaults to 0 for percent, 3 for numbers. */
  fractionDigits?: number;
  suffix?: string;
  /** Use an explicit plus sign for positive values (`+38%`). */
  signed?: boolean;
};

const localeTags: Record<Locale, string> = {
  en: "en-US",
  es: "es-ES",
};

function normalizeMinus(value: string, locale: Locale): string {
  return locale === "es" ? value.replace("-", "\u2212") : value;
}

export function formatNumber(
  value: number,
  locale: Locale,
  options: Intl.NumberFormatOptions = {},
): string {
  return new Intl.NumberFormat(localeTags[locale], options).format(value);
}

export function formatPercent(
  value: number,
  locale: Locale,
  options: Intl.NumberFormatOptions = {},
): string {
  return new Intl.NumberFormat(localeTags[locale], {
    style: "percent",
    maximumFractionDigits: 1,
    ...options,
  }).format(value);
}

export function formatMetric(metric: MetricValue, locale: Locale): string {
  if (metric.format === "text" || typeof metric.value !== "number") {
    return metric.text ?? "";
  }

  if (metric.format === "percent") {
    const formatted = formatPercent(metric.value, locale, {
      maximumFractionDigits: metric.fractionDigits ?? 1,
      signDisplay: metric.signed ? "always" : "auto",
    });

    return `${normalizeMinus(formatted, locale)}${metric.suffix ?? ""}`;
  }

  const formatted = formatNumber(metric.value, locale, {
    maximumFractionDigits: metric.fractionDigits ?? 3,
    useGrouping: "always",
    signDisplay: metric.signed ? "always" : "auto",
  });

  return `${normalizeMinus(formatted, locale)}${metric.suffix ?? ""}`;
}

export function formatDate(value: string | Date, locale: Locale): string {
  return new Intl.DateTimeFormat(localeTags[locale], {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(value));
}
