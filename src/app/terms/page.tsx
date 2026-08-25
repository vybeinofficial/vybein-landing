import type { Metadata } from "next";
import LegalPageTemplate from "@/components/legal/LegalPageTemplate";
import { termsSections } from "@/components/legal/legalContent";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms and conditions for using Vybein.",
  alternates: {
    canonical: `${SITE_URL}/terms`,
  },
};

export default function TermsPage() {
  return (
    <LegalPageTemplate
      title="Terms of Service"
      sections={termsSections}
    />
  );
}
