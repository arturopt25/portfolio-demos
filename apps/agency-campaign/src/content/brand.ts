/**
 * Single source of truth for the Catalyst Studio demo brand.
 *
 * Renaming the agency, changing contact details, or pointing the site at its
 * final domain only requires editing this file. All pages, metadata, JSON-LD,
 * the sitemap, and the theme fallback read from here.
 *
 * Catalyst Studio is fictional. Do not replace these values with a real
 * company, real client, or real trademark.
 */
export const brand = {
  name: "Catalyst Studio",
  shortName: "Catalyst",
  tagline: "Campaign pages for brands that cannot wait.",
  description:
    "A fictional creative agency demo: one focused campaign page, three CSS-variable themes, UTM capture, and a consent-gated lead form.",
  baseUrl: "https://catalyst-studio-demo.pages.dev",
  email: "hello@catalyststudio.example",
  phone: "+1 555 010 7788",
  phoneHref: "+15550107788",
  location: "Remote-first · Fictional demo",
  founded: 2026,
  /** Build-time fallback theme. Override with NEXT_PUBLIC_DEFAULT_THEME. */
  defaultTheme: "default" as const,
  demoNotice:
    "Catalyst Studio is a fictional agency brand created for a portfolio demo. No real company, client, campaign, or testimonial is represented.",
} as const;

export type Brand = typeof brand;
