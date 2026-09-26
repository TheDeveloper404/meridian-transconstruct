// Navigarea principală. Denumiri „de construcții” alese de utilizator (S18); „Acasă” și „Contact”
// rămân, fiindcă vizitatorii le caută după nume. „Ce construim” și „Despre firmă” sunt ancore pe
// Acasă; „Lucrări realizate” e pagina /proiecte. Ordinea (S20): întâi secțiunile de pe Acasă, apoi
// paginile separate.

export type NavItem = {
  label: string;
  href: string;
  /** Ancora secțiunii de pe Acasă; lipsește pentru pagini întregi. */
  section?: string;
};

export const mainNav: NavItem[] = [
  { label: "Acasă", href: "/" },
  { label: "Ce construim", href: "/#servicii", section: "servicii" },
  { label: "Despre firmă", href: "/#despre", section: "despre" },
  { label: "Lucrări realizate", href: "/proiecte" },
  { label: "Contact", href: "/contact" },
];

/** Ancore de pe Acasă care aparțin unei intrări din meniu (ex. un serviciu → „Ce construim”). */
export const sectionAliases: Record<string, string> = {
  "constructii-case": "servicii",
  cladiri: "servicii",
  "constructii-civile": "servicii",
  renovari: "servicii",
  "hale-industriale": "servicii",
};

export const footerCompanyNav: NavItem[] = [
  { label: "Acasă", href: "/" },
  { label: "Despre firmă", href: "/#despre" },
  { label: "Servicii", href: "/#servicii" },
  { label: "Proiecte", href: "/#proiecte" },
  { label: "Contact", href: "/contact" },
];
