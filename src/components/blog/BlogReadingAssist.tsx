"use client";

import { useEffect, useMemo, useState } from "react";

type TocItem = {
  id: string;
  text: string;
  anchor: string;
  level: number;
};

type Props = {
  tocItems: TocItem[];
};

export default function BlogReadingAssist({ tocItems }: Props) {
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop || 0;
      const viewport = window.innerHeight || doc.clientHeight || 0;
      const fullHeight = Math.max(doc.scrollHeight, document.body.scrollHeight);
      const maxScrollable = Math.max(fullHeight - viewport, 1);
      const pct = Math.min(100, Math.max(0, (scrollTop / maxScrollable) * 100));
      setProgress(pct);
    };
    const onResize = () => {
      setIsDesktop(window.innerWidth >= 768);
      onScroll();
    };

    onResize();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [open]);

  const hasToc = tocItems.length > 0;
  const progressStyle = useMemo(
    () => ({ transform: `scaleX(${progress / 100})` }),
    [progress],
  );
  const showJumpButton = hasToc && (!isDesktop || progress < 35);

  return (
    <>
      <div className="pointer-events-none fixed left-0 right-0 top-0 z-[60] h-1 bg-transparent" aria-hidden>
        <div
          className="h-full origin-left bg-gradient-to-r from-brand to-brand-dark transition-transform duration-150"
          style={progressStyle}
        />
      </div>

      {!hasToc ? null : (
        <>
          {!showJumpButton ? null : (
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="fixed bottom-5 left-4 z-[55] rounded-full bg-brand px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand/30 transition hover:bg-brand-dark md:bottom-6 md:right-6 md:left-auto"
              aria-label="Jump to section"
            >
              Jump to section
            </button>
          )}

          {!open ? null : (
            <>
              <div className="fixed inset-0 z-[58] bg-black/40 backdrop-blur-[1px]" onClick={() => setOpen(false)} aria-hidden />
              <div
                className="fixed bottom-0 left-0 right-0 z-[59] max-h-[72vh] overflow-auto rounded-t-3xl border border-gray-200 bg-white p-5 shadow-2xl md:bottom-6 md:left-auto md:right-6 md:w-[360px] md:rounded-2xl"
                role="dialog"
                aria-modal="true"
                aria-label="Table of contents"
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <p className="text-sm font-bold uppercase tracking-[0.16em] text-gray-500">Jump to section</p>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="rounded-md px-2 py-1 text-sm font-semibold text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    aria-label="Close section list"
                  >
                    Close
                  </button>
                </div>
                <nav className="space-y-1.5">
                  {tocItems.map((item) => (
                    <a
                      key={item.id}
                      href={item.anchor}
                      onClick={() => setOpen(false)}
                      className={`block rounded-lg px-3 py-2 text-sm transition hover:bg-slate-50 hover:text-brand-dark ${
                        item.level === 1
                          ? "font-semibold text-gray-900"
                          : item.level === 2
                            ? "pl-5 font-medium text-gray-700"
                            : "pl-7 text-gray-600"
                      }`}
                    >
                      {item.text}
                    </a>
                  ))}
                </nav>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
