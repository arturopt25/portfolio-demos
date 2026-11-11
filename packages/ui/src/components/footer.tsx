import type { ReactNode } from "react";

import { cn } from "../lib/utils";
import type { NavLink } from "./header";
import { Container } from "./container";

export type FooterLink = {
  label: string;
  href?: string;
};

export type FooterColumn = {
  title: string;
  links: FooterLink[];
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
    <footer className={cn("border-t border-border bg-surface", className)}>
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="max-w-sm">
            <div className="text-lg font-bold tracking-tight text-fg">{brand}</div>
            {description ? (
              <p className="mt-3 text-sm leading-6 text-muted">{description}</p>
            ) : null}
            {social.length > 0 ? (
              <ul className="mt-5 flex flex-wrap gap-4">
                {social.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="rounded-sm text-sm font-medium text-muted underline-offset-4 hover:text-fg hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
              <h2 className="text-sm font-semibold text-fg">{column.title}</h2>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={`${column.title}-${link.href ?? link.label}`}>
                    {link.href ? (
                      <a
                        href={link.href}
                        className="rounded-sm text-sm text-muted transition-colors hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <span className="text-sm text-muted">{link.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          {legal ?? <p>Fictional demo content. No real company affiliation.</p>}
        </div>
      </Container>
    </footer>
  );
}
