import { API_BASE_URL } from "@/lib/site";

export type MeetupSharePerson = {
  name?: string | null;
  profilePhoto?: string | null;
  age?: number | null;
  gender?: string | null;
};

export type PublicMeetup = {
  id: string;
  category?: string | null;
  subcategory?: string | null;
  description?: string | null;
  locationName?: string | null;
  pinpointLocationName?: string | null;
  place?: string | null;
  city?: string | null;
  date?: string | null;
  time?: string | null;
  groupSize?: number | null;
  spotsLeft?: number | null;
  joinPrice?: number | null;
  durationMinutes?: number | null;
  categoryImage?: string | null;
  activityImages?: string[];
  host?: (MeetupSharePerson & { id?: string; isVerified?: boolean }) | null;
};

export type SafetyMeetup = {
  meetupId: string;
  category?: string | null;
  subcategory?: string | null;
  locationName?: string | null;
  pinpointLocationName?: string | null;
  place?: string | null;
  city?: string | null;
  date?: string | null;
  time?: string | null;
  categoryImage?: string | null;
  host?: MeetupSharePerson | null;
  attendees?: MeetupSharePerson[];
};

async function fetchShareData<T>(path: string): Promise<T | null> {
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      next: { revalidate: 60 },
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) return null;
    const json = (await response.json()) as { success?: boolean; data?: T };
    return json?.data ?? null;
  } catch {
    return null;
  }
}

export function fetchPublicMeetup(id: string) {
  return fetchShareData<PublicMeetup>(`/meetups/public/${encodeURIComponent(id)}`);
}

export function fetchSafetyMeetup(id: string, token: string) {
  return fetchShareData<SafetyMeetup>(
    `/meetups/safety/${encodeURIComponent(id)}/${encodeURIComponent(token)}`,
  );
}

export function meetupTitle(m: { category?: string | null; subcategory?: string | null }) {
  const sub = m.subcategory?.trim();
  const cat = m.category?.trim();
  return sub || cat || "Vybein activity";
}

export function meetupLocation(m: {
  pinpointLocationName?: string | null;
  locationName?: string | null;
  place?: string | null;
}) {
  const pin = m.pinpointLocationName?.trim();
  const loc = m.locationName?.trim();
  if (pin && loc && !loc.includes(pin)) return `${pin}, ${loc}`;
  return pin || loc || m.place?.trim() || "";
}

export function meetupDateLabel(m: { date?: string | null; time?: string | null }) {
  const time = m.time?.trim();
  if (!m.date) return time || "";
  const d = new Date(m.date);
  if (Number.isNaN(d.getTime())) return time || "";
  const label = d.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
  return time ? `${label} • ${time}` : label;
}

export function meetupPriceLabel(price?: number | null) {
  if (!price || price <= 0) return "Free";
  return `₹${Number.isInteger(price) ? price : price.toFixed(2)}`;
}

export function personLabel(p?: MeetupSharePerson | null, fallback = "Vybein user") {
  if (!p) return fallback;
  const bits = [p.name?.trim() || fallback];
  if (p.gender) bits.push(p.gender);
  if (p.age) bits.push(`${p.age} yrs`);
  return bits.join(", ");
}
