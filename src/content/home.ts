// Textele paginii Acasă, preluate din macheta aprobată (docs/home-preview.html).

import { formatYears, fullYearsSince } from "@/lib/experience";
import { company } from "./company";

/** Ani împliniți de la înființare, calculați la build (26 iulie 2019 → 7 ani în septembrie 2026). */
const experience = formatYears(fullYearsSince(company.foundedDate));

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
    // Fotografie reală (S48): hala industrială în execuție, varianta luminată de utilizator
    // (original: docs/assets/originale/hala-industriala/1-hero.png). `isConcept: true` ar afișa eticheta
    // de vizual generat — doar pentru imagini care nu sunt lucrări ale firmei.
    src: "/images/hero-hala-structura.webp",
    width: 1732,
    height: 908,
    isConcept: false,
    conceptCredit: "Vizual de concept generat · nu reprezintă o lucrare a firmei",
  },
};

export const about = {
  kicker: "03 / Despre firmă",
  titleLines: ["Construim de la structură", "până la ultimul finisaj."],
  // Rescris în S14 la cererea utilizatorului (experiență, „lucrul bine făcut”, „ce ne recomandă”);
  // doar fapte din PROJECT_BRIEF. „Viziunea noastră” și principiile de mai jos sunt neschimbate.
  lead: `Din ${company.foundedYear}, Meridian Transconstruct execută construcții pentru firme, instituții publice și persoane fizice. În ${experience} de experiență am urmărit un singur standard: lucrul bine făcut.`,
  recommendsTitle: "Ce ne recomandă",
  recommends: [
    {
      icon: "experience",
      title: `${experience} de experiență`,
      text: `Activăm în construcții din ${company.foundedYear}: construcții civile, clădiri, hale, renovări și case.`,
    },
    {
      icon: "quality",
      title: "Lucrul bine făcut",
      text: "Execuția atentă, de la structură până la ultimul finisaj. Lucrările predate sunt cea mai bună carte de vizită.",
    },
    {
      icon: "site",
      title: "Șantiere noi sau începute",
      text: "Preluăm și lucrări în curs: evaluăm ce s-a executat și stabilim clar ce rămâne de făcut.",
    },
    {
      icon: "materials",
      title: "Soluția din proiect",
      text: "Executăm în cărămidă, BCA, beton, lemn sau pe structură metalică, după proiect.",
    },
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
