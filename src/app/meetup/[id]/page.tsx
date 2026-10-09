import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OpenInAppButton from "@/components/meetup/OpenInAppButton";
import { SITE_URL } from "@/lib/site";
import {
  fetchPublicMeetup,
  meetupDateLabel,
  meetupLocation,
  meetupPriceLabel,
  meetupTitle,
} from "@/lib/meetup-share";

type Props = { params: Promise<{ id: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const meetup = await fetchPublicMeetup(id);
  const url = `${SITE_URL}/meetup/${encodeURIComponent(id)}`;

  if (!meetup) {
    return {
      title: "Activity on Vybein",
      description: "Join real-life activities with people nearby on Vybein.",
      robots: { index: false, follow: true },
      alternates: { canonical: url },
    };
  }

  const title = `${meetupTitle(meetup)}${meetup.host?.name ? ` with ${meetup.host.name}` : ""}`;
  const description =
    meetup.description?.trim().slice(0, 160) ||
    [meetupDateLabel(meetup), meetupLocation(meetup)].filter(Boolean).join(" • ") ||
    "Join this activity on Vybein.";
  const image = meetup.activityImages?.[0] || meetup.categoryImage || "/logo.png";

  return {
    title,
    description,
    robots: { index: false, follow: true },
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "website", images: [image] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export default async function MeetupSharePage({ params }: Props) {
  const { id } = await params;
  const meetup = await fetchPublicMeetup(id);
  const deepLink = `vybein://meetup/${encodeURIComponent(id)}`;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-[#E6F2F1] to-white px-4 pt-28 pb-16">
        <div className="mx-auto max-w-xl">
          {meetup ? (
            <article className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl">
              {(meetup.activityImages?.[0] || meetup.categoryImage) && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={meetup.activityImages?.[0] || meetup.categoryImage || ""}
                  alt={meetupTitle(meetup)}
                  className="h-56 w-full object-cover"
                />
              )}
              <div className="space-y-4 p-6">
                {meetup.category ? (
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-dark">
                    {meetup.category}
                  </p>
                ) : null}
                <h1 className="font-heading text-3xl font-bold text-gray-900">{meetupTitle(meetup)}</h1>
                {meetup.host?.name ? (
                  <p className="text-sm font-semibold text-gray-700">Hosted by {meetup.host.name}</p>
                ) : null}
                {meetup.description ? (
                  <p className="text-pretty leading-relaxed text-gray-600">{meetup.description}</p>
                ) : null}
                <ul className="space-y-2 text-sm text-gray-700">
                  {meetupDateLabel(meetup) ? <li>📅 {meetupDateLabel(meetup)}</li> : null}
                  {meetupLocation(meetup) ? <li>📍 {meetupLocation(meetup)}</li> : null}
                  {typeof meetup.spotsLeft === "number" ? (
                    <li>👥 {meetup.spotsLeft} {meetup.spotsLeft === 1 ? "spot" : "spots"} left</li>
                  ) : null}
                  <li>💰 {meetupPriceLabel(meetup.joinPrice)}</li>
                </ul>
                <OpenInAppButton deepLink={deepLink} />
                <p className="text-center text-xs text-gray-500">
                  Install Vybein to join this activity and chat safely in the app.
                </p>
              </div>
            </article>
          ) : (
            <div className="rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-xl">
              <h1 className="font-heading text-2xl font-bold text-gray-900">This activity is no longer available</h1>
              <p className="mt-3 text-gray-600">
                It may have ended, filled up, or been cancelled. Find more activities near you in the Vybein app.
              </p>
              <div className="mt-6">
                <OpenInAppButton deepLink="vybein://meetup" />
              </div>
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
