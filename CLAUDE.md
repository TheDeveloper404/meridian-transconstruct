# Meridian Transconstruct — instrucțiuni pentru Claude

Completează regulile globale de engineering (clasificare SMALL/NORMAL/CRITICAL, quality gates, securitate) cu specificul acestui proiect. Globalul câștigă pe proces și securitate.

**Regulile de sesiune sunt în [AGENTS.md](AGENTS.md)** (comune tuturor agenților): ce citești la început, cum lucrezi, ce actualizezi la final. Nu le dubla aici. Acest fișier ține doar convențiile tehnice și capcanele cunoscute.

## Context

Site de prezentare în română pentru o firmă de construcții din Petroșani: Acasă (secțiuni ancorate) + Contact cu formular trimis prin SMTP. Fără CMS, DB, conturi sau panou. Produs și date firmă: [PROJECT_BRIEF.md](PROJECT_BRIEF.md). Soluție tehnică și contractul `POST /api/contact`: [ARCHITECTURE.md](ARCHITECTURE.md). Comenzi și variabile de mediu: [README.md](README.md). Lucru rămas și decizii provizorii (A-00x): [BACKLOG.md](BACKLOG.md).

## Unde stă fiecare lucru

- **Fără linii orizontale** între secțiuni sau elemente (cerința utilizatorului). Tranzițiile se fac cu `SectionEdge` (`src/components/section-edge.tsx`, margine oblică cu fâșie portocalie — revenire în S19, după varianta „zid de cărămidă” din S14–S18); spre footer nu există tranziție (S20): ultima secțiune se termină drept.

- `src/content/` — **toate textele și datele firmei**. Componentele nu conțin copy comercial hardcodat.
- `src/components/` — prezentare. Client components (`"use client"`) doar unde e nevoie de interacțiune: `navigation.tsx`, `contact-form.tsx`.
- `src/lib/contact/validation.ts` — validare pură, importată și de server, și de formular. Nimic din `src/server/` nu se importă în componente client (ar trage Nodemailer în bundle).
- `src/server/contact/` — `http.ts` (HTTP) → `contact-service.ts` (reguli) → `smtp-transport.ts` (singurul loc cu Nodemailer); `config.ts` citește mediul. `src/app/api/contact/route.ts` rămâne un apel de o linie.
- Token-uri vizuale: `src/app/globals.css` (`@theme`, Tailwind 4). Culori noi doar prin paletă (docs/DESIGN.md), nu hex-uri locale.
- Accent (S53): galben de șantier `accent` pe fundaluri închise și ca fundal de buton; pe fundal deschis (alb/crem), textul și iconițele în accent folosesc `accent-strong` (ocru) — galbenul acolo nu e lizibil.

Nu adăuga straturi (repository, DI, ORM, API separat) fără o cerință concretă.

## Reguli de conținut

- Nu inventa lucrări, recenzii, certificări, cifre, termene de răspuns sau date ale firmei. Lipsa unei informații → stare goală sau placeholder marcat, plus întrebare către utilizator.
- Proiectele se publică doar reale, cu acord (`src/content/projects.ts`). Adresa sediului apare doar în paginile legale și în footer, la datele de identificare (`company.registeredOffice`, deciziile utilizatorului S24/S27), nu în conținutul comercial.
- **Fără nume de localități pe pagini** (Petroșani, Vulcan, Lupeni, Petrila, Uricani, Aninoasa) — decizia utilizatorului. Zona se scrie „Valea Jiului” / „județul Hunedoara” (`company.region`, `company.county`). „Petroșani” e permis doar în `<title>`, meta description și Open Graph și în adresa legală obligatorie. Nu folosi text ascuns pentru SEO.
- Albumele (`src/content/projects.ts`): fotografii reale ale firmei (confirmat S42), originalele în `docs/assets/originale/<slug>/`, pe site WebP fără metadate. Acasă › 02 arată coperțile albumelor din `homeAlbums`. Imagini generate sau stock nu intră în portofoliu; dacă ar fi vreodată necesare, au `illustrative: true` (etichetă „Ilustrativ”), fără titlu, localitate sau detalii.
- Imaginea hero e o fotografie reală a firmei (S46–S47). `hero.image.isConcept: true` afișează eticheta de vizual generat — doar pentru imagini care nu sunt lucrări ale firmei.
- Decizie structurală/vizuală luată fără aprobare → rând `ASSUMED — needs ratification` în BACKLOG. La ajustări vizuale nu adăuga elemente noi „ca să arate complet”; propune și întreabă.

## Securitate (formularul e singura suprafață server)

- Validarea și limitele se aplică pe server; clientul doar oglindește pentru feedback.
- Destinatarul/expeditorul vin exclusiv din mediu. E-mailul vizitatorului e doar Reply-To. Corpul e text simplu.
- Nu loga conținutul cererilor, adrese sau credențiale — doar coduri de eroare.
- Răspunsuri de eroare în formatul `{ error: { code, message, details? } }`, fără detalii interne.
- Header-ele de proxy sunt de încredere doar cu `TRUST_PROXY=true`; din `X-Forwarded-For` se ia ultimul element.
- Secrete doar în `.env.local` / mediul serverului; `.env.example` fără valori reale.

## Înainte de commit

Rulează și raportează exact ce a trecut:

```bash
npm run typecheck && npm run lint && npm test && npm run build
```

**Fără teste E2E** — decizia utilizatorului pentru acest site; nu adăuga Playwright/E2E. Orice regulă nouă a formularului vine cu teste Vitest în `src/**/*.test.ts`. Schimbările de UI se verifică manual în browser doar când utilizatorul cere. Se lucrează direct pe `main`; commit/push sunt autorizate după ce verificările trec (vezi AGENTS.md).

## Documentație librării

Verifică API-ul în documentația curentă (context7) înainte de a scrie sau depana cod cu Next.js, Tailwind 4, Nodemailer sau Vitest. Versiunile se schimbă des, iar mai multe API-uri s-au schimbat recent (vezi capcanele).

## Capcane tehnice cunoscute

- **npm 10 — `Cannot read properties of null (reading 'edgesOut')`** la instalarea vitest (bug pe peer dependencies). Folosește `npx npm@11 install ...`; `npm ci` nu e afectat.
- **TypeScript 7 nu e suportat de typescript-eslint** — rămânem pe TS 6 până se aliniază ecosistemul.
- **Nodemailer 10 are tipuri proprii** — nu instala `@types/nodemailer`.
- **`next/image`: `priority` e depreciat în Next 16** — folosește `preload` pentru imaginea LCP.
- **`next start` nu funcționează cu `output: "standalone"`** — modul de rulare se alege la deploy (B-002); nu-l reactiva fără să schimbi și scripturile.
- **Metadate Next:** un `openGraph`/`twitter` definit în pagină înlocuiește complet pe cel din layout — folosește `pageMetadata()` din `src/lib/seo.ts`. `SITE_URL`, `ALLOW_INDEXING`, `GOOGLE_SITE_VERIFICATION` se citesc la build. Pe 404, Next pune singur `noindex`; `robots` din `not-found.tsx` există ca să nu se contrazică cu `index, follow` din layout.
- **Navigarea Next (`pushState`) nu emite `hashchange`** — starea activă din meniu ascultă și `navigation.currententrychange` (cu rezervă după clic). Orice logică nouă bazată pe `location.hash` trebuie să țină cont de asta.
- **ESLint `@next/next/no-html-link-for-pages`** respinge `<a href="/#...">` literal în JSX; pe Acasă folosește `#sectiune`, iar pentru ancore spre Acasă din alte pagini folosește datele din `src/content/navigation.ts`.
