# Changelog și jurnal de sesiuni

Istoric al activităților și deciziilor proiectului, inclusiv discovery și documentație. Intrările recente apar primele. Datele folosesc fusul Europe/Bucharest.

Fiecare sesiune nouă primește data și un număr în cadrul zilei, apoi consemnează: scop și clasificare, activități, decizii/aprobări, verificări reale, blocaje și următorul pas. Nu înregistrăm parole, conținutul cererilor clienților sau transcrieri brute. Nu marcăm planurile drept funcționalități livrate.

## 2026-09-26 — S53 — Accent galben de șantier în locul portocaliului

- **Scop / clasificare:** SMALL — culoare de accent, la cererea utilizatorului (recomandare: galben de șantier, asociat cu construcțiile și complementar albastrului din logo).
- **Implementare:** `--color-accent` `#F8A046` → `#F5B82E`, hover `#FFB568` → `#FFC94D`, valorile `rgb(248 160 70 / …)` (strălucirea barei de progres, fundalul de hover din meniu) → `rgb(245 184 46 / …)`. Token nou `--color-accent-strong` `#946200` (ocru) pentru text și iconițe pe fundal deschis, unde galbenul ar avea ~1,7:1: numerele, iconițele și bifele din panourile de servicii, eticheta și titlul la hover pe `/proiecte`, bulinele din paginile legale. Comentariile „portocaliu” actualizate.
- **Contrast (calculat):** text închis pe galben 9,2:1 (față de 7,9:1 la portocaliu); galben pe fundal închis 9,2:1; ocru 5,2:1 pe alb și 4,7:1 pe crem.
- **Verificări:** type-check, lint, Vitest 41/41, build — PASS. Capturi desktop: hero, servicii (panou deschis), despre, final + footer, `/proiecte`, Contact.
- **Documentare:** DESIGN (paletă), CLAUDE.md (regula accent/accent-strong).

## 2026-09-26 — S52 — Închiderea sesiunii (S28–S51)

- **Scop / clasificare:** SMALL — documentare la închidere.
- **Rezumat:** logo și fonturi (S28), imaginile de test scoase și folderul de originale (S29), 9 albume reale (S30–S44), grila care umple rândurile (S34), favicon din emblemă (S36), Acasă › 02 cu coperțile albumelor (S45), hero cu fotografie reală (S46–S48), footer centrat pe mobil (S49), meniu cu iconiță (S50), fără bara „Sună” și bulă WhatsApp pe desktop (S51). S32, S40 și S43 sunt ajustări mici consemnate în intrarea următoare.
- **Decizii:** A-003 (Saira + Inter) și A-011 (hero, albumele de pe Acasă) închise ca ratificate de utilizator; fotografiile sunt reale, editate (S42).
- **Corecție:** avertismentul din consola browserului pentru logo („width or height modified, but not the other”) — `Brand` declară acum dimensiunile reale ale fișierului (854 × 240) cu `sizes="200px"`; mărimea afișată e neschimbată.
- **Verificări (după corecție):** type-check, lint (0 erori, avertismentul preexistent din `.remember/tmp`), Vitest 41/41, build — PASS. **Nimic din S28–S52 nu a fost verificat în browser** (avertismentul logo-ului a fost raportat de utilizator din consolă).
- **Blocaje / următorul pas:** verificare vizuală în browser a sesiunii; acordul beneficiarilor (B-005); domeniu, VPS, Maileroo (secțiunea 4 din BACKLOG). Modificările sunt necomise — utilizatorul comite.

## 2026-09-26 — S51 — Fără bara „Sună” pe mobil; bulă de mesaj WhatsApp pe desktop

- **Scop / clasificare:** SMALL — la cererea utilizatorului.
- **Implementare:** bara fixă „Sună: …” de jos, pe mobil, a fost scoasă (`mobile-call.tsx` și padding-ul inferior al paginii; `primaryPhone` nu mai era folosit). Butonul WhatsApp rămâne flotant, acum în colțul de jos (16 px de margine pe mobil). Pe desktop (de la 768 px), la 10 secunde după încărcarea paginii apare o bulă albă deasupra butonului: „Bună! Ai un proiect de construcție în minte? Scrie-ne pe WhatsApp.” (text în `whatsapp.greeting`, redactat de agent); clic pe bulă → WhatsApp, „×” o închide până la următoarea încărcare. Componenta devine client (`useState` + temporizator). Telefonul rămâne în pagina Contact și în footer.
- **Verificări:** type-check, lint (avertismentul preexistent), Vitest 41/41, build — PASS. Apariția bulei și închiderea — NU verificate în browser.

## 2026-09-26 — S50 — Meniul compact: doar iconiță

- **Scop / clasificare:** SMALL — la cererea utilizatorului.
- **Implementare:** butonul „Meniu” (cu chenar) din meniul compact (sub 1280 px) devine doar o iconiță: trei linii de meniu împărțite ca rândurile unui zid de cărămidă (SVG inline, albă, portocalie la hover), zonă de atingere 48 × 48 px; textul „Meniu” rămâne pentru cititoarele de ecran. Alegerea formei e a agentului (o iconiță pur de construcții, ex. cască, nu s-ar recunoaște ca meniu).
- **Verificări:** type-check, lint (avertismentul preexistent), Vitest 41/41, build — PASS. Aspectul — NU verificat în browser.

## 2026-09-26 — S49 — Footer centrat pe telefon

- **Scop / clasificare:** SMALL — la cererea utilizatorului.
- **Implementare:** sub 768 px, tot conținutul footer-ului e centrat (logo, fraza de prezentare, copyright, titlurile, datele de contact cu iconițe, linkurile legale, pictogramele ANPC); de la tabletă rămâne aliniat la stânga, ca înainte.
- **Verificări:** type-check, lint (avertismentul preexistent), Vitest 41/41, build — PASS. Aspectul — NU verificat în browser.

## 2026-09-26 — S48 — Hero: structura halei, varianta luminată de utilizator

- **Scop / clasificare:** SMALL — la cererea utilizatorului.
- **Implementare:** hero-ul folosește varianta mai clară, editată de utilizator, a fotografiei cu structura metalică a halei (`docs/assets/originale/hala-industriala/1-hero.png` → `public/images/hero-hala-structura.webp`, 1732 × 908, fără metadate; nume nou ca să nu fie servită varianta veche din cache). `hero-hala.webp` (S47) șters. Albumul halei păstrează fotografia 01 originală. Tot în S48: `01.webp` din album lipsea (cauză necunoscută) și a fost regenerat din original.
- **Verificări:** type-check, lint (avertismentul preexistent), Vitest 41/41, build — PASS. Aspectul — NU verificat în browser.

## 2026-09-26 — S47 — Hero: altă fotografie, mai clară

- **Scop / clasificare:** SMALL — la cererea utilizatorului (fotografia din S46 nu i-a plăcut; vrea una mai clară).
- **Implementare:** hero-ul folosește fotografia halei finalizate pe cer senin (`hala-industriala/0.png` → `public/images/hero-hala.webp`, 1672 × 941, fără metadate), aleasă de agent dintre alte 6 candidate simulate cu degradeul hero-ului: cea mai luminoasă și mai curată compoziție. Alternativa apropiată: casa P+1 la gri.
- **Verificări:** type-check, lint (avertismentul preexistent), Vitest 41/41, build — PASS. Aspectul — NU verificat în browser.

## 2026-09-26 — S46 — Hero cu fotografie reală

- **Scop / clasificare:** SMALL — la cererea utilizatorului (vizualul generat nu-i plăcea; vrea ceva legat de construcții).
- **Implementare:** hero-ul folosește fotografia halei industriale în execuție (structura metalică, zidăria, echipa) — `public/images/hero.webp` (1733 × 908, fără mărire, fără metadate) din `docs/assets/originale/hala-industriala/1.png`; eticheta „Vizual de concept generat” dispare (`isConcept: false`). Aleasă de agent dintre 4 candidate simulate cu degradeul hero-ului: textul rămâne lizibil, iar alternativele aveau fie mărci vizibile pe plase, fie fundal prea încărcat. `public/images/hero-concept.webp` șters (nu mai era folosit); originalul generat rămâne în `docs/assets/`.
- **Verificări:** type-check, lint (avertismentul preexistent), Vitest 41/41, build — PASS. Aspectul — NU verificat în browser.

## 2026-09-26 — S45 — Acasă › 02: coperțile albumelor

