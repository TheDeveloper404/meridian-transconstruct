// Galeria de pe Acasă. Se publică lucrări reale, cu fotografii proprii și acord (PROJECT_BRIEF.md ›
// Portofoliu, B-005). Până la primirea lor, galeria folosește imagini ILUSTRATIVE generate, cerute
// de utilizator (S12): marcate vizibil „Ilustrativ”, fără titluri, localități sau detalii inventate.
//
// Imaginile stau în public/images/galerie/. Dacă un fișier lipsește, tile-ul afișează un bloc de
// rezervă în același loc; când pui fișierul, apare automat (fără alte modificări de cod).
// Prompturile pentru imaginile ilustrative: docs/assets/README.md.
//
// Pentru o lucrare reală: `illustrative: false`, `title` factual, fotografie proprie. Ordinea
// contează: primul element e fotografia mare din galerie.

export type GalleryItem = {
  id: string;
  /** Tipul lucrării, afișat deasupra titlului. */
  category: string;
  /** Doar pentru lucrări reale. Imaginile ilustrative nu au titlu. */
  title?: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  /** true = imagine generată, provizorie; nu reprezintă o lucrare a firmei. */
  illustrative: boolean;
};

export const projectsIntro = {
  kicker: "02 / Portofoliu",
  title: "Proiecte realizate",
  intro: "Construcții civile, clădiri, hale, renovări și case — pe tipuri de lucrări, de la structură la finisaje.",
  illustrativeNote:
    "Imaginile marcate „Ilustrativ” sunt provizorii și nu reprezintă lucrări ale firmei; vor fi înlocuite cu fotografii din proiectele executate.",
  placeholder: "Fotografie în curând",
  emptyTitle: "Portofoliul este în pregătire.",
  emptyText:
    "Publicăm doar lucrări reale, cu fotografii proprii și acordul beneficiarilor. Până atunci, îți putem prezenta lucrări relevante pentru proiectul tău la o discuție.",
  emptyCta: "Cere detalii despre lucrări",
};

const illustrative = (
  id: string,
  category: string,
  file: string,
  alt: string,
): GalleryItem => ({
  id,
  category,
  image: { src: `/images/galerie/${file}`, alt, width: 1600, height: 1200 },
  illustrative: true,
});

export const gallery: GalleryItem[] = [
  illustrative(
    "bloc-locuinte",
    "Clădiri rezidențiale",
    "bloc-locuinte.webp",
    "Imagine ilustrativă: bloc de locuințe nou, cu fațadă finisată",
  ),
  {
    id: "structura-beton",
    category: "Construcții civile",
    // Vizualul generat folosit și în hero (docs/assets/README.md).
    image: {
      src: "/images/hero-concept.webp",
      alt: "Imagine ilustrativă: structură din beton armat în execuție",
      width: 1672,
      height: 941,
    },
    illustrative: true,
  },
  illustrative(
    "hala-industriala",
    "Hale industriale",
    "hala-industriala.webp",
    "Imagine ilustrativă: hală industrială cu structură metalică",
  ),
  illustrative("casa", "Case la cheie", "casa.webp", "Imagine ilustrativă: casă nouă, finisată"),
  illustrative(
    "renovare-fatada",
    "Renovări și reabilitări",
    "renovare-fatada.webp",
    "Imagine ilustrativă: fațadă reabilitată, cu termoizolație",
  ),
  illustrative(
    "interior-finisaje",
    "Finisaje interioare",
    "interior-finisaje.webp",
    "Imagine ilustrativă: interior finisat, luminos",
  ),
];
