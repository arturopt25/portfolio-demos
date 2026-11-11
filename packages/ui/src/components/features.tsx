import type { ReactNode } from "react";

import { cn } from "../lib/utils";
import { Section, SectionHeading } from "./section";

export type FeatureItem = {
  title: string;
  description: string;
  icon?: ReactNode;
};

export type FeaturesProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  items: FeatureItem[];
  columns?: 2 | 3;
  align?: "left" | "center";
  className?: string;
};

export function Features({
  id,
  eyebrow,
  title,
  description,
  items,
  columns = 3,
  align = "left",
  className,
}: FeaturesProps) {
  return (
    <Section id={id} className={className}>
      <SectionHeading eyebrow={eyebrow} title={title} description={description} align={align} />

      <ul
        className={cn(
          "mt-10 grid gap-5 sm:mt-14",
          columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3",
        )}
      >
        {items.map((item) => (
          <li
            key={item.title}
            className="rounded-lg border border-border bg-elevated p-6 shadow-card"
          >
            {item.icon ? (
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-primary-soft text-primary">
                {item.icon}
              </div>
            ) : null}
            <h3 className="text-base font-semibold text-fg">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted">{item.description}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