- **Scop / clasificare:** SMALL — propunere a agentului, aprobată de utilizator.
- **Implementare:** secțiunea 02 „Lucrări realizate” arăta starea „Portofoliul este în pregătire” (galeria separată `gallery` era goală din S29), deși `/proiecte` avea 9 albume. Acum arată coperțile a 6 albume din `homeAlbums` (`src/content/projects.ts`), în grila existentă, cu categoria și titlul; clic → pagina albumului (`GalleryTile.href`, link în loc de vizualizarea mărită). Selecția: hală industrială (mare), lot de blocuri, casă P+1, bloc P+4, clădire cu arcade, spațiu comercial. `gallery`, verificarea `existsSync` și folderul gol `public/images/galerie/` au fost scoase. Test Vitest nou: `homeAlbums` trimite doar la albume existente, fără dubluri.
- **Verificări:** type-check, lint (avertismentul preexistent), Vitest 41/41, build — PASS; HTML-ul Acasă din build conține cele 6 linkuri. Aspectul și clicul — NU verificate în browser.

## 2026-09-26 — S44 — Albumul „Reabilitare bloc de locuințe P+3”

- **Scop / clasificare:** SMALL — conținut primit de la utilizator.
- **Implementare:** `reabilitare-bloc-p3` — 2 fotografii (ordinea utilizatorului), „Renovări și reabilitări”; regimul de înălțime în titlu îl distinge de celelalte albume de blocuri. Originalele în `docs/assets/originale/reabilitare-bloc-p3/`, WebP fără metadate în `public/images/proiecte/reabilitare-bloc-p3/`. (S43: fotografia 10 — coperta lotului de blocuri.)
- **Verificări:** type-check, lint (avertismentul preexistent), Vitest 40/40, build — PASS. Aspectul — NU verificat în browser.

## 2026-09-26 — S42 — Albumul „Reabilitare lot de blocuri”; fotografiile confirmate reale

- **Scop / clasificare:** SMALL — conținut primit de la utilizator.
- **Implementare:** `reabilitare-lot-blocuri` — 12 fotografii JPG de telefon (ordinea utilizatorului: schele, acoperiș, finisaje, rezultat; la cererea utilizatorului, fotografia 10 e coperta), „Renovări și reabilitări”. Rotite după orientarea EXIF și convertite în WebP (maximum 1600 px) **fără metadate**; originalele (EXIF fără GPS) în `docs/assets/originale/reabilitare-lot-blocuri/`.
- **Decizie (utilizator):** toate fotografiile albumelor sunt reale, doar editate — închide întrebarea din S30/S33; albumele rămân fără eticheta „Ilustrativ”. Acordul beneficiarilor rămâne de confirmat (B-005).
- **Verificări:** type-check, lint (avertismentul preexistent), Vitest 40/40, build — PASS. Aspectul — NU verificat în browser.

## 2026-09-26 — S41 — Albumul „Reabilitare clădire cu arcade, în execuție”

- **Scop / clasificare:** SMALL — conținut primit de la utilizator.
- **Implementare:** `reabilitare-cladire` — 2 fotografii (singurele existente, după utilizator), „Renovări și reabilitări”; lucrarea e în execuție (schelă, termoizolație în montaj), iar titlul o spune. Mărcile vizibile pe plase nu sunt menționate în text. Originalele în `docs/assets/originale/reabilitare-cladire/`, WebP fără metadate în `public/images/proiecte/reabilitare-cladire/`. (S40: coperta albumului casei — structura P+1.)
- **Verificări:** type-check, lint (avertismentul preexistent), Vitest 40/40, build — PASS. Aspectul — NU verificat în browser.

## 2026-09-26 — S39 — Casa: fotografia structurii P+1

- **Scop / clasificare:** SMALL — conținut primit de la utilizator.
- **Implementare:** a patra fotografie în `casa-in-constructie` (structura cu parter și etaj, pereții ridicați). Titlul devine „Casă P+1 în construcție” — „fundație și placă” nu mai descria albumul. La cererea utilizatorului, fotografia structurii e coperta albumului (prima).
- **Verificări:** type-check, lint (avertismentul preexistent), Vitest 40/40, build — PASS. Aspectul — NU verificat în browser.

## 2026-09-26 — S38 — Albumul „Casă în construcție: fundație și placă”

- **Scop / clasificare:** SMALL — conținut primit de la utilizator.
- **Implementare:** `casa-in-constructie` — 3 fotografii (ordinea utilizatorului), „Construcții de case”; lucrarea e în curs (doar fundația), iar titlul o spune. Când vin fotografiile casei finalizate se adaugă în același album și se actualizează titlul. Originalele în `docs/assets/originale/casa-in-constructie/`, WebP fără metadate în `public/images/proiecte/casa-in-constructie/`.
- **Verificări:** type-check, lint (avertismentul preexistent), Vitest 40/40, build — PASS. Aspectul — NU verificat în browser.

## 2026-09-26 — S37 — Albumul „Reabilitare bloc de locuințe P+4”

- **Scop / clasificare:** SMALL — conținut primit de la utilizator.
- **Implementare:** `reabilitare-bloc-p4` — 3 fotografii (ordinea utilizatorului), „Renovări și reabilitări”; titlul distinge blocul de celelalte două albume de reabilitare (regimul de înălțime vizibil în fotografii). Originalele în `docs/assets/originale/reabilitare-bloc-p4/`, WebP fără mărire și fără metadate în `public/images/proiecte/reabilitare-bloc-p4/`.
- **Verificări:** type-check, lint (avertismentul preexistent), Vitest 40/40, build — PASS. Aspectul — NU verificat în browser.

## 2026-09-26 — S36 — Favicon și iconițe din logo

- **Scop / clasificare:** SMALL — la cererea utilizatorului.
- **Implementare:** iconițele folosesc emblema logo-ului (casa cu „M” și arcele, fără text — textul nu se citește la 16–32 px), cu fundal transparent: `src/app/favicon.ico` (16/32/48 px, PNG încapsulat), `src/app/icon.png` (192), `src/app/apple-icon.png` (180, pe alb — iOS nu acceptă transparență), `public/icon-192.png` și `public/icon-512.png` pentru manifest. Monograma provizorie (`monogram.tsx`, `icon.tsx`, `apple-icon.tsx`, generate cu `next/og`) a fost scoasă.
- **Verificări:** type-check, lint (avertismentul preexistent), Vitest 40/40, build — PASS. Afișarea în tab — NU verificată în browser.

## 2026-09-26 — S35 — Albumele „Termoizolație bloc de locuințe” și „Renovare spațiu comercial”

- **Scop / clasificare:** SMALL — conținut primit de la utilizator.
- **Implementare:** `termoizolatie-bloc` (2 fotografii, alt bloc decât `bloc-reabilitat`) și `spatiu-comercial` (1 fotografie, lucrare pentru un C.A.R., după utilizator), ambele la „Renovări și reabilitări”. Numele beneficiarului nu apare pe site (fără acordul lui confirmat); titlurile nu afirmă lucrări neconfirmate (ex. panourile fotovoltaice apar doar în textul alternativ, ca descriere a imaginii). Originalele în `docs/assets/originale/<slug>/`, WebP fără mărire și fără metadate în `public/images/proiecte/<slug>/`.
- **Verificări:** type-check, lint (avertismentul preexistent), Vitest 40/40, build — PASS. Aspectul — NU verificat în browser.

## 2026-09-26 — S34 — Galeria umple rândurile oricâte fotografii ar fi

- **Scop / clasificare:** SMALL — la cererea utilizatorului.
- **Implementare:** așezarea fixă pe 6 elemente (`LAYOUT[index % 6]`) înlocuită cu `tileLayout(index, count)` în `gallery.tsx`: fotografia mare + două alături, apoi rânduri de câte trei; la final două rămase → 6 + 6, una rămasă → ultimele patru în două rânduri 6 + 6; cu 4 fotografii, cea mare ocupă trei rânduri lângă celelalte trei; 1 și 2 fotografii au variante proprii. Pe tabletă, ultima fotografie rămasă singură ia tot rândul. Cu 6 fotografii rezultatul e identic cu cel de înainte. Se aplică și albumelor, și galeriei de pe Acasă.
- **Verificări:** type-check, lint (avertismentul preexistent), Vitest 40/40, build — PASS. Fără test nou (logică de prezentare, verificată de mână pentru 1–11 fotografii). Aspectul — NU verificat în browser.

## 2026-09-26 — S33 — Al doilea album: bloc de locuințe reabilitat

