import type { ComponentPropsWithoutRef } from "react";

/**
 * Tailwind styling for MDX case-study bodies. Keeping the styles here means
 * content files stay plain Markdown and can move to a CMS unchanged.
 */
export const mdxComponents = {
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2
      className="font-display text-fg mt-12 text-2xl font-bold tracking-tight first:mt-0"
      {...props}
    />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3 className="text-fg mt-8 text-lg font-semibold" {...props} />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="text-muted mt-4 text-base leading-7" {...props} />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul className="text-muted mt-4 list-disc space-y-2 pl-6 text-base leading-7" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol className="text-muted mt-4 list-decimal space-y-2 pl-6 text-base leading-7" {...props} />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => <li className="pl-1" {...props} />,
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong className="text-fg font-semibold" {...props} />
  ),
  a: (props: ComponentPropsWithoutRef<"a">) => (
    <a
      className="text-primary focus-visible:ring-ring rounded-sm font-medium underline underline-offset-4 focus-visible:ring-2 focus-visible:outline-none"
      {...props}
    />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="border-primary text-fg mt-6 border-l-4 pl-5 text-base leading-7 italic"
      {...props}
    />
  ),
  hr: (props: ComponentPropsWithoutRef<"hr">) => (
    <hr className="border-border my-10 border-t" {...props} />
  ),
};
