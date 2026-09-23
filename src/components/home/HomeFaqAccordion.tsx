"use client";

import { useState } from "react";
import type { FaqItem } from "@/lib/site-faq";

export default function HomeFaqAccordion({ items }: { items: FaqItem[] }) {
  const [openFaqs, setOpenFaqs] = useState<Record<number, boolean>>({});

  return (
    <div className="mt-12 space-y-3" id="faqAccordion">
      {items.map((faq, index) => {
        const open = Boolean(openFaqs[index]);
        return (
          <article
            key={faq.question}
            className={`overflow-hidden rounded-2xl border border-gray-200/90 bg-white shadow-sm transition ${open ? "ring-2 ring-brand/20 shadow-md" : "hover:border-gray-300"}`}
          >
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-gray-50/80 sm:px-6 sm:py-5"
              aria-expanded={open}
              onClick={() => setOpenFaqs((prev) => ({ ...prev, [index]: !prev[index] }))}
            >
              <h3 className="text-base font-semibold text-gray-900 sm:text-lg">{faq.question}</h3>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand/10 text-lg font-bold leading-none text-brand">
                {open ? "−" : "+"}
              </span>
            </button>
            {!open ? null : (
              <div className="border-t border-gray-100 bg-gray-50/50 px-5 py-4 sm:px-6 sm:py-5">
                <p className="text-pretty leading-relaxed text-gray-600">{faq.answer}</p>
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}
