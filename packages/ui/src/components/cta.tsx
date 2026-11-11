import type { CtaLink } from "../lib/types";
import { LinkButton } from "./button";
import { Section } from "./section";

export type CtaProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  description: string;
  primaryCta: CtaLink;
  secondaryCta?: CtaLink;
  className?: string;
};

export function Cta({
  id,
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  className,
}: CtaProps) {
  return (
    <Section id={id} className={className}>
      <div className="border-border bg-surface shadow-card rounded-xl border px-6 py-12 text-center sm:px-12">
        {eyebrow ? (
          <p className="text-primary mb-3 text-xs font-semibold tracking-[0.18em] uppercase">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="font-display text-fg mx-auto max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
          {title}
        </h2>
        <p className="text-muted mx-auto mt-4 max-w-2xl text-base leading-7">{description}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <LinkButton href={primaryCta.href} size="lg" data-analytics={primaryCta.analyticsEvent}>
            {primaryCta.label}
          </LinkButton>
          {secondaryCta ? (
            <LinkButton
              href={secondaryCta.href}
              variant="secondary"
              size="lg"
              data-analytics={secondaryCta.analyticsEvent}
            >
              {secondaryCta.label}
            </LinkButton>
          ) : null}
        </div>
      </div>
    </Section>
  );
}
