"use client";

import { useState } from "react";
import { GOOGLE_PLAY_URL } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";
import PlayStoreButton from "./PlayStoreButton";

export default function HomeHeroActions() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
        <a
          href={GOOGLE_PLAY_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackEvent("download_click", {
              cta_name: "home_hero_primary_cta",
              surface: "home_hero",
            })
          }
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brand px-8 py-4 text-center text-base font-bold text-white shadow-lg shadow-brand/35 ring-2 ring-brand/20 transition hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-xl"
        >
          <svg className="h-5 w-5 shrink-0 opacity-95" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
          Find people near you
        </a>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center justify-center rounded-2xl border border-gray-200/90 bg-white/90 px-6 py-3.5 text-sm font-semibold text-gray-800 shadow-sm backdrop-blur transition hover:border-brand/35 hover:text-brand-dark hover:shadow-md"
          aria-label="App Store coming soon"
        >
          App Store — soon
        </button>
      </div>

      {!modalOpen ? null : (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onClick={() => setModalOpen(false)}
          role="presentation"
        >
          <div
            className="relative w-full max-w-md rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-2xl shadow-gray-900/20"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="ios-modal-title"
          >
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="absolute right-4 top-4 text-gray-400 transition hover:text-gray-600"
              aria-label="Close"
            >
              ✕
            </button>
            <h3 id="ios-modal-title" className="text-2xl font-bold text-gray-900">
              Coming soon
            </h3>
            <p className="mt-3 text-gray-600">Vybein on the App Store is on the way. Get it on Google Play today.</p>
            <div className="mt-6 flex flex-col gap-3">
              <PlayStoreButton className="w-full justify-center" />
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="rounded-xl border border-gray-200 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
