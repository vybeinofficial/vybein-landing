import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OpenInAppButton from "@/components/meetup/OpenInAppButton";
import { SITE_URL } from "@/lib/site";
import {
  eventDateLabel,
  fetchPublicEventByShareCode,
} from "@/lib/event-share";

type Props = { params: Promise<{ code: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params;
  const event = await fetchPublicEventByShareCode(code);
  const url = `${SITE_URL}/e/${encodeURIComponent(code)}`;

  if (!event) {
    return {
      title: "Event on Vybein",
      description: "Discover events near you on Vybein.",
      robots: { index: false, follow: true },
      alternates: { canonical: url },
    };
  }

  const title = event.title?.trim() || "Vybein event";
  const description =
    event.description?.trim().slice(0, 160) ||
    [eventDateLabel(event), event.venue].filter(Boolean).join(" • ") ||
    "Open this event in the Vybein app.";
  const image = event.coverImage || "/logo.png";

  return {
    title,
    description,
    robots: { index: false, follow: true },
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "website", images: [image] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export default async function EventSharePage({ params }: Props) {
  const { code } = await params;
  const event = await fetchPublicEventByShareCode(code);
  const deepLink = `vybein://e/${encodeURIComponent(code)}`;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-[#E6F2F1] to-white px-4 pt-28 pb-16">
        <div className="mx-auto max-w-xl">
          {event ? (
            <article className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl">
              {event.coverImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={event.coverImage}
                  alt={event.title || "Event"}
                  className="h-56 w-full object-cover"
                />
              ) : null}
              <div className="space-y-4 p-6">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-dark">
                  Event
                </p>
                <h1 className="font-heading text-3xl font-bold text-gray-900">
                  {event.title || "Vybein event"}
                </h1>
                {event.organizer?.name ? (
                  <p className="text-sm font-semibold text-gray-700">
                    Hosted by {event.organizer.name}
                  </p>
                ) : null}
                {event.description ? (
                  <p className="text-pretty leading-relaxed text-gray-600">
                    {event.description}
                  </p>
                ) : null}
                <ul className="space-y-2 text-sm text-gray-700">
                  {eventDateLabel(event) ? <li>📅 {eventDateLabel(event)}</li> : null}
                  {event.venue ? <li>📍 {event.venue}</li> : null}
                  {typeof event.slotsLeft === "number" ? (
                    <li>
                      👥 {event.slotsLeft}{" "}
                      {event.slotsLeft === 1 ? "slot" : "slots"} left
                    </li>
                  ) : null}
                  {typeof event.ticketPrice === "number" ? (
                    <li>
                      💰{" "}
                      {event.ticketPrice > 0
                        ? `₹${event.ticketPrice}`
                        : "Free entry"}
                    </li>
                  ) : null}
                </ul>
                <OpenInAppButton deepLink={deepLink} />
                <p className="text-center text-xs text-gray-500">
                  Install Vybein to book this event and chat with the organizer.
                </p>
              </div>
            </article>
          ) : (
            <div className="rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-xl">
              <h1 className="font-heading text-2xl font-bold text-gray-900">
                This event is no longer available
              </h1>
              <p className="mt-3 text-gray-600">
                It may have ended or been removed. Discover more events in the
                Vybein app.
              </p>
              <div className="mt-6">
                <OpenInAppButton deepLink="vybein://e" />
              </div>
              <Link
                href="/"
                className="mt-6 inline-block text-sm font-semibold text-brand hover:text-brand-dark"
              >
                ← Back to Vybein
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
