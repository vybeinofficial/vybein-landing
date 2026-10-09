"use client";

import { GOOGLE_PLAY_URL } from "@/lib/site";

export default function OpenInAppButton({ deepLink }: { deepLink: string }) {
  const openApp = () => {
    const fallback = window.setTimeout(() => {
      if (!document.hidden) window.location.assign(GOOGLE_PLAY_URL);
    }, 1500);
    const cancel = () => {
      if (document.hidden) window.clearTimeout(fallback);
    };
    document.addEventListener("visibilitychange", cancel, { once: true });
    window.location.assign(deepLink);
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <button
        type="button"
        onClick={openApp}
        className="inline-flex flex-1 items-center justify-center rounded-xl bg-brand px-5 py-3 font-semibold text-white shadow-md transition hover:bg-brand-dark"
      >
        Open in Vybein app
      </button>
      <a
        href={GOOGLE_PLAY_URL}
        className="inline-flex flex-1 items-center justify-center rounded-xl border border-brand/30 bg-white px-5 py-3 font-semibold text-brand transition hover:bg-brand/5"
      >
        Get it on Google Play
      </a>
    </div>
  );
}
