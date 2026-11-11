import { Section } from "@folio/ui";

import type { LegalPageContent } from "@/lib/content-adapter";

export function LegalContent({
  content,
  updatedLabel,
  demoNotice,
}: {
  content: LegalPageContent;
  updatedLabel: string;
  demoNotice: string;
}) {
  return (
    <Section>
      <article className="mx-auto max-w-3xl">
        <p className="text-primary text-xs font-semibold tracking-[0.18em] uppercase">
          {updatedLabel}: {content.updated}
        </p>
        <h1 className="font-display text-fg mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          {content.title}
        </h1>
        <p className="text-muted mt-5 text-lg leading-8">{content.intro}</p>

        <div className="mt-10 space-y-9">
          {content.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-display text-fg text-2xl font-bold tracking-tight">
                {section.heading}
              </h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-muted mt-3 text-base leading-7">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>

        <p className="border-border text-muted mt-12 border-t pt-6 text-sm leading-6">
          {demoNotice}
        </p>
      </article>
    </Section>
  );
}
