"use client";

import { useEffect, useMemo, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { GOOGLE_PLAY_URL } from "@/lib/site";

const REDIRECT_DELAY_MS = 1400;

function ReferRedirect() {
  const searchParams = useSearchParams();
  const code = useMemo(() => {
    const raw = searchParams.get("code")?.trim() || "";
    return raw ? raw.toUpperCase() : "";
  }, [searchParams]);

  const [secondsLeft, setSecondsLeft] = useState(2);

  useEffect(() => {
    const deepLink = code
      ? `vybein://refer?code=${encodeURIComponent(code)}`
      : "vybein://refer";

    window.location.assign(deepLink);

    const fallback = window.setTimeout(() => {
      window.location.assign(GOOGLE_PLAY_URL);
    }, REDIRECT_DELAY_MS);

    const countdown = window.setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      window.clearTimeout(fallback);
      window.clearInterval(countdown);
    };
  }, [code]);

  return (
    <main className="min-h-screen bg-white text-slate-900 flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 p-6 text-center shadow-sm">
        <h1 className="text-2xl font-semibold">Opening Vybein...</h1>
        <p className="mt-3 text-sm text-slate-600">
          {code
            ? `Referral code ${code} will be ready to apply in the app.`
            : "Redirecting you to the app."}
        </p>
        <p className="mt-2 text-xs text-slate-500">
          If the app does not open, you will be sent to Google Play in{" "}
          {secondsLeft}s.
        </p>
        <a
          href={GOOGLE_PLAY_URL}
          className="mt-5 inline-block rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700"
        >
          Download on Google Play
        </a>
      </div>
    </main>
  );
}

export default function ReferPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-white flex items-center justify-center px-6">
          <p className="text-sm text-slate-600">Opening Vybein...</p>
        </main>
      }
    >
      <ReferRedirect />
    </Suspense>
  );
}
