import type { Metadata } from "next";

import { createMetadata } from "@folio/seo";

import { LegalPage } from "@/components/legal-page";
import { brand } from "@/content/brand";

export const metadata: Metadata = createMetadata({
  title: `Terms of use — ${brand.name}`,
  description: `Fictional terms of use for the ${brand.name} campaign demo.`,
  siteName: brand.name,
  baseUrl: brand.baseUrl,
  path: "/terms/",
});

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Demo legal page"
      title="Terms of use"
      intro={`${brand.name} is a fictional demo brand. These terms are illustrative only and do not create a real agreement, service, or commercial relationship.`}
      updated="November 2026"
      sections={[
        {
          heading: "Demo content",
          paragraphs: [
            "All names, quotes, metrics, timelines, and prices on this site are invented for a portfolio demonstration. They do not describe a real agency, client, or campaign.",
            "The brands Casefern and Ferrowind Partners belong to separate demos in the same repository. Nothing here implies a relationship with them or with any real company.",
          ],
        },
        {
          heading: "No service provided",
          paragraphs: [
            "This demo does not provide a real creative, marketing, or development service. The lead form is connected to a mock adapter and does not transmit or store submissions.",
          ],
        },
        {
          heading: "Pricing and claims",
          paragraphs: [
            "The displayed price and the 48-hour timeline are fictional illustrations. They are not an offer, a quote, or a guarantee of delivery.",
          ],
        },
        {
          heading: "Use of the demo",
          paragraphs: [
            `You may inspect the demo for evaluation and portfolio purposes. Do not present it as a real ${brand.name} product or imply an affiliation with a real company.`,
          ],
        },
        {
          heading: "Intellectual property",
          paragraphs: [
            "No real trademarks, logos, client work, or licensed assets are used. The visuals are locally generated SVG and CSS, and the copy is original demo content.",
          ],
        },
        {
          heading: "Changes",
          paragraphs: [
            "This demo may change without notice. The privacy notice and these terms are illustrative and are not legal advice.",
          ],
        },
      ]}
    />
  );
}
