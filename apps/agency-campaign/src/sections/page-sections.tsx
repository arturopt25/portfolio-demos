import { CheckIcon, Container, LinkButton, Section, SectionHeading } from "@folio/ui";

import { offer, sectionIds, stats, steps } from "@/content/campaign";

export function StatsStrip() {
  return (
    <section className="border-y border-border bg-surface py-12 sm:py-14">
      <Container>
        <span id={sectionIds.proof} className="block h-0 scroll-mt-[4.5rem]" aria-hidden="true" />
        <dl className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {stats.map((item) => (
            <div key={item.label}>
              <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                {item.label}
              </dt>
              <dd className="mt-2 text-3xl font-bold tabular-nums tracking-tight text-fg sm:text-4xl">
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
            className="rounded-lg border border-border bg-elevated p-6 shadow-card"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-sm font-bold tabular-nums text-primary-fg">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-5 text-base font-semibold text-fg">{step.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted">{step.description}</p>
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
            <span className="text-4xl font-bold tabular-nums tracking-tight text-fg">
              {offer.price}
            </span>
            <span className="text-sm font-medium text-muted">{offer.priceNote}</span>
          </div>

          <p className="mt-6 border-t border-border pt-5 text-xs leading-6 text-muted">
            {offer.note}
          </p>
        </div>

        <div className="rounded-xl border border-border bg-elevated p-6 shadow-card sm:p-8">
          <h3 className="text-lg font-semibold text-fg">What is included</h3>
          <ul className="mt-5 space-y-3">
            {offer.includes.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-6 text-muted">
                <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-success" />
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
    <div className="flex h-full w-full flex-col justify-between bg-bg p-5">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-semibold text-fg">Three palettes. One page.</span>
        <span className="text-xs text-muted">?theme=dark</span>
      </div>

      <div className="mt-4 grid flex-1 grid-cols-3 gap-3">
        {palettes.map((palette) => (
          <div
            key={palette.key}
            data-theme={palette.key}
            className="flex flex-col justify-between rounded-lg border border-border bg-bg p-3"
          >
            <div className="space-y-2">
              <span className="block h-2 w-8 rounded-full bg-primary" />
              <span className="block h-1.5 w-full rounded-full bg-fg/80" />
              <span className="block h-1.5 w-3/4 rounded-full bg-muted/70" />
            </div>

            <div className="space-y-2">
              <span className="flex h-6 items-center justify-center rounded bg-primary-soft text-[11px] font-semibold text-primary">
                CTA
              </span>
              <span className="block text-[11px] font-medium text-muted">{palette.label}</span>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-4 text-xs leading-5 text-muted">
        CSS variables only. Components and markup stay the same.
      </p>
    </div>
  );
}
