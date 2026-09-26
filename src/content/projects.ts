// Lucrări reale, cu fotografii proprii și acord (PROJECT_BRIEF.md › Portofoliu, B-005). Pe Acasă,
// secțiunea 02 arată coperțile albumelor din `homeAlbums` (S45); fără albume, starea „în pregătire”.
// Imaginile ILUSTRATIVE (dacă ar fi vreodată) sunt marcate vizibil „Ilustrativ”, fără titluri,
// localități sau detalii inventate. Originalele fotografiilor: docs/assets/originale/.

type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

// Un element din grila de fotografii (`Gallery`): pe Acasă coperta unui album, în album o fotografie.
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
    // Hala finalizată (00 copertă, 05), apoi etapele în ordinea execuției (01–04); originalele în docs/assets/originale/hala-industriala/.
    slug: "hala-industriala",
    title: "Hală industrială cu structură metalică",
    category: "Hale industriale",
    photos: [
      { src: "/images/proiecte/hala-industriala/00.webp", alt: "Hala finalizată, cu fațada din panouri verzi și ușile de acces", width: 1600, height: 900 },
      { src: "/images/proiecte/hala-industriala/05.webp", alt: "Hala finalizată, văzută din colț, cu fațada din panouri verzi", width: 1600, height: 900 },
      { src: "/images/proiecte/hala-industriala/01.webp", alt: "Structura metalică a halei montată, cu zidăria de cărămidă în execuție", width: 1600, height: 838 },
      { src: "/images/proiecte/hala-industriala/02.webp", alt: "Montarea panourilor de fațadă verzi pe structura halei", width: 1600, height: 900 },
      { src: "/images/proiecte/hala-industriala/03.webp", alt: "Turnarea pardoselii de beton în interiorul halei", width: 1600, height: 900 },
      { src: "/images/proiecte/hala-industriala/04.webp", alt: "Interiorul halei finalizat, cu pardoseala de beton finisată", width: 1600, height: 900 },
    ],
  },
  {
    // Originalele în docs/assets/originale/bloc-reabilitat/ (S33).
    slug: "bloc-reabilitat",
    title: "Bloc de locuințe reabilitat",
    category: "Renovări și reabilitări",
    photos: [
      { src: "/images/proiecte/bloc-reabilitat/01.webp", alt: "Bloc de locuințe cu fațada reabilitată, văzut dinspre intrare", width: 1489, height: 1056 },
      { src: "/images/proiecte/bloc-reabilitat/02.webp", alt: "Fațada reabilitată a blocului, cu intrarea și copertina refăcute", width: 1341, height: 1173 },
      { src: "/images/proiecte/bloc-reabilitat/03.webp", alt: "Colțul blocului, cu balcoanele închise și fațada finisată", width: 1368, height: 849 },
      { src: "/images/proiecte/bloc-reabilitat/04.webp", alt: "Detaliu de fațadă: balcoane închise, finisate în roșu cărămiziu", width: 900, height: 1600 },
    ],
  },
  {
    // Originalele în docs/assets/originale/termoizolatie-bloc/ (S35).
    slug: "termoizolatie-bloc",
    title: "Termoizolație bloc de locuințe",
    category: "Renovări și reabilitări",
    photos: [
      { src: "/images/proiecte/termoizolatie-bloc/01.webp", alt: "Fațada principală a blocului după termoizolare, finisată în galben și cărămiziu", width: 1049, height: 1499 },
      { src: "/images/proiecte/termoizolatie-bloc/02.webp", alt: "Fațada laterală a blocului termoizolat, cu o bandă verticală cărămizie", width: 1000, height: 1573 },
    ],
  },
  {
    // Originalul în docs/assets/originale/spatiu-comercial/ (S35).
    slug: "spatiu-comercial",
    title: "Renovare spațiu comercial",
    category: "Renovări și reabilitări",
    photos: [
      { src: "/images/proiecte/spatiu-comercial/01.webp", alt: "Spațiu comercial la parterul unui bloc, cu fațada finisată în gri și panouri fotovoltaice pe perete", width: 1342, height: 1172 },
    ],
  },
  {
    // Originalele în docs/assets/originale/reabilitare-bloc-p4/ (S37).
    slug: "reabilitare-bloc-p4",
    title: "Reabilitare bloc de locuințe P+4",
    category: "Renovări și reabilitări",
    photos: [
      { src: "/images/proiecte/reabilitare-bloc-p4/01.webp", alt: "Bloc de locuințe P+4 reabilitat, cu fațadă gri deschis și balcoane închise, finisate în galben", width: 1197, height: 1314 },
      { src: "/images/proiecte/reabilitare-bloc-p4/02.webp", alt: "Fațada lungă a blocului reabilitat, cu soclul închis la culoare", width: 1465, height: 1073 },
      { src: "/images/proiecte/reabilitare-bloc-p4/03.webp", alt: "Lucrări de amenajare în fața blocului, după finalizarea fațadei", width: 1086, height: 1448 },
    ],
  },
  {
    // Lucrare în curs: fundația și structura P+1 (S38–S39); coperta e structura (S40). Originalele în docs/assets/originale/casa-in-constructie/.
    slug: "casa-in-constructie",
    title: "Casă P+1 în construcție",
    category: "Construcții de case",
    photos: [
      { src: "/images/proiecte/casa-in-constructie/04.webp", alt: "Structura casei cu parter și etaj, cu pereții din blocuri de zidărie ridicați", width: 1600, height: 900 },
      { src: "/images/proiecte/casa-in-constructie/01.webp", alt: "Placa de beton a casei turnată peste fundație, cu mustățile de armătură pentru stâlpi", width: 1600, height: 720 },
      { src: "/images/proiecte/casa-in-constructie/02.webp", alt: "Armătura fundației montată în săpătură, cu autobetoniera pregătită pentru turnare", width: 1600, height: 719 },
      { src: "/images/proiecte/casa-in-constructie/03.webp", alt: "Plasa de armătură a plăcii, montată înainte de turnarea betonului", width: 1600, height: 667 },
    ],
  },
  {
    // Lucrare în execuție; doar două fotografii (S41). Originalele în docs/assets/originale/reabilitare-cladire/.
    slug: "reabilitare-cladire",
    title: "Reabilitare clădire cu arcade, în execuție",
    category: "Renovări și reabilitări",
    photos: [
      { src: "/images/proiecte/reabilitare-cladire/01.webp", alt: "Clădire cu arcade în reabilitare: schelă pe fațadă și termoizolație din vată minerală în montaj", width: 1600, height: 900 },
      { src: "/images/proiecte/reabilitare-cladire/02.webp", alt: "Clădirea în reabilitare văzută din stradă, cu schela și macaraua mobilă", width: 1600, height: 900 },
    ],
  },
  {
    // Coperta: fotografia 10 (S43); apoi celelalte în ordinea utilizatorului, de la schele la final (S42). Originalele (JPG de
    // telefon, cu EXIF fără GPS) în docs/assets/originale/reabilitare-lot-blocuri/; pe site fără metadate.
    slug: "reabilitare-lot-blocuri",
    title: "Reabilitare lot de blocuri",
    category: "Renovări și reabilitări",
    photos: [
      { src: "/images/proiecte/reabilitare-lot-blocuri/10.webp", alt: "Fațada laterală a blocurilor reabilitate", width: 1600, height: 900 },
      { src: "/images/proiecte/reabilitare-lot-blocuri/01.webp", alt: "Blocurile lotului cu schele pe fațade, la începutul lucrărilor", width: 1600, height: 1200 },
      { src: "/images/proiecte/reabilitare-lot-blocuri/02.webp", alt: "Fațada unui bloc pe schelă, cu termoizolația montată", width: 1600, height: 1200 },
      { src: "/images/proiecte/reabilitare-lot-blocuri/03.webp", alt: "Lucru la fațadă de pe schelă, văzut de la nivelul acoperișului", width: 1200, height: 1600 },
      { src: "/images/proiecte/reabilitare-lot-blocuri/04.webp", alt: "Acoperișul nou din țiglă, cu șarpanta din lemn în montaj", width: 1600, height: 900 },
      { src: "/images/proiecte/reabilitare-lot-blocuri/05.webp", alt: "Fațade cu finisajul aplicat, încă pe schelă", width: 1600, height: 758 },
      { src: "/images/proiecte/reabilitare-lot-blocuri/06.webp", alt: "Bloc cu fațada finisată în galben și brâuri cărămizii, cu ultimele schele", width: 1600, height: 1200 },
      { src: "/images/proiecte/reabilitare-lot-blocuri/07.webp", alt: "Ultimele porțiuni de fațadă finisate de pe schelă", width: 1200, height: 1600 },
      { src: "/images/proiecte/reabilitare-lot-blocuri/08.webp", alt: "Intrarea unui bloc după reabilitare, cu fațada finisată", width: 1200, height: 1600 },
      { src: "/images/proiecte/reabilitare-lot-blocuri/09.webp", alt: "Bloc reabilitat, cu acoperișul nou și fațada finisată", width: 1600, height: 1200 },
      { src: "/images/proiecte/reabilitare-lot-blocuri/11.webp", alt: "Lotul de blocuri după reabilitare", width: 1600, height: 900 },
      { src: "/images/proiecte/reabilitare-lot-blocuri/12.webp", alt: "Blocurile reabilitate, cu frontoane din lemn și fațade galbene", width: 1600, height: 900 },
    ],
  },
  {
    // Originalele în docs/assets/originale/reabilitare-bloc-p3/ (S44).
    slug: "reabilitare-bloc-p3",
    title: "Reabilitare bloc de locuințe P+3",
    category: "Renovări și reabilitări",
    photos: [
      { src: "/images/proiecte/reabilitare-bloc-p3/01.webp", alt: "Bloc de locuințe P+3 după reabilitare, cu fațada finisată în galben", width: 1440, height: 1092 },
      { src: "/images/proiecte/reabilitare-bloc-p3/02.webp", alt: "Fațada principală a blocului reabilitat, cu intrarea și balconul central", width: 1369, height: 911 },
    ],
  },
];

// Albumele de pe Acasă (secțiunea 02), în ordine: primul e fotografia mare. Alese de utilizator (S45).
export const homeAlbums = [
  "hala-industriala",
  "reabilitare-lot-blocuri",
  "casa-in-constructie",
  "reabilitare-bloc-p4",
  "reabilitare-cladire",
  "spatiu-comercial",
];
