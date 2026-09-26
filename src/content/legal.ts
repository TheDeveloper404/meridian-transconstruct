import { company, whatsapp } from "./company";

// Linkuri legale din footer (S12b) și textele paginilor legale (S24, B-012).

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

// ---------------------------------------------------------------------------------------------
// Textele paginilor legale (S24). Redactate după ce face site-ul în realitate: formularul trimite
// un e-mail text simplu și nu stochează nimic; IP-ul e folosit doar în memorie, pentru limitarea
// cererilor; fără cookie-uri proprii, de analiză sau de marketing; fonturi găzduite local.
// Furnizorii (OVHcloud, Maileroo, Cloudflare, Yahoo) sunt cei deciși pentru lansare (B-002, B-007,
// B-009, B-010) — de reverificat la lansare (B-013). De validat juridic înainte de lansare (B-012).

export type LegalSection = {
  heading: string;
  paragraphs?: string[];
  items?: string[];
};

export type LegalDocument = {
  title: string;
  lead: string;
  description: string;
  updated: string;
  sections: LegalSection[];
};

const operator = `${company.legalName}, CUI ${company.cui}, nr. de ordine în Registrul Comerțului ${company.tradeRegister}, cu sediul în ${company.registeredOffice}`;
const phones = company.phones.map((phone) => phone.display).join(" / ");

