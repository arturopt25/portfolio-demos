import type { ReactNode } from "react";

import { cn } from "../lib/utils";
import type { NavLink } from "./header";
import { Container } from "./container";

export type FooterColumn = {
  title: string;
  links: NavLink[];
};

export type FooterProps = {
  brand: ReactNode;
  description?: string;
  columns?: FooterColumn[];
  legal?: ReactNode;
  social?: NavLink[];
  className?: string;
};

export function Footer({
  brand,
  description,
  columns = [],
  legal,
  social = [],
  className,
}: FooterProps) {
  return (
    <footer className={cn("border-border bg-surface border-t", className)}>
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="max-w-sm">
            <div className="text-fg text-lg font-bold tracking-tight">{brand}</div>
            {description ? (
              <p className="text-muted mt-3 text-sm leading-6">{description}</p>
            ) : null}
            {social.length > 0 ? (
              <ul className="mt-5 flex flex-wrap gap-4">
                {social.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="text-muted hover:text-fg focus-visible:ring-ring rounded-sm text-sm font-medium underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:outline-none"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h2 className="text-fg text-sm font-semibold">{column.title}</h2>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={`${column.title}-${link.href}`}>
                    <a
                      href={link.href}
                      className="text-muted hover:text-fg focus-visible:ring-ring rounded-sm text-sm transition-colors focus-visible:ring-2 focus-visible:outline-none"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-border text-muted mt-12 flex flex-col gap-4 border-t pt-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          {legal ?? <p>Fictional demo content. No real company affiliation.</p>}
        </div>
      </Container>
    </footer>
  );
}
