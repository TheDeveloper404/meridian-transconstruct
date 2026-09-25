# Arhitectură tehnică

Actualizat: 25 septembrie 2026.
**Stare: STACK CONFIRMAT — Next.js + React + TypeScript + Tailwind CSS, formular SMTP și găzduire OVHcloud. Nu este implementat. Detaliile formularului și configurația de operare rămân deschise.**

## Context și constrângeri confirmate

Site de prezentare, doar în română, cu aproximativ 20 de proiecte declarate și conținut administrat în cod. Dezvoltatorul lucrează cu Node.js, React și TypeScript. Formularul trimite pe e-mail; nu există cerințe de CMS, conturi, bază de date sau panou. Cerințele de produs sunt în [PROJECT_BRIEF.md](PROJECT_BRIEF.md).

## Direcție tehnică și detalii de implementare propuse

| Zonă | Propunere | Motiv / consecință |
|---|---|---|
| Aplicație | Next.js App Router + React + TypeScript | Ecosistem familiar, pagini prerandate și handler de formular în același proiect. |
| Randare | Pagini de prezentare generate la build | Conținut HTML disponibil direct; actualizarea conținutului cere rebuild și deploy. |
| UI | Tailwind CSS, componente proprii | Identitate vizuală coerentă și adaptare la mobil. |
| Conținut | Fișiere TypeScript separate de UI | Datele proiectelor se editează fără duplicarea componentelor. |
| Media | Fotografii pregătite pentru web și next/image | Imagini responsive; originalele se arhivează separat. |
| Contact | Handler → serviciu de contact → adaptor SMTP cu Nodemailer | Separarea validării/regulilor de transport; fără backend Express separat. |
| Hosting | OVHcloud; server compatibil Node.js, HTTPS, reverse proxy | Furnizor confirmat; serviciul concret, dimensionarea și configurarea se stabilesc la deploy. |
| Persistență | Fără DB și fără repository de solicitări | Cererile ajung în căsuța de e-mail; inboxul are propriile reguli de acces și retenție. |

Versiunile exacte și package manager-ul se stabilesc la scaffold, verificând compatibilitatea și versiunile stabile suportate. Nu instalăm dependențe în această fază.

## Alternative evaluate

- **Astro:** potrivit pentru un site de conținut, dar introduce convenții suplimentare față de experiența React a dezvoltatorului.
- **React randat exclusiv în browser:** nu oferă un avantaj pentru aceste pagini față de prerandare.
- **Export complet static:** posibil cu o altă soluție de formular; nu este configurația propusă, care include procesare pe server.

Next.js este ales pentru compatibilitatea cu experiența dezvoltatorului și integrarea necesară, nu pentru un presupus avantaj automat în clasamentul Google.

## Responsabilități și fluxuri

**Pagini:** date de conținut → generarea paginilor → componente de prezentare. Componentele reutilizabile definesc aspectul; fișierele de conținut definesc informațiile comerciale. JavaScript-ul din browser se limitează la interacțiunile necesare.

**Contact:** formular → handler HTTP → serviciu de contact → adaptor SMTP → inboxul firmei.

- Handler-ul gestionează intrarea HTTP și răspunsurile; nu include direct transportul e-mail.
- Serviciul aplică regulile de validare și limitele cererii și utilizează adaptorul de transport.
- Adaptorul SMTP izolează dependența Nodemailer și configurația furnizorului.
- Nu adăugăm strat repository, ORM, container DI sau API separat fără o cerință concretă.
- Câmpurile, endpoint-ul și contractul de erori nu sunt încă stabilite. Se documentează înainte de implementarea formularului.

## Securitatea formularului — cerințe pentru implementare

