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
    <header className="border-border/80 bg-bg/90 sticky top-0 z-40 border-b backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <a
          href="/"
          className="text-fg focus-visible:ring-ring flex items-center gap-2 rounded-sm text-base font-bold tracking-tight focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          <BrandMark />
        </a>

        <a
          href="/"
          className="text-primary focus-visible:ring-ring rounded-sm text-sm font-semibold underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:outline-none"
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
    <footer className="border-border bg-surface border-t">
      <Container className="py-10">
        <p className="text-muted text-xs leading-6">{brand.demoNotice}</p>
        <nav aria-label="Demo links" className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
          <a
            href="/"
            className="text-primary focus-visible:ring-ring rounded-sm text-xs font-medium underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:outline-none"
          >
            Home
          </a>
          <a
            href="/privacy/"
            className="text-primary focus-visible:ring-ring rounded-sm text-xs font-medium underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:outline-none"
          >
            Privacy
          </a>
          <a
            href="/terms/"
            className="text-primary focus-visible:ring-ring rounded-sm text-xs font-medium underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:outline-none"
          >
            Terms
          </a>
          <a
            href="/thank-you/"
            className="text-primary focus-visible:ring-ring rounded-sm text-xs font-medium underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:outline-none"
          >
            Thank-you
          </a>
        </nav>
      </Container>
    </footer>
  );
}
