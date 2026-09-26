// Datele firmei. Sursa: PROJECT_BRIEF.md (furnizate de utilizator, neverificate independent).
// Adresa sediului se publică în paginile legale și în footer, la datele de identificare
// (deciziile utilizatorului, S24 și S27; Legea 365/2002).
//
// Decizie utilizator (S09): pe pagini nu apar nume de localități — doar `region` și `county`.
// `locality` și `serviceArea` se folosesc doar în titlul/descrierea pentru Google și, ulterior,
// în adresa legală obligatorie; nu le afișa în texte sau componente.

export const company = {
  legalName: "MERIDIAN TRANSCONSTRUCT S.R.L.",
  displayName: "Meridian Transconstruct",
  foundedYear: 2019,
  /** Data înființării (PROJECT_BRIEF); baza pentru „ani de experiență”. */
  foundedDate: "2019-07-26",
  cui: "41449237",
  tradeRegister: "J2019001203204",
  /** Sediul social — doar pentru identificarea legală (paginile legale, footer). */
  registeredOffice: "Str. Horea, Bl. 3, Sc. 1, Ap. 1, Mun. Petroșani, Jud. Hunedoara, 332014",
  /** Varianta scurtă a sediului, pentru footer (decizia utilizatorului, S27). */
  registeredOfficeShort: "Mun. Petroșani, Jud. Hunedoara",
  locality: "Petroșani",
  region: "Valea Jiului",
  county: "Hunedoara",
  serviceArea: ["Petroșani", "Vulcan", "Lupeni", "Petrila", "Uricani", "Aninoasa"],
  // Ordinea telefoanelor urmează macheta; telefonul principal rămâne de confirmat (B-008).
  phones: [
    { display: "0723 400 646", href: "tel:+40723400646" },
    { display: "0726 379 408", href: "tel:+40726379408" },
  ],
  // Adresa pe domeniu, redirecționată prin Cloudflare Email Routing către inboxul real (B-009, S18).
  // Primește mesaje abia după cumpărarea domeniului și configurarea redirecționării.
  email: "office@meridian-transconstruct.ro",
} as const;

export const primaryPhone = company.phones[0];

/** Numărul cu WhatsApp, ales de utilizator (S18). */
export const whatsapp = {
  display: "0726 379 408",
  href: "https://wa.me/40726379408",
} as const;
