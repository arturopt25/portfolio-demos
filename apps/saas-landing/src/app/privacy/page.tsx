import type { Metadata } from "next";
import Link from "next/link";

import { Section } from "@folio/ui";
import { createMetadata } from "@folio/seo";

const siteName = "Casefern";
const baseUrl = "https://casefern-demo.pages.dev";

export const metadata: Metadata = createMetadata({
  title: "Privacy notice — Casefern",
  description: "Fictional privacy notice for the Casefern demo brand.",
  siteName,
  baseUrl,
  path: "/privacy/",
});

export default function PrivacyPage() {
  return (
    <main>
      <Section>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          Demo legal page
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-fg sm:text-4xl">
          Privacy notice
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
          Casefern is a fictional demo brand. This page exists to demonstrate a complete static site
          and does not describe a real product or service.
        </p>

        <div className="mt-10 max-w-2xl space-y-6 text-sm leading-7 text-muted">
          <section>
            <h2 className="text-base font-semibold text-fg">What this demo stores</h2>
            <p className="mt-2">
              The only browser storage used by this demo is a local consent preference for the
              cookie banner. No personal data is sent to a server.
            </p>
          </section>
          <section>
            <h2 className="text-base font-semibold text-fg">Forms</h2>
            <p className="mt-2">
              Form submissions use a mock adapter by default. Nothing is transmitted, stored, or
              processed by a third party.
            </p>
          </section>
          <section>
            <h2 className="text-base font-semibold text-fg">Analytics</h2>
            <p className="mt-2">
              Analytics is a no-op by default and is gated behind explicit consent. No third-party
              scripts are loaded.
            </p>
          </section>
        </div>

        <Link
          href="/"
          className="mt-10 inline-block rounded-sm text-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Back to Casefern
        </Link>
      </Section>
    </main>
  );
}
