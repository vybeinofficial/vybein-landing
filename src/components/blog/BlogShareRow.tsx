"use client";

import { useEffect, useMemo, useState } from "react";

type Props = {
  url: string;
  title: string;
  className?: string;
};

const enc = encodeURIComponent;

function ShareGlyph() {
  return (
    <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M14 3h7v7M21 3l-9 9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 14v4a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden>
      <path d="M20.52 3.48A11.78 11.78 0 0 0 12.13 0C5.64 0 .35 5.26.35 11.74c0 2.06.54 4.06 1.56 5.82L0 24l6.62-1.88a11.75 11.75 0 0 0 5.5 1.4h.01c6.49 0 11.78-5.26 11.78-11.74 0-3.14-1.23-6.1-3.39-8.3ZM12.13 21.5h-.01a9.7 9.7 0 0 1-4.95-1.35l-.35-.2-3.93 1.12 1.05-3.82-.23-.39a9.73 9.73 0 0 1-1.5-5.12c0-5.37 4.4-9.74 9.8-9.74 2.62 0 5.08 1.02 6.93 2.86a9.65 9.65 0 0 1 2.88 6.88c0 5.37-4.4 9.74-9.69 9.74Zm5.34-7.28c-.29-.14-1.71-.84-1.97-.94-.27-.1-.46-.14-.66.14s-.76.94-.93 1.14c-.17.2-.34.22-.63.08-.29-.14-1.24-.45-2.36-1.44a8.85 8.85 0 0 1-1.64-2.04c-.17-.29-.02-.44.13-.58.13-.13.29-.34.44-.5.15-.17.2-.29.29-.49.1-.2.05-.37-.02-.51-.08-.14-.66-1.58-.9-2.17-.24-.56-.48-.49-.66-.49h-.56c-.2 0-.51.08-.78.37-.27.29-1.02 1-.99 2.44.02 1.44 1.02 2.83 1.16 3.03.15.2 2.03 3.09 4.93 4.34.69.3 1.22.48 1.63.61.69.22 1.32.19 1.82.12.56-.08 1.71-.7 1.95-1.36.24-.66.24-1.22.17-1.36-.07-.14-.27-.22-.56-.36Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden>
      <path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm16.66 2H4.34L12 12.74 19.66 7Zm.34 2.2-7.4 5.57a1 1 0 0 1-1.2 0L4 9.2V17h16V9.2Z" />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden>
      <path d="M9.9 15.17 9.5 20c.57 0 .81-.25 1.1-.54l2.64-2.53 5.47 4.01c1 .55 1.7.26 1.97-.92L24 4.43c.36-1.45-.53-2.02-1.5-1.64L1.84 10.73c-1.4.56-1.38 1.34-.24 1.69l5.26 1.64L19.07 6.4c.58-.35 1.1-.16.67.2" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden>
      <path d="M13.5 22v-8h2.7l.4-3h-3.1V9.2c0-.87.25-1.46 1.5-1.46H16.7V5.06C16.4 5.02 15.53 5 14.5 5 12.35 5 10.9 6.3 10.9 8.72V11H8.2v3h2.7v8h2.6Z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden>
      <path d="M18.9 2H22l-6.76 7.72L23.2 22h-6.24l-4.9-6.42L6.44 22H3.3l7.23-8.27L.8 2h6.4l4.42 5.84L18.9 2Zm-1.1 18h1.73L6.24 3.9H4.38L17.8 20Z" />
    </svg>
  );
}

export default function BlogShareRow({ url, title, className = "" }: Props) {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);

  const links = useMemo(
    () => ({
      whatsapp: `https://wa.me/?text=${enc(`${title} ${url}`)}`,
      telegram: `https://t.me/share/url?url=${enc(url)}&text=${enc(title)}`,
      x: `https://twitter.com/intent/tweet?text=${enc(title)}&url=${enc(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`,
      email: `mailto:?subject=${enc(title)}&body=${enc(url)}`,
    }),
    [title, url],
  );

  useEffect(() => {
    if (!open) return;
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [open]);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className={className}>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-800 shadow-sm transition hover:border-brand/40 hover:text-brand-dark"
        aria-label="Share this blog"
      >
        <ShareGlyph />
        Share
      </button>

      {!open ? null : (
        <>
          <div className="fixed inset-0 z-[70] bg-black/45" onClick={() => setOpen(false)} aria-hidden />
          <div
            className="fixed left-1/2 top-1/2 z-[71] w-[92vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-gray-200 bg-white p-6 shadow-2xl md:p-8"
            role="dialog"
            aria-modal="true"
            aria-label="Share Blog"
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-4xl font-bold leading-tight text-gray-900">Share Blog</h3>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-1 text-2xl leading-none text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
                aria-label="Close share dialog"
              >
                ×
              </button>
            </div>

            <p className="mt-5 text-3xl font-semibold text-gray-900 md:text-4xl">Share via...</p>

            <div className="mt-5 flex flex-wrap items-center gap-4">
              <a href={links.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Share on WhatsApp" className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#40C351] text-white shadow-sm transition hover:scale-105"><WhatsAppIcon /></a>
              <a href={links.email} aria-label="Share by email" className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#F36B62] text-white shadow-sm transition hover:scale-105"><MailIcon /></a>
              <a href={links.telegram} target="_blank" rel="noopener noreferrer" aria-label="Share on Telegram" className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#2AABEE] text-white shadow-sm transition hover:scale-105"><TelegramIcon /></a>
              <a href={links.facebook} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook" className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#3b5998] text-white shadow-sm transition hover:scale-105"><FacebookIcon /></a>
              <a href={links.x} target="_blank" rel="noopener noreferrer" aria-label="Share on X" className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#111827] text-white shadow-sm transition hover:scale-105"><XIcon /></a>
            </div>

            <p className="mt-8 text-3xl font-semibold text-gray-900 md:text-4xl">Or copy link</p>
            <div className="mt-4 flex overflow-hidden rounded-2xl border border-[#cfcde8] bg-[#eeecfb]">
              <input
                value={url}
                readOnly
                className="min-w-0 flex-1 bg-transparent px-4 py-3 text-base text-gray-700 outline-none"
                aria-label="Blog URL"
              />
              <button
                type="button"
                onClick={onCopy}
                className="bg-[#5f55df] px-5 py-3 text-base font-bold text-white transition hover:bg-[#4e46c7]"
                aria-live="polite"
              >
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
