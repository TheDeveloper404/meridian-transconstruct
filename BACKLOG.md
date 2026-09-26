# Backlog

Actualizat: 26 septembrie 2026 (S17). Acest document urmărește lucrul rămas și ideile suplimentare. Înregistrarea unei idei nu reprezintă aprobarea implementării ei. Prioritățile de mai jos sunt de planificare, nu severități de securitate.

## De unde reluăm

Starea la 2026-09-26 (după S26): site-ul local complet — Acasă (hero cu plachete, servicii ca panouri, galerie, Despre, CTA), `/proiecte` cu albume (demonstrative), Contact, paginile legale cu text complet, WhatsApp, bara de progres. Modificările S17–S26 sunt necomise la închiderea S26 (utilizatorul comite). Ordinea propusă pentru reluare:

**1. Decizii (utilizator, 2026-09-26 — S27)**
- Domeniul confirmat: `meridian-transconstruct.ro` (cu cratimă); e-mail `office@meridian-transconstruct.ro`. Utilizatorul cumpără domeniul și VPS-ul; restul configurării se face împreună (secțiunea 4).
- Adresa sediului publicată și în footer.
- Textele redactate de agent aprobate (A-004, A-005, A-007, A-008, A-010 — închise mai jos). Rămân de ratificat deciziile structurale A-001, A-002, A-003, A-006.
- Utilizatorul trimite fotografiile (B-005).

**2. Materiale de primit**
- Fotografiile și datele lucrărilor reale (B-005) — înlocuiesc albumele demonstrative și pozele Unsplash (B-020).
- Imaginea hero reală sau cea generată după prompt (B-020); logo (B-004, B-018).
- Pictogramele ANPC ca fișiere locale (B-021) — altfel fiecare vizită face cereri către un site terț.
- Telefonul principal (B-008).

**3. Implementări rămase (după materiale / decizii)**
- Validarea juridică a paginilor legale (B-012).
- Iconițe din logo, imagine Open Graph (B-018); adresa în datele structurate (B-019).

**4. Deploy și lansare**
- **De cumpărat/configurat (decizia utilizatorului, 2026-09-26):** domeniul, apoi DNS pe Cloudflare (B-010); VPS-ul (B-002); formularul prin Maileroo, ca la Filadelfia (B-007); e-mail pe domeniu prin Cloudflare Email Routing, fără adresa Yahoo pe site (B-009).
- Server VPS (B-002), domeniu/DNS/HTTPS (B-010), Maileroo + test real de primire (B-007), CSP/HSTS (B-015), limitare formular (B-016), indexare + Search Console + Google Business Profile (B-011), verificările de lansare (B-013), ghidul de întreținere (B-014).

## Decizii și pași în scopul proiectului

