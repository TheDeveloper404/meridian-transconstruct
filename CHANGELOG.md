# Changelog și jurnal de sesiuni

Istoric al activităților și deciziilor proiectului, inclusiv discovery și documentație. Intrările recente apar primele. Datele folosesc fusul Europe/Bucharest.

Fiecare sesiune nouă primește data și un număr în cadrul zilei, apoi consemnează: scop și clasificare, activități, decizii/aprobări, verificări reale, blocaje și următorul pas. Nu înregistrăm parole, conținutul cererilor clienților sau transcrieri brute. Nu marcăm planurile drept funcționalități livrate.

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
