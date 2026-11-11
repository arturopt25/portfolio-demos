import { ChevronDownIcon } from "./icons";
import { Section, SectionHeading } from "./section";

export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  items: FaqItem[];
  className?: string;
};

export function Faq({ id, eyebrow, title, description, items, className }: FaqProps) {
  return (
    <Section id={id} className={className}>
      <SectionHeading eyebrow={eyebrow} title={title} description={description} align="center" />

      <div className="mx-auto mt-10 max-w-3xl divide-y divide-border rounded-lg border border-border bg-elevated sm:mt-14">
        {items.map((item) => (
          <details key={item.question} className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-left text-base font-semibold text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 [&::-webkit-details-marker]:hidden">
              <span>{item.question}</span>
              <ChevronDownIcon className="h-5 w-5 shrink-0 text-muted transition-transform group-open:rotate-180" />
            </summary>
            <div className="px-6 pb-5 text-sm leading-7 text-muted">{item.answer}</div>
          </details>
        ))}
      </div>
    </Section>
  );
}