- Validare server-side, limite pentru lungimea câmpurilor și dimensiunea cererii.
- Anti-spam și limitarea trimiterilor, proiectate pentru topologia reală de hosting; mecanismul exact rămâne de ales.
- Destinatarul și expeditorul sunt configurații server-side, nu valori controlate de vizitator. E-mailul vizitatorului se validează și se folosește ca Reply-To.
- Secretele SMTP rămân în configurația mediului; fără credențiale în cod, browser sau loguri.
- Mesaje de eroare utile, fără stack trace sau detalii de infrastructură expuse. Fără logarea implicită a conținutului cererilor.
- Stări UI pentru trimitere, succes și eșec; succesul nu se afișează când transportul a eșuat. Acceptarea SMTP nu dovedește primirea în inbox.
- Înainte de lansare se verifică expedierea și primirea reală, inclusiv comportamentul în caz de eroare.

Yahoo este destinatarul temporar confirmat. Furnizorul SMTP și expeditorul autentificat rămân de ales. Nu presupunem că adresa destinatarului oferă și serviciul de expediere.

## SEO, accesibilitate și performanță

- HTML semantic prerandat, titluri/descrieri specifice, canonical, sitemap, robots, Open Graph și pagină 404.
- Date structurate doar din informații reale și aprobate pentru publicare; fără recenzii sau evaluări inventate.
- Pagini utile pentru servicii și proiecte reale, cu context local; fără duplicarea paginilor doar prin schimbarea localității.
- Imagini dimensionate corespunzător, galerie cu încărcare amânată unde este potrivit și imagine principală tratată prioritar.
- Navigare cu tastatura, focus vizibil, contrast, etichete de formular și comportament accesibil al galeriei.
- Măsurare pe build de producție: mobil, Lighthouse și dimensiunea resurselor. Bugetele numerice se stabilesc în faza de design/implementare, fără scoruri pretinse înainte de măsurare.
- Analytics, Google Business Profile și Search Console se clarifică înainte de lansare; instalarea unui tracker nu este aprobată implicit.

## Medii, backup și operare

- Local: dezvoltare și teste; nu există încă scripturi de pornire.
- Preview/staging: de stabilit împreună cu hostingul; accesul/indexarea se configurează separat de producție.
- Producție: domeniul dorit este `meridian-transconstruct.ro`, pe OVHcloud. Utilizatorul a cerut alegerea și configurarea serverului după finalizarea site-ului local. Achiziția domeniului, serviciul OVHcloud concret, DNS, SSL și alegerea www/non-www rămân pentru deploy; nu presupunem că sunt configurate.
- Backup propus: copie remote a codului/conținutului, arhivă a originalelor foto și configurație de deploy păstrată securizat, separat de Git.
- Deploy reversibil: păstrarea versiunii anterioare și documentarea revenirii după alegerea hostingului. Procedura de restore se verifică înainte de a fi declarată funcțională.

## Verificare planificată

Teste unit pentru validarea formularului și regulile serviciului; integrare pentru fluxul de trimitere și erori; e2e pentru navigare și contact; verificare pe mobil. Lint, type-check și build după implementare, plus verificarea metadata și a linkurilor. Alegerea instrumentelor se face odată cu scaffold-ul.

La data documentului nu există cod de aplicație sau teste executabile. Revizuirea propunerii respectă separarea responsabilităților, fără straturi suplimentare nejustificate: **CLEAN-ARCHITECTURE: PASS pentru propunere; implementarea nu a fost evaluată.**

## Decizii deschise și surse

Stack-ul și furnizorul OVHcloud sunt confirmate. Serviciul concret de hosting, configurația serverului și furnizorul SMTP sunt urmărite în [BACKLOG.md](BACKLOG.md); nu blochează dezvoltarea locală, dar trebuie rezolvate înainte de lansare.

- [Next.js — deployment](https://nextjs.org/docs/app/getting-started/deploying)
- [Next.js — imagini](https://nextjs.org/docs/app/getting-started/images)
- [Next.js — metadata](https://nextjs.org/docs/app/getting-started/metadata-and-og-images)
- [Tailwind CSS — Next.js](https://tailwindcss.com/docs/installation/framework-guides/nextjs)
- [Nodemailer — SMTP](https://nodemailer.com/smtp)
- [Google Search Essentials](https://developers.google.com/search/docs/essentials)
- [Google — LocalBusiness](https://developers.google.com/search/docs/appearance/structured-data/local-business)
