// Cele patru categorii de servicii, în ordinea și formularea din macheta aprobată.
// Serviciul 03 este „Construcții civile” (în locul „Structură și zidărie”), conform feedbackului.

export type Service = {
  id: string;
  title: string;
  /** Titlul poate avea o rupere de rând intenționată pe desktop. */
  titleLines?: string[];
  subtitle: string;
  paragraphs: string[];
  highlights: string[];
  ctaLabel: string;
};

export const servicesIntro = {
  kicker: "01 / Ce executăm",
  titleLines: ["De la fundație", "la lucrări de finisare."],
  intro:
    "O construcție bună începe cu lucrări bine definite. Alegem împreună etapa de execuție și stabilim ce intră în proiect, în funcție de clădire, utilizare și stadiul șantierului.",
};

export const services: Service[] = [
  {
    id: "constructii-case",
    title: "Construcții de case",
    subtitle: "La roșu. La gri. La cheie.",
    paragraphs: [
      "Construim case în etapele de execuție de care ai nevoie: de la structură și zidărie până la lucrările de finisare convenite. Oferta se raportează la proiectul casei și la lucrările incluse, astfel încât să poți compara clar soluțiile și costurile.",
      "Lucrăm cu sisteme din cărămidă, BCA, beton, lemn sau structură metalică, în funcție de soluția prevăzută în proiect. Delimităm de la început etapele și nivelul de predare urmărit.",
    ],
    highlights: [
      "Execuție la roșu, la gri sau la cheie",
      "Materiale și soluții conform proiectului",
      "Lucrări și termene stabilite prin contract",
    ],
    ctaLabel: "Discută construcția unei case",
  },
  {
    id: "cladiri",
    title: "Clădiri rezidențiale și nerezidențiale",
    titleLines: ["Clădiri rezidențiale", "și nerezidențiale"],
    subtitle: "Spații construite pentru utilizarea lor.",
    paragraphs: [
      "Executăm lucrări pentru clădiri de locuit, anexe, garaje și spații utilitare. Ne adresăm firmelor, instituțiilor publice și beneficiarilor privați care au nevoie de un partener pentru execuția unui proiect bine definit.",
      "Pentru o ofertă relevantă, discutăm destinația clădirii, amplasamentul, documentația disponibilă și stadiul în care se află lucrarea. Astfel, cerințele de utilizare se traduc într-un scop de execuție concret.",
    ],
    highlights: [
      "Clădiri și extinderi prevăzute în proiect",
      "Anexe, garaje și spații utilitare",
      "Execuție adaptată destinației clădirii",
    ],
    ctaLabel: "Spune-ne despre clădirea ta",
  },
  {
    id: "constructii-civile",
    title: "Construcții civile",
    subtitle: "Lucrări corelate, de la structură la detaliu.",
    paragraphs: [
      "Realizăm lucrări de construcții civile pentru proiecte noi și pentru șantiere aflate deja în execuție. Structura, zidăria și lucrările ulterioare sunt tratate ca etape ale aceleiași construcții, în raport cu documentația și cerințele beneficiarului.",
      "Dacă proiectul este început, discutăm lucrările executate și ceea ce mai este de realizat înainte de a defini oferta. Conținutul și limitele intervenției se stabilesc pentru fiecare situație.",
    ],
    highlights: [
      "Lucrări de structură și zidărie",
      "Execuție pe etape sau continuări de șantier",
      "Scop clar al intervenției, înainte de contractare",
    ],
    ctaLabel: "Discută etapele proiectului",
  },
  {
    id: "renovari",
    title: "Renovări și reabilitări",
    subtitle: "O nouă etapă pentru o clădire existentă.",
    paragraphs: [
      "Executăm renovări, reabilitări, lucrări de anvelopare și finisaje. Pornim de la starea clădirii și de la rezultatul urmărit: ce trebuie refăcut, ce se păstrează și ce lucrări trebuie corelate.",
      "O intervenție bine definită ajută la planificarea etapelor și a bugetului. Pentru stabilirea ofertei sunt utile fotografiile, localitatea și o descriere a lucrărilor dorite; detaliile se clarifică înainte de contractare.",
    ],
    highlights: [
      "Renovări și reabilitări de clădiri",
      "Anvelopare și lucrări de finisare",
      "Etapizare în funcție de starea existentă",
    ],
    ctaLabel: "Discută renovarea",
  },
];
