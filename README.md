# Meridian Transconstruct

Site de prezentare în limba română pentru MERIDIAN TRANSCONSTRUCT S.R.L., Petroșani. Obiective: vizibilitate în căutările locale, credibilitate la ofertare și solicitări prin telefon sau e-mail.

## Stadiu

Aplicația Next.js este implementată local după macheta finală: **Acasă** (hero, servicii, portofoliu, despre, CTA) și **Contact** (telefoane, e-mail, formular funcțional prin SMTP), plus 404, sitemap și robots. Nu este publicată: hostingul OVHcloud, domeniul și furnizorul SMTP se configurează la deploy.

Înainte de lansare lipsesc încă: logo-ul, fotografiile reale (hero și portofoliu), paginile legale și furnizorul SMTP. Lista completă este în [BACKLOG.md](BACKLOG.md).

## Documentație

| Document | Rol |
|---|---|
| [PROJECT_BRIEF.md](PROJECT_BRIEF.md) | Cerințe, informațiile firmei, conținut, decizii de produs și materiale lipsă. |
| [ARCHITECTURE.md](ARCHITECTURE.md) | Soluția tehnică, responsabilități, fluxuri, contractul formularului și deciziile de arhitectură. |
| [CHANGELOG.md](CHANGELOG.md) | Istoric pe sesiuni: activități, decizii, verificări și lucruri rămase deschise. |
| [BACKLOG.md](BACKLOG.md) | Pași rămași, dependențe și idei neaprobate. |
| [AGENTS.md](AGENTS.md) | Reguli locale pentru continuitatea lucrului și actualizarea documentației. |
| [CLAUDE.md](CLAUDE.md) | Convenții tehnice, poarta de verificare și capcane cunoscute pentru lucrul cu Claude Code. |
| [docs/SITE_STRUCTURE.md](docs/SITE_STRUCTURE.md) | Sitemap, secțiuni, servicii, proiecte, formular și cerințe legale de bază. |
| [docs/DESIGN.md](docs/DESIGN.md) | Direcție vizuală, token-uri, responsive și comportamente. |
| [docs/home-preview.html](docs/home-preview.html) | Macheta HTML de referință, distinctă de aplicație. |

## Dezvoltare

Cerințe: Node.js 22+ (CI folosește Node 24) și npm 11. Versiunile exacte sunt în `package.json` și `package-lock.json`.

```bash
npm ci                 # instalează dependențele din lockfile
cp .env.example .env.local   # opțional: completează SMTP pentru formular
npm run dev            # server de dezvoltare, http://localhost:3000
```

| Comandă | Ce face |
|---|---|
| `npm run dev` | Server de dezvoltare. |
| `npm run build` | Build de producție (pagini prerandate + handler `/api/contact`). |
| `npm start` | Pornește build-ul de producție (`next start`). |
| `npm run typecheck` | Verificare TypeScript (`tsc --noEmit`). |
| `npm run lint` | ESLint (reguli Next.js + TypeScript). |
| `npm test` | Teste unit și de integrare (Vitest): validare, limitare, serviciu și handler de contact. |

> **npm 10:** instalarea unor pachete noi poate eșua cu `Cannot read properties of null (reading 'edgesOut')`, un bug npm legat de peer dependencies. Cu npm 11 funcționează: `npx npm@11 install <pachet>`. `npm ci` pe lockfile-ul existent nu este afectat.

Proiectul nu are teste E2E (decizia utilizatorului); testele automate sunt cele Vitest.

### Structura codului

```
src/
  app/                 rute Next.js (Acasă, Contact, 404, sitemap, robots, /api/contact)
  components/          componente de prezentare (header, footer, secțiuni, formular)
  content/             textele și datele firmei — se editează aici, nu în componente
  lib/contact/         validarea cererii (comună server + formular)
  server/contact/      config din mediu, serviciu de contact, limitare, adaptor SMTP, strat HTTP
public/images/         imagini servite de site
```

### Variabile de mediu

Toate sunt descrise în [.env.example](.env.example). Pe scurt: `SMTP_*` + `CONTACT_MAIL_FROM` / `CONTACT_MAIL_TO` activează formularul (fără ele răspunde 503 cu alternativa telefonică); `TRUST_PROXY=true` doar în spatele nginx; `ALLOW_INDEXING=true` doar la lansare; `SITE_URL` pentru URL-ul canonic.

### Actualizarea conținutului

- Texte și date firmă: `src/content/*.ts`.
- Proiecte: `src/content/projects.ts` (instrucțiuni în fișier) + fotografii în `public/images/proiecte/<slug>/`. Se publică doar lucrări reale, cu acordul beneficiarului.
- Imaginea hero: `src/content/home.ts` (`hero.image`); la înlocuirea conceptului cu o fotografie reală, `isConcept: false`.

## Macheta de referință

Fișierele din `docs/` pot fi deschise direct în browser sau servite local:

```bash
python -m http.server 4173 --bind 127.0.0.1 --directory docs
```

Deschide `http://127.0.0.1:4173/home-preview.html`. Proveniența imaginii hero: [docs/assets/README.md](docs/assets/README.md).

## Limitele proiectului

- Conținut și fotografii administrate direct în cod de dezvoltator.
- Fără CMS, autentificare, panou de administrare, magazin sau bază de date de solicitări.
- Doar română; fără blog la lansare.
- Aproximativ 20 de proiecte declarate; fotografiile, fișele și acordurile de publicare urmează să fie primite.
- Domeniu dorit: `meridian-transconstruct.ro`, încă neachiziționat. Furnizorul de găzduire este OVHcloud; serverul nu este încă provisionat sau configurat.

## Flux Git și CI

Se lucrează direct pe `main`, fără branch `dev`; `main` reprezintă producția. Commit-urile și push-ul pot fi făcute și de agent, cu acordul utilizatorului.

CI (`.github/workflows/ci.yml`) rulează la fiecare push și PR pe `main`: secret scan cu gitleaks pe tot istoricul, `npm ci`, `npm audit --audit-level=high`, type-check, lint, teste Vitest și build. Dependabot (`.github/dependabot.yml`) propune lunar actualizări de dependențe și de GitHub Actions, cu cooldown de 30 de zile; merge-ul rămâne manual.

Deploy-ul pe OVHcloud nu este configurat; procedura se documentează când există.

## Întreținerea documentației

La fiecare sesiune se actualizează CHANGELOG, iar deciziile și acțiunile noi se reflectă în documentul lor de referință. Propunerile sunt marcate distinct de deciziile aprobate. Documentele de lucru nu se publică pe site și nu trebuie să conțină parole, chei API sau credențiale SMTP.
