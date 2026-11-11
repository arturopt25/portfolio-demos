import {
  CookieBanner,
  Cta,
  Faq,
  Features,
  Footer,
  Header,
  Hero,
  Pricing,
  SparkIcon,
  type NavLink,
} from "@folio/ui";

const links: NavLink[] = [
  { label: "Offer", href: "#offer" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

const offer = [
  {
    title: "Brand sprint",
    description:
      "A two-day workshop that turns positioning, voice, and visual direction into a usable system.",
    icon: <SparkIcon className="h-5 w-5" />,
  },
  {
    title: "Landing page",
    description:
      "One focused page, built with the Folio starter kit, tuned for mobile Lighthouse and conversion.",
    icon: <SparkIcon className="h-5 w-5" />,
  },
  {
    title: "Launch handoff",
    description:
      "Deploy to Cloudflare Pages, document the tokens, and leave your team able to ship the next page.",
    icon: <SparkIcon className="h-5 w-5" />,
  },
];

const plans = [
  {
    name: "Sprint",
    description: "For teams that need a sharp page fast.",
    monthlyPrice: 2400,
    annualPrice: 2000,
    features: ["Brand token pass", "One landing page", "Cloudflare Pages deploy"],
    cta: { label: "Start a sprint", href: "#contact" },
  },
  {
    name: "Launch",
    description: "Brand, page, and a reusable starter.",
    monthlyPrice: 4800,
    annualPrice: 4000,
    features: ["Everything in Sprint", "Component library handoff", "Analytics + form adapter"],
    cta: { label: "Plan a launch", href: "#contact" },
    highlighted: true,
    badge: "Most popular",
  },
  {
    name: "Retainer",
    description: "Ongoing design and build support.",
    monthlyPrice: 3200,
    annualPrice: 2800,
    features: ["Monthly landing page", "Conversion experiments", "Priority support"],
    cta: { label: "Talk retainer", href: "#contact" },
  },
];

const faq = [
  {
    question: "How fast can we launch?",
    answer:
      "A focused sprint usually takes 48 hours from kickoff to a live page. Larger brand systems take longer.",
  },
  {
    question: "Can we keep our existing brand?",
    answer:
      "Yes. The theming layer is CSS variables, so we can map your colors, type, and spacing without rewriting components.",
  },
  {
    question: "What do we get at handoff?",
    answer:
      "A repository with the page, shared component library, deployment instructions, and a short video walkthrough.",
  },
];

export default function HomePage() {
  return (
    <>
      <Header
        brand={<span>Catalyst Studio</span>}
        links={links}
        cta={{ label: "Book a call", href: "#contact" }}
      />

      <main id="main">
        <Hero
          variant="agency"
          eyebrow="Agency campaign demo"
          title="Rebrand in a weekend. Launch on Monday."
          description="Catalyst Studio is a fictional agency demo. Everything you see is driven by CSS variables, so the whole page can be rebranded in minutes."
          primaryCta={{ label: "Claim a sprint", href: "#contact" }}
          secondaryCta={{ label: "See the offer", href: "#offer" }}
        />

        <Features
          id="offer"
          eyebrow="The offer"
          title="A focused system, not a six-week discovery."
          description="Three deliverables, one clear path from kickoff to launch."
          items={offer}
        />

        <Pricing
          id="pricing"
          eyebrow="Pricing"
          title="Simple packages for fast launches."
          description="Fictional pricing for demonstration only. Toggle monthly and annual to see the shared pricing component."
          plans={plans}
        />

        <Faq
          id="faq"
          eyebrow="FAQ"
          title="Questions worth asking."
          description="Short answers for the most common objections."
          items={faq}
        />

        <Cta
          id="contact"
          eyebrow="Next step"
          title="Ready to rebrand?"
          description="Tell us what you are launching and we will send a focused plan within one business day."
          primaryCta={{ label: "Book a call", href: "#contact" }}
        />
      </main>

      <Footer
        brand="Catalyst Studio"
        description="A fictional agency campaign demo. No real company affiliation."
        columns={[
          {
            title: "Offer",
            links: [
              { label: "Brand sprint", href: "#offer" },
              { label: "Landing page", href: "#offer" },
              { label: "Launch handoff", href: "#offer" },
            ],
          },
          {
            title: "Company",
            links: [
              { label: "Pricing", href: "#pricing" },
              { label: "FAQ", href: "#faq" },
              { label: "Contact", href: "#contact" },
            ],
          },
          {
            title: "Legal",
            links: [
              { label: "Privacy", href: "/privacy/" },
              { label: "Terms", href: "/terms/" },
            ],
          },
        ]}
      />

      <CookieBanner />
    </>
  );
}
