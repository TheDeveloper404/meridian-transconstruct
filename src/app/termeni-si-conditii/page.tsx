import type { Metadata } from "next";
import { LegalDocumentPage } from "@/components/legal-document";
import { termsAndConditions } from "@/content/legal";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: termsAndConditions.title,
  description: termsAndConditions.description,
  path: "/termeni-si-conditii",
});

export default function TermsPage() {
  return <LegalDocumentPage document={termsAndConditions} />;
}
