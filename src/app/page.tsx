import type { Metadata } from "next";
import HomePage from "@/components/home/HomePage";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";
export const revalidate = 3600;

const HOME_TITLE =
  "Find Your Vibe Partner Nearby for Daily Activities | Vybein";
const HOME_DESCRIPTION =
  "Find nearby activity partners for Gym, Tea, Study, Travel, and everyday plans. Connect with real people safely without digital drama. Download Vybein today";

const homeCanonical = SITE_URL.replace(/\/$/, "");

export const metadata: Metadata = {
  title: {
    absolute: HOME_TITLE,
  },
  description: HOME_DESCRIPTION,
  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: homeCanonical,
    siteName: "Vybein",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
  },
  alternates: {
    canonical: homeCanonical,
  },
};

export default function Home() {
  return <HomePage />;
}