- **Scop / clasificare:** SMALL — conținut primit de la utilizator.
- **Implementare:** 4 fotografii (ordinea utilizatorului; prima e coperta). Originalele în `docs/assets/originale/bloc-reabilitat/`; pe site WebP (maximum 1600 px, fără mărire, fără metadate) în `public/images/proiecte/bloc-reabilitat/`. Albumul `/proiecte/bloc-reabilitat`, „Bloc de locuințe reabilitat”, categoria „Renovări și reabilitări” (aleasă de agent după serviciile de pe site). Tot PNG-uri fără EXIF — acordul și proveniența rămân de confirmat, ca la hală.
- **Verificări:** type-check, lint (avertismentul preexistent), Vitest 40/40, build — PASS. Aspectul — NU verificat în browser.

## 2026-09-26 — S31 — Album: text doar pe fotografia mare, coperta = hala finalizată

- **Scop / clasificare:** SMALL — la cererea utilizatorului.
- **Implementare:** în albume, categoria și titlul apar doar pe prima fotografie (cea mare); celelalte tile-uri nu au text (câmp `hideCaption` pe `GalleryTile`, galeria de pe Acasă neschimbată; vizualizarea mărită păstrează textul). Albumul halei începe cu o fotografie nouă a halei finalizate (`0.png` → `00.webp`, copertă), apoi cealaltă fotografie a halei finalizate (05) și etapele în ordinea execuției (01–04).
- **Verificări:** type-check, lint (avertismentul preexistent), Vitest 40/40, build — PASS. Aspectul — NU verificat în browser.

## 2026-09-26 — S30 — Primul album: hală industrială

- **Scop / clasificare:** SMALL — conținut primit de la utilizator.
- **Implementare:** 5 fotografii ale unei hale industriale, în ordinea execuției (utilizator). Originalele în `docs/assets/originale/hala-industriala/`; pe site WebP 1600 px, fără metadate, în `public/images/proiecte/hala-industriala/`. Albumul `/proiecte/hala-industriala` („Hală industrială cu structură metalică”, categoria „Hale industriale”), fără an și descriere până la confirmarea utilizatorului. Galeria de pe Acasă rămâne goală (nesolicitat).
- **De confirmat:** originalele sunt PNG fără EXIF, 4 din 5 la 1672 × 941 px — aceeași rezoluție ca vizualul generat din hero; utilizatorul confirmă dacă sunt fotografii reale ale lucrării și acordul beneficiarului.
- **Verificări:** type-check, lint (avertismentul preexistent), Vitest 40/40, build — PASS. Aspectul — NU verificat în browser.

## 2026-09-26 — S29 — Imaginile de test scoase; folder pentru originale

- **Scop / clasificare:** SMALL — la cererea utilizatorului.
- **Implementare:** șterse pozele Unsplash (5 din galeria de pe Acasă, 3 albume `demo-*` × 6 din `/proiecte`); `gallery` și `projectAlbums` sunt goale, deci ambele afișează starea „Portofoliul este în pregătire”. Tile-ul din galerie cu vizualul hero a fost scos odată cu galeria; vizualul rămâne în hero până la o fotografie reală. Originalele primite se păstrează în `docs/assets/originale/` (logo-ul mutat din rădăcina proiectului), nu în `public/` — detalii în `docs/assets/README.md`.
- **Verificări:** type-check, lint (avertismentul preexistent), Vitest 40/40, build — PASS. Aspectul — NU verificat în browser.

## 2026-09-26 — S28 — Logo-ul firmei; fonturile Saira + Inter

- **Scop / clasificare:** SMALL — la cererea utilizatorului.
- **Implementare:** logo-ul primit (`logo.PNG`) înlocuiește denumirea în text din header și footer (`Brand`). Varianta web `public/images/logo-inverse.png` (854×240): fundal alb eliminat (transparent, margini netede), „M”-ul din casă păstrat alb, textul „MERIDIAN TRANSCONSTRUCT” recolorat în alb (header și footer sunt închise; emblema rămâne albastră), decupat la conținut; afișat la 48 px înălțime pe telefon, 56 px de la 768 px. Fișierul are nume nou față de prima variantă, ca browserul și optimizatorul de imagini să nu servească varianta veche din cache.
- **Fonturi (decizia utilizatorului):** două familii — Saira (titluri h1–h4, `.eyebrow`, `.kicker`, meniu, butoane) și Inter (restul). Fontul din logo nu e Montserrat, ci unul pătrățos de tip Eurostile; Saira e varianta lizibilă apropiată ca formă.
- **Verificări:** type-check, lint (avertismentul preexistent), Vitest 40/40, build — PASS. Aspectul — NU verificat în browser.

## 2026-09-26 — S27 — Domeniul confirmat, sediul în footer, textele aprobate

- **Scop / clasificare:** SMALL — decizii ale utilizatorului.
- **Decizii (utilizator):** domeniul este `meridian-transconstruct.ro` (cu cratimă); adresa sediului se publică și în footer; textele redactate de agent sunt aprobate (A-004, A-005, A-007, A-008, A-010 închise). Urmează: utilizatorul trimite fotografiile și cumpără domeniul; configurarea de lansare se face împreună.
- **Implementare:** e-mailul de pe site `office@meridian-transconstruct.ro`; în footer, sub denumire · CUI · nr. registru, „Sediul: Mun. Petroșani, Jud. Hunedoara” (varianta scurtă, cerută de utilizator; adresa completă rămâne în paginile legale).
- **Verificări:** type-check, lint (avertismentul preexistent), Vitest 40/40, build — PASS. Aspectul — NU verificat în browser.

## 2026-09-26 — S26 — Footer pe 3 coloane

- **Scop / clasificare:** SMALL — la cererea utilizatorului.
- **Implementare:** footer pe 3 coloane de la 1024 px, cu titluri vizibile „Contact” și „Informații legale” (text mic, majuscule, portocaliu); coloana de contact mai mică (text 16 px, iconițe 16 px, rânduri de 36 px) (2 pe tabletă, una pe telefon): denumirea + fraza de prezentare + copyright; datele de contact una sub alta; Politica de confidențialitate, Termeni și condiții și pictogramele ANPC una sub alta, mai înguste (190 px, erau 250). O încercare de a pune „Să discutăm proiectul” pe un rând a fost anulată la cererea utilizatorului — secțiunea rămâne centrată.
- **Verificări:** type-check, lint (avertismentul preexistent), Vitest 40/40, build — PASS. Aspectul — NU verificat în browser.

## 2026-09-26 — S25 — Container 1600 px

- **Scop / clasificare:** SMALL — la cererea utilizatorului.
- **Implementare:** `.wrap` maximum 1600 px (era 1680; încercate 1500 și 1550, utilizatorul a ales 1600); `sizes` din galerie ajustat (940 / 680 px).
- **Verificări:** type-check, lint, Vitest, build — PASS. Aspectul — NU verificat în browser.

## 2026-09-26 — S24 — „Lucrări realizate” pe Acasă; paginile legale complete

- **Scop / clasificare:** NORMAL — conținut legal și UI, la cererea utilizatorului.
- **Implementare:**
  - Secțiunea 02 și pagina `/proiecte` se numesc „Lucrări realizate”, ca în meniu; în dreapta titlului: „Câteva dintre lucrările noastre: …”.
  - Politica de confidențialitate și Termenii și condițiile, cu text complet (`src/content/legal.ts`, afișat de `LegalDocumentPage`); `LegalPending` eliminat. Textul descrie ce face site-ul în realitate (verificat în cod: formularul trimite doar nume/firmă, e-mail, telefon opțional, mesaj, ca e-mail text simplu, fără stocare; IP doar în memorie pentru limitarea de 5 cereri/oră; fără cookie-uri proprii) și furnizorii deciși pentru lansare. Adresa sediului publicată în paginile legale (decizia utilizatorului); `company.registeredOffice`.
  - Paginile legale nu mai au `noindex` propriu; urmează setarea generală a site-ului (A-006).
- **Verificări:** type-check, lint (avertismentul preexistent), Vitest 40/40, build — PASS. Server temporar: ambele pagini 200, titluri, secțiuni și adresa în HTML; titlul și textul noi ale secțiunii 02 pe Acasă. Aspectul — NU verificat în browser. Textele juridice — NU validate de un jurist.

## 2026-09-26 — S23 — Bară de progres la navigare; Contact: umbră și aliniere

