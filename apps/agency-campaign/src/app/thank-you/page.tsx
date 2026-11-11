import type { Metadata } from "next";

import { CheckIcon, LinkButton, Section } from "@folio/ui";
import { createMetadata } from "@folio/seo";

import { MinimalFooter, MinimalHeader } from "@/components/site-chrome";
import { ThankYouTracker } from "@/components/thank-you-tracker";
import { brand } from "@/content/brand";

export const metadata: Metadata = createMetadata({
  title: `Request received — ${brand.name}`,
  description: `Fictional confirmation page for the ${brand.name} campaign demo.`,
  siteName: brand.name,
  baseUrl: brand.baseUrl,
  path: "/thank-you/",
  noIndex: true,
});

export default function ThankYouPage() {
  return (
    <>
      <ThankYouTracker />
      <MinimalHeader />

      <main id="main">
        <Section>
          <div className="mx-auto max-w-2xl text-center">
            <span className="bg-primary-soft text-primary mx-auto flex h-12 w-12 items-center justify-center rounded-full">
              <CheckIcon className="h-6 w-6" />
            </span>

            <p className="text-primary mt-6 text-xs font-semibold tracking-[0.18em] uppercase">
              Demo confirmation
            </p>
            <h1 className="font-display text-fg mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
              Your request is in.
            </h1>
            <p className="text-muted mt-5 text-base leading-7">
              This is a fictional confirmation page. The form used a mock adapter, so nothing was
              transmitted, stored, or sent to a third party.
            </p>

            <div className="border-border bg-surface mt-8 rounded-xl border p-6 text-left">
              <h2 className="text-fg text-sm font-semibold">What this page demonstrates</h2>
              <ul className="text-muted mt-3 space-y-2 text-sm leading-6">
                <li>The lead form validates and shows a success state before navigating.</li>
                <li>The redirect is client-side and carries no personal data in the URL.</li>
                <li>
                  The thank_you_view conversion event is consent-gated and uses a no-op adapter.
                </li>
                <li>This page is noindex and excluded from the sitemap.</li>
              </ul>
            </div>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <LinkButton href="/">Back to the campaign</LinkButton>
              <LinkButton href="/privacy/" variant="secondary">
                Read the privacy notice
              </LinkButton>
            </div>
          </div>
        </Section>
      </main>

      <MinimalFooter />
    </>
  );
}
