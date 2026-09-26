# Backlog

Actualizat: 26 septembrie 2026 (S52). Acest document urmărește lucrul rămas și ideile suplimentare. Înregistrarea unei idei nu reprezintă aprobarea implementării ei. Prioritățile de mai jos sunt de planificare, nu severități de securitate.

## De unde reluăm

Starea la 2026-09-26 (după S51, închiderea sesiunii): site-ul local complet, cu logo, fonturile Saira + Inter, favicon din emblemă, hero cu fotografie reală, 9 albume reale în `/proiecte` (6 pe Acasă › 02), WhatsApp flotant cu bulă de mesaj pe desktop, footer centrat pe mobil, meniu compact cu iconiță. Modificările S28–S51 sunt necomise (utilizatorul comite din VS Code). Nimic din sesiune nu e verificat în browser — primul pas la reluare.

**1. Decizii (utilizator, 2026-09-26)**
- S27: domeniul `meridian-transconstruct.ro`, e-mail `office@meridian-transconstruct.ro`; adresa sediului și în footer; textele agentului aprobate (A-004, A-005, A-007, A-008, A-010).
- S28–S51: logo în header/footer (text alb), Saira + Inter (A-003 închis), fotografiile albumelor sunt reale, doar editate (S42); hero = fotografia halei luminată de utilizator, 6 albume pe Acasă (A-011 închis). Rămân de ratificat A-001, A-002, A-006.

**2. Materiale de primit**
- Acordul beneficiarilor pentru lucrările publicate și, opțional, anul / descrierea lor (B-005); fotografiile casei finalizate (`casa-in-constructie`).
- Imagine Open Graph (B-018).
- Pictogramele ANPC ca fișiere locale (B-021) — altfel fiecare vizită face cereri către un site terț.
- Telefonul principal (B-008).

**3. Implementări rămase (după materiale / decizii)**
- Validarea juridică a paginilor legale (B-012).
- Verificare în browser a modificărilor S28–S51 (logo, fonturi, albume, grila, hero, footer, meniu, bula WhatsApp) la 375 / 768 / 1024 / 1440 px.
- Imagine Open Graph (B-018); adresa în datele structurate (B-019).

**4. Deploy și lansare**
- **De cumpărat/configurat (decizia utilizatorului, 2026-09-26):** domeniul, apoi DNS pe Cloudflare (B-010); VPS-ul (B-002); formularul prin Maileroo, ca la Filadelfia (B-007); e-mail pe domeniu prin Cloudflare Email Routing, fără adresa Yahoo pe site (B-009).
- Server VPS (B-002), domeniu/DNS/HTTPS (B-010), Maileroo + test real de primire (B-007), CSP/HSTS (B-015), limitare formular (B-016), indexare + Search Console + Google Business Profile (B-011), verificările de lansare (B-013), ghidul de întreținere (B-014).

## Decizii și pași în scopul proiectului

