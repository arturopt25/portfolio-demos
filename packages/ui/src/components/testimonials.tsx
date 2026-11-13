import type { ReactNode } from "react";

import { Section, SectionHeading } from "./section";

export type TestimonialItem = {
  quote: string;
  name: string;
  role: string;
  avatar?: ReactNode;
};

export type TestimonialsProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  items: TestimonialItem[];
  className?: string;
};

export function Testimonials({
  id,
  eyebrow,
  title,
  description,
  items,
  className,
}: TestimonialsProps) {
  return (
    <Section id={id} className={className}>
      <SectionHeading eyebrow={eyebrow} title={title} description={description} align="center" />

      <ul className="mt-10 grid gap-5 sm:mt-14 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <li key={`${item.name}-${item.role}`}>
            <figure className="flex h-full flex-col rounded-lg border border-border bg-elevated p-6 shadow-card">
              <blockquote className="flex-1 text-sm leading-7 text-fg">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                {item.avatar ?? (
                  <span
                    role="presentation"
                    aria-hidden="true"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-soft text-sm font-bold text-primary"
                  >
                    {item.name.charAt(0)}
                  </span>
                )}
                <span>
                  <span className="block text-sm font-semibold text-fg">{item.name}</span>
                  <span className="block text-xs text-muted">{item.role}</span>
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Section>
  );
}
