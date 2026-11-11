import { Section, SectionHeading } from "@folio/ui";

import { CaseStudyCard } from "@/components/case-study-card";
import type { CaseStudySummary } from "@/lib/content-adapter";
import type { Locale } from "@/lib/i18n";

type CaseStudyGridProps = {
  id?: string;
  studies: CaseStudySummary[];
  locale: Locale;
  readLabel: string;
  metricLabels: { before: string; after: string };
  heading?: {
    eyebrow?: string;
    title: string;
    description?: string;
  };
  className?: string;
};

export function CaseStudyGrid({
  id,
  studies,
  locale,
  readLabel,
  metricLabels,
  heading,
  className,
}: CaseStudyGridProps) {
  return (
    <Section id={id} className={className}>
      {heading ? (
        <SectionHeading
          eyebrow={heading.eyebrow}
          title={heading.title}
          description={heading.description}
        />
      ) : null}

      <ul
        className={
          heading
            ? "mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            : "grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        }
      >
        {studies.map((study) => (
          <li key={study.slug}>
            <CaseStudyCard
              study={study}
              locale={locale}
              readLabel={readLabel}
              metricLabels={metricLabels}
            />
          </li>
        ))}
      </ul>
    </Section>
  );
}
