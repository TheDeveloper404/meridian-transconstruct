import type { Metadata } from "next";
import { LegalPending } from "@/components/legal-pending";

export const metadata: Metadata = {
  title: "Termeni și condiții",
  alternates: { canonical: "/termeni-si-conditii" },
  // Neindexată cât timp textul e în pregătire.
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return <LegalPending title="Termeni și condiții" lead="Condițiile de utilizare a site-ului." />;
}
