"use client";

import { createContext, useContext } from "react";

import type { AnalyticsConsent } from "@folio/ui";

import type { Attribution } from "@/lib/attribution";

export type CampaignRuntime = {
  attribution: Attribution | null;
  consent: AnalyticsConsent;
};

export const CampaignRuntimeContext = createContext<CampaignRuntime>({
  attribution: null,
  consent: "unknown",
});

export function useCampaignRuntime(): CampaignRuntime {
  return useContext(CampaignRuntimeContext);
}
