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
            className="border-border bg-elevated shadow-card rounded-lg border p-6"
          >
            <span
              aria-hidden="true"
              className="text-primary text-xs font-bold tracking-[0.2em] tabular-nums"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="text-fg mt-3 text-base font-semibold">{step.title}</h3>
            <p className="text-muted mt-2 text-sm leading-6">{step.description}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
