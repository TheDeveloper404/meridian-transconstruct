# Backlog

Actualizat: 25 septembrie 2026 (S06). Acest document urmărește lucrul rămas și ideile suplimentare. Înregistrarea unei idei nu reprezintă aprobarea implementării ei. Prioritățile de mai jos sunt de planificare, nu severități de securitate.

## Decizii și pași în scopul proiectului

| ID | Element | Stare / condiție de închidere |
|---|---|---|
| B-002 | Configurație OVHcloud și buget de operare | Furnizor confirmat; alegerea serviciului Node.js, dimensionarea și configurarea sunt amânate explicit până la faza de deploy. Nu blochează dezvoltarea locală. |
| B-003 | Sitemap, gruparea serviciilor și structura proiectelor | Aplicația urmează macheta finală: Acasă cu secțiuni ancorate + Contact (vezi A-001). **Prioritate SEO:** o pagină dedicată pentru fiecare dintre cele 4 servicii și `/proiecte/[slug]` pentru fiecare lucrare reală — acum site-ul are doar 2 URL-uri, deci poate apărea pentru puține căutări. Necesită conținut real per serviciu/proiect și aprobarea structurii. |
| B-004 | Logo existent și direcție vizuală | [Direcție vizuală](docs/DESIGN.md) revizuită: albastru închis și hero cu imagine, conform feedbackului. Logo-ul și fotografia reală sunt încă necesare. |
| B-005 | Inventar și materiale pentru aproximativ 20 de proiecte | Așteaptă fotografii, localitate, an, lucrări executate și acorduri. Blochează publicarea fișelor incomplete. |
| B-006 | Texte finale și date publicabile ale firmei | Redactare pe baza datelor reale, aprobare de utilizator și verificare înainte de publicare. |
| B-007 | Formular: SMTP de producție și test de primire | Câmpurile, validarea, honeypot-ul, limitarea și adaptorul SMTP sunt implementate și testate (contract în [ARCHITECTURE](ARCHITECTURE.md)). Rămân: alegerea furnizorului SMTP și a expeditorului autentificat (SPF/DKIM pe domeniu), apoi test de primire reală în inboxul firmei, inclusiv în Spam. |
| B-008 | Contact principal și responsabil comercial | Telefon eliminat din header la cererea utilizatorului; 0723 400 646 rămâne pe butonul de mobil, ambele numere în Contact. Responsabilul comercial rămâne de precizat. |
| B-009 | E-mail pe domeniul firmei | Înlocuirea adresei temporare când noua adresă este disponibilă; actualizare și testare a destinației formularului. |
| B-010 | Domeniu, DNS, HTTPS, staging și revenire la versiunea anterioară | De configurat după alegerea hostingului; fără achiziții/publicare autorizate implicit. |
| B-011 | SEO local, Search Console și Google Business Profile | **Cea mai mare pârghie pentru căutările locale.** De clarificat existența profilului. În profil se setează zonele de serviciu (localitățile din Valea Jiului), compensând decizia de a nu le afișa pe site (S09); tot acolo se strâng recenziile. Search Console + trimiterea sitemap-ului la lansare. |
| B-012 | Cerințe legale și cookies | Sursele și cerințele de bază sunt în SITE_STRUCTURE; textele finale, datele firmei și inventarul tehnologiilor trebuie verificate înainte de lansare. |
| B-013 | Verificări de lansare | Conținut real, contacte, formular, linkuri, metadata, accesibilitate, mobil și performanță; dovezi consemnate în changelog. |
| B-014 | Ghid de actualizare, backup și întreținere | Actualizarea conținutului este descrisă pe scurt în README; backup-ul și restore-ul rămân de redactat și verificat înainte de predare. |
| B-015 | CSP și HSTS | Headerele de bază sunt în `next.config.ts`. CSP (cu nonce pentru scripturile Next sau politică echivalentă) și HSTS se configurează împreună cu nginx/HTTPS la deploy și se verifică pe producție. |
| B-016 | Limitare formular la mai multe instanțe | Limitarea este în memoria unui singur proces. Dacă deploy-ul folosește mai multe instanțe sau restarturi frecvente, se mută într-un magazin partajat. Necesită `TRUST_PROXY=true` în spatele nginx. |
| B-018 | Iconițe finale și imagine Open Graph | Iconițele există ca monogramă provizorie „M” (`src/components/monogram.tsx`, S10); se înlocuiesc din logo (B-004). Imaginea Open Graph (la distribuirea linkului pe WhatsApp/Facebook) lipsește încă. |
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
| A-006 | `ASSUMED — needs ratification` Indexarea este oprită implicit (`ALLOW_INDEXING=false`) până la lansare. | Evită indexarea unui mediu de test sau a conținutului provizoriu. |

## Închise

| ID | Element | Închidere |
|---|---|---|
| B-017 | E2E în CI | Anulat în S08: utilizatorul a decis că site-ul nu are teste E2E; testele Playwright au fost eliminate. |
| B-001 | Confirmarea stack-ului | Next.js + React + TypeScript + Tailwind CSS și formular SMTP confirmate; vezi sesiunea 2026-09-25 — S02 din [CHANGELOG.md](CHANGELOG.md). |

## Cum se actualizează

Păstrează ID-urile stabile. Pentru un element nou notează motivul, starea, dependența și criteriul de închidere. Mută elementele terminate într-o secțiune de închise și indică sesiunea relevantă din [CHANGELOG.md](CHANGELOG.md). Nu șterge o decizie sau o idee astfel încât istoricul ei să se piardă.
