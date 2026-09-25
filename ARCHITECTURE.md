# Arhitectură tehnică

Actualizat: 25 septembrie 2026.
**Stare: IMPLEMENTAT LOCAL — Next.js 16 (App Router) + React 19 + TypeScript 6 + Tailwind CSS 4, formular prin SMTP (Nodemailer 10). Găzduirea OVHcloud, furnizorul SMTP și configurația de operare rămân pentru deploy.**

## Context și constrângeri confirmate

Site de prezentare, doar în română, cu aproximativ 20 de proiecte declarate și conținut administrat în cod. Dezvoltatorul lucrează cu Node.js, React și TypeScript. Formularul trimite pe e-mail; nu există cerințe de CMS, conturi, bază de date sau panou. Cerințele de produs sunt în [PROJECT_BRIEF.md](PROJECT_BRIEF.md).

## Soluția tehnică

| Zonă | Decizie (implementată) | Motiv / consecință |
|---|---|---|
| Aplicație | Next.js App Router + React + TypeScript | Ecosistem familiar, pagini prerandate și handler de formular în același proiect. |
| Randare | Pagini de prezentare generate la build | Conținut HTML disponibil direct; actualizarea conținutului cere rebuild și deploy. |
| UI | Tailwind CSS, componente proprii | Identitate vizuală coerentă și adaptare la mobil. |
| Conținut | Fișiere TypeScript separate de UI | Datele proiectelor se editează fără duplicarea componentelor. |
| Media | Fotografii în `public/images/`, servite prin `next/image` (AVIF/WebP) | Imagini responsive; originalele se arhivează separat, în afara Git. |
| Contact | Route handler → serviciu de contact → adaptor SMTP cu Nodemailer | Separarea validării/regulilor de transport; fără backend Express separat. |
| Hosting | OVHcloud; server compatibil Node.js, HTTPS, reverse proxy | Furnizor confirmat; serviciul concret, dimensionarea și configurarea se stabilesc la deploy. |
| Persistență | Fără DB și fără repository de solicitări | Cererile ajung în căsuța de e-mail; inboxul are propriile reguli de acces și retenție. |

Versiuni la scaffold (2026-09-25): Next.js 16.3.6, React 19.3.0, Nodemailer 10.0.10, Tailwind CSS 4.3, TypeScript 6 (TypeScript 7 nu este încă suportat de typescript-eslint), ESLint 9, Vitest 4. Package manager: npm; lockfile generat cu npm 11. Font: Inter prin `next/font`, găzduit local la build.

## Alternative evaluate

- **Astro:** potrivit pentru un site de conținut, dar introduce convenții suplimentare față de experiența React a dezvoltatorului.
- **React randat exclusiv în browser:** nu oferă un avantaj pentru aceste pagini față de prerandare.
- **Export complet static:** posibil cu o altă soluție de formular; nu este configurația aleasă, care include procesare pe server.

Next.js este ales pentru compatibilitatea cu experiența dezvoltatorului și integrarea necesară, nu pentru un presupus avantaj automat în clasamentul Google.

## Responsabilități și fluxuri

**Pagini:** date de conținut → generarea paginilor → componente de prezentare. Componentele reutilizabile definesc aspectul; fișierele de conținut definesc informațiile comerciale. JavaScript-ul din browser se limitează la interacțiunile necesare.

**Contact:** formular → handler HTTP → serviciu de contact → adaptor SMTP → inboxul firmei.

- Handler-ul gestionează intrarea HTTP și răspunsurile; nu include direct transportul e-mail.
- Serviciul aplică regulile de validare și limitele cererii și utilizează adaptorul de transport.
- Adaptorul SMTP izolează dependența Nodemailer și configurația furnizorului.
- Nu adăugăm strat repository, ORM, container DI sau API separat fără o cerință concretă.
- Implementare: `src/server/contact/http.ts` (strat HTTP) → `contact-service.ts` (reguli) → `smtp-transport.ts` (adaptor). Validarea este o funcție pură în `src/lib/contact/validation.ts`, folosită pe server și, pentru feedback imediat, în formular.

