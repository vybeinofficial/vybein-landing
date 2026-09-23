"use client";

import { GOOGLE_PLAY_URL } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";

export default function PlayStoreButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={GOOGLE_PLAY_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() =>
        trackEvent("download_click", {
          cta_name: "home_playstore_button",
          surface: "home_page",
        })
      }
      className={`inline-flex items-center justify-center gap-3 rounded-2xl bg-gray-900 px-7 py-3.5 font-semibold text-white shadow-lg shadow-gray-900/30 ring-1 ring-white/10 transition hover:-translate-y-0.5 hover:bg-gray-800 hover:shadow-xl ${className}`}
      aria-label="Download Vybein on Google Play"
    >
      <svg className="h-7 w-7 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.14L6.05,2.66Z" />
      </svg>
      <span className="text-left leading-tight">
        <span className="block text-[10px] uppercase tracking-wider text-white/80">Get it on</span>
        <span className="block text-sm font-bold">Google Play</span>
      </span>
    </a>
  );
}
