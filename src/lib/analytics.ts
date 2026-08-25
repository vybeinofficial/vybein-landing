"use client";

type AnalyticsParams = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

const canTrack = () => typeof window !== "undefined";

export const trackEvent = (eventName: string, params: AnalyticsParams = {}) => {
  if (!canTrack()) return;

  const payload = {
    event: eventName,
    page_path: window.location.pathname,
    ...params,
  };

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push(payload);
  }

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, payload);
  }
};