### Contractul `POST /api/contact`

Cerere: `Content-Type: application/json`, maximum 16 KiB. Corp: `{ name, email, phone?, message, website? }` — `website` este honeypot-ul.

| Câmp | Reguli |
|---|---|
| `name` | Obligatoriu, maximum 120 de caractere, pe un rând (caracterele de control, inclusiv CR/LF, sunt eliminate). |
| `email` | Obligatoriu, format `nume@domeniu.tld`, maximum 254; folosit doar ca Reply-To. |
| `phone` | Opțional; cifre, spații, `+ ( ) . -`, 6–15 cifre, maximum 30 de caractere. |
| `message` | Obligatoriu, 10–5000 de caractere; rândurile noi se păstrează. |

| Răspuns | Când |
|---|---|
| `200 { ok: true }` | Trimis — sau honeypot completat (răspuns identic, fără trimitere). |
| `400 VALIDATION_ERROR` | JSON invalid sau câmpuri invalide; `details.fields` conține mesajele pe câmpuri. |
| `413 PAYLOAD_TOO_LARGE` | Corp peste 16 KiB. |
| `415 UNSUPPORTED_MEDIA_TYPE` | Alt tip de conținut decât JSON (blochează și formularele HTML trimise de pe alte site-uri). |
| `429 RATE_LIMITED` + `Retry-After` | Peste limita per client (implicit 5 cereri / 60 minute). |
| `503 SERVICE_UNAVAILABLE` | SMTP sau destinatarul nu sunt configurați. |
| `500 INTERNAL_ERROR` | Transportul SMTP a eșuat; fără detalii interne în răspuns. |

Format unic de eroare: `{ "error": { "code", "message", "details?" } }`. Mesajele de eroare 429/503/500 includ alternativa telefonică. Răspunsurile au `Cache-Control: no-store`.

Limitarea este în memoria procesului (un singur proces Node), cu cheia din `X-Real-IP` sau ultimul element din `X-Forwarded-For`, doar cu `TRUST_PROXY=true`. Fără proxy de încredere, toate cererile împart o limită globală. La mai multe instanțe, limitarea trebuie mutată într-un magazin partajat.

## Securitatea formularului

Cerințele de mai jos sunt implementate și acoperite de teste, cu excepția ultimului punct, care rămâne pentru lansare (B-007).

- Validare server-side, limite pentru lungimea câmpurilor și dimensiunea cererii.
- Anti-spam: honeypot + limitare per client în memorie (vezi contractul de mai sus). Se reevaluează după alegerea topologiei de hosting.
- Destinatarul și expeditorul sunt configurații server-side, nu valori controlate de vizitator. E-mailul vizitatorului se validează și se folosește ca Reply-To.
- Secretele SMTP rămân în configurația mediului; fără credențiale în cod, browser sau loguri.
- Mesaje de eroare utile, fără stack trace sau detalii de infrastructură expuse. Fără logarea implicită a conținutului cererilor.
- Stări UI pentru trimitere, succes și eșec; succesul nu se afișează când transportul a eșuat. Acceptarea SMTP nu dovedește primirea în inbox.
- Înainte de lansare se verifică expedierea și primirea reală, inclusiv comportamentul în caz de eroare.

Yahoo este destinatarul temporar confirmat. Furnizorul SMTP și expeditorul autentificat rămân de ales. Nu presupunem că adresa destinatarului oferă și serviciul de expediere.

## SEO, accesibilitate și performanță

