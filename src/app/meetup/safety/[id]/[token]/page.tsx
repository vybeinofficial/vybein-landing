import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OpenInAppButton from "@/components/meetup/OpenInAppButton";
import {
  fetchSafetyMeetup,
  meetupDateLabel,
  meetupLocation,
  meetupTitle,
  personLabel,
} from "@/lib/meetup-share";

type Props = { params: Promise<{ id: string; token: string }> };

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Meetup safety details",
  description: "Meetup details shared for safety on Vybein.",
  robots: { index: false, follow: false },
};

export default async function MeetupSafetySharePage({ params }: Props) {
  const { id, token } = await params;
  const meetup = await fetchSafetyMeetup(id, token);
  const deepLink = `vybein://meetup/safety/${encodeURIComponent(id)}`;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-[#E6F2F1] to-white px-4 pt-28 pb-16">
        <div className="mx-auto max-w-xl">
          {meetup ? (
            <article className="space-y-5 rounded-3xl border border-gray-100 bg-white p-6 shadow-xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-dark">
                Shared for safety
              </p>
              <h1 className="font-heading text-3xl font-bold text-gray-900">{meetupTitle(meetup)}</h1>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>🆔 Meetup ID: {meetup.meetupId}</li>
                {meetupDateLabel(meetup) ? <li>📅 {meetupDateLabel(meetup)}</li> : null}
                {meetupLocation(meetup) ? <li>📍 {meetupLocation(meetup)}</li> : null}
              </ul>
              <div className="rounded-2xl bg-gray-50 p-4 text-sm text-gray-700">
                <p>
                  <span className="font-semibold text-gray-900">Host:</span> {personLabel(meetup.host, "Host")}
                </p>
                <p className="mt-2 font-semibold text-gray-900">Attendee(s):</p>
                {meetup.attendees?.length ? (
                  <ul className="mt-1 list-disc pl-5">
                    {meetup.attendees.map((a, i) => (
                      <li key={`${a.name}-${i}`}>{personLabel(a, "Attendee")}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-1">Not available</p>
                )}
              </div>
              <OpenInAppButton deepLink={deepLink} />
            </article>
          ) : (
            <div className="rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-xl">
              <h1 className="font-heading text-2xl font-bold text-gray-900">This share link is not available</h1>
              <p className="mt-3 text-gray-600">The link may be invalid or the meetup is no longer active.</p>
              <Link href="/" className="mt-6 inline-block text-sm font-semibold text-brand hover:text-brand-dark">
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
