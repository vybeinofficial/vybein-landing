import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const GA4_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;

export const metadata: Metadata = {
  metadataBase: new URL("https://vybein.com"),
  title: {
    default: "Vybein | Discover Events. Join Activities.",
    template: "%s | Vybein",
  },
  description:
    "Discover concerts, sports events, and activities near you. Join premium experiences with Vybein.",
  openGraph: {
    title: "Vybein | Discover Events. Join Activities.",
    description:
      "Discover concerts, sports events, and activities near you. Join premium experiences with Vybein.",
    url: "https://vybein.com",
    siteName: "Vybein",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Vybein",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vybein | Discover Events. Join Activities.",
    description:
      "Discover concerts, sports events, and activities near you. Join premium experiences with Vybein.",
    images: ["/logo.png"],
  },
  alternates: {
    canonical: "https://vybein.com",
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {GA4_MEASUREMENT_ID ? (
          <>
            {/* beforeInteractive = in initial HTML so Google tag verification & crawlers see gtag without running JS */}
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`}
              strategy="beforeInteractive"
            />
            <Script id="ga4-init" strategy="beforeInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;
                gtag('js', new Date());
                gtag('config', '${GA4_MEASUREMENT_ID}', {
                  send_page_view: true
                });
              `}
            </Script>
          </>
        ) : null}
        {children}
      </body>
    </html>
  );
}
