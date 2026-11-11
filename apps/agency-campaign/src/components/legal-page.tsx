import { Section } from "@folio/ui";

import { brand } from "@/content/brand";

import { MinimalFooter, MinimalHeader } from "./site-chrome";

export type LegalSection = {
  heading: string;
  paragraphs: string[];
};

export function LegalPage({
  eyebrow,
  title,
  intro,
  updated,
  sections,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <MinimalHeader />

      <main id="main">
        <Section>
          <article className="mx-auto max-w-3xl">
            <p className="text-primary text-xs font-semibold tracking-[0.18em] uppercase">
              {eyebrow} · Updated {updated}
            </p>
            <h1 className="font-display text-fg mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
              {title}
            </h1>
            <p className="text-muted mt-5 text-lg leading-8">{intro}</p>

            <div className="mt-10 space-y-9">
              {sections.map((section) => (
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
              {brand.demoNotice}
            </p>
          </article>
        </Section>
      </main>

      <MinimalFooter />
    </>
  );
}
