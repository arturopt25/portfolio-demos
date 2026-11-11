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
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              {eyebrow} · Updated {updated}
            </p>
            <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-fg sm:text-5xl">
              {title}
            </h1>
            <p className="mt-5 text-lg leading-8 text-muted">{intro}</p>

            <div className="mt-10 space-y-9">
              {sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="font-display text-2xl font-bold tracking-tight text-fg">
                    {section.heading}
                  </h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="mt-3 text-base leading-7 text-muted">
                      {paragraph}
                    </p>
                  ))}
                </section>
              ))}
            </div>

            <p className="mt-12 border-t border-border pt-6 text-sm leading-6 text-muted">
              {brand.demoNotice}
            </p>
          </article>
        </Section>
      </main>

      <MinimalFooter />
    </>
  );
}
