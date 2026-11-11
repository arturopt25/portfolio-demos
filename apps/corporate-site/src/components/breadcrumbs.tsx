export type BreadcrumbEntry = {
  label: string;
  href?: string;
};

export function Breadcrumbs({
  items,
  label,
  className,
}: {
  items: BreadcrumbEntry[];
  label: string;
  className?: string;
}) {
  return (
    <nav aria-label={label} className={className}>
      <ol className="text-muted flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <a
                  href={item.href}
                  className="hover:text-fg focus-visible:ring-ring rounded-sm underline-offset-4 transition-colors hover:underline focus-visible:ring-2 focus-visible:outline-none"
                >
                  {item.label}
                </a>
              ) : (
                <span aria-current={isLast ? "page" : undefined} className="text-fg">
                  {item.label}
                </span>
              )}
              {isLast ? null : (
                <span aria-hidden="true" className="text-border">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
