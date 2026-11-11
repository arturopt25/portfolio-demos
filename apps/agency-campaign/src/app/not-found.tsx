import type { Metadata } from "next";

import { LinkButton, Section } from "@folio/ui";

import { MinimalFooter, MinimalHeader } from "@/components/site-chrome";
import { brand } from "@/content/brand";

export const metadata: Metadata = {
  title: `Page not found — ${brand.name}`,
  description: "The page you requested does not exist in this demo.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <>
      <MinimalHeader />

      <main id="main">
        <Section>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">404</p>
            <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-fg sm:text-5xl">
              This page does not exist.
            </h1>
            <p className="mt-5 text-base leading-7 text-muted">
              The link may be wrong, or the page may have moved. This is a static demo, so unknown
              routes fall back to this 404 page.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <LinkButton href="/">Back to the campaign</LinkButton>
              <LinkButton href="/privacy/" variant="secondary">
                Privacy notice
              </LinkButton>
            </div>
          </div>
        </Section>
      </main>

      <MinimalFooter />
    </>
  );
}