- **Scop / clasificare:** SMALL — la cererea utilizatorului (varianta 1 din ideile de efecte).
- **Implementare:** `NavigationProgress` (client, în layout): bară portocalie de 3 px sus, pornită la clic pe un link intern spre altă pagină (nu la ancore pe aceeași pagină, clic cu modificatori, `target` extern sau „Acasă” pe Acasă) și încheiată la schimbarea adresei; plasă de siguranță 10 s. Fără dependențe noi (`useLinkStatus` din Next e doar per link — verificat în documentație). Contact: containerul are o umbră moale mai vizibilă; telefoanele și e-mailul încep cu un rând mai jos decât titlul.
- **Verificări:** type-check, lint (avertismentul preexistent din `.remember/`), Vitest 40/40, build — PASS. Bara și aspectul — NU verificate în browser.

## 2026-09-26 — S22 — Contact direct compact; tranziția copertei scoasă

- **Scop / clasificare:** SMALL — la cererea utilizatorului.
- **Implementare:** „Contact direct” fără zonă (locație), elemente mai mici (titlu 26 px, telefoane 18 px, iconițe 32 px, spațieri reduse). Tranziția cu element comun din S21 scoasă complet (nu i-a plăcut utilizatorului; a raportat și o pâlpâire a imaginilor pe „Lucrări realizate”, necorelată încă cu o cauză — de urmărit după scoaterea efectului).
- **Verificări:** type-check, lint (avertismentul preexistent), Vitest 40/40, build — PASS. Aspectul — NU verificat în browser.

## 2026-09-26 — S21 — Tranziție cu element comun: coperta albumului

- **Scop / clasificare:** SMALL/NORMAL — efect de navigare cerut de utilizator („shared element transition”).
- **Implementare:** coperta fiecărui album din `/proiecte` și prima imagine din pagina albumului poartă același `<ViewTransition name="album-<slug>">` (React 19.3; în Next 16 nu e nevoie de configurare — verificat în documentație). La navigare, imaginea își schimbă lin poziția și mărimea (550 ms, decupată, nu deformată), iar la întoarcere invers; restul paginii se schimbă instant (fade-ul general a fost respins în S20). `Gallery` primește opțional `firstTransitionName`. Alte locuri nu au un element comun real între pagini, deci nu au efectul.
- **Verificări:** type-check, lint (avertismentul preexistent), Vitest 40/40, build — PASS. Animația în sine — NU verificată în browser (necesită Chromium 125+ / Safari / Firefox recente).

## 2026-09-26 — S20 — Panouri de servicii mai bogate, Contact într-un container, poze demonstrative

- **Scop / clasificare:** NORMAL — UI și conținut, la cererea utilizatorului.
- **Implementare:**
  - Servicii: efect de deschidere nou (bară portocalie pe margine, numărul se umple, umbră, înălțime animată, conținut care intră pe rând) și două blocuri noi per serviciu, „Ce executăm” (4 lucrări) și „Pentru cine” — redactate după exemple de firme de construcții similare (căutare web), fără cifre, instalații, proiectare sau autorizații (A-010).
  - Spre footer: fără tranziție (nici fâșie, nici înclinare) pe toate paginile.
  - Contact: un singur container, o coloană (maximum 960 px) — formularul sus, contactul direct dedesubt (precizarea utilizatorului); telefoane 22 px (erau 28).
  - Poze demonstrative Unsplash (doar gratuite, fără Unsplash+), marcate „Ilustrativ”: cele 5 lipsă din galeria de pe Acasă și 3 albume × 6 poze pe `/proiecte`; 4 poze nepotrivite înlocuite după o verificare vizuală a planșei. Sursele: docs/assets/README.md. De șters înainte de lansare (B-020).
  - Efectul de navigare între pagini scos (nu i-a plăcut utilizatorului).
  - Dunga deschisă sub footer pe paginile scurte: corpul paginii are minimum înălțimea ecranului, iar `main` se întinde (`flex-1`).
  - Meniu: întâi secțiunile de pe Acasă, apoi paginile — Acasă · Ce construim · Despre firmă · Lucrări realizate · Contact.
- **Verificări:** type-check, lint (avertismentul preexistent din `.remember/`), Vitest 40/40 (testul albumelor verifică și fișierele noi), build — PASS. Aspectul, efectele și pozele în pagină — verificate static, NU în browser.

## 2026-09-26 — S19 — Tranziții oblice înapoi, servicii ca panouri, meniu redenumit, e-mail pe domeniu

- **Scop / clasificare:** NORMAL — UI, navigare și conținut, la cererea utilizatorului.
- **Implementare:**
  - Tranzițiile revin la marginea oblică cu fâșie portocalie din S13 (`section-edge.tsx` readus din commitul 0285b81); zidul de cărămidă eliminat. Corectat după captura utilizatorului: linia deschisă la culoare de sub diagonală (suprapunere de 1 px, `-mb-px`) și fără fâșie portocalie spre footer.
  - Paginile `/servicii` și `/servicii/[id]` din S18 șterse (plus conținutul lor și intrările din sitemap). Serviciile de pe Acasă: aceleași texte, întregi, ca panouri `<details>` care se deschid și se închid la clic; plachetele din hero duc la ancora serviciului și îi deschid panoul (`OpenOnAnchor`, și la clic repetat).
  - Efect la navigarea între pagini: `app/template.tsx` + animația `page-in` (verificat în documentație: template-ul se remontează la fiecare navigare).
  - Denumirea firmei din header/footer, apăsată pe Acasă, urcă în capul paginii ca „Acasă” (`HomeLink`, logică comună).
  - Meniu: Acasă · Ce construim · Lucrări realizate · Despre firmă · Contact (varianta aleasă de utilizator). Meniul complet de la 1280 px (sub, meniul compact): cu textul de 21 px și denumirile noi nu încape lângă logo și CTA la 1024 px (estimare, nemăsurată în browser).
  - Titlul din tab pe Acasă: „Meridian Transconstruct — Firmă de construcții în Petroșani și Valea Jiului”.
  - E-mailul afișat: `office@meridiantransconstruct.ro` (redirecționare spre Yahoo prin Cloudflare Email Routing, de configurat după domeniu — B-009).
- **Verificări:** type-check, lint (avertismentul preexistent din `.remember/`), Vitest 40/40, build — PASS. Server de producție temporar: `/` 200, `/servicii` și `/servicii/renovari` 404, 5 panouri și 5 ancore din hero, meniul cu noile denumiri, tranziția și animația de pagină prezente în HTML. Aspectul, animațiile, panourile și clicurile — verificate static, NU în browser.
- **De confirmat:** domeniul — cu sau fără cratimă (B-009).

## 2026-09-26 — S18 — Lățime 1680, font +2, WhatsApp, hero nou, paginile Servicii și Proiecte

- **Scop / clasificare:** NORMAL — mai multe ajustări de UI cerute de utilizator + o rută nouă (`/proiecte`).
- **Implementare:**
  - Container `.wrap` 1680 px; `sizes` din galerie ajustat (980 / 700 px). Butoanele (`.button`) mai mici: 48 px, text 15→17 px după creșterea generală a fontului.
  - Toate dimensiunile de text +2 px: corp 18 px, titluri, clase proprii și utilitarele Tailwind `text-xs…2xl` redefinite în `@theme`; logo-ul neschimbat.
  - Zidul de cărămidă mai mic: cărămizi 50 × 14, înălțime 20 / 28 px.
  - Buton WhatsApp flotant, jos-dreapta, pe toate paginile (`wa.me/40726379408`, numărul ales de utilizator), deasupra barei „Sună” pe mobil.
  - Footer mai puțin înalt (spațieri reduse). Panoul de contact și titlul „Despre firmă” nu mai coboară la scroll (fără `sticky`); panoul de contact păstrat (decizia utilizatorului).
  - `/proiecte` (lista albumelor) și `/proiecte/[slug]` (galeria unei lucrări, aceeași componentă ca pe Acasă); `projectAlbums` e gol → stare „în pregătire”, fără albume ilustrative (decizia utilizatorului). Meniul „Proiecte” duce la pagină; linkul „Vezi toate proiectele” sub galeria de pe Acasă; sitemap cu albumele.
  - „Acasă” apăsat pe Acasă urcă în capul paginii și scoate ancora din adresă.
  - Hero (varianta aleasă de utilizator dintre 3): pe aproape tot ecranul, titlu mai mare, iar jos cele 5 servicii ca plachete (număr, iconiță, titlu) spre paginile lor.
  - `/servicii` (5 carduri numerotate cu etichete) și `/servicii/[id]` (descriere, card lateral „Cere o ofertă” cu telefoane + WhatsApp în locul prețului, „Ce include”, „Cum lucrăm” în 4 etape, „Alte servicii”) — după conceptul ACL, fără prețuri și fără FAQ (decizia utilizatorului: răspunsurile vin de la firmă). Textele serviciilor sunt cele existente; etapele „Cum lucrăm” reiau doar afirmații din brief (A-009). Meniul „Servicii” duce la pagină; sitemap cu cele 5 servicii. Iconițele serviciilor: `ServiceIcon` (hero + index).
  - Consolă: `data-scroll-behavior="smooth"` pe `<html>` (Next 16, verificat în documentație); avertismentul „useInsertionEffect must not schedule updates” — cauza verificată în sursa Next (`HistoryUpdater` apelează `pushState`/`replaceState` în `useInsertionEffect`, iar `currententrychange` e sincron): actualizarea meniului e amânată cu `queueMicrotask`.
