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
            <figure className="border-border bg-elevated shadow-card flex h-full flex-col rounded-lg border p-6">
              <blockquote className="text-fg flex-1 text-sm leading-7">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <figcaption className="border-border mt-6 flex items-center gap-3 border-t pt-4">
                {item.avatar ?? (
                  <span
                    aria-hidden="true"
                    className="bg-primary-soft text-primary flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold"
                  >
                    {item.name.charAt(0)}
                  </span>
                )}
                <span>
                  <span className="text-fg block text-sm font-semibold">{item.name}</span>
                  <span className="text-muted block text-xs">{item.role}</span>
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Section>
  );
}
