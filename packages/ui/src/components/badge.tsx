import type { HTMLAttributes } from "react";

import { cn } from "../lib/utils";

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "border-primary/20 bg-primary-soft text-primary inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold",
        className,
      )}
      {...props}
    />
  );
}
