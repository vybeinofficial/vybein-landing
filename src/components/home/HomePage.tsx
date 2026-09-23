"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GOOGLE_PLAY_URL } from "@/lib/site";
import { SITE_FAQ_ITEMS } from "@/lib/site-faq";
import { trackEvent } from "@/lib/analytics";

const HOME_GYM_TOGETHER = "/home/gym-together.jpg";
const HOME_ACTIVITIES_NEAR_YOU = "/home/activities-near-you.jpg";
const HOME_FIND_PARTNERS_LANDSCAPE = "/home/find-partners-landscape.jpg";
const HOME_FIND_PARTNERS_PORTRAIT = "/home/find-partners-portrait.jpg";

type SplitSide = {
  src: string;
  alt: string;
  label: string;
  priority?: boolean;
  fetchPriority?: "high" | "low" | "auto";
};

function SectionEyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p
      className={`mb-3 inline-flex items-center rounded-full bg-brand/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-brand-dark ${className}`}
    >
      {children}
    </p>
  );
}

function SplitTransformation({
  left,
  right,
  className = "",
  sizes = "(max-width: 768px) 50vw, 400px",
  quality,
}: {
  left: SplitSide;
  right: SplitSide;
  className?: string;
  sizes?: string;
  quality?: number;
}) {
  return (
    <div
      className={`group relative grid grid-cols-2 overflow-hidden rounded-2xl border border-gray-200/80 bg-gray-100 shadow-lg shadow-gray-900/10 ring-1 ring-black/[0.04] transition duration-500 hover:shadow-2xl hover:shadow-brand/10 md:rounded-3xl ${className}`}
    >
      <div className="relative aspect-[4/5] min-h-[200px] md:min-h-[260px]">
        <Image
          src={left.src}
          alt={left.alt}
          fill
          priority={Boolean(left.priority)}
          fetchPriority={left.fetchPriority ?? (left.priority ? "high" : undefined)}
          quality={quality}
          className="object-cover brightness-[0.48] saturate-[0.65] contrast-[1.05] transition duration-700 group-hover:brightness-[0.52]"
          sizes={sizes}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-transparent" aria-hidden />
        <span className="absolute bottom-3 left-3 md:bottom-4 md:left-4 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
          {left.label}
        </span>
      </div>
      <div className="relative aspect-[4/5] min-h-[200px] md:min-h-[260px] border-l-[3px] border-white shadow-[inset_6px_0_32px_rgba(0,0,0,0.06)]">
        <Image
          src={right.src}
          alt={right.alt}
          fill
          priority={Boolean(right.priority)}
          fetchPriority={right.fetchPriority}
          quality={quality}
          className="object-cover brightness-[1.02] saturate-[1.06] transition duration-700 group-hover:brightness-[1.06]"
          sizes={sizes}
        />
        <span className="absolute bottom-3 right-3 md:bottom-4 md:right-4 rounded-full border border-white/20 bg-brand px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg">
          {right.label}
        </span>
      </div>
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 z-10 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-brand shadow-lg ring-4 ring-white/90"
        aria-hidden
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </div>
    </div>
  );
}

