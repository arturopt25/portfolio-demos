import type {
  ContactFormLabels,
  CtaLink,
  FaqItem,
  FeatureItem,
  FooterColumn,
  NavLink,
  TestimonialItem,
} from "@folio/ui";

import { CompassIcon, GaugeIcon, SparkIcon } from "@folio/ui";

import { brand } from "./brand";

export const sectionIds = {
  proof: "proof",
  benefits: "benefits",
  howItWorks: "how-it-works",
  offer: "offer",
  faq: "faq",
  contact: "contact",
} as const;

export const navLinks: NavLink[] = [
  { label: "Proof", href: `#${sectionIds.proof}` },
  { label: "How it works", href: `#${sectionIds.howItWorks}` },
  { label: "Offer", href: `#${sectionIds.offer}` },
  { label: "FAQ", href: `#${sectionIds.faq}` },
];

export const heroCopy = {
  eyebrow: "Fictional agency campaign demo",
  title: "One campaign page. Live by Friday.",
  description: `${brand.name} is a fictional creative agency demo. A single focused landing page, three themeable palettes, and a conversion path you can hand to any client.`,
} as const;

export const heroCta: CtaLink = {
  label: "Start a campaign",
  href: `#${sectionIds.contact}`,
  analyticsEvent: "cta_click",
};

export const stats = [
  { value: "48h", label: "brief to live page" },
  { value: "3", label: "CSS-variable themes" },
  { value: "1", label: "conversion goal per page" },
  { value: "$0", label: "static hosting budget" },
] as const;

export const testimonials: TestimonialItem[] = [
  {
    quote:
      "We swapped the palette and had three campaign variants by lunch. The components never changed.",
    name: "Maya Chen",
    role: "Fictional Growth Lead, Northwind Labs",
  },
  {
    quote:
      "The page shipped in two days, the form just worked, and the handoff docs were actually useful.",
    name: "Diego Ramos",
    role: "Fictional Founder, Halcyon Goods",
  },
  {
    quote:
      "UTM capture, a clean thank-you page, and no server to maintain. Exactly what a paid campaign needs.",
    name: "Priya Nair",
    role: "Fictional Marketing Director, Meridian Works",
  },
];

export const benefits: FeatureItem[] = [
  {
    title: "One page, one goal",
    description:
      "Every section points at a single conversion action, so the campaign stays focused instead of becoming a brochure.",
    icon: <CompassIcon className="h-5 w-5" />,
  },
  {
    title: "Themeable in minutes",
    description:
      "Swap the color tokens and the whole page rebrands. Components, markup, and accessibility stay the same.",
    icon: <SparkIcon className="h-5 w-5" />,
  },
  {
    title: "Built for paid traffic",
    description:
      "UTM capture, a short form, and a noindex thank-you page close the loop without adding a server runtime.",
    icon: <GaugeIcon className="h-5 w-5" />,
  },
];

export const steps = [
  {
    title: "Brief",
    description:
      "Share the offer, the audience, and the one action you want. We map the page and pick the campaign theme.",
  },
  {
    title: "Build",
    description:
      "We assemble the page from the shared kit, apply your palette, and wire the form adapter and campaign tracking.",
  },
  {
    title: "Launch",
    description:
      "You get a static build, a repeatable deploy, and a short handoff so your team can ship the next campaign page.",
  },
];

export const offer = {
  eyebrow: "The offer",
  title: "The 48-hour campaign page",
  description:
    "A focused landing page for one paid campaign, with the pieces an agency actually needs to hand off.",
  price: "$2,400",
  priceNote: "one-time · fictional pricing",
  includes: [
    "Campaign copy pass and page structure",
    "Three CSS-variable themes (default, dark, bold)",
    "Lead form with validation and consent",
    "UTM capture and consent-gated analytics hooks",
    "Static build and Cloudflare Pages deploy",
    "Handoff docs and a short walkthrough",
  ],
  cta: {
    label: "Book the sprint",
    href: `#${sectionIds.contact}`,
    analyticsEvent: "cta_click",
  } satisfies CtaLink,
  note: "Fictional pricing for demonstration only. Nothing on this page is a real commercial offer.",
} as const;

export const faqItems: FaqItem[] = [
  {
    question: "How fast can a campaign page go live?",
    answer:
      "A focused page with existing brand inputs usually ships in 48 hours. New brand systems or custom illustration take longer.",
  },
  {
    question: "Can we reuse our own brand colors?",
    answer:
      "Yes. Themes are CSS variables. Map your colors, type, and spacing, then keep the same components and accessibility behavior.",
  },
  {
    question: "Where does the lead form send data?",
    answer:
      "Nowhere in this demo. The default adapter is a mock. A real endpoint is isolated behind the adapter so the form component does not change.",
  },
  {
    question: "How does tracking and consent work?",
    answer:
      "Analytics is a no-op by default and consent-gated. UTM values stay in memory until consent is granted; then they are stored for the session and attached to form submissions and events.",
  },
  {
    question: "Is this a real agency?",
    answer: `No. ${brand.name} is a fictional demo brand. Names, quotes, metrics, and pricing are invented for this portfolio.`,
  },
];

export const contactDetails = [
  { label: "Email", value: brand.email },
  { label: "Response time", value: "Within one business day (fictional)" },
  { label: "Where", value: "Remote-first · Fictional demo" },
] as const;

export const formLabels: Partial<ContactFormLabels> = {
  name: "Name",
  email: "Work email",
  company: "Company (optional)",
  message: "What are you launching?",
  consent: "I agree to the",
  privacy: "privacy policy",
  submit: "Request the sprint",
  submitting: "Sending...",
  success: "Thanks! Your request is in. Redirecting to the confirmation page...",
  error: "Something went wrong. Please try again.",
};

export const footerColumns: FooterColumn[] = [
  {
    title: "Campaign",
    links: [
      { label: "Offer", href: `#${sectionIds.offer}` },
      { label: "How it works", href: `#${sectionIds.howItWorks}` },
      { label: "Proof", href: `#${sectionIds.proof}` },
      { label: "FAQ", href: `#${sectionIds.faq}` },
    ],
  },
  {
    title: "Demo",
    links: [
      { label: "Lead form", href: `#${sectionIds.contact}` },
      { label: "Thank-you page", href: "/thank-you/" },
      { label: "Home", href: "/" },
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

export const themePreviewLinks = [
  { label: "Default", href: "?theme=default", key: "default" },
  { label: "Dark", href: "?theme=dark", key: "dark" },
  { label: "Bold", href: "?theme=bold", key: "bold" },
] as const;
