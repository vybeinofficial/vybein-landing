import type { Metadata } from "next";
import LegalPageTemplate from "@/components/legal/LegalPageTemplate";
import { privacySections } from "@/components/legal/legalContent";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Vybein collects, uses, and protects your data.",
  alternates: {
    canonical: `${SITE_URL}/privacy`,
  },
};

export default function PrivacyPage() {
  return (
    <LegalPageTemplate
      title="Privacy Policy"
      sections={privacySections}
    />
  );
}
