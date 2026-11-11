import type { ComponentPropsWithoutRef } from "react";

/**
 * Tailwind styling for MDX case-study bodies. Keeping the styles here means
 * content files stay plain Markdown and can move to a CMS unchanged.
 */
export const mdxComponents = {
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2
      className="mt-12 font-display text-2xl font-bold tracking-tight text-fg first:mt-0"
      {...props}
    />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3 className="mt-8 text-lg font-semibold text-fg" {...props} />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="mt-4 text-base leading-7 text-muted" {...props} />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-7 text-muted" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol className="mt-4 list-decimal space-y-2 pl-6 text-base leading-7 text-muted" {...props} />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => <li className="pl-1" {...props} />,
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-semibold text-fg" {...props} />
  ),
  a: (props: ComponentPropsWithoutRef<"a">) => (
    <a
      className="rounded-sm font-medium text-primary underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      {...props}
    />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="mt-6 border-l-4 border-primary pl-5 text-base italic leading-7 text-fg"
      {...props}
    />
  ),
  hr: (props: ComponentPropsWithoutRef<"hr">) => (
    <hr className="my-10 border-t border-border" {...props} />
  ),
};
