import type { ReactNode } from "react";

import { cn } from "../lib/utils";
import type { CtaLink } from "../lib/types";
import { Badge } from "./badge";
import { LinkButton } from "./button";
import { Container } from "./container";
import { ArrowRightIcon } from "./icons";

export type HeroVariant = "saas" | "corporate" | "agency";

export type HeroProps = {
  variant?: HeroVariant;
  id?: string;
  eyebrow?: string;
  title: string;
  description: string;
  primaryCta?: CtaLink;
  secondaryCta?: CtaLink;
  media?: ReactNode;
  mediaAspect?: "video" | "square" | "wide";
  /** Extra classes for the media frame, for example hiding it on mobile. */
  mediaClassName?: string;
  /** Vertical alignment of the text and media columns. Defaults to center. */
  align?: "center" | "start";
  compact?: boolean;
  className?: string;
};

const aspectClasses = {
  video: "aspect-video",
  square: "aspect-square",
  wide: "aspect-[16/9]",
} as const;

export function Hero({
  variant = "saas",
  id,
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  media,
  mediaAspect = "video",
  mediaClassName,
  align = "center",
  compact = false,
  className,
}: HeroProps) {
  const isCentered = variant === "corporate";
  const hasMedia = Boolean(media);
  const anchor = id ? (
    <span id={id} className="block h-0 scroll-mt-[4.5rem]" aria-hidden="true" />
  ) : null;

  return (
    <section
      className={cn(
        "relative overflow-hidden",
        compact ? "pb-8 pt-10 sm:py-section" : "py-section",
        variant === "corporate" && "bg-surface",
        variant === "agency" && "bg-gradient-to-b from-primary-soft/70 via-bg to-bg",
        className,
      )}
    >
      <Container>
        {anchor}
        <div
          className={cn(
            "grid gap-10",
            align === "start" ? "items-start" : "items-center",
            hasMedia && !isCentered && "lg:grid-cols-2 lg:gap-16",
            isCentered && "mx-auto max-w-3xl text-center",
          )}
        >
          <div className={cn(isCentered && "mx-auto max-w-2xl")}>
            {eyebrow ? <Badge className="mb-5">{eyebrow}</Badge> : null}

            <h1
              className={cn(
                "font-display font-bold tracking-tight text-fg",
                variant === "agency"
                  ? "text-4xl leading-[1.05] sm:text-5xl lg:text-6xl"
                  : "text-4xl leading-tight sm:text-5xl lg:text-6xl",
              )}
            >
              {title}
            </h1>

            <p
              className={cn("mt-5 text-lg leading-8 text-muted", isCentered && "mx-auto max-w-2xl")}
            >
              {description}
            </p>

            {primaryCta || secondaryCta ? (
              <div
                className={cn(
                  "mt-8 flex flex-col gap-3 sm:flex-row",
                  isCentered && "justify-center",
                )}
              >
                {primaryCta ? (
                  <LinkButton
                    href={primaryCta.href}
                    size="lg"
                    data-analytics={primaryCta.analyticsEvent}
                  >
                    {primaryCta.label}
                    <ArrowRightIcon className="h-4 w-4" />
                  </LinkButton>
                ) : null}
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
            ) : null}
          </div>

          {media ? (
            <div
              className={cn(
                "w-full overflow-hidden rounded-xl border border-border bg-elevated shadow-card",
                aspectClasses[mediaAspect],
                isCentered && "mt-10",
                mediaClassName,
              )}
            >
              {media}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