| ID | Element | Stare / condiție de închidere |
|---|---|---|
| B-002 | VPS (OVHcloud) și buget de operare | **VPS-ul trebuie cumpărat** (2026-09-26). Furnizor confirmat anterior; alegerea serviciului Node.js, dimensionarea și configurarea sunt amânate explicit până la faza de deploy. Nu blochează dezvoltarea locală. |
| B-003 | Sitemap, gruparea serviciilor și structura proiectelor | Aplicația urmează macheta finală: Acasă cu secțiuni ancorate + Contact (vezi A-001). **S18:** `/proiecte` + `/proiecte/[slug]` implementate (albume din `projectAlbums`, goale până la lucrările reale — B-005). `/servicii` + `/servicii/[id]` făcute în S18 și **eliminate în S19** la cererea utilizatorului: serviciile rămân pe Acasă, ca panouri care se deschid. Paginile dedicate pe serviciu rămân cel mai mare câștig SEO posibil, dacă se revine la ele. |
| B-004 | Logo existent și direcție vizuală | [Direcție vizuală](docs/DESIGN.md) revizuită: albastru închis și hero cu imagine, conform feedbackului. Logo-ul și fotografia reală sunt încă necesare. |
| B-005 | Inventar și materiale pentru aproximativ 20 de proiecte | Așteaptă fotografii, localitate, an, lucrări executate și acorduri. Fiecare lucrare devine un album în `projectAlbums` (fotografiile în `public/images/proiecte/<slug>/`, S18); la primul album real, selecția de pe Acasă poate trece pe copertele albumelor. Galeria de pe Acasă (S12) vine din `gallery` în `src/content/projects.ts`; imaginile ilustrative se înlocuiesc înainte de lansare. Afișarea localității pe fișa unui proiect rămâne de decis (regula S09). |
| B-020 | Imagini ilustrative de generat | **S20:** până atunci, galeria de pe Acasă are poze Unsplash (marcate „Ilustrativ”), iar `/proiecte` are 3 albume demonstrative × 6 poze — **de șters înainte de lansare** (lista în docs/assets/README.md). Hero „șantier cu blocuri” și 5 imagini pentru galerie — prompturi și nume de fișiere în [docs/assets/README.md](docs/assets/README.md). Mediul agentului nu poate genera sau descărca imagini. |
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
| B-018 | Iconițe finale și imagine Open Graph | Iconițele și `src/app/favicon.ico` (16/32/48 px, S15) sunt monograma provizorie „M”; se înlocuiesc din logo (B-004). La schimbarea monogramei, `favicon.ico` se regenerează (nu se poate genera din cod în Next). Imaginea Open Graph (la distribuirea linkului pe WhatsApp/Facebook) lipsește încă. |
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
| A-003 | `ASSUMED — needs ratification` Font Inter găzduit local (`next/font`), greutăți 400/500/700. | Recomandarea din DESIGN; macheta folosea fonturile sistemului. |
| A-006 | `ASSUMED — needs ratification` Indexarea este oprită implicit (`ALLOW_INDEXING=false`) până la lansare. | Evită indexarea unui mediu de test sau a conținutului provizoriu. |

## Închise

| ID | Element | Închidere |
|---|---|---|
| A-004 | Informare scurtă de confidențialitate lângă formular și text provizoriu în footer pentru paginile legale. | Ratificat de utilizator în S27 (2026-09-26): „e bine la textele scrise de tine”. |
| A-005 | Mesajele formularului (erori pe câmpuri, succes, eșec cu alternativă telefonică), limita de 5 cereri / 60 minute și honeypot-ul. | Ratificat de utilizator în S27 (2026-09-26): „e bine la textele scrise de tine”. |
| A-007 | Textul serviciului „Hale industriale” (producție, depozitare, activități comerciale; structură metalică sau din beton) și titlul/introducerea secțiunii Servicii. | Ratificat de utilizator în S27 (2026-09-26): „e bine la textele scrise de tine”. |
| A-008 | Footer închis la culoare (`ink-deep`), textul secțiunii „Despre firmă” și al blocului „Ce ne recomandă” (inclusiv „Lucrările predate sunt cea mai bună carte de vizită”) și textele panoului de pe Contact. | Ratificat de utilizator în S27 (2026-09-26): „e bine la textele scrise de tine”. |
| A-010 | Blocurile „Ce executăm” și „Pentru cine” din panourile serviciilor (S20). | Ratificat de utilizator în S27 (2026-09-26): „e bine la textele scrise de tine”. |
| B-017 | E2E în CI | Anulat în S08: utilizatorul a decis că site-ul nu are teste E2E; testele Playwright au fost eliminate. |
| B-001 | Confirmarea stack-ului | Next.js + React + TypeScript + Tailwind CSS și formular SMTP confirmate; vezi sesiunea 2026-09-25 — S02 din [CHANGELOG.md](CHANGELOG.md). |

## Cum se actualizează

Păstrează ID-urile stabile. Pentru un element nou notează motivul, starea, dependența și criteriul de închidere. Mută elementele terminate într-o secțiune de închise și indică sesiunea relevantă din [CHANGELOG.md](CHANGELOG.md). Nu șterge o decizie sau o idee astfel încât istoricul ei să se piardă.