- HTML semantic prerandat, titluri/descrieri specifice, canonical, sitemap, robots, Open Graph + Twitter card, manifest, iconițe (tab 32 px, iOS 180 px, manifest 192/512 px — monogramă provizorie) și 404 cu `noindex` — implementate. Metadatele de pagină trec prin `src/lib/seo.ts`, pentru că în Next un `openGraph` definit în pagină înlocuiește complet pe cel din layout. Lipsește imaginea Open Graph (după logo/fotografii, B-018).
- Date structurate doar din informații reale și aprobate pentru publicare; fără recenzii sau evaluări inventate. Implementat: JSON-LD `GeneralContractor` pe Acasă (nume, denumire legală, URL, telefoane, e-mail, anul înființării, zona: Valea Jiului și județul Hunedoara) — doar date deja vizibile pe site. Fără adresă până la verificarea sediului (B-012), deci fără eligibilitate pentru rezultate îmbogățite de tip firmă locală; de validat cu Rich Results Test la lansare (B-019).
- Indexare controlată de `ALLOW_INDEXING` (implicit oprită) și verificare Search Console prin `GOOGLE_SITE_VERIFICATION`; ambele citite la build. Pașii de lansare sunt în [README.md](README.md).
- Pagini utile pentru servicii și proiecte reale, cu context local; fără duplicarea paginilor doar prin schimbarea localității.
- Imagini dimensionate corespunzător, galerie cu încărcare amânată unde este potrivit și imagine principală tratată prioritar.
- Navigare cu tastatura, focus vizibil, contrast, etichete de formular și comportament accesibil al galeriei.
- Măsurare pe build de producție: mobil, Lighthouse și dimensiunea resurselor. Bugetele numerice se stabilesc în faza de design/implementare, fără scoruri pretinse înainte de măsurare.
- Analytics, Google Business Profile și Search Console se clarifică înainte de lansare; instalarea unui tracker nu este aprobată implicit.

## Medii, backup și operare

- Local: `npm run dev`, teste `npm test`; comenzile sunt în [README.md](README.md).
- Preview/staging: de stabilit împreună cu hostingul; accesul/indexarea se configurează separat de producție.
- Producție: domeniul dorit este `meridian-transconstruct.ro`, pe OVHcloud. Utilizatorul a cerut alegerea și configurarea serverului după finalizarea site-ului local. Achiziția domeniului, serviciul OVHcloud concret, DNS, SSL și alegerea www/non-www rămân pentru deploy; nu presupunem că sunt configurate.
- Backup propus: copie remote a codului/conținutului, arhivă a originalelor foto și configurație de deploy păstrată securizat, separat de Git.
- Deploy reversibil: păstrarea versiunii anterioare și documentarea revenirii după alegerea hostingului. Procedura de restore se verifică înainte de a fi declarată funcțională.

## Verificare

Poarta locală înainte de commit: `npm run typecheck && npm run lint && npm test && npm run build`; CI rulează aceleași verificări. Proiectul nu are teste E2E (decizie a utilizatorului).

Acoperire actuală: Vitest pentru validare, limitare, configurație, serviciu și handler HTTP (integrare cu transport fals). Trimiterea SMTP reală a fost verificată manual cu un server SMTP local de test. Neacoperite încă: Lighthouse/performanță pe conținut real, telefon fizic, primire în inboxul real (B-013, B-007).

Headere de securitate aplicate din `next.config.ts`: `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`; `X-Powered-By` dezactivat. CSP și HSTS rămân pentru configurarea serverului (BACKLOG B-015).

## Decizii deschise și surse

Stack-ul și furnizorul OVHcloud sunt confirmate. Serviciul concret de hosting, configurația serverului și furnizorul SMTP sunt urmărite în [BACKLOG.md](BACKLOG.md); nu blochează dezvoltarea locală, dar trebuie rezolvate înainte de lansare.

- [Next.js — deployment](https://nextjs.org/docs/app/getting-started/deploying)
- [Next.js — imagini](https://nextjs.org/docs/app/getting-started/images)
- [Next.js — metadata](https://nextjs.org/docs/app/getting-started/metadata-and-og-images)
- [Tailwind CSS — Next.js](https://tailwindcss.com/docs/installation/framework-guides/nextjs)
- [Nodemailer — SMTP](https://nodemailer.com/smtp)
- [Google Search Essentials](https://developers.google.com/search/docs/essentials)
- [Google — LocalBusiness](https://developers.google.com/search/docs/appearance/structured-data/local-business)
