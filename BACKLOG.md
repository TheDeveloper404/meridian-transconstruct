# Backlog

Actualizat: 26 septembrie 2026 (S17). Acest document urmărește lucrul rămas și ideile suplimentare. Înregistrarea unei idei nu reprezintă aprobarea implementării ei. Prioritățile de mai jos sunt de planificare, nu severități de securitate.

## De unde reluăm

Starea la închiderea zilei: site-ul complet pe `main` (ultimul commit din S15), CI verde. Ordinea propusă pentru reluare:

**1. Pornire locală (utilizator)**
- `git pull origin main`, apoi `npm ci` (s-au adăugat dependențe) și `npm run dev` → http://localhost:3000. Node 22+; pentru instalări noi de pachete, npm 11 (vezi README).
- Opțional, pentru formular: `.env.local` după `.env.example` (fără SMTP, formularul răspunde „indisponibil” — comportament normal).

**2. Revizie și decizii (utilizator)**
- Feedback vizual pe varianta curentă: zidul de cărămidă dintre secțiuni, galeria „bento”, „Despre firmă” + „Ce ne recomandă”, footer, pagina Contact.
- Ratificarea deciziilor provizorii A-001…A-008 (tabelul de mai jos) și a textului „Hale industriale” (A-007).

**3. Materiale de primit**
- Imaginile generate după prompturi: hero „șantier cu blocuri” + 5 imagini de galerie (B-020, docs/assets/README.md).
- Pictogramele ANPC ca fișiere locale (B-021).
- Logo (B-004, B-018), apoi fotografiile și inventarul proiectelor reale (B-005).
- Telefonul principal (B-008), e-mailul pe domeniul firmei (B-009).

**4. Următoarele implementări (după materiale / decizii)**
- Pagini dedicate pentru cele 5 servicii și `/proiecte/[slug]` — cel mai mare câștig SEO rămas (B-003).
- Textele legale finale (B-012) și decizia ANPC SAL/SOL (B-021).
- Iconițe din logo, imagine Open Graph (B-018), date structurate cu adresa verificată (B-019).

**5. Deploy și lansare**
- **De cumpărat/configurat (decizia utilizatorului, 2026-09-26):** domeniul, apoi DNS pe Cloudflare (B-010); VPS-ul (B-002); formularul prin Maileroo, ca la Filadelfia (B-007); e-mail pe domeniu prin Cloudflare Email Routing, fără adresa Yahoo pe site (B-009).
- Server VPS (B-002), domeniu/DNS/HTTPS (B-010), Maileroo + test real de primire (B-007), CSP/HSTS (B-015), limitare formular (B-016), indexare + Search Console + Google Business Profile (B-011), verificările de lansare (B-013), ghidul de întreținere (B-014).

## Decizii și pași în scopul proiectului

