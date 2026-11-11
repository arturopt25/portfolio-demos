import Link from "next/link";

import { ArrowRightIcon } from "@folio/ui";

import type { CaseStudySummary } from "@/lib/content-adapter";
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
    <article className="border-border bg-elevated shadow-card flex h-full flex-col rounded-lg border p-6">
      <div className="flex items-center justify-between gap-3">
        <span className="text-primary text-xs font-semibold tracking-[0.16em] uppercase">
          {study.sector}
        </span>
        <span className="text-muted shrink-0 text-xs">{study.year}</span>
      </div>

      <h3 className="text-fg mt-3 text-lg font-semibold tracking-tight">
        <Link
          href={href}
          className="hover:text-primary focus-visible:ring-ring rounded-sm underline-offset-4 transition-colors hover:underline focus-visible:ring-2 focus-visible:outline-none"
        >
          {study.title}
        </Link>
      </h3>

      <p className="text-muted mt-2 flex-1 text-sm leading-6">{study.summary}</p>

      <dl className="mt-5 space-y-2 text-sm">
        {study.metrics.slice(0, 3).map((metric) => (
          <div
            key={metric.label}
            className="border-border flex items-baseline justify-between gap-3 border-t pt-2"
          >
            <dt className="text-muted">{metric.label}</dt>
            <dd className="text-fg shrink-0 font-semibold tabular-nums">
              <span className="sr-only">{metricLabels.before}: </span>
              <span className="text-muted font-normal">{metric.before}</span>
              <span aria-hidden="true" className="text-muted mx-1">
                →
              </span>
              <span className="sr-only">{metricLabels.after}: </span>
              {metric.after}
            </dd>
          </div>
        ))}
      </dl>

      <Link
        href={href}
        className="text-primary focus-visible:ring-ring mt-6 inline-flex items-center gap-1 self-start rounded-sm text-sm font-semibold underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:outline-none"
      >
        {readLabel}
        <ArrowRightIcon className="h-4 w-4" />
      </Link>
    </article>
  );
}
