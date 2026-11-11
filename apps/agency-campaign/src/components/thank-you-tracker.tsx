"use client";

import { useEffect, useRef } from "react";

import { trackEvent } from "@folio/ui";

import { attributionToEventProperties } from "@/lib/attribution";

import { useCampaignRuntime } from "./runtime-context";

/**
 * Fires the conversion event once consent is granted. If the visitor grants
 * consent after landing on the page, the effect runs again and the ref guards
 * against a duplicate event.
 */
export function ThankYouTracker() {
  const { attribution, consent } = useCampaignRuntime();
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current || consent !== "granted") {
      return;
    }

    fired.current = true;
    trackEvent("thank_you_view", attributionToEventProperties(attribution));
  }, [attribution, consent]);

  return null;
}
