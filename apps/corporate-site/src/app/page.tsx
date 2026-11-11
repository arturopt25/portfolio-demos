import {
  Cta,
  CookieBanner,
  Features,
  Footer,
  Header,
  Hero,
  SparkIcon,
  type NavLink,
} from "@folio/ui";

const links: NavLink[] = [
  { label: "Services", href: "#services" },
  { label: "Case studies", href: "#case-studies" },
  { label: "Contact", href: "#contact" },
];

const services = [
  {
    title: "Platform engineering",
    description:
      "Design and operate reliable internal platforms without adding headcount you do not need.",
    icon: <SparkIcon className="h-5 w-5" />,
  },
  {
    title: "Cloud migration",
    description:
      "Move critical workloads with a staged plan, clear rollback paths, and no surprise bills.",
    icon: <SparkIcon className="h-5 w-5" />,
  },
  {
    title: "Observability",
    description:
      "Make production behavior legible with practical dashboards, alerts, and runbooks.",
    icon: <SparkIcon className="h-5 w-5" />,
  },
];

export default function HomePage() {
  return (
    <>
      <Header
        brand={<span>Nexova Systems</span>}
        links={links}
        cta={{ label: "Book a call", href: "#contact" }}
      />

      <main id="main">
        <Hero
          variant="corporate"
          eyebrow="Infrastructure consultancy"
          title="Engineering clarity for complex infrastructure."
          description="Nexova Systems helps operations-heavy companies modernize platforms, reduce incident load, and keep critical services boring in the best way."
          primaryCta={{ label: "Talk to an engineer", href: "#contact" }}
          secondaryCta={{ label: "View services", href: "#services" }}
        />

        <Features
          id="services"
          eyebrow="Services"
          title="Senior engineers, embedded with your team."
          description="A fictional corporate demo. The shared component library and tokens power this page."
          items={services}
        />

        <Cta
          id="contact"
          eyebrow="Next step"
          title="Tell us where it hurts."
          description="A 30-minute conversation is usually enough to find the first useful move."
          primaryCta={{ label: "Book a call", href: "#contact" }}
          secondaryCta={{ label: "Read case studies", href: "#case-studies" }}
        />
      </main>

      <Footer
        brand="Nexova Systems"
        description="A fictional infrastructure consultancy demo. No real company affiliation."
        columns={[
          {
            title: "Services",
            links: [
              { label: "Platform engineering", href: "#services" },
              { label: "Cloud migration", href: "#services" },
              { label: "Observability", href: "#services" },
            ],
          },
          {
            title: "Company",
            links: [
              { label: "Case studies", href: "#case-studies" },
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
