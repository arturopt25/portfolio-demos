export function BrandMark({ name }: { name: string }) {
  return (
    <span className="flex items-center gap-2">
      <span
        aria-hidden="true"
        className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-fg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
        >
          <path d="M12 2.8 20 7.4v9.2L12 21.2 4 16.6V7.4L12 2.8Z" />
          <path d="M9.5 8.6h5M9.5 12h4M9.5 15.4h2.5" />
        </svg>
      </span>
      <span className="text-base font-bold tracking-tight">{name}</span>
    </span>
  );
}