export const privacyPolicy: LegalDocument = {
  title: "Politica de confidențialitate",
  lead: "Ce date personale primim prin site, de ce, cât timp le păstrăm și ce drepturi ai.",
  description:
    "Politica de confidențialitate Meridian Transconstruct: datele trimise prin formularul de contact, scopul prelucrării, furnizorii implicați și drepturile tale.",
  updated: "26 septembrie 2026",
  sections: [
    {
      heading: "1. Cine suntem",
      paragraphs: [
        `Operatorul datelor este ${operator}.`,
        `Pentru orice întrebare despre datele tale ne poți scrie la ${company.email} sau ne poți suna la ${phones}.`,
      ],
    },
    {
      heading: "2. Ce date prelucrăm",
      items: [
        "Datele din formularul de contact: numele sau denumirea firmei, adresa de e-mail, numărul de telefon (opțional) și mesajul despre lucrare, împreună cu data trimiterii.",
        "Datele pe care ni le transmiți direct, prin e-mail, telefon sau WhatsApp: numele, datele de contact și informațiile despre lucrare.",
        "Date tehnice: adresa IP, folosită doar în memoria serverului, pentru cel mult o oră, ca să limităm trimiterile repetate ale formularului; jurnalele tehnice ale serverului (adresa IP, data și pagina accesată), păstrate pe termen scurt pentru securitate.",
      ],
      paragraphs: [
        "Nu îți cerem date sensibile. Te rugăm să nu incluzi în mesaj informații care nu sunt necesare pentru ofertă.",
      ],
    },
    {
      heading: "3. De ce le prelucrăm și pe ce temei",
      items: [
        "Ca să îți răspundem și să pregătim oferta cerută — demersuri făcute la cererea ta înainte de un eventual contract (art. 6 alin. (1) lit. b din Regulamentul (UE) 2016/679, GDPR).",
        "Ca să protejăm site-ul și formularul împotriva abuzurilor (spam, trimiteri automate) — interesul nostru legitim (art. 6 alin. (1) lit. f GDPR).",
      ],
      paragraphs: [
        "Nu folosim datele pentru marketing, nu le vindem și nu luăm decizii automate pe baza lor.",
      ],
    },
    {
      heading: "4. Cui le transmitem",
      paragraphs: [
        "Datele ajung doar la noi. Pentru funcționarea site-ului folosim furnizori care prelucrează datele în numele nostru, doar cât e necesar serviciului lor:",
      ],
      items: [
        "OVHcloud — găzduirea site-ului (servere în Uniunea Europeană);",
        "Maileroo — transmiterea pe e-mail a mesajelor din formular;",
        "Cloudflare — DNS, securitatea conexiunii și redirecționarea e-mailurilor trimise la adresa firmei;",
        "Yahoo — căsuța de e-mail în care primim mesajele.",
        `WhatsApp (Meta) — doar dacă ne scrii pe WhatsApp (${whatsapp.display}); conversația este prelucrată și după regulile WhatsApp.`,
      ],
    },
    {
      heading: "5. Transferuri în afara Uniunii Europene",
      paragraphs: [
        "Unii furnizori (de exemplu Cloudflare și Yahoo) pot prelucra date și în afara Spațiului Economic European, inclusiv în SUA. În aceste cazuri transferul se face pe baza mecanismelor prevăzute de GDPR, cum ar fi decizia de adecvare UE–SUA sau clauzele contractuale standard adoptate de Comisia Europeană.",
      ],
    },
    {
      heading: "6. Cât timp le păstrăm",
      paragraphs: [
        "Site-ul nu stochează mesajele trimise prin formular: acestea ajung doar în căsuța noastră de e-mail. Păstrăm corespondența cât timp este necesară pentru a-ți răspunde și pentru a discuta oferta. Dacă se încheie un contract, documentele legate de acesta se păstrează pe durata prevăzută de lege. Adresa IP folosită pentru limitarea trimiterilor se șterge automat după cel mult o oră.",
      ],
    },
    {
      heading: "7. Cookie-uri",
      paragraphs: [
        "Site-ul nu plasează cookie-uri proprii și nu folosește instrumente de analiză a traficului sau de publicitate. Fonturile sunt găzduite pe serverul nostru. Furnizorul de rețea și securitate (Cloudflare) poate folosi cookie-uri strict necesare pentru protejarea site-ului împotriva traficului automat abuziv; acestea nu servesc la urmărirea ta.",
      ],
    },
    {
      heading: "8. Drepturile tale",
      paragraphs: ["Conform GDPR, ai dreptul:"],
      items: [
        "să afli ce date avem despre tine și să primești o copie a lor (dreptul de acces);",
        "să ceri corectarea datelor inexacte (dreptul la rectificare);",
        "să ceri ștergerea datelor (dreptul la ștergere);",
        "să ceri restricționarea prelucrării;",
        "să primești datele într-un format structurat sau să ceri transmiterea lor altui operator (dreptul la portabilitate);",
        "să te opui prelucrării bazate pe interesul nostru legitim.",
      ],
    },
    {
      heading: "9. Cum îți exerciți drepturile",
      paragraphs: [
        `Scrie-ne la ${company.email}. Îți răspundem în cel mult o lună de la primirea cererii; în cazuri complexe termenul se poate prelungi, cu informarea ta. Dacă nu ne putem da seama că cererea vine de la tine, îți putem cere informații suplimentare pentru identificare.`,
        "Dacă apreciezi că prelucrarea datelor tale încalcă legea, poți depune o plângere la Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP), B-dul G-ral. Gheorghe Magheru nr. 28-30, sector 1, București, www.dataprotection.ro.",
      ],
    },
    {
      heading: "10. Securitate",
      paragraphs: [
        "Conexiunea cu site-ul este criptată (HTTPS). Datele din formular sunt verificate pe server și trimise ca text simplu, fără a fi salvate într-o bază de date. Accesul la căsuța de e-mail este limitat la persoanele care răspund cererilor.",
      ],
    },
    {
      heading: "11. Minori",
      paragraphs: [
        "Site-ul se adresează persoanelor care solicită lucrări de construcții și nu este destinat copiilor sub 16 ani.",
      ],
    },
    {
      heading: "12. Modificări",
      paragraphs: [
        "Putem actualiza această politică atunci când se schimbă modul de funcționare al site-ului sau furnizorii folosiți. Versiunea curentă este cea publicată pe această pagină, cu data ultimei actualizări.",
      ],
    },
  ],
};

