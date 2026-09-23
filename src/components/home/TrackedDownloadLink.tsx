"use client";

import type { ReactNode } from "react";
import { GOOGLE_PLAY_URL } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";

export default function TrackedDownloadLink({
  children,
  className,
  ctaName,
  surface,
}: {
  children: ReactNode;
  className?: string;
  ctaName: string;
  surface: string;
}) {
  return (
    <a
      href={GOOGLE_PLAY_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() =>
        trackEvent("download_click", {
          cta_name: ctaName,
          surface,
        })
      }
    >
      {children}
    </a>
  );
}
