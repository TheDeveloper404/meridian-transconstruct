// Navigarea principală: Acasă cu secțiuni ancorate + pagina Contact, conform machetei finale
// (docs/home-preview.html, docs/contact.html).

export type NavItem = {
  label: string;
  href: string;
  /** Ancora secțiunii de pe Acasă; lipsește pentru pagini întregi. */
  section?: string;
};

export const mainNav: NavItem[] = [
  { label: "Acasă", href: "/" },
  { label: "Servicii", href: "/#servicii", section: "servicii" },
  { label: "Proiecte", href: "/#proiecte", section: "proiecte" },
  { label: "Despre", href: "/#despre", section: "despre" },
  { label: "Contact", href: "/contact" },
];

/** Ancore de pe Acasă care aparțin unei intrări din meniu (ex. un serviciu → „Servicii”). */
export const sectionAliases: Record<string, string> = {
  "constructii-case": "servicii",
  cladiri: "servicii",
  "constructii-civile": "servicii",
  renovari: "servicii",
};

export const footerCompanyNav: NavItem[] = [
  { label: "Acasă", href: "/" },
  { label: "Despre firmă", href: "/#despre" },
  { label: "Servicii", href: "/#servicii" },
  { label: "Proiecte", href: "/#proiecte" },
  { label: "Contact", href: "/contact" },
];
