/**
 * Single source of truth for the demo brand.
 *
 * Renaming the company, changing the contact details, or pointing the site at
 * its final domain only requires editing this file. All copy, metadata,
 * JSON-LD, and the sitemap read from here.
 */
export const brand = {
  name: "Ferrowind Partners",
  shortName: "Ferrowind",
  tagline: {
    en: "Industrial engineering and operations consulting for heavy industry.",
    es: "Ingeniería industrial y consultoría de operaciones para la industria pesada.",
  },
  baseUrl: "https://ferrowind-demo.pages.dev",
  email: "hello@ferrowind.example",
  phone: "+1 555 010 2048",
  phoneHref: "+15550102048",
  founded: 2009,
} as const;

export type Brand = typeof brand;
