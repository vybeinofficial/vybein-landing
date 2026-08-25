import type { Metadata } from "next";
import LegalPageTemplate from "@/components/legal/LegalPageTemplate";
import { accountDeletionSections } from "@/components/legal/legalContent";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Account Deletion",
  description: "How to request account and data deletion on Vybein.",
  alternates: {
    canonical: `${SITE_URL}/account-deletion`,
  },
};

export default function AccountDeletionPage() {
  return (
    <LegalPageTemplate
      title="Account Deletion"
      sections={accountDeletionSections}
    />
  );
}
