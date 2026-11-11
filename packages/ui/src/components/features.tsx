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
            className="border-border bg-elevated shadow-card rounded-lg border p-6"
          >
            {item.icon ? (
              <div className="bg-primary-soft text-primary mb-4 flex h-10 w-10 items-center justify-center rounded-md">
                {item.icon}
              </div>
            ) : null}
            <h3 className="text-fg text-base font-semibold">{item.title}</h3>
            <p className="text-muted mt-2 text-sm leading-6">{item.description}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
