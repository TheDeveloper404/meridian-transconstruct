import { company } from "@/content/company";
import { siteUrl } from "@/lib/site";

// Date structurate (schema.org) pentru firmă, doar cu informații deja vizibile pe site.
// Fără adresă: sediul se publică după verificarea din faza legală (B-012); până atunci Google
// nu afișează rezultate îmbogățite de tip „firmă locală”, dar înțelege entitatea.
export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "@id": `${siteUrl}/#firma`,
    name: company.displayName,
    legalName: company.legalName,
    url: siteUrl,
    telephone: company.phones.map((phone) => phone.href.replace("tel:", "")),
    email: company.email,
    foundingDate: String(company.foundedYear),
    areaServed: [
      { "@type": "Place", name: company.region },
      { "@type": "AdministrativeArea", name: `Județul ${company.county}` },
    ],
    knowsLanguage: "ro",
  };

  return (
    <script
      type="application/ld+json"
      // `<` escapat ca un text din date să nu poată închide tag-ul <script>.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
