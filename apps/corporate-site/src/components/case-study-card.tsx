import Link from "next/link";

import { ArrowRightIcon } from "@folio/ui";

import type { CaseStudySummary } from "@/lib/content-adapter";
import { formatMetric } from "@/lib/format";
import { localizePath, type Locale } from "@/lib/i18n";

type CaseStudyCardProps = {
  study: CaseStudySummary;
  locale: Locale;
  readLabel: string;
  metricLabels: { before: string; after: string };
};

export function CaseStudyCard({ study, locale, readLabel, metricLabels }: CaseStudyCardProps) {
  const href = localizePath(locale, `/case-studies/${study.slug}`);

  return (
    <article className="flex h-full flex-col rounded-lg border border-border bg-elevated p-6 shadow-card">
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
          {study.sector}
        </span>
        <span className="shrink-0 text-xs text-muted">{study.year}</span>
      </div>

      <h3 className="mt-3 text-lg font-semibold tracking-tight text-fg">
        <Link
          href={href}
          className="rounded-sm underline-offset-4 transition-colors hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {study.title}
        </Link>
      </h3>

      <p className="mt-2 flex-1 text-sm leading-6 text-muted">{study.summary}</p>

      <dl className="mt-5 space-y-2 text-sm">
        {study.metrics.slice(0, 3).map((metric) => (
          <div
            key={metric.label}
            className="flex items-baseline justify-between gap-3 border-t border-border pt-2"
          >
            <dt className="text-muted">{metric.label}</dt>
            <dd className="shrink-0 font-semibold tabular-nums text-fg">
              <span className="sr-only">{metricLabels.before}: </span>
              <span className="font-normal text-muted">{formatMetric(metric.before, locale)}</span>
              <span aria-hidden="true" className="mx-1 text-muted">
                →
              </span>
              <span className="sr-only">{metricLabels.after}: </span>
              {formatMetric(metric.after, locale)}
            </dd>
          </div>
        ))}
      </dl>

      <Link
        href={href}
        className="mt-6 inline-flex items-center gap-1 self-start rounded-sm text-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {readLabel}
        <ArrowRightIcon className="h-4 w-4" />
      </Link>
    </article>
  );
}
