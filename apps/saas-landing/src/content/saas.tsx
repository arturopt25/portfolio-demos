import type { FaqItem, FeatureItem, PricingPlan } from "@folio/ui";

import { SparkIcon } from "@folio/ui";

export const brand = "Casefern";

export type HeroVariantCopy = {
  eyebrow: string;
  title: string;
  description: string;
};

export const heroVariants: Record<"a" | "b", HeroVariantCopy> = {
  a: {
    eyebrow: "B2B SaaS demo",
    title: "Customer support that actually flows.",
    description:
      "Casefern gives modern support teams a shared inbox, practical automations, and reporting that does not require a data team.",
  },
  b: {
    eyebrow: "B2B SaaS demo",
    title: "Resolve support tickets without the busywork.",
    description:
      "One shared inbox, smart routing, and clear reporting for teams that want fewer tabs and faster replies.",
  },
};

export const heroCtas = {
  primary: {
    label: "Start free trial",
    href: "#contact",
    analyticsEvent: "hero_primary_cta",
  },
  secondary: {
    label: "See how it works",
    href: "#features",
    analyticsEvent: "hero_secondary_cta",
  },
} as const;

export const socialProof = {
  title: "Trusted by fictional teams at",
  logos: ["Alder & Co.", "Bramble Works", "Dune & Pine", "Elmline Studio", "Fernway Labs"],
};

export const features: FeatureItem[] = [
  {
    title: "One shared inbox",
    description: "Bring email, chat, and social messages into a single queue with clear ownership.",
    icon: <SparkIcon className="h-5 w-5" />,
  },
  {
    title: "Automations that help",
    description:
      "Route, tag, and prioritize conversations with rules your team can actually understand.",
    icon: <SparkIcon className="h-5 w-5" />,
  },
  {
    title: "Reporting without spreadsheets",
    description: "See response times, backlog health, and customer sentiment in one place.",
    icon: <SparkIcon className="h-5 w-5" />,
  },
  {
    title: "Customer context, inline",
    description: "See past conversations, plan, and open issues without leaving the ticket view.",
    icon: <SparkIcon className="h-5 w-5" />,
  },
  {
    title: "SLA guardrails",
    description: "Set targets per plan and get warning signals before a conversation goes cold.",
    icon: <SparkIcon className="h-5 w-5" />,
  },
  {
    title: "Works with your stack",
    description:
      "Connect popular helpdesk, billing, and CRM tools through a small, documented API.",
    icon: <SparkIcon className="h-5 w-5" />,
  },
];

export const pricingPlans: PricingPlan[] = [
  {
    name: "Starter",
    description: "For small teams finding their support rhythm.",
    monthlyPrice: 24,
    annualPrice: 19,
    features: ["2 agents", "Shared inbox", "Basic reporting", "Email support"],
    cta: { label: "Start free trial", href: "#contact" },
  },
  {
    name: "Team",
    description: "For growing teams with clear response targets.",
    monthlyPrice: 59,
    annualPrice: 49,
    features: ["Up to 10 agents", "Automations and SLAs", "Advanced reporting", "Priority support"],
    cta: { label: "Start free trial", href: "#contact" },
    highlighted: true,
    badge: "Most popular",
  },
  {
    name: "Scale",
    description: "For support organizations that need control.",
    monthlyPrice: 119,
    annualPrice: 99,
    features: ["Unlimited agents", "SAML SSO", "Audit log", "Dedicated onboarding"],
    cta: { label: "Talk to sales", href: "#contact" },
  },
];

export const faqItems: FaqItem[] = [
  {
    question: "Is Casefern a real product?",
    answer:
      "No. Casefern is a fictional demo brand built for this portfolio. Nothing on this page is a real commercial offer.",
  },
  {
    question: "How does the shared inbox work?",
    answer:
      "Every conversation lands in one queue. Agents can claim, assign, or hand off tickets with a clear history.",
  },
  {
    question: "Can we automate routing?",
    answer:
      "Yes. Rules can route by plan, keywords, business hours, or customer health without writing code.",
  },
  {
    question: "What reporting is included?",
    answer:
      "Response and resolution times, backlog age, channel mix, and customer sentiment trends are included on Team and Scale.",
  },
  {
    question: "Can we export our data?",
    answer:
      "Yes. The API and CSV exports are available on every plan. The demo uses a mock adapter and sends nothing.",
  },
];
