// Datele firmei afișate pe site. Sursa: PROJECT_BRIEF.md (furnizate de utilizator, neverificate
// independent). Adresa completă a sediului NU se publică până la verificarea din faza legală (B-012).

export const company = {
  legalName: "MERIDIAN TRANSCONSTRUCT S.R.L.",
  displayName: "Meridian Transconstruct",
  foundedYear: 2019,
  cui: "41449237",
  tradeRegister: "J2019001203204",
  locality: "Petroșani",
  county: "Hunedoara",
  serviceArea: ["Petroșani", "Vulcan", "Lupeni", "Petrila", "Uricani", "Aninoasa"],
  // Ordinea telefoanelor urmează macheta; telefonul principal rămâne de confirmat (B-008).
  phones: [
    { display: "0723 400 646", href: "tel:+40723400646" },
    { display: "0726 379 408", href: "tel:+40726379408" },
  ],
  // Adresă temporară confirmată; se înlocuiește cu adresa pe domeniul firmei (B-009).
  email: "marta70fil@yahoo.com",
} as const;

export const primaryPhone = company.phones[0];
