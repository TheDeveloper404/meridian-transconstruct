import type { Metadata } from "next";
import { LegalDocumentPage } from "@/components/legal-document";
import { privacyPolicy } from "@/content/legal";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: privacyPolicy.title,
  description: privacyPolicy.description,
  path: "/confidentialitate",
});

export default function PrivacyPage() {
  return <LegalDocumentPage document={privacyPolicy} />;
}
