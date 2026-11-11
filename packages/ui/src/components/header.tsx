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
        "border-border/80 bg-bg/90 sticky top-0 z-40 border-b backdrop-blur",
        className,
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        <a
          href={brandHref}
          className="text-fg focus-visible:ring-ring flex items-center gap-2 rounded-sm text-base font-bold tracking-tight focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
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
                "text-muted hover:bg-surface hover:text-fg focus-visible:ring-ring rounded-sm px-3 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none",
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
            <LinkButton href={cta.href} size="sm">
              {cta.label}
            </LinkButton>
          ) : null}
        </div>

        <button
          type="button"
          className="border-border text-fg hover:bg-surface focus-visible:ring-ring inline-flex h-10 w-10 items-center justify-center rounded-md border transition-colors focus-visible:ring-2 focus-visible:outline-none md:hidden"
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
        <div id="mobile-navigation" className="border-border bg-bg border-t md:hidden">
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
                    "text-muted hover:bg-surface hover:text-fg focus-visible:ring-ring rounded-sm px-3 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none",
                    link.current && "bg-surface text-fg",
                  )}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="border-border flex flex-col gap-2 border-t pt-4">
              {actions}
              {cta ? (
                <LinkButton href={cta.href} onClick={() => setOpen(false)}>
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