| ID | Element | Stare / condiție de închidere |
|---|---|---|
| B-002 | VPS (OVHcloud) și buget de operare | **VPS-ul trebuie cumpărat** (2026-09-26). Furnizor confirmat anterior; alegerea serviciului Node.js, dimensionarea și configurarea sunt amânate explicit până la faza de deploy. Nu blochează dezvoltarea locală. |
| B-003 | Sitemap, gruparea serviciilor și structura proiectelor | Aplicația urmează macheta finală: Acasă cu secțiuni ancorate + Contact (vezi A-001). **Prioritate SEO:** o pagină dedicată pentru fiecare dintre cele 4 servicii și `/proiecte/[slug]` pentru fiecare lucrare reală — acum site-ul are doar 2 URL-uri, deci poate apărea pentru puține căutări. Necesită conținut real per serviciu/proiect și aprobarea structurii. |
| B-004 | Logo existent și direcție vizuală | [Direcție vizuală](docs/DESIGN.md) revizuită: albastru închis și hero cu imagine, conform feedbackului. Logo-ul și fotografia reală sunt încă necesare. |
| B-005 | Inventar și materiale pentru aproximativ 20 de proiecte | Așteaptă fotografii, localitate, an, lucrări executate și acorduri. Galeria (S12) le preia din `src/content/projects.ts`; imaginile ilustrative se înlocuiesc înainte de lansare. Afișarea localității pe fișa unui proiect rămâne de decis (regula S09). |
| B-020 | Imagini ilustrative de generat | Hero „șantier cu blocuri” și 5 imagini pentru galerie — prompturi și nume de fișiere în [docs/assets/README.md](docs/assets/README.md). Mediul agentului nu poate genera sau descărca imagini. |
| B-006 | Texte finale și date publicabile ale firmei | Redactare pe baza datelor reale, aprobare de utilizator și verificare înainte de publicare. |
| B-007 | Formular: SMTP de producție și test de primire | Câmpurile, validarea, honeypot-ul, limitarea și adaptorul SMTP sunt implementate și testate (contract în [ARCHITECTURE](ARCHITECTURE.md)). **Furnizor ales: Maileroo** (2026-09-26, ca la Filadelfia; Resend exclus — planul gratuit al utilizatorului are deja un domeniu ocupat). Rămân: domeniul verificat în Maileroo (SPF/DKIM/DMARC în DNS-ul Cloudflare), expeditorul (ex. `contact@<domeniu>`), de ales între SMTP-ul Maileroo pe adaptorul Nodemailer existent și API-ul lor (Filadelfia folosește `maileroo-sdk`), apoi test de primire reală în inboxul firmei, inclusiv în Spam. |
| B-008 | Contact principal și responsabil comercial | Telefon eliminat din header la cererea utilizatorului; 0723 400 646 rămâne pe butonul de mobil, ambele numere în Contact. Responsabilul comercial rămâne de precizat. |
| B-009 | E-mail pe domeniul firmei | **Decizie (2026-09-26):** adresa Yahoo nu mai apare pe site; se publică o adresă pe domeniu (ex. `office@<domeniu>`) redirecționată prin **Cloudflare Email Routing** către inboxul real. Email Routing doar primește — trimiterea din formular rămâne pe Maileroo (B-007). De făcut după domeniu: regula de routing, `company.email` actualizat, destinația formularului testată. |
| B-010 | Domeniu, DNS, HTTPS, staging și revenire la versiunea anterioară | **Domeniul trebuie cumpărat și pus pe Cloudflare** (DNS, proxy, SSL; 2026-09-26). Apoi înregistrări A spre VPS, HTTPS, staging și revenire. Achizițiile le face utilizatorul. |
| B-011 | SEO local, Search Console și Google Business Profile | **Cea mai mare pârghie pentru căutările locale.** De clarificat existența profilului. În profil se setează zonele de serviciu (localitățile din Valea Jiului), compensând decizia de a nu le afișa pe site (S09); tot acolo se strâng recenziile. Search Console + trimiterea sitemap-ului la lansare. |
| B-012 | Cerințe legale și cookies | Paginile `/confidentialitate` și `/termeni-si-conditii` există (S13), cu mesaj „în pregătire” și `noindex`. Rămân textele finale (politica de confidențialitate e necesară din cauza formularului; termenii probabil nu sunt obligatorii pentru un site de prezentare — de confirmat), datele firmei și inventarul tehnologiilor. |
| B-013 | Verificări de lansare | Conținut real, contacte, formular, linkuri, metadata, accesibilitate, mobil și performanță; dovezi consemnate în changelog. |
| B-014 | Ghid de actualizare, backup și întreținere | Actualizarea conținutului este descrisă pe scurt în README; backup-ul și restore-ul rămân de redactat și verificat înainte de predare. |
| B-021 | ANPC — SAL și SOL | Pictogramele în footer (S15), 250 × 50 px, cu link spre ANPC SAL și platforma SOL a UE (`rel="nofollow"`). Imaginile vin deocamdată de pe `wpfitness.eu` (adresele date de utilizator; mediul agentului nu le poate descărca) — **de pus local** ca `public/images/anpc/sal.png` și `sol.png`: site-ul le folosește automat și nu mai face cereri către alt domeniu. De verificat: dacă sunt obligatorii pentru un site fără vânzări online și dacă platforma SOL a UE mai funcționează (după informațiile agentului, a fost închisă în 2025 — neconfirmat din mediul de lucru). Pictogramele oficiale se descarcă de pe anpc.ro. |
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
| A-004 | `ASSUMED — needs ratification` Informare scurtă de confidențialitate lângă formular și text provizoriu în footer pentru paginile legale. | Paginile legale depind de datele verificate și de furnizorii aleși (B-012); textele sunt marcate ca în pregătire. |
| A-005 | `ASSUMED — needs ratification` Mesajele formularului (erori pe câmpuri, succes, eșec cu alternativă telefonică), limita de 5 cereri / 60 minute și honeypot-ul. | Necesare pentru un formular funcțional; nu promit termen de răspuns. Limita se ajustează din mediu. |
| A-007 | `ASSUMED — needs ratification` Textul serviciului „Hale industriale” (producție, depozitare, activități comerciale; structură metalică sau din beton) și titlul/introducerea secțiunii Servicii. | Serviciul a fost cerut de utilizator în S12 fără detalii; textul descrie tipul de lucrare, fără date inventate, dar trebuie confirmat de firmă. |
| A-008 | `ASSUMED — needs ratification` Footer închis la culoare (`ink-deep`), textul secțiunii „Despre firmă” și al blocului „Ce ne recomandă” (inclusiv „Lucrările predate sunt cea mai bună carte de vizită”) și textele panoului de pe Contact. | Footer-ul închis permite aceeași tranziție oblică la finalul fiecărei pagini; textele folosesc doar fapte din brief. |
| A-006 | `ASSUMED — needs ratification` Indexarea este oprită implicit (`ALLOW_INDEXING=false`) până la lansare. | Evită indexarea unui mediu de test sau a conținutului provizoriu. |

## Închise

| ID | Element | Închidere |
|---|---|---|
| B-017 | E2E în CI | Anulat în S08: utilizatorul a decis că site-ul nu are teste E2E; testele Playwright au fost eliminate. |
| B-001 | Confirmarea stack-ului | Next.js + React + TypeScript + Tailwind CSS și formular SMTP confirmate; vezi sesiunea 2026-09-25 — S02 din [CHANGELOG.md](CHANGELOG.md). |

## Cum se actualizează

Păstrează ID-urile stabile. Pentru un element nou notează motivul, starea, dependența și criteriul de închidere. Mută elementele terminate într-o secțiune de închise și indică sesiunea relevantă din [CHANGELOG.md](CHANGELOG.md). Nu șterge o decizie sau o idee astfel încât istoricul ei să se piardă.