export const termsAndConditions: LegalDocument = {
  title: "Termeni și condiții",
  lead: "Condițiile de utilizare a site-ului Meridian Transconstruct.",
  description:
    "Termenii și condițiile de utilizare a site-ului Meridian Transconstruct: rolul informațiilor, formularul de contact, drepturile de autor și soluționarea litigiilor.",
  updated: "26 septembrie 2026",
  sections: [
    {
      heading: "1. Despre site",
      paragraphs: [
        `Site-ul aparține ${operator}.`,
        `Contact: ${company.email}, telefon ${phones}.`,
        "Folosind site-ul, accepți acești termeni. Dacă nu ești de acord cu ei, te rugăm să nu folosești site-ul.",
      ],
    },
    {
      heading: "2. Rolul informațiilor de pe site",
      paragraphs: [
        "Site-ul prezintă firma, tipurile de lucrări pe care le executăm și modalitățile de contact. Informațiile au caracter general și nu constituie o ofertă fermă. Prețul, conținutul lucrărilor și termenele se stabilesc doar prin oferta scrisă și prin contractul încheiat cu fiecare beneficiar.",
        "Unele imagini sunt ilustrative și sunt marcate ca atare; ele nu reprezintă lucrări executate de firmă.",
      ],
    },
    {
      heading: "3. Formularul de contact",
      items: [
        "Trimiterea formularului este o cerere de informații sau de ofertă și nu creează obligații contractuale pentru niciuna dintre părți.",
        "Te rugăm să folosești date corecte și să nu transmiți conținut ilegal, ofensator sau mesaje nesolicitate.",
        "Pentru protecția site-ului, numărul de trimiteri de pe aceeași conexiune este limitat automat.",
        "Modul în care folosim datele trimise este descris în Politica de confidențialitate.",
      ],
    },
    {
      heading: "4. Drepturi de autor",
      paragraphs: [
        "Textele, elementele grafice și fotografiile lucrărilor aparțin firmei sau sunt folosite cu acordul titularilor ori pe baza unor licențe libere. Nu le poți copia, modifica sau folosi în scop comercial fără acordul nostru scris. Poți distribui linkuri către paginile site-ului.",
      ],
    },
    {
      heading: "5. Linkuri către alte site-uri",
      paragraphs: [
        "Site-ul conține linkuri către servicii externe (de exemplu WhatsApp sau site-ul ANPC). Nu răspundem de conținutul și de regulile de confidențialitate ale acestora; folosirea lor se face după propriii lor termeni.",
      ],
    },
    {
      heading: "6. Răspundere",
      paragraphs: [
        "Ne străduim ca informațiile de pe site să fie corecte și actualizate, dar nu putem garanta că site-ul funcționează fără întreruperi sau erori. Nu răspundem pentru pagubele rezultate din folosirea informațiilor generale de pe site fără o ofertă sau un contract încheiat cu noi.",
      ],
    },
    {
      heading: "7. Soluționarea litigiilor",
      paragraphs: [
        "Orice neînțelegere o rezolvăm, în primul rând, pe cale amiabilă — scrie-ne sau sună-ne. Consumatorii se pot adresa și Autorității Naționale pentru Protecția Consumatorilor, inclusiv procedurii de soluționare alternativă a litigiilor (SAL), la anpc.ro.",
        "Acești termeni sunt guvernați de legea română. Litigiile care nu se pot rezolva amiabil sunt de competența instanțelor judecătorești din România.",
      ],
    },
    {
      heading: "8. Modificări",
      paragraphs: [
        "Putem actualiza acești termeni. Versiunea curentă este cea publicată pe această pagină, cu data ultimei actualizări.",
      ],
    },
  ],
};

// Easter egg în footer (S55): clic pe „Toate drepturile rezervate.” dezvăluie autorul site-ului.
export const siteCredit = {
  rights: "Toate drepturile rezervate.",
  prefix: "Realizat de",
  name: "ACL Smart Software",
  href: "https://acl-smartsoftware.ro",
};
