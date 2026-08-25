import type { Metadata } from "next";
import LegalPageTemplate from "@/components/legal/LegalPageTemplate";
import { childSafetySections } from "@/components/legal/legalContent";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Child Safety",
  description: "Vybein child safety policy and reporting details.",
  alternates: {
    canonical: `${SITE_URL}/child-safety`,
  },
};

export default function ChildSafetyPage() {
  return (
    <LegalPageTemplate
      title="Child Safety"
      sections={childSafetySections}
    />
  );
}
