"use client";

import { useEffect } from "react";

import { trackEvent } from "@folio/ui";

export function AnalyticsBridge() {
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
      });
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
