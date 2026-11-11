import { Section } from "@folio/ui";

export function ClientsStrip({ title, items }: { title: string; items: string[] }) {
  return (
    <Section className="border-y border-border bg-surface py-10">
      <h2 className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-muted">
        {title}
      </h2>
      <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3 lg:grid-cols-5">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-center justify-center text-center text-sm font-semibold tracking-tight text-muted"
          >
            {item}
          </li>
        ))}
      </ul>
    </Section>
  );
}