- **Verificări:** type-check, lint (singurul avertisment e într-un fișier temporar `.remember/`, preexistent), Vitest 40/40 (2 teste noi pentru albume), build — PASS. Server de producție temporar: cu un album de probă (scos apoi), `/proiecte` și albumul 200, slug inexistent 404, sitemap cu albumul; `/servicii` și cele 5 pagini 200, slug inexistent 404, hero cu cele 5 linkuri, meniul marcat pe pagina curentă, WhatsApp prezent, sitemap cu 9 adrese. Aspectul (hero, font mărit, meniul la 1024 px, zid, footer, WhatsApp, paginile noi) și clicul pe „Acasă” — verificate static, NU în browser.
- **De decis:** secțiunea „Servicii” de pe Acasă repetă textele complete ale paginilor de servicii — de scurtat sau legat spre pagini (întrebare către utilizator).

## 2026-09-26 — S17 — Site mai lat

- **Scop / clasificare:** SMALL — cerința utilizatorului „site-ul mai wide”.
- **Implementare:** containerul comun `.wrap` (`src/app/globals.css`) trece de la maximum 1200 px la 1440 px; marginile laterale rămân 16 px pe mobil și 32 px de la 768 px. Toate secțiunile, header-ul și footer-ul folosesc `.wrap`, deci se lărgesc împreună; blocurile îngustate intenționat (textele, apelul de contact, paginile legale) își păstrează `max-w`. `sizes` din galerie ajustat la noile lățimi ale tile-urilor (840 / 600 px), ca imaginile să nu fie încărcate prea mici.
- **Verificări:** type-check, lint, Vitest 38/38, build — PASS. Verificat static; aspectul pe ecrane late nu a fost văzut în browser (nu s-a cerut).
- **Documentare:** DESIGN (containerul).
- **Decizii de lansare (utilizator):**
  - De cumpărat: **domeniul** (apoi pus pe **Cloudflare** — DNS, proxy, SSL) și **VPS-ul** (B-010, B-002).
  - Formularul trimite prin **Maileroo**, ca la Filadelfia (verificat în acel proiect: `maileroo-sdk`, domeniu verificat cu SPF/DKIM/DMARC prin DNS-ul Cloudflare). Resend (folosit la ACL) exclus: planul gratuit are deja un domeniu ocupat (B-007).
  - Adresa Yahoo nu mai apare pe site: o adresă pe domeniu, redirecționată prin **Cloudflare Email Routing** către inboxul real (B-009). Email Routing doar primește; trimiterea rămâne pe Maileroo.
  - Nimic implementat în cod încă — toate depind de domeniu.

## 2026-09-25 — S16 — Închiderea zilei: documentație și punct de reluare

- **Scop / clasificare:** SMALL — doar documentație, la cererea utilizatorului („închidem aici”).
- **Activități:** secțiunea „De unde reluăm” în BACKLOG (pornire locală, revizie și decizii, materiale de primit, implementări următoare, deploy); README (stadiu), PROJECT_BRIEF (următorul pas), ARCHITECTURE (dependența `lucide-react`), SITE_STRUCTURE (cinci servicii, rândul „Hale industriale” în propunerea de pagini).
- **Rezumatul zilei (S01–S15):** documentația Codex adusă în repo; CI + Dependabot; aplicația Next.js (Acasă, Contact, formular SMTP securizat și testat); fără E2E (decizia utilizatorului); SEO tehnic, indexare controlată, favicon/iconițe; iterații de UI cerute de utilizator (hero fără localități, header lipit, servicii reordonate + hale, galerie „bento”, „Despre firmă” rescrisă, footer și Contact noi, tranziții „zid de cărămidă”, ANPC).
- **Verificări:** fără cod modificat; linkuri Markdown locale verificate. Ultima verificare de cod (S15): type-check, lint, Vitest 38/38, build — PASS; CI verde.
- **Următorul pas:** utilizatorul aduce modificările local (`git pull origin main` + `npm ci`) și continuă de la „De unde reluăm” din BACKLOG.

## 2026-09-25 — S15 — Pictograme ANPC și favicon.ico

- **Scop / clasificare:** SMALL.
- **ANPC:** pictogramele SAL și SOL din snippet-ul utilizatorului, 250 × 50 px, cu `rel="nofollow noopener noreferrer"`. Descărcarea de pe `wpfitness.eu` e blocată de proxy-ul mediului, deci imaginile se încarcă deocamdată de la adresele date de utilizator; dacă există `public/images/anpc/sal.png` / `sol.png`, se folosesc cele locale (recomandat, B-021).
- **Favicon:** `src/app/favicon.ico` (16/32/48 px) generat din monograma „M” existentă (redimensionată cu `sharp`); se adaugă iconițelor PNG din S10.
- **Verificări:** type-check, lint, Vitest 38/38, build — PASS. `/favicon.ico` răspunde 200 `image/x-icon` și apare în `<head>`; markup-ul pictogramelor verificat în HTML. Imaginile ANPC nu au putut fi văzute randat din mediul agentului (domeniu blocat).
- **Documentare:** BACKLOG (B-018, B-021), README.

## 2026-09-25 — S14 — Tranziții „zid de cărămidă”, „Despre firmă” cu experiență, footer corectat

- **Scop / clasificare:** SMALL/NORMAL — UI și conținut, la cererea utilizatorului.
- **Implementare:**
  - Tranziții: oblicele cu dungă portocalie (S13), respinse, înlocuite cu un zid de cărămidă „în lucru” (cerut: „ceva legat de construcții”). Prima variantă avea rosturi orizontale care formau linii pe toată lățimea — refăcut fără rosturi orizontale, doar cărămizi în trepte, cele de sus sprijinite.
  - „Despre firmă”: introducere cu anii de experiență și „lucrul bine făcut”; bloc „Ce ne recomandă” cu 4 puncte și iconițe. Anii se calculează la build din data înființării (`src/lib/experience.ts`: ani împliniți + acordul „ani / de ani”), ca textul să nu rămână vechi.
  - Footer: denumirea și fraza de prezentare revin una sub alta; pe un rând rămân doar datele de contact.
- **Verificări:** type-check, lint, Vitest 38/38 (3 teste noi pentru experiență), build — PASS. Capturi desktop și mobil pentru hero, tranziția spre galerie, „Despre firmă” și footer; fără overflow orizontal.
- **Documentare:** DESIGN, SITE_STRUCTURE, CLAUDE.md, BACKLOG (A-008).

## 2026-09-25 — S13 — Tranziții oblice, „Despre firmă” rescrisă, footer și Contact noi

- **Scop / clasificare:** NORMAL — UI și conținut, cerute de utilizator.
- **Implementare:**
  - Tranziții: `SectionEdge` — margine oblică în culoarea secțiunii următoare + fâșie portocalie, pantă alternantă; eliminate liniile orizontale (între servicii, deasupra principiilor, în footer). Numerele serviciilor devin mari, conturate în portocaliu.
  - „Despre firmă”: titlu și text noi, doar din fapte confirmate; eliminat rândul cu localitatea; „Viziunea noastră” și cele trei principii păstrate.
  - Footer închis: doar contact, pe un rând, cu iconițe `lucide-react` (dependență nouă, aceeași ca în celelalte proiecte ale utilizatorului); regiunea o singură dată; Politica de confidențialitate, Termeni și condiții, butoane ANPC SAL/SOL (imagine oficială dacă există fișierul, altfel text). Corectat „S.R.L..”.
  - Contact: formularul principal; panou închis cu telefoane mari, e-mail și zonă, lipit la scroll pe desktop; pe telefon formularul primul.
  - Pagini `/confidentialitate` și `/termeni-si-conditii` cu mesaj „în pregătire”, `noindex`, fără text juridic nevalidat.
