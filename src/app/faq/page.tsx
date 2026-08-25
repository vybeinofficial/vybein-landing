import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE_URL } from "@/lib/site";
import { SITE_FAQ_ITEMS, buildFaqPageJsonLd } from "@/lib/site-faq";

export const metadata: Metadata = {
  title: "FAQ | Vybein",
  description: "Answers about Vybein, privacy, platforms, and how we differ from typical dating or chat apps.",
  alternates: {
    canonical: `${SITE_URL}/faq`,
  },
};

export default function FaqPage() {
  const jsonLd = buildFaqPageJsonLd();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main className="min-h-screen bg-white">
        <section className="hero-gradient border-b border-gray-100 pt-28 pb-12 md:pt-32 md:pb-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Link href="/" className="text-sm font-semibold text-brand hover:text-brand-dark transition">
              ← Back to Home
            </Link>
            <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
              Frequently Asked Questions
            </h1>
            <p className="mt-4 max-w-2xl text-pretty text-base text-gray-600 md:text-lg">
              Quick answers about Vybein, privacy, and how we&apos;re different. For legal policies, see the links in the footer.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="space-y-3" id="faq">
              {SITE_FAQ_ITEMS.map((faq) => (
                <details
                  key={faq.question}
                  className="group overflow-hidden rounded-2xl border border-gray-200/90 bg-white shadow-sm open:ring-2 open:ring-brand/20 open:shadow-md"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left transition marker:content-none hover:bg-gray-50/80 sm:px-6 sm:py-5 [&::-webkit-details-marker]:hidden">
                    <span className="text-base font-semibold text-gray-900 sm:text-lg">{faq.question}</span>
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

            <p className="mt-10 text-center text-sm text-gray-500">
              Still have questions?{" "}
              <a href="mailto:support@vybein.com" className="font-semibold text-brand hover:text-brand-dark transition">
                Contact support
              </a>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
