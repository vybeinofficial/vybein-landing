import type { Metadata } from "next";
import HomePage from "@/components/home/HomePage";
import JsonLd from "@/components/JsonLd";
import { HOME_DESCRIPTION, HOME_TITLE, buildHomeJsonLd } from "@/lib/json-ld";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";
export const revalidate = 3600;

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
  return (
    <>
      <JsonLd id="vybein-home-schema" data={buildHomeJsonLd()} />
      <HomePage />
    </>
  );
}

