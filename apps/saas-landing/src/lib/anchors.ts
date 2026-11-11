import type { FooterColumn, NavLink } from "@folio/ui";

export const sectionIds = {
  features: "features",
  pricing: "pricing",
  faq: "faq",
  contact: "contact",
} as const;

export const mainNavLinks: NavLink[] = [
  { label: "Product", href: `#${sectionIds.features}`, current: true },
  { label: "Pricing", href: `#${sectionIds.pricing}` },
  { label: "FAQ", href: `#${sectionIds.faq}` },
];

export const footerColumns: FooterColumn[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: `#${sectionIds.features}` },
      { label: "Pricing", href: `#${sectionIds.pricing}` },
      { label: "FAQ", href: `#${sectionIds.faq}` },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About" },
      { label: "Careers" },
      { label: "Contact", href: `#${sectionIds.contact}` },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy/" },
      { label: "Terms", href: "/terms/" },
    ],
  },
];
