"use client";

import { useEffect, useState, type ReactNode } from "react";

import { cn } from "../lib/utils";
import type { CtaLink } from "../lib/types";
import { LinkButton } from "./button";
import { Container } from "./container";
import { CloseIcon, MenuIcon } from "./icons";

export type NavLink = {
  label: string;
  href: string;
  current?: boolean;
};

export type HeaderProps = {
  brand: ReactNode;
  brandHref?: string;
  links: NavLink[];
  cta?: CtaLink;
  actions?: ReactNode;
  className?: string;
  labels?: {
    navigation?: string;
    openMenu?: string;
    closeMenu?: string;
  };
};

export function Header({
  brand,
  brandHref = "/",
  links,
  cta,
  actions,
  className,
  labels,
}: HeaderProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-border/80 bg-bg/90 backdrop-blur",
        className,
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        <a
          href={brandHref}
          className="flex items-center gap-2 rounded-sm text-base font-bold tracking-tight text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          {brand}
        </a>

        <nav
          aria-label={labels?.navigation ?? "Primary navigation"}
          className="hidden items-center gap-1 md:flex"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={link.current ? "page" : undefined}
              className={cn(
                "rounded-sm px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                link.current && "text-fg",
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {actions}
          {cta ? (
            <LinkButton href={cta.href} size="sm" data-analytics={cta.analyticsEvent}>
              {cta.label}
            </LinkButton>
          ) : null}
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border text-fg transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          <span className="sr-only">
            {open ? (labels?.closeMenu ?? "Close menu") : (labels?.openMenu ?? "Open menu")}
          </span>
        </button>
      </Container>

      {open ? (
        <div id="mobile-navigation" className="border-t border-border bg-bg md:hidden">
          <Container className="space-y-4 py-4">
            <nav
              aria-label={labels?.navigation ?? "Primary navigation"}
              className="flex flex-col gap-1"
            >
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={link.current ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-sm px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    link.current && "bg-surface text-fg",
                  )}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="flex flex-col gap-2 border-t border-border pt-4">
              {actions}
              {cta ? (
                <LinkButton
                  href={cta.href}
                  onClick={() => setOpen(false)}
                  data-analytics={cta.analyticsEvent}
                >
                  {cta.label}
                </LinkButton>
              ) : null}
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
