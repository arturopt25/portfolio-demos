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
        <p className="text-primary text-xs font-semibold tracking-[0.18em] uppercase">
          Demo legal page
        </p>
        <h1 className="font-display text-fg mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Terms of use
        </h1>
        <p className="text-muted mt-4 max-w-2xl text-base leading-7">
          Casefern is a fictional demo brand. These terms are illustrative only and do not create a
          real agreement or commercial relationship.
        </p>

        <div className="text-muted mt-10 max-w-2xl space-y-6 text-sm leading-7">
          <section>
            <h2 className="text-fg text-base font-semibold">Demo content</h2>
            <p className="mt-2">
              All names, pricing, testimonials, and product claims on this site are fictional and
              intended for portfolio demonstration.
            </p>
          </section>
          <section>
            <h2 className="text-fg text-base font-semibold">No service provided</h2>
            <p className="mt-2">
              This demo does not provide a real SaaS product, support service, or commercial
              offering.
            </p>
          </section>
          <section>
            <h2 className="text-fg text-base font-semibold">Use of the demo</h2>
            <p className="mt-2">
              You may inspect the demo for evaluation purposes. Do not present it as a real Casefern
              product or imply an affiliation with a real company.
            </p>
          </section>
        </div>

        <Link
          href="/"
          className="text-primary focus-visible:ring-ring mt-10 inline-block rounded-sm text-sm font-semibold underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:outline-none"
        >
          Back to Casefern
        </Link>
      </Section>
    </main>
  );
}
