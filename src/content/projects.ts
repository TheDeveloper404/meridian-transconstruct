// Portofoliu. Se publică DOAR lucrări reale, cu fotografii proprii și acord de publicare
// (PROJECT_BRIEF.md › Portofoliu, B-005). Lista e goală până la primirea materialelor;
// secțiunea afișează atunci o stare goală cu trimitere spre Contact.
//
// Pentru a adăuga o lucrare: pune fotografiile în public/images/proiecte/<slug>/ și adaugă
// un obiect mai jos. Acordul clientului e criteriu intern — nu se publică proiecte fără el.

export type Project = {
  slug: string;
  title: string;
  locality: string;
  year?: number;
  workType: string;
  cover: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
};

export const projectsIntro = {
  kicker: "02 / Portofoliu",
  title: "Lucrările vorbesc.",
  intro: "Lucrări reale, fotografii proprii și informații despre ce am executat.",
  emptyTitle: "Portofoliul este în pregătire.",
  emptyText:
    "Publicăm doar lucrări reale, cu fotografii proprii și acordul beneficiarilor. Până atunci, îți putem prezenta lucrări relevante pentru proiectul tău la o discuție.",
  emptyCta: "Cere detalii despre lucrări",
};

/** Maximum trei lucrări pe Acasă (SITE_STRUCTURE.md › Acasă). */
export const HOME_PROJECT_LIMIT = 3;

export const projects: Project[] = [];