| ID | Element | Stare / condiție de închidere |
|---|---|---|
| B-002 | VPS (OVHcloud) și buget de operare | **VPS-ul trebuie cumpărat** (2026-09-26). Furnizor confirmat anterior; alegerea serviciului Node.js, dimensionarea și configurarea sunt amânate explicit până la faza de deploy. Nu blochează dezvoltarea locală. |
| B-003 | Sitemap, gruparea serviciilor și structura proiectelor | Aplicația urmează macheta finală: Acasă cu secțiuni ancorate + Contact (vezi A-001). **S18:** `/proiecte` + `/proiecte/[slug]` implementate (albume din `projectAlbums`, goale până la lucrările reale — B-005). `/servicii` + `/servicii/[id]` făcute în S18 și **eliminate în S19** la cererea utilizatorului: serviciile rămân pe Acasă, ca panouri care se deschid. Paginile dedicate pe serviciu rămân cel mai mare câștig SEO posibil, dacă se revine la ele. |
| B-004 | Logo existent și direcție vizuală | [Direcție vizuală](docs/DESIGN.md) revizuită: albastru închis și hero cu imagine, conform feedbackului. Logo-ul e pus în header și footer (S28); fotografia reală e încă necesară. |
| B-005 | Inventar și materiale pentru aproximativ 20 de proiecte | **S30–S44:** albumele `hala-industriala`, `bloc-reabilitat`, `termoizolatie-bloc`, `spatiu-comercial`, `reabilitare-bloc-p4`, `casa-in-constructie` — lucrare în curs, de completat cu casa finalizată; `reabilitare-cladire` — în execuție; `reabilitare-lot-blocuri` (12), `reabilitare-bloc-p3`. Fotografiile sunt reale, editate (confirmat S42). De confirmat: an, descriere, lucrările executate și acord de confirmat). Pentru restul: așteaptă fotografii, localitate, an, lucrări executate și acorduri. Fiecare lucrare devine un album în `projectAlbums` (fotografiile în `public/images/proiecte/<slug>/`, S18); la primul album real, selecția de pe Acasă poate trece pe copertele albumelor. Pe Acasă, secțiunea 02 arată coperțile albumelor din `homeAlbums` (S45). Afișarea localității pe fișa unui proiect rămâne de decis (regula S09). |
| B-020 | Imagini ilustrative de generat | **S29:** pozele Unsplash (galerie + 3 albume demonstrative, S20) au fost șterse; din S45 galeria de pe Acasă folosește coperțile albumelor reale, deci imaginile generate pentru galerie nu mai sunt necesare; hero-ul are fotografie reală din S46 — B-020 e închis. Hero „șantier cu blocuri” și 5 imagini pentru galerie — prompturi și nume de fișiere în [docs/assets/README.md](docs/assets/README.md). Mediul agentului nu poate genera sau descărca imagini. |
| B-006 | Texte finale și date publicabile ale firmei | Redactare pe baza datelor reale, aprobare de utilizator și verificare înainte de publicare. |
| B-007 | Formular: SMTP de producție și test de primire | Câmpurile, validarea, honeypot-ul, limitarea și adaptorul SMTP sunt implementate și testate (contract în [ARCHITECTURE](ARCHITECTURE.md)). **Furnizor ales: Maileroo** (2026-09-26, ca la Filadelfia; Resend exclus — planul gratuit al utilizatorului are deja un domeniu ocupat). Rămân: domeniul verificat în Maileroo (SPF/DKIM/DMARC în DNS-ul Cloudflare), expeditorul (ex. `contact@<domeniu>`), de ales între SMTP-ul Maileroo pe adaptorul Nodemailer existent și API-ul lor (Filadelfia folosește `maileroo-sdk`), apoi test de primire reală în inboxul firmei, inclusiv în Spam. |
| B-008 | Contact principal și responsabil comercial | Telefon eliminat din header la cererea utilizatorului; 0723 400 646 rămâne pe butonul de mobil, ambele numere în Contact. WhatsApp: 0726 379 408 (ales de utilizator, S18) — de confirmat că numărul are WhatsApp activ. Responsabilul comercial rămâne de precizat. |
| B-009 | E-mail pe domeniul firmei | **S27:** pe site apare `office@meridian-transconstruct.ro` (domeniul confirmat de utilizator, cu cratimă), redirecționată către marta70fil@yahoo.com. Nu primește nimic până la cumpărarea domeniului și configurarea redirecționării. **Decizie (2026-09-26):** adresa Yahoo nu mai apare pe site; se publică o adresă pe domeniu (ex. `office@<domeniu>`) redirecționată prin **Cloudflare Email Routing** către inboxul real. Email Routing doar primește — trimiterea din formular rămâne pe Maileroo (B-007). De făcut după domeniu: regula de routing și destinația formularului testată. |
| B-010 | Domeniu, DNS, HTTPS, staging și revenire la versiunea anterioară | **Domeniul trebuie cumpărat și pus pe Cloudflare** (DNS, proxy, SSL; 2026-09-26). Apoi înregistrări A spre VPS, HTTPS, staging și revenire. Achizițiile le face utilizatorul. |
| B-011 | SEO local, Search Console și Google Business Profile | **Cea mai mare pârghie pentru căutările locale.** De clarificat existența profilului. În profil se setează zonele de serviciu (localitățile din Valea Jiului), compensând decizia de a nu le afișa pe site (S09); tot acolo se strâng recenziile. Search Console + trimiterea sitemap-ului la lansare. |
| B-012 | Cerințe legale și cookies | **S24:** textele complete ale `/confidentialitate` (GDPR art. 13: operator cu sediul, date, temei, furnizori, transferuri, păstrare, cookie-uri, drepturi, ANSPDCP) și `/termeni-si-conditii` sunt publicate, în `src/content/legal.ts`; adresa sediului se publică în ele (decizia utilizatorului). **Rămân:** validarea juridică; reverificarea furnizorilor și a cookie-urilor Cloudflare la lansare (B-013); pictogramele ANPC ca fișiere locale (altfel pagina face cereri către un site terț, nepomenit în politică — B-021). Adresa sediului e și în footer (S27). |
| B-013 | Verificări de lansare | Conținut real, contacte, formular, linkuri, metadata, accesibilitate, mobil și performanță; dovezi consemnate în changelog. |
| B-014 | Ghid de actualizare, backup și întreținere | Actualizarea conținutului este descrisă pe scurt în README; backup-ul și restore-ul rămân de redactat și verificat înainte de predare. |
| B-021 | ANPC — SAL și SOL | Pictogramele în footer (S15; 190 px lățime din S26), cu link spre ANPC SAL și platforma SOL a UE (`rel="nofollow"`). Imaginile vin deocamdată de pe `wpfitness.eu` (adresele date de utilizator; mediul agentului nu le poate descărca) — **de pus local** ca `public/images/anpc/sal.png` și `sol.png`: site-ul le folosește automat și nu mai face cereri către alt domeniu. De verificat: dacă sunt obligatorii pentru un site fără vânzări online și dacă platforma SOL a UE mai funcționează (după informațiile agentului, a fost închisă în 2025 — neconfirmat din mediul de lucru). Pictogramele oficiale se descarcă de pe anpc.ro. |
| B-015 | CSP și HSTS | Headerele de bază sunt în `next.config.ts`. CSP (cu nonce pentru scripturile Next sau politică echivalentă) și HSTS se configurează împreună cu nginx/HTTPS la deploy și se verifică pe producție. |
| B-016 | Limitare formular la mai multe instanțe | Limitarea este în memoria unui singur proces. Dacă deploy-ul folosește mai multe instanțe sau restarturi frecvente, se mută într-un magazin partajat. Necesită `TRUST_PROXY=true` în spatele nginx. |
| B-018 | Iconițe finale și imagine Open Graph | **S36:** iconițele (favicon.ico, icon, apple-icon, manifest) sunt emblema din logo — fișiere statice generate din `docs/assets/originale/logo.png`. Imaginea Open Graph (la distribuirea linkului pe WhatsApp/Facebook) lipsește încă. |
| B-019 | Date structurate pentru firmă | JSON-LD `GeneralContractor` implementat pe Acasă fără adresă (S10). Rămân: adresa după verificarea sediului (B-012), logo, validare cu Rich Results Test la lansare. Tipul nu a putut fi reverificat pe schema.org din mediul de lucru (acces de rețea blocat). |

