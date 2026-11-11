import { Section } from "@folio/ui";

import { socialProof } from "@/content/saas";

export function SocialProof() {
  return (
    <Section className="border-border bg-surface border-y py-12">
      <h2 className="text-muted text-center text-xs font-semibold tracking-[0.18em] uppercase">
        {socialProof.title}
      </h2>
      <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3 lg:grid-cols-5">
        {socialProof.logos.map((logo) => (
          <li
            key={logo}
            className="text-muted flex items-center justify-center text-center text-sm font-semibold tracking-tight"
          >
            {logo}
          </li>
        ))}
      </ul>
    </Section>
  );
}
