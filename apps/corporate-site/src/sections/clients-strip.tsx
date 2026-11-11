import { Section } from "@folio/ui";

export function ClientsStrip({ title, items }: { title: string; items: string[] }) {
  return (
    <Section className="border-border bg-surface border-y py-10">
      <h2 className="text-muted text-center text-xs font-semibold tracking-[0.18em] uppercase">
        {title}
      </h2>
      <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3 lg:grid-cols-5">
        {items.map((item) => (
          <li
            key={item}
            className="text-muted flex items-center justify-center text-center text-sm font-semibold tracking-tight"
          >
            {item}
          </li>
        ))}
      </ul>
    </Section>
  );
}
