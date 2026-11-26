import { API_BASE_URL } from "@/lib/site";

export type PublicEventShare = {
  id: string;
  title?: string | null;
  venue?: string | null;
  eventDate?: string | null;
  eventTime?: string | null;
  startsAt?: string | null;
  durationLabel?: string | null;
  ticketPrice?: number | null;
  coverImage?: string | null;
  description?: string | null;
  shareCode?: string | null;
  slotsLeft?: number | null;
  organizer?: {
    id?: string;
    name?: string | null;
    logo?: string | null;
  } | null;
};

export async function fetchPublicEventByShareCode(code: string) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/events/share/${encodeURIComponent(code)}`,
      {
        next: { revalidate: 60 },
        headers: { "Content-Type": "application/json" },
      },
    );
    if (!response.ok) return null;
    const json = (await response.json()) as {
      success?: boolean;
      data?: PublicEventShare;
    };
    return json?.data ?? null;
  } catch {
    return null;
  }
}

export function eventDateLabel(event: PublicEventShare) {
  const starts = event.startsAt || event.eventDate;
  if (!starts) return null;
  const date = new Date(starts);
  if (Number.isNaN(date.getTime())) return null;
  const datePart = date.toLocaleDateString("en-IN", {
    timeZone: "Asia/Kolkata",
    weekday: "short",
    day: "numeric",
    month: "short",
  });
  const time = event.eventTime?.trim();
  return time ? `${datePart} · ${time}` : datePart;
}
