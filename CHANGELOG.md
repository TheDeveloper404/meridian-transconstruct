# Changelog și jurnal de sesiuni

Istoric al activităților și deciziilor proiectului, inclusiv discovery și documentație. Intrările recente apar primele. Datele folosesc fusul Europe/Bucharest.

Fiecare sesiune nouă primește data și un număr în cadrul zilei, apoi consemnează: scop și clasificare, activități, decizii/aprobări, verificări reale, blocaje și următorul pas. Nu înregistrăm parole, conținutul cererilor clienților sau transcrieri brute. Nu marcăm planurile drept funcționalități livrate.

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