## Idei opționale — neaprobate

| ID | Idee | Când merită reevaluată |
|---|---|---|
| I-001 | Secțiune de recenzii reale | După primirea recenziilor și clarificarea dreptului de publicare; lipsa lor nu blochează lansarea. |
| I-002 | FAQ | După identificarea întrebărilor recurente ale clienților. |
| I-003 | Măsurarea solicitărilor și analytics | După stabilirea obiectivelor de măsurare și a implicațiilor de confidențialitate. |

## Decizii provizorii

Decizii implementate la scaffold (2026-09-25 — S06) fără aprobare explicită separată; utilizatorul a cerut continuarea implementării.

| ID | Decizie | Motiv / impact |
|---|---|---|
| A-001 | `ASSUMED — needs ratification` Structura urmează macheta finală din repo: Acasă cu Servicii / Proiecte / Despre ca secțiuni ancorate + pagina Contact. | Scriptul de verificare a machetei (`docs/qa/check-preview.cjs`, eliminat în S08) verifica explicit eliminarea paginilor `servicii.html`, `proiecte.html`, `despre.html`, deci macheta e mai nouă decât DESIGN/SITE_STRUCTURE, care descriau cinci pagini. Trecerea la pagini separate e o schimbare de rutare și conținut, nu de componente. |
| A-002 | `ASSUMED — needs ratification` Portofoliul fără proiecte reale afișează o stare goală cu trimitere spre Contact, nu cardurile placeholder din machetă. | Brief: fără proiecte fictive; DESIGN: stare goală când nu există proiecte publicabile. Dispare automat la adăugarea primului proiect în `src/content/projects.ts`. |
| A-006 | `ASSUMED — needs ratification` Indexarea este oprită implicit (`ALLOW_INDEXING=false`) până la lansare. | Evită indexarea unui mediu de test sau a conținutului provizoriu. |

