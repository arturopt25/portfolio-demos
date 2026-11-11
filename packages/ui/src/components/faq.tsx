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

      <div className="divide-border border-border bg-elevated mx-auto mt-10 max-w-3xl divide-y rounded-lg border sm:mt-14">
        {items.map((item) => (
          <details key={item.question} className="group">
            <summary className="text-fg focus-visible:ring-ring flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-left text-base font-semibold focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none [&::-webkit-details-marker]:hidden">
              <span>{item.question}</span>
              <ChevronDownIcon className="text-muted h-5 w-5 shrink-0 transition-transform group-open:rotate-180" />
            </summary>
            <div className="text-muted px-6 pb-5 text-sm leading-7">{item.answer}</div>
          </details>
        ))}
      </div>
    </Section>
  );
}
