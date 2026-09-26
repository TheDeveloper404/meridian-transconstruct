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

type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type GalleryItem = {
  id: string;
  /** Tipul lucrării, afișat deasupra titlului. */
  category: string;
  /** Doar pentru lucrări reale. Imaginile ilustrative nu au titlu. */
  title?: string;
  image: Photo;
  /** true = imagine generată, provizorie; nu reprezintă o lucrare a firmei. */
  illustrative: boolean;
};

export const projectsIntro = {
  kicker: "02 / Portofoliu",
  title: "Lucrări realizate",
  intro: "Câteva dintre lucrările noastre: construcții civile, clădiri, hale, renovări și case — de la structură la finisaje.",
  illustrativeNote:
    "Imaginile marcate „Ilustrativ” sunt provizorii și nu reprezintă lucrări ale firmei; vor fi înlocuite cu fotografii din proiectele executate.",
  placeholder: "Fotografie în curând",
  emptyTitle: "Portofoliul este în pregătire.",
  emptyText:
    "Publicăm doar lucrări reale, cu fotografii proprii și acordul beneficiarilor. Până atunci, îți putem prezenta lucrări relevante pentru proiectul tău la o discuție.",
  emptyCta: "Cere detalii despre lucrări",
  allCta: "Vezi toate proiectele",
};

// Pagina /proiecte: un album pentru fiecare lucrare reală, cu fotografiile ei (S18). La lansare: doar
// lucrări reale, cu fotografii proprii și acordul beneficiarului. Lista goală afișează starea
// „în pregătire” (textele de mai sus).
//
// TEMPORAR (S20, cerut de utilizator „ca să văd cum arată”): trei albume DEMONSTRATIVE cu fotografii
// Unsplash, marcate „Ilustrativ” — se șterg (împreună cu public/images/proiecte/demo-*) înainte de
// lansare sau la primul album real (B-005). Surse: docs/assets/README.md.
//
// Fotografiile stau în public/images/proiecte/<slug>/; prima e coperta albumului.
export type ProjectAlbum = {
  /** Adresa paginii: /proiecte/<slug> — litere mici, cifre și cratime. */
  slug: string;
  title: string;
  /** Tipul lucrării (ca la servicii). */
  category: string;
  year?: number;
  /** Scurtă descriere factuală a lucrărilor executate. */
  summary?: string;
  /** true = album demonstrativ cu imagini stock; nu reprezintă o lucrare a firmei. */
  illustrative?: boolean;
  photos: Photo[];
};

export const projectsPage = {
  title: "Lucrări realizate",
  lead: "Lucrări executate de echipa noastră, fiecare cu albumul ei de fotografii.",
  backLabel: "Toate proiectele",
};

export const projectAlbums: ProjectAlbum[] = [
  {
    slug: "demo-cladire-rezidentiala",
    title: "Album demonstrativ — Clădire rezidențială",
    category: "Clădiri rezidențiale",
    summary: "Imagini ilustrative, provizorii — nu reprezintă o lucrare a firmei.",
    illustrative: true,
    photos: [
      { src: "/images/proiecte/demo-cladire-rezidentiala/01.webp", alt: "Imagine ilustrativă: clădire rezidențială în construcție (1)", width: 1600, height: 1200 },
      { src: "/images/proiecte/demo-cladire-rezidentiala/02.webp", alt: "Imagine ilustrativă: clădire rezidențială în construcție (2)", width: 1600, height: 1200 },
      { src: "/images/proiecte/demo-cladire-rezidentiala/03.webp", alt: "Imagine ilustrativă: clădire rezidențială în construcție (3)", width: 1600, height: 1200 },
      { src: "/images/proiecte/demo-cladire-rezidentiala/04.webp", alt: "Imagine ilustrativă: clădire rezidențială în construcție (4)", width: 1600, height: 1200 },
      { src: "/images/proiecte/demo-cladire-rezidentiala/05.webp", alt: "Imagine ilustrativă: clădire rezidențială în construcție (5)", width: 1600, height: 1200 },
      { src: "/images/proiecte/demo-cladire-rezidentiala/06.webp", alt: "Imagine ilustrativă: clădire rezidențială în construcție (6)", width: 1600, height: 1200 },
    ],
  },
  {
    slug: "demo-hala-industriala",
    title: "Album demonstrativ — Hală industrială",
    category: "Hale industriale",
    summary: "Imagini ilustrative, provizorii — nu reprezintă o lucrare a firmei.",
    illustrative: true,
    photos: [
      { src: "/images/proiecte/demo-hala-industriala/01.webp", alt: "Imagine ilustrativă: hală industrială (1)", width: 1600, height: 1200 },
      { src: "/images/proiecte/demo-hala-industriala/02.webp", alt: "Imagine ilustrativă: hală industrială (2)", width: 1600, height: 1200 },
      { src: "/images/proiecte/demo-hala-industriala/03.webp", alt: "Imagine ilustrativă: hală industrială (3)", width: 1600, height: 1200 },
      { src: "/images/proiecte/demo-hala-industriala/04.webp", alt: "Imagine ilustrativă: hală industrială (4)", width: 1600, height: 1200 },
      { src: "/images/proiecte/demo-hala-industriala/05.webp", alt: "Imagine ilustrativă: hală industrială (5)", width: 1600, height: 1200 },
      { src: "/images/proiecte/demo-hala-industriala/06.webp", alt: "Imagine ilustrativă: hală industrială (6)", width: 1600, height: 1200 },
    ],
  },
  {
    slug: "demo-casa",
    title: "Album demonstrativ — Casă",
    category: "Construcții de case",
    summary: "Imagini ilustrative, provizorii — nu reprezintă o lucrare a firmei.",
    illustrative: true,
    photos: [
      { src: "/images/proiecte/demo-casa/01.webp", alt: "Imagine ilustrativă: casă în construcție (1)", width: 1600, height: 1200 },
      { src: "/images/proiecte/demo-casa/02.webp", alt: "Imagine ilustrativă: casă în construcție (2)", width: 1600, height: 1200 },
      { src: "/images/proiecte/demo-casa/03.webp", alt: "Imagine ilustrativă: casă în construcție (3)", width: 1600, height: 1200 },
      { src: "/images/proiecte/demo-casa/04.webp", alt: "Imagine ilustrativă: casă în construcție (4)", width: 1600, height: 1200 },
      { src: "/images/proiecte/demo-casa/05.webp", alt: "Imagine ilustrativă: casă în construcție (5)", width: 1600, height: 1200 },
      { src: "/images/proiecte/demo-casa/06.webp", alt: "Imagine ilustrativă: casă în construcție (6)", width: 1600, height: 1200 },
    ],
  },
];

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
