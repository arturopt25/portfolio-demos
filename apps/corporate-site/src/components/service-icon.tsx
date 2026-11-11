import { CompassIcon, FactoryIcon, GaugeIcon, LeafIcon } from "@folio/ui";

import type { IconName } from "@/lib/content-adapter";

const icons = {
  factory: FactoryIcon,
  gauge: GaugeIcon,
  leaf: LeafIcon,
  compass: CompassIcon,
} as const;

export function ServiceIcon({ name, className }: { name: IconName; className?: string }) {
  const Icon = icons[name];

  return <Icon className={className} />;
}
