import type { Metadata } from "next";

import { createMetadata } from "@folio/seo";

import { LegalPage } from "@/components/legal-page";
import { brand } from "@/content/brand";

export const metadata: Metadata = createMetadata({
  title: `Privacy notice — ${brand.name}`,
  description: `Fictional privacy notice for the ${brand.name} campaign demo.`,
  siteName: brand.name,
  baseUrl: brand.baseUrl,
  path: "/privacy/",
});

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Demo legal page"
      title="Privacy notice"
      intro={`${brand.name} is a fictional demo brand. This notice explains exactly what the demo stores in your browser and what it deliberately does not do.`}
      updated="November 2026"
      sections={[
        {
          heading: "What this demo stores",
          paragraphs: [
            "The cookie banner stores your consent choice in localStorage under the key catalyst-consent. That value is a simple granted or denied flag.",
            "If you accept tracking, campaign attribution is stored for the current tab in sessionStorage under the key catalyst-attribution. It is removed when the tab closes. If you reject, nothing is written to sessionStorage.",
            "No data is sent to a server. This is a static site with no API route, no server runtime, and no database.",
          ],
        },
        {
          heading: "Campaign parameters",
          paragraphs: [
            "The page reads utm_source, utm_medium, utm_campaign, utm_term, and utm_content from the URL. Values are trimmed, stripped of control characters and markup characters, and limited to 120 characters.",
            "The presence of gclid and fbclid is recorded as true or false. Their values are never stored, logged, or placed in a form payload.",
            "URL parameters are read in memory as soon as the page loads because reading the URL is not storage. They are only persisted after you accept tracking. If you accept after landing, the current URL is read again so the campaign is not lost.",
          ],
        },
        {
          heading: "Forms",
          paragraphs: [
            "The lead form collects a name, email, optional company, and message. This demo uses a mock form adapter: nothing is transmitted, stored, or shared with a third party.",
            "The form also carries the campaign attribution as hidden fields so a real adapter could forward it later. In this demo those values only appear in the mock adapter's local console output.",
          ],
        },
        {
          heading: "Analytics",
          paragraphs: [
            "Analytics uses a no-op adapter by default. Events are dropped unless you grant consent. The demo emits cta_click, form_start, form_submit, and thank_you_view, with the captured campaign parameters attached.",
            "No third-party analytics script, pixel, or tag manager is loaded.",
          ],
        },
        {
          heading: "Your choices",
          paragraphs: [
            "You can accept or reject tracking in the cookie banner. Rejecting keeps attribution in memory for the current page only and never writes it to sessionStorage.",
            "You can clear the demo's storage at any time through your browser's site-data controls. The demo does not set advertising cookies.",
          ],
        },
        {
          heading: "Contact",
          paragraphs: [
            `This is a fictional demo. The placeholder contact address is ${brand.email} and is not monitored.`,
          ],
        },
      ]}
    />
  );
}
