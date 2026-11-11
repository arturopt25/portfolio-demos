"use client";

import { useEffect } from "react";

import { trackEvent } from "@folio/ui";

import { attributionToEventProperties } from "@/lib/attribution";

import { useCampaignRuntime } from "./runtime-context";

/**
 * Single delegated click listener for `data-analytics` elements. Keeps
 * analytics wiring out of server components and adds the captured campaign
 * attribution to every event. The shared `trackEvent` drops events until
 * consent is granted and the no-op adapter has been configured.
 */
export function AnalyticsBridge() {
  const { attribution } = useCampaignRuntime();

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const tracked = target.closest<HTMLElement>("[data-analytics]");
      const eventName = tracked?.dataset.analytics;

      if (!eventName) {
        return;
      }

      trackEvent(eventName, {
        path: window.location.pathname,
        href: tracked.getAttribute("href") ?? undefined,
        ...attributionToEventProperties(attribution),
      });
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [attribution]);

  return null;
}
