// Textele paginii Acasă, preluate din macheta aprobată (docs/home-preview.html).

// Titlul și descrierea pentru Google și tab-ul browserului. „Petroșani” e permis DOAR aici
// (decizia utilizatorului, S09), nu în textele vizibile de mai jos.
export const homeSeo = {
  title: "Firmă de construcții în Petroșani și Valea Jiului",
  description:
    "Construcții civile, clădiri rezidențiale și nerezidențiale, hale industriale, renovări și case la roșu sau la cheie în Petroșani, Valea Jiului și județul Hunedoara.",
};

export const hero = {
  eyebrow: "Valea Jiului · Județul Hunedoara",
  titleLead: "O construcție bună",
  titleAccentLines: ["începe cu o", "înțelegere clară."],
  lead: "Execuție de clădiri rezidențiale și nerezidențiale în Valea Jiului și în județul Hunedoara, pentru firme, instituții și persoane fizice.",
  primaryCta: "Cere o ofertă",
  secondaryCta: "Vezi proiectele",
  image: {
    src: "/images/hero-concept.webp",
    width: 1672,
    height: 941,
    // Vizual generat, provizoriu (docs/assets/README.md). Se înlocuiește cu o fotografie reală;
    // atunci `isConcept` devine false și eticheta dispare.
    isConcept: true,
    conceptCredit: "Vizual de concept generat · nu reprezintă o lucrare a firmei",
  },
};

export const about = {
  kicker: "03 / Despre firmă",
  titleLines: ["Construim de la structură", "până la ultimul finisaj."],
  // Rescris în S12b la cererea utilizatorului; doar fapte din PROJECT_BRIEF (fără cifre sau
  // promisiuni noi). „Viziunea noastră” și principiile de mai jos sunt păstrate neschimbate.
  lead: "Meridian Transconstruct este o firmă de construcții activă din 2019, care execută lucrări pentru firme, instituții publice și persoane fizice.",
  paragraphs: [
    "Preluăm proiecte noi și șantiere deja începute. Când o lucrare e în curs, pornim de la ce s-a executat până atunci și stabilim clar ce rămâne de făcut, înainte de ofertă.",
    "Executăm în cărămidă, BCA, beton, lemn sau pe structură metalică, după soluția din proiect. Etapele, nivelul de predare și termenele se stabilesc prin contract, iar contractul rămâne reperul întregii colaborări.",
  ],
  vision: {
    title: "Viziunea noastră",
    text: "Ne dorim să lăsăm în urmă construcții bine executate și relații de lucru bazate pe încredere. Pentru noi, un proiect reușit începe cu înțelegerea nevoii beneficiarului și cu o imagine clară asupra lucrărilor, etapelor și rezultatului urmărit.",
  },
  principles: [
    {
      title: "Claritate înainte de execuție",
      text: "Discutăm lucrările incluse, nivelul de predare și documentația disponibilă. Contractul este punctul de referință al colaborării.",
    },
    {
      title: "Atenție la fiecare etapă",
      text: "Calitatea unei clădiri se construiește pas cu pas. Acordăm importanță execuției, materialelor prevăzute și detaliilor care vor conta în utilizare.",
    },
    {
      title: "Termene discutate realist",
      text: "Planificarea pornește de la lucrările efective și condițiile proiectului. Urmărim respectarea termenelor stabilite prin contract.",
    },
  ],
};

export const contactTeaser = {
  eyebrow: "Să discutăm proiectul tău",
  title: "Ai o lucrare în plan?",
  text: "Spune-ne ce vrei să construiești, unde este lucrarea și în ce stadiu se află. Primul pas este o discuție clară despre proiectul tău.",
  cta: "Cere o ofertă",
};

export const footerTagline =
  "Firmă de construcții. Execuție pentru clădiri noi și lucrări care dau o nouă viață celor existente.";