## Închise

| ID | Element | Închidere |
|---|---|---|
| A-003 | Fonturile: Saira (titluri, etichete, meniu, butoane) + Inter (text), găzduite local. | Decizia utilizatorului în S28 (2026-09-26): „aplică Saira și Inter”; înlocuiește varianta doar-Inter. |
| A-011 | Hero cu fotografia halei în execuție (varianta luminată de utilizator) și cele 6 albume de pe Acasă (`homeAlbums`). | Ratificat de utilizator în S45/S48 (2026-09-26): a aprobat selecția („ok”) și a ales el fotografia hero-ului. |
| A-004 | Informare scurtă de confidențialitate lângă formular și text provizoriu în footer pentru paginile legale. | Ratificat de utilizator în S27 (2026-09-26): „e bine la textele scrise de tine”. |
| A-005 | Mesajele formularului (erori pe câmpuri, succes, eșec cu alternativă telefonică), limita de 5 cereri / 60 minute și honeypot-ul. | Ratificat de utilizator în S27 (2026-09-26): „e bine la textele scrise de tine”. |
| A-007 | Textul serviciului „Hale industriale” (producție, depozitare, activități comerciale; structură metalică sau din beton) și titlul/introducerea secțiunii Servicii. | Ratificat de utilizator în S27 (2026-09-26): „e bine la textele scrise de tine”. |
| A-008 | Footer închis la culoare (`ink-deep`), textul secțiunii „Despre firmă” și al blocului „Ce ne recomandă” (inclusiv „Lucrările predate sunt cea mai bună carte de vizită”) și textele panoului de pe Contact. | Ratificat de utilizator în S27 (2026-09-26): „e bine la textele scrise de tine”. |
| A-010 | Blocurile „Ce executăm” și „Pentru cine” din panourile serviciilor (S20). | Ratificat de utilizator în S27 (2026-09-26): „e bine la textele scrise de tine”. |
| B-017 | E2E în CI | Anulat în S08: utilizatorul a decis că site-ul nu are teste E2E; testele Playwright au fost eliminate. |
| B-001 | Confirmarea stack-ului | Next.js + React + TypeScript + Tailwind CSS și formular SMTP confirmate; vezi sesiunea 2026-09-25 — S02 din [CHANGELOG.md](CHANGELOG.md). |

## Cum se actualizează

Păstrează ID-urile stabile. Pentru un element nou notează motivul, starea, dependența și criteriul de închidere. Mută elementele terminate într-o secțiune de închise și indică sesiunea relevantă din [CHANGELOG.md](CHANGELOG.md). Nu șterge o decizie sau o idee astfel încât istoricul ei să se piardă.
