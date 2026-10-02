import {
  APP_NAME,
  GOOGLE_PLAY_URL,
  SITE_URL,
  SOCIAL_FACEBOOK,
  SOCIAL_INSTAGRAM,
  SOCIAL_X,
  SOCIAL_YOUTUBE,
} from "@/lib/site";
import { SITE_FAQ_ITEMS, buildFaqPageJsonLd } from "@/lib/site-faq";

export const HOME_TITLE =
  "Find Your Vibe Partner Nearby for Daily Activities | Vybein";
export const HOME_DESCRIPTION =
  "Find nearby activity partners for Gym, Tea, Study, Travel, and everyday plans. Connect with real people safely without digital drama. Download Vybein today";

/** Homepage shows this many FAQs; schema must match visible content. */
export const HOME_FAQ_COUNT = 5;

const origin = SITE_URL.replace(/\/$/, "");
const orgId = `${origin}/#organization`;
const websiteId = `${origin}/#website`;
const appId = `${origin}/#app`;

export function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function buildGlobalJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: APP_NAME,
        url: origin,
        logo: `${origin}/logo.png`,
        email: "support@vybein.com",
        address: {
          "@type": "PostalAddress",
          streetAddress: "62, Dayal Fort, Aliganj",
          addressLocality: "Lucknow",
          addressRegion: "Uttar Pradesh",
          postalCode: "226022",
          addressCountry: "IN",
        },
        sameAs: [SOCIAL_INSTAGRAM, SOCIAL_FACEBOOK, SOCIAL_YOUTUBE, SOCIAL_X],
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: APP_NAME,
        url: origin,
        publisher: { "@id": orgId },
        inLanguage: "en-IN",
      },
      {
        "@type": "SoftwareApplication",
        "@id": appId,
        name: APP_NAME,
        applicationCategory: "SocialNetworkingApplication",
        operatingSystem: "Android",
        url: origin,
        image: `${origin}/logo.png`,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "INR",
        },
        downloadUrl: GOOGLE_PLAY_URL,
        publisher: { "@id": orgId },
      },
    ],
  };
}

export function buildHomeJsonLd() {
  const faqs = SITE_FAQ_ITEMS.slice(0, HOME_FAQ_COUNT);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${origin}/#webpage`,
        name: HOME_TITLE,
        url: origin,
        description: HOME_DESCRIPTION,
        isPartOf: { "@id": websiteId },
        about: { "@id": orgId },
      },
      buildFaqPageJsonLd(faqs),
    ],
  };
}

export function buildAboutJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Us | Vybein",
    url: `${origin}/about`,
    description:
      "Say goodbye to loneliness in a new city. Vybein is a safe social platform that helps you find verified friends for offline activities.",
    isPartOf: { "@id": websiteId },
    about: { "@id": orgId },
  };
}

export function buildBlogIndexJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Vybein Blog",
    url: `${origin}/blogs`,
    description:
      "Alone in a new place? Read real tips on the Vybein blog to improve your social life, choose a travel partner, and increase confidence.",
    isPartOf: { "@id": websiteId },
    publisher: { "@id": orgId },
  };
}
