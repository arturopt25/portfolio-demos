import { Section, SectionHeading } from "@folio/ui";

import type { ProcessContent } from "@/lib/content-adapter";

export function ProcessSection({
  content,
  id,
  className,
}: {
  content: ProcessContent;
  id?: string;
  className?: string;
}) {
  return (
    <Section id={id} className={className}>
      <SectionHeading
        eyebrow={content.eyebrow}
        title={content.title}
        description={content.description}
      />

      <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {content.steps.map((step, index) => (
          <li
            key={step.title}
            className="rounded-lg border border-border bg-elevated p-6 shadow-card"
          >
            <span
              aria-hidden="true"
              className="text-xs font-bold tabular-nums tracking-[0.2em] text-primary"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-3 text-base font-semibold text-fg">{step.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted">{step.description}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
