import type { Metadata } from "next";
import Link from "next/link";

import { Section } from "@folio/ui";
import { createMetadata } from "@folio/seo";

const siteName = "Casefern";
const baseUrl = "https://casefern-demo.pages.dev";

export const metadata: Metadata = createMetadata({
  title: "Terms of use — Casefern",
  description: "Fictional terms of use for the Casefern demo brand.",
  siteName,
  baseUrl,
  path: "/terms/",
});

export default function TermsPage() {
  return (
    <main>
      <Section>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          Demo legal page
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-fg sm:text-4xl">
          Terms of use
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
          Casefern is a fictional demo brand. These terms are illustrative only and do not create a
          real agreement or commercial relationship.
        </p>

        <div className="mt-10 max-w-2xl space-y-6 text-sm leading-7 text-muted">
          <section>
            <h2 className="text-base font-semibold text-fg">Demo content</h2>
            <p className="mt-2">
              All names, pricing, testimonials, and product claims on this site are fictional and
              intended for portfolio demonstration.
            </p>
          </section>
          <section>
            <h2 className="text-base font-semibold text-fg">No service provided</h2>
            <p className="mt-2">
              This demo does not provide a real SaaS product, support service, or commercial
              offering.
            </p>
          </section>
          <section>
            <h2 className="text-base font-semibold text-fg">Use of the demo</h2>
            <p className="mt-2">
              You may inspect the demo for evaluation purposes. Do not present it as a real Casefern
              product or imply an affiliation with a real company.
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
