import type { FaqItem } from "@/lib/site-faq";

/** Native details/summary so FAQ answers are in the HTML without JS (required for mobile-first schema). */
export default function HomeFaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <div className="mt-12 space-y-3" id="faqAccordion">
      {items.map((faq) => (
        <details
          key={faq.question}
          className="group overflow-hidden rounded-2xl border border-gray-200/90 bg-white shadow-sm open:ring-2 open:ring-brand/20 open:shadow-md"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left transition marker:content-none hover:bg-gray-50/80 sm:px-6 sm:py-5 [&::-webkit-details-marker]:hidden">
            <h3 className="text-base font-semibold text-gray-900 sm:text-lg">{faq.question}</h3>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand/10 text-lg font-bold leading-none text-brand group-open:hidden">
              +
            </span>
            <span className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand/10 text-lg font-bold leading-none text-brand group-open:flex">
              −
            </span>
          </summary>
          <div className="border-t border-gray-100 bg-gray-50/50 px-5 py-4 sm:px-6 sm:py-5">
            <p className="text-pretty leading-relaxed text-gray-600">{faq.answer}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
