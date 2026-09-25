# Backlog

Actualizat: 25 septembrie 2026. Acest document urmărește lucrul rămas și ideile suplimentare. Înregistrarea unei idei nu reprezintă aprobarea implementării ei. Prioritățile de mai jos sunt de planificare, nu severități de securitate.

## Decizii și pași în scopul proiectului

| ID | Element | Stare / condiție de închidere |
|---|---|---|
| B-002 | Configurație OVHcloud și buget de operare | Furnizor confirmat; alegerea serviciului Node.js, dimensionarea și configurarea sunt amânate explicit până la faza de deploy. Nu blochează dezvoltarea locală. |
| B-003 | Sitemap, gruparea serviciilor și structura proiectelor | Pagini principale individuale confirmate și implementate în machetă; serviciul 03 devine Construcții civile. Detaliile sunt în [SITE_STRUCTURE](docs/SITE_STRUCTURE.md); conținutul final rămâne de aprobat. |
| B-004 | Logo existent și direcție vizuală | [Direcție vizuală](docs/DESIGN.md) revizuită: albastru închis și hero cu imagine, conform feedbackului. Logo-ul și fotografia reală sunt încă necesare. |
| B-005 | Inventar și materiale pentru aproximativ 20 de proiecte | Așteaptă fotografii, localitate, an, lucrări executate și acorduri. Blochează publicarea fișelor incomplete. |
| B-006 | Texte finale și date publicabile ale firmei | Redactare pe baza datelor reale, aprobare de utilizator și verificare înainte de publicare. |
| B-007 | Formular: câmpuri, SMTP și protecție anti-spam | De proiectat; include test de primire reală a e-mailului. |
| B-008 | Contact principal și responsabil comercial | Telefon eliminat din header la cererea utilizatorului; 0723 400 646 rămâne pe butonul de mobil, ambele numere în Contact. Responsabilul comercial rămâne de precizat. |
| B-009 | E-mail pe domeniul firmei | Înlocuirea adresei temporare când noua adresă este disponibilă; actualizare și testare a destinației formularului. |
| B-010 | Domeniu, DNS, HTTPS, staging și revenire la versiunea anterioară | De configurat după alegerea hostingului; fără achiziții/publicare autorizate implicit. |
| B-011 | SEO local, Search Console și Google Business Profile | De clarificat existența profilului; configurare/indexare în faza de lansare. |
| B-012 | Cerințe legale și cookies | Sursele și cerințele de bază sunt în SITE_STRUCTURE; textele finale, datele firmei și inventarul tehnologiilor trebuie verificate înainte de lansare. |
| B-013 | Verificări de lansare | Conținut real, contacte, formular, linkuri, metadata, accesibilitate, mobil și performanță; dovezi consemnate în changelog. |
| B-014 | Ghid de actualizare, backup și întreținere | De redactat pe implementarea reală; verificare a procedurilor înainte de predare. |

## Idei opționale — neaprobate

| ID | Idee | Când merită reevaluată |
|---|---|---|
| I-001 | Secțiune de recenzii reale | După primirea recenziilor și clarificarea dreptului de publicare; lipsa lor nu blochează lansarea. |
| I-002 | FAQ | După identificarea întrebărilor recurente ale clienților. |
| I-003 | Măsurarea solicitărilor și analytics | După stabilirea obiectivelor de măsurare și a implicațiilor de confidențialitate. |

## Decizii provizorii

Nu există în prezent decizii implementate sub eticheta `ASSUMED — needs ratification`. Stack-ul și furnizorul OVHcloud sunt confirmate de utilizator; detaliile nealese sunt urmărite explicit mai sus.

## Închise

| ID | Element | Închidere |
|---|---|---|
| B-001 | Confirmarea stack-ului | Next.js + React + TypeScript + Tailwind CSS și formular SMTP confirmate; vezi sesiunea 2026-09-25 — S02 din [CHANGELOG.md](CHANGELOG.md). |

## Cum se actualizează

Păstrează ID-urile stabile. Pentru un element nou notează motivul, starea, dependența și criteriul de închidere. Mută elementele terminate într-o secțiune de închise și indică sesiunea relevantă din [CHANGELOG.md](CHANGELOG.md). Nu șterge o decizie sau o idee astfel încât istoricul ei să se piardă.
