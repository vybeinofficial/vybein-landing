import type { Metadata } from "next";
import LegalPageTemplate from "@/components/legal/LegalPageTemplate";
import { cookiesSections } from "@/components/legal/legalContent";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "How Vybein uses cookies and similar technologies.",
  alternates: {
    canonical: `${SITE_URL}/cookies`,
  },
};

export default function CookiesPage() {
  return (
    <LegalPageTemplate
      title="Cookie Policy"
      sections={cookiesSections}
    />
  );
}
