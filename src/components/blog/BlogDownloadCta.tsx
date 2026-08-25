"use client";

import { GOOGLE_PLAY_URL } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";

export default function BlogDownloadCta() {
  return (
    <div className="mt-8 ">
      <a
        href={GOOGLE_PLAY_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() =>
          trackEvent("download_click", {
            cta_name: "blog_download_cta",
            surface: "blog_detail",
          })
        }
        className="group relative mx-auto flex w-full max-w-md items-center justify-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-[#1f5c58] via-[#2a7b76] to-[#1a6d68] px-8 py-3.5 text-center text-[15px] font-bold tracking-wide text-white shadow-[0_10px_40px_rgba(42,123,118,0.45),0_0_0_1px_rgba(255,255,255,0.12)_inset] transition hover:shadow-[0_12px_44px_rgba(42,123,118,0.58)] active:scale-[0.99] sm:px-10 sm:text-base"
      >
        <span
          className="absolute inset-0 bg-gradient-to-t from-black/10 to-white/10 opacity-0 transition group-hover:opacity-100"
          aria-hidden
        />
        <svg className="relative h-7 w-7 shrink-0 drop-shadow-md" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.14L6.05,2.66Z" />
        </svg>
        <span className="relative">Download now</span>
      </a>
    </div>
  );
}
