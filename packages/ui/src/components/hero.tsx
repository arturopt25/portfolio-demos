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
  className,
}: HeroProps) {
  const isCentered = variant === "corporate";
  const hasMedia = Boolean(media);

  return (
    <section
      id={id}
      className={cn(
        "py-section relative overflow-hidden",
        variant === "corporate" && "bg-surface",
        variant === "agency" && "from-primary-soft/70 via-bg to-bg bg-gradient-to-b",
        className,
      )}
    >
      <Container>
        <div
          className={cn(
            "grid items-center gap-10",
            hasMedia && !isCentered && "lg:grid-cols-2 lg:gap-16",
            isCentered && "mx-auto max-w-3xl text-center",
          )}
        >
          <div className={cn(isCentered && "mx-auto max-w-2xl")}>
            {eyebrow ? <Badge className="mb-5">{eyebrow}</Badge> : null}

            <h1
              className={cn(
                "font-display text-fg font-bold tracking-tight",
                variant === "agency"
                  ? "text-4xl leading-[1.05] sm:text-5xl lg:text-6xl"
                  : "text-4xl leading-tight sm:text-5xl lg:text-6xl",
              )}
            >
              {title}
            </h1>

            <p
              className={cn("text-muted mt-5 text-lg leading-8", isCentered && "mx-auto max-w-2xl")}
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
                  <LinkButton href={primaryCta.href} size="lg">
                    {primaryCta.label}
                    <ArrowRightIcon className="h-4 w-4" />
                  </LinkButton>
                ) : null}
                {secondaryCta ? (
                  <LinkButton href={secondaryCta.href} variant="secondary" size="lg">
                    {secondaryCta.label}
                  </LinkButton>
                ) : null}
              </div>
            ) : null}
          </div>

          {media ? (
            <div
              className={cn(
                "border-border bg-elevated shadow-card w-full overflow-hidden rounded-xl border",
                aspectClasses[mediaAspect],
                isCentered && "mt-10",
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