- **Verificări:** type-check, lint, Vitest 35/35, build — PASS. Capturi complete desktop și mobil (Acasă, Contact, Confidențialitate), fără overflow orizontal. Galeria verificată cu scroll real de mouse (toate tile-urile apar); o primă verificare cu `scrollTo` repetat + `scroll-behavior: smooth` dădea fals „ascuns” — problemă de test, nu de site.
- **De știut:** utilizatorul a cerut „ANCPI”; iconițele descrise sunt ale ANPC (SAL/SOL) — implementate pe acestea. Obligativitatea și starea platformei SOL sunt de verificat (B-021).
- **Documentare:** DESIGN, SITE_STRUCTURE, BACKLOG (B-012, B-021, A-008), CLAUDE.md.

## 2026-09-25 — S12 — Denumire, meniu, servicii reordonate + hale, galerie „bento”

- **Scop / clasificare:** NORMAL — mai multe modificări de UI și conținut cerute de utilizator (8 puncte).
- **Implementare:**
  - Denumire: „MERIDIAN” are exact lățimea lui „TRANSCONSTRUCT”, cu font mărit (34 px desktop / 28 px mobil) și literele distribuite; măsurat în browser: ambele rânduri între aceleași margini (120–305 px la 1440 px lățime, 16–169 px la 390 px).
  - Meniu: 19 px, hover cu fundal portocaliu discret, text portocaliu, subliniere din centru.
  - Servicii: ordinea cerută (civile, clădiri, renovări, case) + serviciul nou „Hale industriale” la 05 (text de confirmat, A-007); titlul secțiunii „De la hale industriale la case la cheie.” și introducere nouă, factuale. Actualizate descrierile pentru Google, manifestul și textul despre firmă.
  - CTA: verificat că „Cere o ofertă” și toate linkurile din servicii duc la `/contact`, iar „Vezi proiectele” la galeria `#proiecte` (erau deja așa).
  - Galerie „Proiecte realizate”: layout „bento”, intrare la scroll (fără state React; atribut DOM), hover (zoom, gradient, legendă, buton de mărire), dialog pe tot ecranul (săgeți, ←/→, Esc, clic în afară, focus returnat, scroll blocat). Imagini ilustrative marcate „Ilustrativ”; fișierele lipsă apar ca blocuri „Fotografie în curând” (verificare la build).
- **Imagini:** mediul de lucru nu are generator de imagini, iar sursele externe (Unsplash, Pexels, Wikimedia) sunt blocate de proxy. Hero-ul rămâne pe conceptul existent; singura imagine din galerie deocamdată este același concept (tile „Construcții civile”). Prompturile și numele fișierelor pentru hero cu blocuri și cele 5 imagini de galerie: docs/assets/README.md (B-020).
- **Verificări:** type-check, lint, Vitest 35/35, build — PASS. În browser (playwright-core instalat doar în folderul temporar, nu în proiect): lățimi denumire, hover meniu, galerie desktop și mobil, dialog deschis/închis cu Esc și focus returnat, toate tile-urile vizibile după scroll pe mobil, fără overflow orizontal pe mobil.
- **Documentare:** SITE_STRUCTURE, DESIGN, PROJECT_BRIEF, BACKLOG (A-007, B-005, B-020), CLAUDE.md, docs/assets/README.md.
- **Următorul pas:** utilizatorul continuă cu secțiunea 03 (Firma); imaginile generate după prompturi.

## 2026-09-25 — S11 — Fără fâșia de sub hero; header lipit, semi-transparent la scroll

- **Scop / clasificare:** SMALL — UI, la cererea utilizatorului.
- **Implementare:** eliminată fâșia „Din 2019 / Valea Jiului / Lucrări cu contract” de sub hero (componenta și datele `facts`). Header lipit sus (`HeaderShell`, componentă client): după 8 px de scroll fundalul trece la albastru închis ~75% cu `backdrop-blur`; nu complet transparent, ca textul alb al meniului să rămână lizibil peste secțiunile deschise. `scroll-padding-top` mărit la 112 px ca ancorele să nu ajungă sub header.
- **Verificări:** type-check, lint, Vitest 35/35, build — PASS. Capturi Chromium headless: starea inițială (1440 px) și starea după scroll (1440 și 500 px) — header lizibil, conținutul trece estompat pe sub el.
- **Documentare:** SITE_STRUCTURE (ordinea secțiunilor), DESIGN (header).

## 2026-09-25 — S10 — Indexare, metadate pentru tab-uri și date structurate

- **Scop / clasificare:** SMALL — metadate și fișiere de indexare; fără schimbări de logică a formularului. Cerut de utilizator: sitemap, robots, ce mai trebuie pentru indexare și metadatele pentru tab-urile din browser.
- **Existente din S06:** `sitemap.xml`, `robots.txt`, titluri și canonical.
- **Adăugat:** `src/lib/seo.ts` (metadate complete per pagină: descriere, canonical, Open Graph cu URL, Twitter card); titlul Acasă „Firmă de construcții în Petroșani și Valea Jiului” (permis doar în metadate, S09) mutat în `src/content/home.ts`; iconițe generate la build (`icon` 32/192/512 px, `apple-icon` 180 px) cu monogramă provizorie „M”; `manifest.webmanifest`; JSON-LD `GeneralContractor` pe Acasă, doar cu date vizibile, fără adresă; `googleBot` cu `max-image-preview: large` când indexarea e pornită; verificare Search Console prin `GOOGLE_SITE_VERIFICATION`; sitemap aliniat la forma URL-ului canonic; 404 fără etichete robots contradictorii.
- **Verificări:** type-check, lint, Vitest 35/35, build — PASS. Pe serverul local: `<head>` pentru `/` și `/contact` (titlu, descriere, canonical, OG, Twitter, iconițe, manifest), JSON-LD pe Acasă, iconițe și manifest răspund 200 cu tipurile corecte. Build separat cu `ALLOW_INDEXING=true` și un cod de test: `robots.txt` permite indexarea (fără `/api/`) și indică sitemap-ul, paginile au `index, follow` + `googlebot`, eticheta de verificare apare; 404 rămâne `noindex`. Build-ul final e cu setările implicite (indexare oprită).
- **Limite:** schema.org și documentația Google au fost blocate de proxy-ul de rețea al mediului, deci tipul `GeneralContractor` și eligibilitatea pentru rezultate îmbogățite nu au fost reverificate online — de făcut cu Rich Results Test la lansare. Grosimea 700 nu se aplică în iconiță (fontul implicit al generatorului); acceptabil pentru varianta provizorie.
- **Documentare:** README (secțiunea „Indexare și SEO tehnic” cu pașii de lansare; variabile citite la build), ARCHITECTURE, BACKLOG (B-018, B-019), CLAUDE.md (capcane metadate), `.env.example`.

## 2026-09-25 — S09 — Hero nou, fără localități pe pagini; analiză SEO

- **Scop / clasificare:** SMALL — conținut; fără schimbări de logică.
- **Decizii ale utilizatorului:** titlul hero „O construcție bună / începe cu o înțelegere clară.” (ales dintre variante; cele generice au fost respinse); pe pagini nu apar nume de localități, doar „Valea Jiului” și „județul Hunedoara”; „Petroșani” rămâne permis în titlul și descrierea pentru Google.
- **Implementare:** `src/content/home.ts` (eticheta și titlul hero, textul de sub titlu cu regiunea, faptul „Valea Jiului”, secțiunea despre firmă fără lista de localități, textul din footer), `company.region` nou, folosit în footer și pe Contact în locul localității. Metadatele (titlu, descriere) păstrează „Petroșani”.
- **Verificări:** type-check, lint, Vitest 35/35, build — PASS. HTML-ul generat pentru `/`, `/contact` și 404: zero apariții ale celor 6 localități în conținutul vizibil; „Petroșani” doar în `<head>`. Capturi hero la 1440 px și 500 px verificate vizual (la 375 px, Chromium headless nu reduce fereastra sub ~500 px, deci captura nu era concludentă; layout-ul de mobil nu s-a schimbat, doar textul).
- **Documentare:** decizia în PROJECT_BRIEF, SITE_STRUCTURE și CLAUDE.md (regulă de conținut); BACKLOG: prioritate SEO la B-003 și B-011, noi B-018 (favicon + imagine OG) și B-019 (date structurate).
- **Următorul pas:** Google Business Profile cu zonele de serviciu; pagini dedicate de servicii și proiecte cu conținut real; logo și fotografii.

## 2026-09-25 — S08 — Eliminarea testelor E2E

