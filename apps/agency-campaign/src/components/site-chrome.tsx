import { Container, Footer, Header } from "@folio/ui";

import { brand } from "@/content/brand";
import { footerColumns, navLinks, sectionIds } from "@/content/campaign";

import { BrandMark } from "./brand-mark";
import { ThemePreview } from "./theme-preview";

export function SiteHeader() {
  return (
    <Header
      brand={<BrandMark />}
      links={navLinks}
      cta={{
        label: "Book a call",
        href: `#${sectionIds.contact}`,
        analyticsEvent: "cta_click",
      }}
    />
  );
}

export function MinimalHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-bg/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <a
          href="/"
          className="flex items-center gap-2 rounded-sm text-base font-bold tracking-tight text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <BrandMark />
        </a>

        <a
          href="/"
          className="rounded-sm text-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Back to campaign
        </a>
      </Container>
    </header>
  );
}

export function SiteFooter() {
  return (
    <Footer
      brand={brand.name}
      description={brand.demoNotice}
      columns={footerColumns}
      legal={
        <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl">
            Fictional demo content. No real company, client, or campaign is represented.
          </p>
          <ThemePreview />
        </div>
      }
    />
  );
}

export function MinimalFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <Container className="py-10">
        <p className="text-xs leading-6 text-muted">{brand.demoNotice}</p>
        <nav aria-label="Demo links" className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
          <a
            href="/"
            className="rounded-sm text-xs font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Home
          </a>
          <a
            href="/privacy/"
            className="rounded-sm text-xs font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Privacy
          </a>
          <a
            href="/terms/"
            className="rounded-sm text-xs font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Terms
          </a>
          <a
            href="/thank-you/"
            className="rounded-sm text-xs font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Thank-you
          </a>
        </nav>
      </Container>
    </footer>
  );
}
