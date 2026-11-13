import { BrandMark as SharedBrandMark } from "@folio/ui";

import { brand } from "@/content/brand";

export function BrandMark({ name = brand.name }: { name?: string }) {
  return (
    <SharedBrandMark
      name={name}
      mark={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-[58%] w-[58%]"
        >
          <path d="M12 3 3 8.5 12 14l9-5.5L12 3Z" />
          <path d="m3 12.5 9 5.5 9-5.5" />
          <path d="m3 16.5 9 5.5 9-5.5" />
        </svg>
      }
    />
  );
}
