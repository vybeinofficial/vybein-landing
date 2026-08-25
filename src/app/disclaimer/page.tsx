import type { Metadata } from "next";
import LegalPageTemplate from "@/components/legal/LegalPageTemplate";
import { disclaimerSections } from "@/components/legal/legalContent";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Important usage and liability disclaimer for Vybein.",
  alternates: {
    canonical: `${SITE_URL}/disclaimer`,
  },
};

export default function DisclaimerPage() {
  return (
    <LegalPageTemplate
      title="Disclaimer"
      sections={disclaimerSections}
    />
  );
}
