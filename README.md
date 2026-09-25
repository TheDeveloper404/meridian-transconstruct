# Meridian Transconstruct

Site de prezentare în limba română pentru MERIDIAN TRANSCONSTRUCT S.R.L., Petroșani. Obiective: vizibilitate în căutările locale, credibilitate la ofertare și solicitări prin telefon sau e-mail.

## Stadiu

Discovery-ul de bază și stack-ul sunt confirmate. Structura și direcția vizuală sunt în revizuire, cu o machetă responsive în cinci pagini, actualizată după feedback și verificată în browser.

**Nu există încă aplicație, dependențe instalate sau comenzi de pornire/testare.** Stack confirmat: Next.js + React + TypeScript + Tailwind CSS, cu trimitere e-mail prin SMTP. Găzduire aleasă: OVHcloud; serviciul concret și configurarea serverului se stabilesc în faza de deploy, după finalizarea site-ului local.

## Documentație

| Document | Rol |
|---|---|
| [PROJECT_BRIEF.md](PROJECT_BRIEF.md) | Cerințe, informațiile firmei, conținut, decizii de produs și materiale lipsă. |
| [ARCHITECTURE.md](ARCHITECTURE.md) | Propunerea tehnică, responsabilități, fluxuri și decizii de arhitectură. |
| [CHANGELOG.md](CHANGELOG.md) | Istoric pe sesiuni: activități, decizii, verificări și lucruri rămase deschise. |
| [BACKLOG.md](BACKLOG.md) | Pași rămași, dependențe și idei neaprobate. |
| [AGENTS.md](AGENTS.md) | Reguli locale pentru continuitatea lucrului și actualizarea documentației. |
| [docs/SITE_STRUCTURE.md](docs/SITE_STRUCTURE.md) | Sitemap propus, secțiuni, servicii, proiecte, formular și cerințe legale de bază. |
| [docs/DESIGN.md](docs/DESIGN.md) | Direcție vizuală, token-uri, responsive și comportamente planificate. |
| [docs/home-preview.html](docs/home-preview.html) | Punctul de intrare în macheta cu pagini separate, distinctă de aplicația Next.js. |

## Vizualizarea machetei

Fișierul HTML poate fi deschis direct în browser. Alternativ, cu Python disponibil, din rădăcina proiectului:

```powershell
python -m http.server 4173 --bind 127.0.0.1 --directory docs
```

Deschide `http://127.0.0.1:4173/home-preview.html`. Serverul este exclusiv local; se oprește cu Ctrl+C. Macheta are pagini individuale pentru Servicii, Proiecte, Despre și Contact. Formularul este dezactivat; proiectele au placeholder-e explicite. Hero-ul folosește un vizual generat, etichetat ca provizoriu; [proveniență și prompt](docs/assets/README.md).

[Verificarea browser a machetei](docs/qa/check-preview.cjs) se rulează cu `node docs/qa/check-preview.cjs`, având Playwright și Chromium disponibile în mediul de test (în această sesiune s-a folosit runtime-ul furnizat de Codex). Nu s-au instalat dependențe în proiect. Scriptul verifică cele cinci pagini, navigarea, imaginea, contactele, overflow-ul și contrastul la cinci lățimi și salvează [captura desktop](docs/previews/home-desktop.png) și [captura mobil](docs/previews/home-mobile.png).

## Limitele proiectului

- Conținut și fotografii administrate direct în cod de dezvoltator.
- Fără CMS, autentificare, panou de administrare, magazin sau bază de date de solicitări.
- Doar română; fără blog la lansare.
- Aproximativ 20 de proiecte declarate; fotografiile, fișele și acordurile de publicare urmează să fie primite.
- Domeniu dorit: `meridian-transconstruct.ro`, încă neachiziționat. Furnizorul de găzduire este OVHcloud; serverul nu este încă provisionat sau configurat.

## Dezvoltare și livrare

După aprobarea arhitecturii și scaffold, acest document va include versiunile runtime, instalarea, comenzile reale de dezvoltare, testare și build și configurația necesară. Instrucțiunile de deploy și actualizare a portofoliului se adaugă când există proceduri verificabile.

Codul urmează fluxul `dev` → PR → `main`; `main` reprezintă producția. Utilizatorul face commit și push. Nu se presupune că branch-urile sau infrastructura sunt deja configurate.

## Întreținerea documentației

La fiecare sesiune se actualizează CHANGELOG, iar deciziile și acțiunile noi se reflectă în documentul lor de referință. Propunerile sunt marcate distinct de deciziile aprobate. Documentele de lucru nu se publică automat pe site și nu trebuie să conțină parole, chei API sau credențiale SMTP.
