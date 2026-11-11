import { brand } from "@/content/brand";

export function BrandMark({ name = brand.name }: { name?: string }) {
  return (
    <span className="flex items-center gap-2">
      <span
        aria-hidden="true"
        className="bg-primary text-primary-fg flex h-8 w-8 items-center justify-center rounded-md"
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
          <path d="M12 3 3 8.5 12 14l9-5.5L12 3Z" />
          <path d="m3 12.5 9 5.5 9-5.5" />
          <path d="m3 16.5 9 5.5 9-5.5" />
        </svg>
      </span>
      <span className="text-base font-bold tracking-tight">{name}</span>
    </span>
  );
}