function PlayStoreButton({ className = "" }: { className?: string }) {
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

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [openFaqs, setOpenFaqs] = useState<Record<number, boolean>>({});

  const homeStructuredData = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          name: "Vybein",
          url: "https://vybein.com",
          description:
            "Find nearby activity partners for Gym, Tea, Study, Travel, and everyday plans. Connect with real people safely without digital drama. Download Vybein today",
        },
        {
          "@type": "WebPage",
          name: "Find Your Vibe Partner Nearby for Daily Activities | Vybein",
          url: "https://vybein.com",
          description:
            "Find nearby activity partners for Gym, Tea, Study, Travel, and everyday plans. Connect with real people safely without digital drama. Download Vybein today",
          isPartOf: {
            "@type": "WebSite",
            name: "Vybein",
            url: "https://vybein.com",
          },
        },
        {
          "@type": "FAQPage",
          mainEntity: SITE_FAQ_ITEMS.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        },
      ],
    }),
    [],
  );

  const toggleFaq = (index: number) => {
    setOpenFaqs((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeStructuredData) }}
      />

      <Header />

      <main>
      {/* 1. Hero */}
      <section
        className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-[#eef6f5] to-white pt-28 pb-16 md:pt-36 md:pb-28 lg:pt-40 lg:pb-32"
        id="top"
      >
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full bg-brand/[0.07] blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-32 -left-24 h-[380px] w-[380px] rounded-full bg-teal-200/40 blur-3xl"
          aria-hidden
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand/25 bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-dark shadow-sm backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden />
                Built for women first · Safe, private, free to browse
              </p>
              <h1 className="font-heading text-balance text-4xl font-bold leading-[1.06] tracking-tight text-gray-900 sm:text-5xl lg:text-[3.25rem] lg:leading-[1.05]">
                Find People with Your Vibe for Real Life
              </h1>
              <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-gray-600 sm:text-xl">
                Meet genuine activity partners nearby for gym, tea, study, travel, and everyday plans — no fake profiles, no digital drama.
              </p>
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
              <p className="mt-4 text-sm font-medium text-gray-500">Android is live today. iOS version is coming soon.</p>
              <ul className="mt-10 flex flex-wrap gap-3 text-sm font-medium text-gray-700">
                <li className="inline-flex items-center gap-2 rounded-full border border-gray-200/80 bg-white/90 px-4 py-2 shadow-sm backdrop-blur-sm">
                  <span aria-hidden>✅</span>
                  100% free browsing
                </li>
                <li className="inline-flex items-center gap-2 rounded-full border border-gray-200/80 bg-white/90 px-4 py-2 shadow-sm backdrop-blur-sm">
                  <span aria-hidden>🔒</span>
                  Private in-app chat
                </li>
                <li className="inline-flex items-center gap-2 rounded-full border border-gray-200/80 bg-white/90 px-4 py-2 shadow-sm backdrop-blur-sm">
                  <span aria-hidden>🪪</span>
                  ID verified profiles
                </li>
                <li className="inline-flex items-center gap-2 rounded-full border border-gray-200/80 bg-white/90 px-4 py-2 shadow-sm backdrop-blur-sm">
                  <span aria-hidden>💬</span>
                  No phone or email exposed
                </li>
              </ul>
              <div className="mt-8 flex flex-wrap items-center gap-4 text-sm">
                <Link href="/blogs" className="font-semibold text-brand hover:text-brand-dark transition">
                  Read social connection tips →
                </Link>
                <Link href="/faq" className="font-semibold text-gray-700 hover:text-brand-dark transition">
                  See all FAQs →
                </Link>
              </div>
            </div>
            <div>
              <SplitTransformation
                className="mx-auto max-w-xl lg:mx-0 lg:max-w-none"
                left={{
                  src: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800",
                  alt: "Person working alone at a laptop in a quiet moment",
                  label: "Alone",
                  priority: true,
                  fetchPriority: "high",
                }}
                right={{
                  src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800",
                  alt: "Group of friends laughing together outdoors",
                  label: "Connected",
                }}
              />
              <p className="mt-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                Same life — better together on Vybein
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Purpose */}
      <section className="border-t border-gray-100 bg-white py-20 md:py-28" id="purpose">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-gray-200/80 bg-gray-100 shadow-2xl shadow-gray-900/10 ring-1 ring-black/[0.04]">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=720"
                alt="Thoughtful person reflecting — emotional, relatable moment"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={70}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/55 via-transparent to-transparent" aria-hidden />
            </div>
            <div>
              <SectionEyebrow>Why we exist</SectionEyebrow>
              <h2 className="font-heading text-balance text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
                Why Vybein Exists
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-gray-600 md:text-xl">
                We have everything in life — but not always the right people to share it with.
              </p>
              <ul className="mt-8 space-y-4 text-gray-800">
                {["Share stress & frustration safely", "Need partners for daily activities", "Want real connections, not fake ones"].map(
                  (item) => (
                    <li key={item} className="flex gap-4">
                      <span
                        className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand shadow-[0_0_0_4px_rgba(42,123,118,0.15)]"
                        aria-hidden
                      />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ),
                )}
              </ul>
              <p className="mt-10 rounded-2xl border border-brand/25 bg-gradient-to-br from-brand-light/90 to-white p-6 text-base font-medium leading-relaxed text-brand-dark shadow-sm">
                Vybein helps you find people who match your vibe — for everyday life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Solution */}
      <section className="bg-gradient-to-b from-slate-50 via-white to-slate-50/80 py-20 md:py-28" id="solution">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <SectionEyebrow>Do it together</SectionEyebrow>
            <h2 className="font-heading text-balance text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              Find Your Vibe and Do It Together
            </h2>
            <p className="mt-5 flex flex-wrap justify-center gap-2 text-sm text-gray-600 md:text-base">
              {["Gym 💪", "Yoga 🧘", "Tea ☕", "Dinner 🍽️", "Shopping 🛍️", "Travel ✈️", "Parties 🎉", "Study 📚", "Startups 💡"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-gray-200/90 bg-white px-3 py-1.5 font-medium text-gray-700 shadow-sm"
                  >
                    {tag}
                  </span>
                ),
              )}
            </p>
            <p className="mt-6 text-lg font-semibold text-brand-dark">Whatever your vibe — don&apos;t do it alone.</p>
          </div>

          <div className="mt-16 grid gap-10 md:grid-cols-2 md:gap-8 lg:gap-10">
            <div className="rounded-[1.75rem] border border-gray-200/80 bg-white/80 p-4 shadow-md shadow-gray-900/5 backdrop-blur-sm md:p-5">
              <p className="mb-4 text-center text-xs font-bold uppercase tracking-[0.2em] text-gray-500">Gym</p>
              <SplitTransformation
                sizes="(max-width: 768px) 50vw, 280px"
                quality={70}
                left={{
                  src: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=640",
                  alt: "Working out alone in the gym",
                  label: "Alone",
                }}
                right={{
                  src: HOME_GYM_TOGETHER,
                  alt: "Training together with a gym activity partner",
                  label: "With partner",
                }}
              />
            </div>
            <div className="rounded-[1.75rem] border border-gray-200/80 bg-white/80 p-4 shadow-md shadow-gray-900/5 backdrop-blur-sm md:p-5">
              <p className="mb-4 text-center text-xs font-bold uppercase tracking-[0.2em] text-gray-500">Dinner</p>
              <SplitTransformation
                sizes="(max-width: 768px) 50vw, 280px"
                quality={70}
                left={{
                  src: "https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&q=80&w=640",
                  alt: "Eating alone at home",
                  label: "Alone",
                }}
                right={{
                  src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=640",
                  alt: "Friends sharing a meal at a restaurant",
                  label: "Group + split bill",
                }}
              />
            </div>
            <div className="rounded-[1.75rem] border border-gray-200/80 bg-white/80 p-4 shadow-md shadow-gray-900/5 backdrop-blur-sm md:p-5">
              <p className="mb-4 text-center text-xs font-bold uppercase tracking-[0.2em] text-gray-500">Study</p>
              <SplitTransformation
                sizes="(max-width: 768px) 50vw, 280px"
                quality={70}
                left={{
                  src: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=640",
                  alt: "Studying alone with laptop",
                  label: "Alone",
                }}
                right={{
                  src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=640",
                  alt: "Group of friends laughing together outdoors",
                  label: "Group discussion",
                }}
              />
            </div>
            <div className="rounded-[1.75rem] border border-gray-200/80 bg-white/80 p-4 shadow-md shadow-gray-900/5 backdrop-blur-sm md:p-5">
              <p className="mb-4 text-center text-xs font-bold uppercase tracking-[0.2em] text-gray-500">From scroll to real life</p>
              <SplitTransformation
                sizes="(max-width: 768px) 50vw, 280px"
                quality={70}
                left={{
                  src: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=640",
                  alt: "Person on phone — bored scrolling",
                  label: "Scrolling",
                }}
                right={{
                  src: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=640",
                  alt: "Friends chatting over tea at a cafe",
                  label: "Tea meetup",
                }}
              />
            </div>
          </div>
          <p className="mt-14 text-center text-xs font-bold uppercase tracking-[0.25em] text-gray-500">
            Same life → Better with Vybein
          </p>
          <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-brand/20 bg-white p-5 text-center shadow-sm">
            <p className="text-sm text-gray-600">
              Looking for real people, not endless chat? Vybein helps you move from scrolling to local meetups that fit your routine.
            </p>
            <div className="mt-4">
              <PlayStoreButton />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Emotional */}
      <section
        className="relative overflow-hidden bg-gradient-to-br from-brand-dark via-[#1e5f5a] to-gray-900 py-20 text-white md:py-28"
        id="emotional"
      >
        <div className="pointer-events-none absolute inset-0 opacity-[0.12]" aria-hidden>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,white,transparent_45%)]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <SectionEyebrow className="bg-white/15 text-brand-light">Share freely</SectionEyebrow>
              <h2 className="font-heading text-balance text-3xl font-bold tracking-tight md:text-4xl lg:text-[2.5rem]">
                Share What You Feel
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-white/90">
                Stress, tension, emotions, frustration — share it all.
              </p>
              <p className="mt-5 text-xl font-semibold text-brand-light">Talk. Laugh. Connect.</p>
              <p className="mt-4 text-lg text-white/80">Feel light. Feel happy.</p>
            </div>
            <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] border border-white/15 shadow-2xl shadow-black/40 ring-1 ring-white/10">
              <Image
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=720"
                alt="Happy relaxed group sharing a meal together"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={70}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. How it works */}
      <section className="border-t border-gray-100 bg-white py-20 md:py-28" id="how-it-works">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <div className="relative w-full overflow-hidden rounded-[1.75rem] border border-gray-200/80 bg-brand-dark shadow-2xl shadow-gray-900/10 ring-1 ring-black/[0.04]">
              <div className="relative aspect-[16/10]">
                <Image
                  src={HOME_ACTIVITIES_NEAR_YOU}
                  alt="Vybein app showing activities near you and activity partners on your phone"
                  fill
                  className="object-contain object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
            <div>
              <SectionEyebrow>How it works</SectionEyebrow>
              <h2 className="font-heading text-balance text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
                Simple &amp; Real
              </h2>
              <ol className="relative mt-10 space-y-0 pl-2">
                {["Choose your activity", "Find activity partners nearby", "Connect & meet"].map((step, i) => (
                  <li key={step} className="relative flex gap-5 pb-10 last:pb-0">
                    {i < 2 ? (
                      <span
                        className="absolute left-[19px] top-10 h-[calc(100%-0.5rem)] w-0.5 bg-gradient-to-b from-brand/50 to-brand/10"
                        aria-hidden
                      />
                    ) : null}
                    <span className="relative z-[1] flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand-dark text-sm font-bold text-white shadow-md ring-4 ring-white">
                      {i + 1}
                    </span>
                    <div className="pt-1.5">
                      <p className="text-lg font-semibold text-gray-900">{step}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="mt-2 rounded-xl border border-brand/20 bg-brand-light/50 px-4 py-3 text-base font-medium text-brand-dark">
                No fake chats — only real connections.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Trust */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-20 md:py-28" id="trust">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <SectionEyebrow>Trust &amp; safety</SectionEyebrow>
            <h2 className="font-heading text-balance text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              Safety, privacy, and open browsing first
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gray-600 md:text-lg">
              Understand what Vybein is before you install: real activity partners nearby, private chat, and no hidden charges — designed with female safety as the first priority.
            </p>
          </div>

          <div className="mt-12 rounded-2xl border border-brand/20 bg-brand-light/40 px-5 py-4 text-center text-sm font-medium text-brand-dark md:text-base">
            Public profiles never show your mobile number or email. Chat stays in the app.
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:gap-10">
            <ul className="space-y-5 text-lg text-gray-700">
              {[
                {
                  title: "100% Free & Open Browsing",
                  body: "Zero hidden charges. No browsing paywalls. Profile and gallery photos are free to view.",
                },
                {
                  title: "Complete Privacy",
                  body: "Secure in-app chat. You never need to share your mobile number or email to connect.",
                },
                {
                  title: "Verified Profiles",
                  body: "ID/Selfie verified badges, plus an anti-dating and anti-rental community policy.",
                },
                {
                  title: "Share with Family & Friends",
                  body: "Share meetup location and timing so people close to you know where you are going.",
                },
                {
                  title: "Transparent Refund",
                  body: "If a paid activity is cancelled, the amount is refunded instantly to your wallet.",
                },
              ].map((item) => (
                <li key={item.title} className="flex items-start gap-4">
                  <span
                    className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand/15 text-sm font-bold text-brand"
                    aria-hidden
                  >
                    ✓
                  </span>
                  <span className="leading-relaxed">
                    <span className="font-semibold text-gray-900">{item.title}</span>
                    {" — "}
                    {item.body}
                  </span>
                </li>
              ))}
            </ul>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-gray-200/80 bg-brand-dark shadow-xl sm:row-span-2">
                <Image
                  src={HOME_FIND_PARTNERS_PORTRAIT}
                  alt="Find activity partners nearby in the Vybein app"
                  fill
                  className="object-contain object-center"
                  sizes="(max-width: 640px) 100vw, 40vw"
                />
              </div>
              <div className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem] border border-gray-200/80 bg-gray-900 shadow-lg">
                <Image
                  src={HOME_ACTIVITIES_NEAR_YOU}
                  alt="Activities near you on Vybein"
                  fill
                  className="object-contain object-center"
                  sizes="(max-width: 640px) 100vw, 30vw"
                />
              </div>
              <div className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem] border border-gray-200/80 bg-white shadow-lg">
                <Image
                  src={HOME_GYM_TOGETHER}
                  alt="Verified real-life meetup with an activity partner"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 30vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Differentiation */}
      <section className="border-t border-gray-100 bg-white py-20 md:py-28" id="difference">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <SectionEyebrow>Why Vybein</SectionEyebrow>
            <h2 className="font-heading text-balance text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              Not Just Events. Real Connections.
            </h2>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-2 md:gap-8">
            <div className="rounded-[2rem] border border-gray-200 bg-gray-50/80 p-8 shadow-sm md:p-10">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">Other apps</p>
              <ul className="mt-8 space-y-5 text-gray-600">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gray-300" aria-hidden />
                  <span className="leading-relaxed">Only events</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gray-300" aria-hidden />
                  <span className="leading-relaxed">Only chatting</span>
                </li>
              </ul>
            </div>
            <div className="relative overflow-hidden rounded-[2rem] border-2 border-brand bg-gradient-to-br from-brand-light via-white to-brand-light/30 p-8 shadow-xl shadow-brand/15 md:p-10">
              <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-brand/10 blur-2xl" aria-hidden />
              <p className="relative text-xs font-bold uppercase tracking-[0.2em] text-brand-dark">Vybein</p>
              <ul className="relative mt-8 space-y-5 text-lg font-medium text-gray-900">
                {["Real people", "Real meetups", "Real-life connections"].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-bold text-white">
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mx-auto mt-12 max-w-2xl text-center text-sm leading-relaxed text-gray-500">
            Daily life + same vibe partner + real connection — that&apos;s the Vybein promise.
          </p>
        </div>
      </section>

      {/* 8. Social proof */}
      <section className="bg-gradient-to-br from-brand-light/80 via-white to-slate-50 py-20 md:py-28" id="social-proof">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-5">
              <SectionEyebrow>Social proof</SectionEyebrow>
              <blockquote className="relative rounded-2xl border border-gray-100 bg-white p-6 pl-7 text-lg font-medium leading-relaxed text-gray-800 shadow-md shadow-gray-900/5 before:absolute before:left-0 before:top-4 before:h-[calc(100%-2rem)] before:w-1 before:rounded-full before:bg-brand before:content-['']">
                &ldquo;I finally found real friends!&rdquo;
              </blockquote>
              <blockquote className="relative rounded-2xl border border-gray-100 bg-white p-6 pl-7 text-lg font-medium leading-relaxed text-gray-800 shadow-md shadow-gray-900/5 before:absolute before:left-0 before:top-4 before:h-[calc(100%-2rem)] before:w-1 before:rounded-full before:bg-brand before:content-['']">
                &ldquo;No more boring weekends!&rdquo;
              </blockquote>
              <p className="text-sm text-gray-500">Stories from people building real routines together.</p>
            </div>
            <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] border border-gray-200/80 bg-gray-900 shadow-2xl shadow-gray-900/10 ring-1 ring-black/[0.04]">
              <Image
                src={HOME_FIND_PARTNERS_LANDSCAPE}
                alt="Friends meeting as activity partners — real connection"
                fill
                className="object-contain object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 9. Final CTA */}
      <section className="relative overflow-hidden bg-gray-900 py-24 text-white md:py-32" id="download-cta">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_70%_-10%,rgba(42,123,118,0.35),transparent_50%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_80%,rgba(255,255,255,0.06),transparent_40%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <h2 className="font-heading text-balance text-3xl font-bold leading-tight md:text-4xl lg:text-[2.65rem] lg:leading-[1.12]">
                Stop Feeling Alone, Stressed, or Frustrated. Start Living Happily.
              </h2>
              <p className="mt-6 text-xl font-semibold text-brand-light">Find Your Tribe on Vybein Today</p>
              <div className="mt-10">
                <PlayStoreButton />
              </div>
              <p className="mt-6 text-sm text-white/60">
                Alone → Together · Stress → Relief · Bored → Happy
              </p>
            </div>
            <div className="flex justify-center lg:justify-end">
              <a
                href={GOOGLE_PLAY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="relative block w-full max-w-[320px]"
                onClick={() =>
                  trackEvent("download_click", {
                    cta_name: "final_cta_phone_mockup",
                    surface: "home_download_cta",
                  })
                }
              >
                <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-brand-dark shadow-2xl">
                  <div className="relative aspect-[3/4]">
                    <Image
                      src={HOME_FIND_PARTNERS_PORTRAIT}
                      alt="Find activity partners nearby — download Vybein"
                      fill
                      className="object-contain object-center"
                      sizes="(max-width: 1024px) 320px, 320px"
                    />
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-gray-100 bg-white py-20 md:py-28" id="faq">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-heading text-balance text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-sm text-gray-500">
            Quick answers about Vybein, safety, privacy, and how we&apos;re different from typical chat or social apps.
          </p>
          <div className="mt-12 space-y-3" id="faqAccordion">
            {SITE_FAQ_ITEMS.slice(0, 5).map((faq, index) => {
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
                    onClick={() => toggleFaq(index)}
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
          <p className="mt-8 text-center text-sm text-gray-500">
            <Link href="/faq" className="font-semibold text-brand hover:text-brand-dark transition">
              View all on the FAQ page →
            </Link>
          </p>
        </div>
      </section>
      </main>

      <Footer />

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