- **Scop / clasificare:** SMALL — la cererea utilizatorului, site-ul nu are teste E2E.
- **Activități:** șterse `e2e/` și `playwright.config.ts`; eliminate dependența `@playwright/test` și scriptul `npm run e2e`; curățate `.gitignore`, `eslint.config.mjs` și comentariul din `vitest.config.mts`. Actualizate README, CLAUDE.md (regulă explicită: fără E2E), ARCHITECTURE; B-017 mutat la închise ca anulat. Eliminat și `docs/qa/check-preview.cjs` (verificarea Playwright a machetei HTML); capturile de referință din `docs/previews/` rămân.
- **Verificări:** type-check, lint, Vitest 35/35, `npm audit --audit-level=high` (0 vulnerabilități) și build — toate PASS.
- **Notă:** intrarea S06 descrie testele E2E rulate atunci; rămâne ca istoric.

## 2026-09-25 — S07 — CLAUDE.md și actualizarea documentației

- **Scop / clasificare:** SMALL — documentație, fără modificări de cod.
- **Activități:** creat [CLAUDE.md](CLAUDE.md) cu convențiile tehnice specifice (unde stă fiecare lucru, reguli de conținut și securitate, poarta de verificare înainte de commit, capcane cunoscute din S06); regulile de sesiune rămân în AGENTS.md, cu trimitere reciprocă. Indexat în README.
- **Actualizări de stare:** ARCHITECTURE (tabel „propus” → soluția implementată, secțiunea de securitate și verificare, ce lipsește din SEO: imagine Open Graph, date structurate); PROJECT_BRIEF (câmpurile formularului, structura cu două pagini, starea goală a portofoliului); DESIGN și SITE_STRUCTURE (meniu cu ancore, servicii cu link spre Contact, faptul „Lucrări cu contract”, formular implementat, secțiuni marcate implementat/propunere); AGENTS (formularul separă deja straturile); docs/assets/README (imaginea folosită și în aplicație).
- **Verificări:** 51 de linkuri Markdown locale — toate valide; verificare automată a afirmațiilor din documente față de cod (limitele și codurile HTTP ale contractului, honeypot, cheia de proxy, scripturile npm, versiunile, portul E2E, cele 12 variabile din `.env.example` folosite în cod, 24 de căi de fișiere menționate) — toate PASS. Fără teste de cod: nu s-a modificat cod.
- **Următorul pas:** neschimbat față de S06.

## 2026-09-25 — S06 — Scaffold Next.js, pagini și formular de contact

- **Scop / clasificare:** NORMAL (aplicație nouă pe mai multe straturi); formularul de contact tratat cu rigoare de securitate, fiind endpoint public care trimite e-mail. Utilizatorul a cerut explicit preluarea lucrului și continuarea implementării și a autorizat agentul să facă commit/push direct pe `main`.
- **Infrastructură repo:** `.gitignore` nu mai exclude documentația de lucru (urcată de utilizator); CI GitHub Actions (gitleaks, `npm ci`, audit high, type-check, lint, Vitest, build) și Dependabot lunar cu cooldown 30 de zile. Fluxul `dev` → PR → `main` înlocuit, la cererea utilizatorului, cu lucru direct pe `main`.
- **Implementare:** Next.js 16.3.6 App Router, React 19.3, TypeScript 6, Tailwind CSS 4, Nodemailer 10. Pagini: Acasă (hero, fapte, patru servicii, portofoliu, despre, CTA), Contact (telefoane, e-mail, formular), 404, `sitemap.xml`, `robots.txt`. Conținutul este în `src/content/`, separat de componente. Formular: handler HTTP → serviciu → adaptor SMTP; validare comună server/client; honeypot; limitare în memorie; contract în ARCHITECTURE. Headere de securitate de bază în `next.config.ts`.
- **Decizii:** structura urmează macheta finală din repo (două pagini), nu DESIGN/SITE_STRUCTURE din S04; portofoliu cu stare goală în loc de carduri placeholder; font Inter local; indexare oprită până la lansare. Toate sunt înregistrate ca `ASSUMED — needs ratification` (A-001…A-006 în BACKLOG). `output: "standalone"` a fost încercat și scos: `next start` nu îl suportă, iar modul de rulare pe OVHcloud se decide la deploy (B-002).
- **Verificări executate:** `tsc --noEmit` (inclusiv pe checkout curat, fără `next-env.d.ts`), ESLint, `npm audit --audit-level=high` (0 vulnerabilități), `next build` — toate PASS. Vitest: 35/35 PASS (validare, limitare, configurație, serviciu, handler HTTP cu transport fals). Playwright: 21/21 PASS pe build de producție — ambele pagini la 320/375/768/1024/1440 px (fără overflow, un H1, `lang="ro"`, fără telefon în header, buton telefonic pe mobil, fără erori JS sau cereri externe), navigare cu stare activă și închiderea meniului mobil, stări formular (erori pe câmpuri și focus, succes, eroare cu datele păstrate) cu API interceptat, 503 real fără SMTP, 404, robots, contrast AA al paletei.
- **Defect găsit și corectat în review:** după „Despre” → „Acasă” (sau clic pe logo), URL-ul devenea `/`, dar meniul rămânea marcat pe „Despre”, pentru că navigarea Next (`pushState`) nu emite `hashchange`. Reprodus manual în browser înainte de fix; corectat prin Navigation API (`currententrychange`) cu ramură de rezervă după clic; acoperit de două teste E2E (cu și fără Navigation API).
- **SMTP real, manual:** server SMTP local de test (aiosmtpd, cu autentificare) + `next start` configurat din mediu: cerere trimisă și primită cu expeditorul și destinatarul din configurație, Reply-To = vizitatorul, subiect/diacritice codate corect; a treia cerere cu limita 2 → 429 cu `Retry-After`. Parolă SMTP greșită → 500 fără detalii interne; logul conține doar codul erorii (`ETIMEDOUT` raportat de Nodemailer pe acel server de test), fără e-mail, mesaj sau parolă. Headerele de securitate verificate pe răspuns. Nu s-a trimis niciun e-mail către adrese reale.
- **Vizual:** capturi desktop 1440 px și mobil 375 px (Acasă, Contact, meniu mobil, erori formular) comparate cu `docs/previews/`; fără diferențe de structură față de machetă, în afara stării goale a portofoliului (A-002).
- **Mediu:** npm 10.9 eșuează la instalarea vitest / `@playwright/test` (`edgesOut`, bug npm pe peer dependencies); lockfile generat cu npm 11.20. Chromium din container (1194) diferă de cel cerut de Playwright 1.63; E2E rulat cu `PLAYWRIGHT_CHROMIUM_EXECUTABLE`.
- **Omis, cu motiv:** E2E nu rulează în CI (B-017); fără test pe telefon fizic; fără Lighthouse/măsurători de performanță (conținutul și imaginile reale lipsesc); CSP/HSTS la deploy (B-015).
- **Documentare:** actualizat README (comenzi, structură, variabile de mediu), ARCHITECTURE (stare, versiuni, contract API), BACKLOG (B-003, B-007, B-014–B-017, A-001…A-006), PROJECT_BRIEF, AGENTS (regula Git), DESIGN și SITE_STRUCTURE (aliniere la macheta finală).
- **Următorul pas:** ratificarea A-001…A-006; logo, fotografii și inventarul de proiecte; furnizor SMTP și serviciul OVHcloud pentru deploy.

## 2026-09-25 — S05 — Machetă redusă la două pagini (consemnat retrospectiv)

Consemnat în S06 pe baza fișierelor urcate; detaliile sesiunii nu sunt cunoscute și nu sunt reconstituite.

- Macheta din repo are doar `home-preview.html` și `contact.html`; `docs/qa/check-preview.cjs` verifică explicit că `servicii.html`, `proiecte.html` și `despre.html` nu mai există și că Servicii / Proiecte / Despre sunt secțiuni ancorate pe Acasă.
- Tot scriptul verifică: butoane în formă de capsulă, linkuri de meniu de minimum 18 px cu stări hover/focus, CTA centrat, patru coloane în footer, respectarea `prefers-reduced-motion`. Capturile din `docs/previews/` corespund acestei variante.
- DESIGN, SITE_STRUCTURE și intrarea S04 descriau încă varianta cu cinci pagini; au fost aliniate în S06.

## 2026-09-25 — S04 — Revizie vizuală și pagini individuale

