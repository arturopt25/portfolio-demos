import type { ReactNode } from "react";

import { cn } from "../lib/utils";

export type BrandMarkSize = "sm" | "md" | "lg";

export type BrandMarkProps = {
  /** Visible wordmark. */
  name: string;
  /** Inline SVG mark. It should scale with its container. */
  mark: ReactNode;
  size?: BrandMarkSize;
  className?: string;
  /** Extra classes for the icon tile. */
  markClassName?: string;
  /** Extra classes for the wordmark. */
  nameClassName?: string;
};

const sizes: Record<BrandMarkSize, { tile: string; text: string }> = {
  sm: { tile: "h-7 w-7", text: "text-sm" },
  md: { tile: "h-8 w-8", text: "text-base" },
  lg: { tile: "h-10 w-10", text: "text-xl" },
};

/**
 * Shared logo lockup: a themed icon tile next to a heavier wordmark.
 * Backward-compatible addition; consumers can override any class.
 */
export function BrandMark({
  name,
  mark,
  size = "md",
  className,
  markClassName,
  nameClassName,
}: BrandMarkProps) {
  const token = sizes[size];

  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span
        aria-hidden="true"
        className={cn(
          "flex items-center justify-center rounded-md bg-primary text-primary-fg",
          token.tile,
          markClassName,
        )}
      >
        {mark}
      </span>
      <span className={cn("font-extrabold tracking-tight", token.text, nameClassName)}>{name}</span>
    </span>
  );
}
