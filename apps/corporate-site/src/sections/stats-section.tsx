import { Section } from "@folio/ui";

import type { StatContent } from "@/lib/content-adapter";

export function StatsSection({ stats }: { stats: StatContent[] }) {
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
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
