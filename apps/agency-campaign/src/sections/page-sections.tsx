import { CheckIcon, Container, LinkButton, Section, SectionHeading } from "@folio/ui";

import { offer, sectionIds, stats, steps } from "@/content/campaign";

export function StatsStrip() {
  return (
    <section className="bg-surface border-border border-y py-12 sm:py-14">
      <Container>
        <span id={sectionIds.proof} className="block h-0 scroll-mt-[4.5rem]" aria-hidden="true" />
        <dl className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {stats.map((item) => (
            <div key={item.label}>
              <dt className="text-muted text-xs font-semibold tracking-[0.14em] uppercase">
                {item.label}
              </dt>
              <dd className="text-fg mt-2 text-3xl font-bold tracking-tight tabular-nums sm:text-4xl">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}

export function HowItWorks() {
  return (
    <Section id={sectionIds.howItWorks}>
      <SectionHeading
        eyebrow="How it works"
        title="Brief, build, launch. No six-week discovery."
        description="A narrow process keeps the campaign moving and leaves your team with something repeatable."
        align="center"
      />

      <ol className="mt-10 grid gap-5 sm:mt-14 lg:grid-cols-3">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className="border-border bg-elevated shadow-card rounded-lg border p-6"
          >
            <span className="bg-primary text-primary-fg flex h-9 w-9 items-center justify-center rounded-md text-sm font-bold tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="text-fg mt-5 text-base font-semibold">{step.title}</h3>
            <p className="text-muted mt-2 text-sm leading-6">{step.description}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export function OfferTeaser() {
  return (
    <Section id={sectionIds.offer} className="bg-surface">
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow={offer.eyebrow}
            title={offer.title}
            description={offer.description}
          />

          <div className="mt-8 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="text-fg text-4xl font-bold tracking-tight tabular-nums">
              {offer.price}
            </span>
            <span className="text-muted text-sm font-medium">{offer.priceNote}</span>
          </div>

          <p className="border-border text-muted mt-6 border-t pt-5 text-xs leading-6">
            {offer.note}
          </p>
        </div>

        <div className="border-border bg-elevated shadow-card rounded-xl border p-6 sm:p-8">
          <h3 className="text-fg text-lg font-semibold">What is included</h3>
          <ul className="mt-5 space-y-3">
            {offer.includes.map((item) => (
              <li key={item} className="text-muted flex gap-3 text-sm leading-6">
                <CheckIcon className="text-success mt-0.5 h-4 w-4 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <LinkButton
            href={offer.cta.href}
            size="lg"
            className="mt-8 w-full"
            data-analytics={offer.cta.analyticsEvent}
          >
            {offer.cta.label}
          </LinkButton>
        </div>
      </div>
    </Section>
  );
}

export function ThemeShowcase() {
  const palettes = [
    { key: "default", label: "Default" },
    { key: "dark", label: "Dark" },
    { key: "bold", label: "Bold" },
  ] as const;

  return (
    <div className="bg-bg flex h-full w-full flex-col justify-between p-5">
      <div className="flex items-center justify-between gap-3">
        <span className="text-fg text-sm font-semibold">Three palettes. One page.</span>
        <span className="text-muted text-xs">?theme=dark</span>
      </div>

      <div className="mt-4 grid flex-1 grid-cols-3 gap-3">
        {palettes.map((palette) => (
          <div
            key={palette.key}
            data-theme={palette.key}
            className="border-border bg-bg flex flex-col justify-between rounded-lg border p-3"
          >
            <div className="space-y-2">
              <span className="bg-primary block h-2 w-8 rounded-full" />
              <span className="bg-fg/80 block h-1.5 w-full rounded-full" />
              <span className="bg-muted/70 block h-1.5 w-3/4 rounded-full" />
            </div>

            <div className="space-y-2">
              <span className="bg-primary-soft text-primary flex h-6 items-center justify-center rounded text-[11px] font-semibold">
                CTA
              </span>
              <span className="text-muted block text-[11px] font-medium">{palette.label}</span>
            </div>
          </div>
        ))}
      </div>

      <p className="text-muted mt-4 text-xs leading-5">
        CSS variables only. Components and markup stay the same.
      </p>
    </div>
  );
}
