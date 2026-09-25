import type { Metadata } from "next";
import { LegalPending } from "@/components/legal-pending";

export const metadata: Metadata = {
  title: "Politica de confidențialitate",
  alternates: { canonical: "/confidentialitate" },
  // Neindexată cât timp textul e în pregătire.
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <LegalPending
      title="Politica de confidențialitate"
      lead="Cum folosim datele trimise prin formularul de contact."
    />
  );
}
