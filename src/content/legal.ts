// Linkuri legale din footer (S12b). Textele paginilor sunt în pregătire (B-012).

export const legalLinks = [
  { label: "Politica de confidențialitate", href: "/confidentialitate" },
  { label: "Termeni și condiții", href: "/termeni-si-conditii" },
];

// Pictogramele ANPC pentru soluționarea litigiilor, cerute de utilizator (S15), 250 × 50 px.
// Se folosește fișierul local din public/images/anpc/ dacă există; altfel imaginea de la adresa
// dată de utilizator (`remote`, găzduită pe un site terț). De preferat fișierele locale: fără
// dependență de alt site și fără cereri externe (B-021). Obligativitatea pentru un site de
// prezentare și starea platformei SOL a UE trebuie verificate (B-021).
export const anpcBadges = [
  {
    id: "sal",
    label: "Soluționarea alternativă a litigiilor",
    href: "https://anpc.ro/ce-este-sal/",
    image: "/images/anpc/sal.png",
    remote: "https://wpfitness.eu/wp-content/uploads/2022/10/anpc-sal.png",
  },
  {
    id: "sol",
    label: "Soluționarea online a litigiilor",
    href: "https://ec.europa.eu/consumers/odr",
    image: "/images/anpc/sol.png",
    remote: "https://wpfitness.eu/wp-content/uploads/2022/10/anpc-sol.png",
  },
];