- **Scop / clasificare:** NORMAL — actualizarea machetei și a navigării după feedback, fără backend sau scaffold Next.js.
- **Decizii:** albastru închis în locul verdelui/antracitului, imagine pe fundalul hero-ului, fără telefon în header; serviciul 03 este Construcții civile (confirmat explicit prin clarificare). Secțiunea despre firmă rămâne; Contact de pe Acasă devine un CTA scurt.
- **Implementare:** cinci pagini HTML legate prin meniu (Acasă, Servicii, Proiecte, Despre, Contact), CSS comun, stare activă a navigării și formular de Contact demonstrativ/dezactivat.
- **Media:** generat un concept prin image_gen, salvat în docs/assets împreună cu promptul/proveniența. Versiune WebP 1672 × 941, aproximativ 155 KiB; conceptul este etichetat și nu este folosit în portofoliu. Fotografia reală rămâne de primit.
- **Verificări:** Playwright/Chromium — toate cele 5 pagini la 320, 375, 768, 1024 și 1440 px; navigare reală între pagini, meniu din tastatură, imagine încărcată, fără telefon în header, contacte corecte, CTA către Contact, formular dezactivat și lipsă overflow. Fără erori JS sau cereri către servicii externe. Contrastul textelor pe suprafețele simple: minimum 5,74:1. Capturi desktop/mobil inspectate vizual, inclusiv Contact.
- **Corectarea testului:** verificarea stării active a meniului închis folosește textContent; innerText/locatorul accesibil implicit nu expune textul ascuns. Navigarea propriu-zisă se verifică separat, cu meniul deschis din tastatură. Rularea finală a trecut.
- **Documentare:** actualizat brief, README, backlog, structură și design. Verificate 9 documente UTF-8 și 42 de linkuri locale, toate valide; toate cele cinci pagini, CSS-ul și imaginea răspund HTTP 200 în preview-ul local.
- **Review final:** trecere separată read-only peste pagini, navigare, stări, asset și documentele afectate; fără defecte blocante identificate în scopul reviziei. UI-UX-REVIEW: PASS pentru machetă.
- **Limite:** fără teste unit de business, integrare SMTP sau build Next.js — aplicația nu este încă implementată. Nu s-au inițiat apeluri sau e-mailuri. Fără schimbări de schemă sau dependențe runtime instalate în proiect.
- **Următorul pas:** feedback pe această revizie; apoi implementarea aprobată în Next.js. Materialele reale și textele finale rămân necesare pentru lansare.

## 2026-09-25 — S03 — Structură și machetă Acasă

- **Scop / clasificare:** NORMAL pentru structura și UX-ul site-ului; livrabil limitat la propunere/documentație și machetă de prezentare, fără aplicație sau backend.
- **Activități:** creat SITE_STRUCTURE cu sitemap, patru categorii de servicii, pagină proiect, formular de patru câmpuri, SEO și cerințe legale documentate din surse oficiale; creat DESIGN cu token-uri, responsive, accesibilitate și stări.
- **Machetă:** HTML autonom pentru Acasă, paletă antracit/alb cald/portocaliu, navigare pe secțiuni și contact. Fotografiile/logo-ul sunt marcate ca lipsă; nu s-au inventat lucrări. Preview local pe 127.0.0.1:4173, fără publicare externă.
- **Verificări executate:** Playwright/Chromium la 320, 375, 768, 1024 și 1440 px — fără overflow; ancore valide; CTA către Contact; meniu mobil activat din tastatură; contactele și linkul telefonic persistent verificate; fără erori JS sau cereri externe. Script: docs/qa/check-preview.cjs.
- **Contrast:** perechile de text principale au minimum 5,78:1; CTA 7,78:1. Capturi desktop/mobil generate și inspectate vizual. Verificare locală HTTP: 200.
- **Review:** trecere separată read-only peste structură, specificații și machetă; fără defecte blocante identificate în scopul machetei. UI-UX-REVIEW: PASS pentru prototip, nu pentru aplicația finală.
- **Limite:** fără teste unit de business, integrare SMTP, lint/type-check/build Next.js — nu există încă logică de aplicație sau dependențe instalate. Interacțiunile machetei au fost testate real în browser; nu pe telefon fizic. Nu s-au trimis e-mailuri sau inițiat apeluri. Nu există migrare de schemă.
- **Documentare:** actualizat README, brief și backlog; verificate 8 documente UTF-8 și 35 de linkuri locale, toate valide. Macheta are aproximativ 14 KB, fără resurse externe. Context7 nu este expus în instrumentele sesiunii; folosite surse oficiale.
- **Deschis:** aprobarea structurii și a direcției vizuale, confirmarea telefonului principal, primirea logo-ului și a fotografiilor. Următorul increment după aprobare: scaffold și layout Next.js.

## 2026-09-25 — S02 — Confirmarea stack-ului și găzduirii

- **Scop / clasificare:** SMALL, actualizarea deciziilor în documentație, fără cod de aplicație.
- **Decizie:** stack Next.js + React + TypeScript + Tailwind CSS, formular SMTP și găzduire OVHcloud confirmate. Utilizatorul a cerut alegerea/configurarea serverului după finalizarea site-ului local.
- **Activități:** sincronizat README, brief, arhitectură și backlog; închis B-001. Păstrat istoricul S01, care reflectă starea anterioară aprobării.
- **Verificări:** PASS — 6 documente UTF-8, 21 de linkuri locale valide, fără stări vechi de aprobare în documentele curente. Fără teste noi/build: modificări exclusiv de documentație; fără impact de runtime, performanță sau schemă.
- **Deschis:** configurația OVHcloud și serviciul SMTP pentru lansare; sitemap și design ca pas imediat. Nu s-a provisionat serverul și nu s-a pornit scaffold-ul.

## 2026-09-25 — S01 — Documentația de bază

### Scop și clasificare

SMALL: organizarea documentației și stabilirea regulilor de continuitate; fără cod de aplicație.

### Activități

- Creat README cu stadiul real și indexul documentației.
- Creat ARCHITECTURE cu propunerea tehnică, alternativele evaluate, responsabilitățile, cerințele formularului și verificările planificate.
- Creat BACKLOG cu dependențe, pași rămași și idei opționale distincte.
- Creat AGENTS cu regulile locale pentru citirea contextului și actualizarea documentelor în fiecare sesiune.
- Consolidat PROJECT_BRIEF: păstrează cerințele de produs și trimite la arhitectură pentru detaliile tehnice; clarifică formularul confirmat cu destinația temporară Yahoo.

### Decizii și aprobări

- Documentarea continuă a fost cerută explicit de utilizator.
- Stack-ul rămâne propus, în așteptarea aprobării; serverul și furnizorul SMTP nu sunt alese.
- Numele documentului tehnic este ARCHITECTURE.md, cu ortografia standard.

### Verificări

- Verificare PowerShell executată: PASS — toate cele 6 documente există, sunt ne-goale și UTF-8 valide; toate cele 21 de linkuri Markdown locale au ținte existente.
- Review de coerență: cerințele confirmate sunt separate de propuneri, blocajele de publicare sunt explicite și nu sunt documentate comenzi inexistente.
- Fără teste noi, lint, type-check sau build: schimbarea este exclusiv de documentație și aplicația nu există încă. Fără impact de runtime, performanță sau schemă.

### Deschis / următorul pas

Confirmarea stack-ului și clarificarea serverului; apoi structura site-ului și designul, conform [BACKLOG.md](BACKLOG.md).

## 2026-09-24–2026-09-25 — Context anterior, consolidat retrospectiv

Rezumat din conversație și brief; nu pretinde delimitarea exactă a sesiunilor anterioare.

- Clasificat proiectul NORMAL și început discovery-ul pe faze, fără implementare.
- Colectat identitatea firmei, datele furnizate de utilizator, serviciile și aria Petroșani / Valea Jiului / Hunedoara.
- Confirmat prioritățile comerciale: firme, instituții publice, persoane fizice; aproximativ 20 de proiecte declarate, cu materiale de primit.
- Confirmat cele două telefoane, e-mailul temporar, administrarea conținutului direct în cod, limba română și lipsa blogului la lansare.
- Confirmat responsabilitatea utilizatorului pentru informații, aprobare și actualizări; fără termen fix de lansare.
- Utilizatorul a cerut discutarea stack-ului înaintea structurii finale.
- Propus Next.js + React + TypeScript + Tailwind CSS, pagini prerandate și formular SMTP; consultat documentația oficială, indexată în ARCHITECTURE.
- Creat și actualizat PROJECT_BRIEF. Fără scaffold, aplicație, deploy sau teste executabile.
