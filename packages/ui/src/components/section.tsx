import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "../lib/utils";
import { Container } from "./container";

export type SectionProps = HTMLAttributes<HTMLElement> & {
  container?: boolean;
};

export function Section({ id, className, container = true, children, ...props }: SectionProps) {
  const anchor = id ? (
    <span id={id} className="block h-0 scroll-mt-[4.5rem]" aria-hidden="true" />
  ) : null;

  return (
    <section className={cn("py-section", className)} {...props}>
      {container ? (
        <Container>
          {anchor}
          {children}
        </Container>
      ) : (
        <>
          {anchor}
          {children}
        </>
      )}
    </section>
  );
}

export type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  as?: "h2" | "h3";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as: Heading = "h2",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? (
        <p className="text-primary mb-3 text-xs font-semibold tracking-[0.18em] uppercase">
          {eyebrow}
        </p>
      ) : null}
      <Heading className="font-display text-fg text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
      </Heading>
      {description ? <p className="text-muted mt-4 text-base leading-7">{description}</p> : null}
    </div>
  );
}

export function SectionHeader({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("mb-10 flex flex-col gap-6 sm:mb-14", className)}>{children}</div>;
}
