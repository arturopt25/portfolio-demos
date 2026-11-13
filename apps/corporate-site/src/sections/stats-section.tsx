import { Section } from "@folio/ui";

import type { StatContent } from "@/lib/content-adapter";
import { formatMetric } from "@/lib/format";
import type { Locale } from "@/lib/i18n";

export function StatsSection({ stats, locale }: { stats: StatContent[]; locale: Locale }) {
  return (
    <Section className="bg-surface">
      <dl className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col-reverse gap-2 rounded-lg border border-border bg-elevated p-6 shadow-card"
          >
            <dt className="text-sm leading-6 text-muted">{stat.label}</dt>
            <dd className="font-display text-4xl font-bold tabular-nums tracking-tight text-fg">
              {formatMetric(stat.value, locale)}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
