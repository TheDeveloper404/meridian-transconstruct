// Linkuri legale din footer (S12b). Textele paginilor sunt în pregătire (B-012).

export const legalLinks = [
  { label: "Politica de confidențialitate", href: "/confidentialitate" },
  { label: "Termeni și condiții", href: "/termeni-si-conditii" },
];

// Pictogramele ANPC pentru soluționarea litigiilor, cerute de utilizator. Dacă fișierul oficial
// există în public/images/anpc/, se afișează imaginea; altfel un buton text cu același link.
// Pictogramele oficiale se descarcă de pe site-ul ANPC (B-021). Obligativitatea pentru un site
// de prezentare și starea platformei SOL a UE trebuie verificate (vezi BACKLOG B-021).
export const anpcBadges = [
  {
    id: "sal",
    label: "ANPC – Soluționarea alternativă a litigiilor",
    short: "ANPC · SAL",
    href: "https://anpc.ro/ce-este-sal/",
    image: "/images/anpc/sal.svg",
  },
  {
    id: "sol",
    label: "Soluționarea online a litigiilor",
    short: "SOL · UE",
    href: "https://ec.europa.eu/consumers/odr",
    image: "/images/anpc/sol.svg",
  },
];
