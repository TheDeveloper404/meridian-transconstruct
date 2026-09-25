# Structura site-ului

25 septembrie 2026. Documentul a pornit ca propunere (Faza 1); secțiunile marcate mai jos arată ce e implementat și ce rămâne propunere.

**Implementat (S06):** `/` (Acasă cu secțiunile Servicii, Proiecte, Despre, ancorate), `/contact`, pagina 404, `sitemap.xml` și `robots.txt`, conform machetei finale (A-001 în [BACKLOG](../BACKLOG.md)). Paginile dedicate de servicii, `/proiecte`, `/proiecte/[slug]` și paginile legale din tabelul de mai jos rămân propuneri (B-003, B-012).

## Navigare și pagini

Meniu principal: Acasă, Servicii, Proiecte, Despre, Contact; CTA „Cere o ofertă”. În macheta finală și în aplicație, Servicii / Proiecte / Despre sunt ancore pe Acasă (A-001); varianta cu pagini separate de mai jos rămâne propunere pentru extinderea SEO (B-003). Paginile interioare au breadcrumb spre Acasă.

| URL propus | Rol și conținut | Titlu SEO de lucru |
|---|---|---|
| `/` | Oferta pe scurt, servicii, lucrări selectate, firma și contactul. | Firmă de construcții în Petroșani — Meridian Transconstruct |
| `/servicii` | Privire de ansamblu, acces la cele patru pagini dedicate. | Servicii de construcții în Hunedoara — Meridian Transconstruct |
| `/servicii/constructii-case` | La roșu, la gri, la cheie; sisteme constructive declarate; lucrări relevante. | Construcții case în Petroșani și Valea Jiului — Meridian Transconstruct |
| `/servicii/cladiri-rezidentiale-nerezidentiale` | Lucrări pentru firme, instituții și beneficiari privați; anexe, garaje, spații utilitare. | Construcții rezidențiale și nerezidențiale în Hunedoara |
| `/servicii/constructii-civile` | Categoria „Construcții civile”, cerută în locul serviciului „Structură și zidărie”; conținut delimitat față de celelalte categorii. | Construcții civile în Petroșani — Meridian Transconstruct |
| `/servicii/renovari-reabilitari` | Renovări, reabilitare, anvelopare și finisaje confirmate. | Renovări și reabilitări în Hunedoara — Meridian Transconstruct |
| `/proiecte` | Grilă cu proiectele documentate și aprobate, pregătită pentru aproximativ 20 de lucrări. | Proiecte de construcții — Meridian Transconstruct |
| `/proiecte/[slug]` | Fișă și galerie pentru o lucrare reală. | [Lucrare] în [Localitate] — Meridian Transconstruct |
| `/despre` | Firma din 2019, aria de lucru, abordare și dovezi disponibile. | Despre Meridian Transconstruct — firmă din Petroșani |
| `/contact` | Ambele telefoane, e-mail, formular scurt și zona de lucru. | Contact și cerere ofertă — Meridian Transconstruct |
| `/date-firma` | Identificarea legală și datele de contact verificate. | Date firmă — Meridian Transconstruct |
| `/confidentialitate` | Informarea despre datele personale, completată după alegerea furnizorilor. | Confidențialitate — Meridian Transconstruct |
| `/cookies` | Tehnologiile efectiv folosite și preferințe, dacă sunt necesare. | Cookies — Meridian Transconstruct |

Ruta necunoscută are pagină 404 cu link spre Acasă și Contact. Fără pagini separate pentru fiecare material de construcție sau oraș. Casele apar în pagina dedicată; pagina de clădiri se concentrează pe celelalte tipuri de lucrări pentru a evita repetarea textelor.

## Acasă — ordinea secțiunilor (implementată)

1. **Header:** denumire/logo, meniu și CTA; fără număr de telefon, conform cererii utilizatorului.
2. **Hero:** H1 „Construcții în Petroșani. De la structură la cheie.”; text despre clădiri rezidențiale/nerezidențiale și zona de lucru; CTA principal „Cere o ofertă”, link secundar „Vezi proiectele”. Imagine pe întreg fundalul, cu text suprapus și strat albastru pentru contrast. Macheta folosește un concept generat, marcat explicit; fotografia reală rămâne de primit.
3. **Context factual:** „Din 2019”, „Petroșani · Valea Jiului”, „Lucrări cu contract” (ca în macheta finală). Fără număr de clienți, procente sau promisiuni inventate.
4. **Servicii:** patru categorii cu explicație, puncte cheie și link spre Contact (paginile dedicate — B-003).
5. **Proiecte selectate:** maximum trei lucrări reale, fotografii dominante, tip lucrare și localitate; fără proiecte publicabile, stare goală cu link spre Contact (A-002). Numărul total nu se afirmă public înaintea inventarului verificat.
6. **Despre:** prezentare, viziune și trei principii de lucru, direct pe Acasă. Nu afirmăm existența unor certificări sau a unei echipe interne neverificate.
7. **CTA către Contact:** invitație scurtă la discutarea lucrării și buton către pagina Contact. Blocul mare numerotat 04, cu date de contact, a fost eliminat de pe Acasă.
8. **Footer:** nume legal, CUI, Registrul Comerțului, contact; paginile date firmă/confidențialitate/cookies sunt marcate ca în pregătire (A-004, B-012).

