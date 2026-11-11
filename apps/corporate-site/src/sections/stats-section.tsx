import { Section } from "@folio/ui";

import type { StatContent } from "@/lib/content-adapter";

export function StatsSection({ stats }: { stats: StatContent[] }) {
  return (
    <Section className="bg-surface">
      <dl className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="border-border bg-elevated shadow-card flex flex-col-reverse gap-2 rounded-lg border p-6"
          >
            <dt className="text-muted text-sm leading-6">{stat.label}</dt>
            <dd className="font-display text-fg text-4xl font-bold tracking-tight tabular-nums">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
