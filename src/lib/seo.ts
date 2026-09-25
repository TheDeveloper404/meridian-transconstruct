import type { Metadata } from "next";
import { company } from "@/content/company";

// Metadate comune paginilor. În Next, `openGraph` definit într-o pagină ÎNLOCUIEȘTE complet pe cel
// din layout (nu se combină), deci fiecare pagină își construiește setul complet prin acest helper.
// „Petroșani” e permis aici (titlu/descriere pentru Google), nu în conținutul paginilor — CLAUDE.md.

type PageSeo = {
  /** Titlul din tab și din Google; fără sufixul de brand, adăugat de șablonul din layout. */
  title?: string;
  description: string;
  path: string;
};

export function pageMetadata({ title, description, path }: PageSeo): Metadata {
  const fullTitle = title ? `${title} — ${company.displayName}` : undefined;
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "ro_RO",
      siteName: company.displayName,
      url: path,
      ...(fullTitle ? { title: fullTitle } : {}),
      description,
    },
    twitter: {
      card: "summary",
      ...(fullTitle ? { title: fullTitle } : {}),
      description,
    },
  };
}