## Structura unei pagini de serviciu (propunere, B-003)

H1 și scopul serviciului → lucrări incluse și limite reale → exemple din portofoliu → zona de lucru → cerere ofertă. Nu definim pachete „la cheie” sau garanții contractuale fără validarea firmei. Întrebările frecvente se adaugă numai dacă avem răspunsuri confirmate.

## Structura unui proiect (model de date implementat parțial)

În aplicație, `src/content/projects.ts` are deocamdată câmpurile pentru card (titlu, localitate, an, tip lucrare, copertă); fișa și galeria `/proiecte/[slug]` se adaugă odată cu primele proiecte reale.

- Titlu factual și slug stabil; categorie de serviciu.
- Localitate, an, lucrări efectiv executate; durata doar dacă este cunoscută și verificată.
- Fotografie de copertă, galerie cu descrieri/alt relevante și acord de publicare.
- Context și intervenția firmei; rezultat descris fără promisiuni sau cifre fabricate.
- Legătură către serviciul relevant și CTA „Discută o lucrare similară”.

Acordul de publicare este un criteriu intern, nu un câmp public. Nu publicăm adresa exactă sau numele beneficiarului fără acord. Galeria trebuie să funcționeze și cu o singură imagine; nu activăm filtre pentru o colecție prea mică. Pentru aproximativ 20 de proiecte propunem o grilă simplă, fără căutare sau paginare inițială, cu imagini încărcate progresiv.

## Formular (implementat)

Contractul API și regulile de validare sunt în [ARCHITECTURE.md](../ARCHITECTURE.md).

Patru câmpuri: „Nume / firmă” (obligatoriu), „E-mail” (obligatoriu), „Telefon” (opțional), „Despre lucrare” (obligatoriu; indiciu: tipul lucrării, localitatea și stadiul actual). Fără atașamente la lansare. Destinație temporară: adresa confirmată în brief. Buton: „Trimite cererea”.

Informare scurtă de confidențialitate lângă formular (A-004); nu adăugăm marketing implicit. Temeiul prelucrării și textul complet al informării se stabilesc pe fluxul real (B-012). Stări: inițial, validare cu erori lângă câmpuri, trimitere în curs, succes, eroare cu datele păstrate și alternativă telefonică. Nu promitem răspuns în 24 de ore fără acordul firmei.

## SEO local și accesibilitate

Titlurile sunt propuneri editoriale, nu rezultate de cercetare a volumelor de căutare. Conținutul descrie oferta reală și zona acoperită; datele firmei rămân consecvente. Legături serviciu ↔ proiect, metadata distincte și canonical pentru URL-ul final. Structura urmează principiile de conținut util și linkuri accesibile din [Google Search Essentials](https://developers.google.com/search/docs/essentials).

Pentru mobil: navigare compactă, ordine logică a titlurilor, link de salt la conținut și acces persistent la telefon fără acoperirea ultimelor elemente. Specificațiile vizuale și stările sunt în [DESIGN.md](DESIGN.md).

## Identificare legală, confidențialitate și cookies

Pe baza [art. 5 din Legea 365/2002](https://legislatie.just.ro/Public/DetaliiDocument/37075), planificăm afișarea accesibilă și permanentă a denumirii, sediului, contactelor, numărului din registru și CUI. Sediul nu se elimină doar fiindcă coincide cu o adresă rezidențială; trebuie verificată adresa legală de publicat. Datele nu au fost încă validate față de documentele firmei.

Formularul necesită o informare privind prelucrarea datelor: operator, scop/temei, destinatari, păstrare și drepturi. Politica finală depinde de hosting, SMTP și gestionarea inboxului; referință: [Regulamentul UE 2016/679, art. 13](https://eur-lex.europa.eu/eli/reg/2016/679/oj).

Un banner nu se adaugă doar decorativ. [Art. 4 alin. (5)–(6) din Legea 506/2004](https://legislatie.just.ro/Public/DetaliiDocument/257056) prevede acordul și informarea pentru stocare/acces, cu excepții pentru operațiunile strict necesare. Propunem inițial fără trackere sau embed-uri externe; după inventarul efectiv decidem dacă este necesar un mecanism de consimțământ. Pagina de informare trebuie să corespundă tehnologiilor reale.

## De aprobat / de primit

Confirmate prin feedback: albastru închis, hero cu fundal imagine, eliminarea telefonului din header, serviciul „Construcții civile” și CTA spre Contact pe Acasă. Structura cu două pagini din macheta finală este implementată și așteaptă ratificare (A-001). Rămân de primit logo-ul și fotografiile; conținutul detaliat al paginilor rămâne de aprobat. Hostingul nu se rediscută acum: se configurează la deploy. Confirmarea acestor propuneri nu înlocuiește verificările înainte de lansare.
