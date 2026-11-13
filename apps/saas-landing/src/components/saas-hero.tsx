"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, type ReactNode } from "react";

import { Hero, trackEvent } from "@folio/ui";

import { heroCtas, heroVariants } from "@/content/saas";

export function SaasHero({ media }: { media?: ReactNode }) {
  const searchParams = useSearchParams();
  const variant = searchParams.get("v") === "b" ? "b" : "a";
  const copy = heroVariants[variant];

  useEffect(() => {
    trackEvent("hero_variant_view", { variant });
  }, [variant]);

  return (
    <Hero
      compact
      variant="saas"
      align="start"
      media={media}
      mediaClassName="hidden lg:block"
      {...copy}
      primaryCta={heroCtas.primary}
      secondaryCta={heroCtas.secondary}
    />
  );
}
