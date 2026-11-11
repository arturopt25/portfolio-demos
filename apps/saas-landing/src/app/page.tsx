import { CookieBanner, Features, Footer, Header, Hero, SparkIcon, type NavLink } from "@folio/ui";

const links: NavLink[] = [
  { label: "Product", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

const features = [
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
];

export default function HomePage() {
  return (
    <>
      <Header
        brand={<span>FlowDesk</span>}
        links={links}
        cta={{ label: "Get started", href: "#features" }}
      />

      <main id="main">
        <Hero
          variant="saas"
          eyebrow="B2B SaaS demo"
          title="Customer support that actually flows."
          description="FlowDesk gives modern support teams a shared inbox, practical automations, and reporting that does not require a data team."
          primaryCta={{ label: "Start free trial", href: "#features" }}
          secondaryCta={{ label: "See how it works", href: "#features" }}
        />

        <Features
          id="features"
          eyebrow="Why teams switch"
          title="Less busywork. More conversations resolved."
          description="A focused product shell for a fictional SaaS launch. Replace the copy and tokens to rebrand."
          items={features}
        />
      </main>

      <Footer
        brand="FlowDesk"
        description="A fictional B2B SaaS demo built with the Folio starter kit."
        columns={[
          {
            title: "Product",
            links: [
              { label: "Features", href: "#features" },
              { label: "Pricing", href: "#pricing" },
              { label: "FAQ", href: "#faq" },
            ],
          },
          {
            title: "Company",
            links: [
              { label: "About", href: "#" },
              { label: "Careers", href: "#" },
              { label: "Contact", href: "#" },
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
