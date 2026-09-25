# Direcție vizuală

25 septembrie 2026. Macheta finală are două pagini: [home-preview.html](home-preview.html) (Acasă, cu Servicii, Proiecte și Despre ca secțiuni ancorate) și [contact.html](contact.html); CSS-ul comun este preview.css. Paginile separate Servicii/Proiecte/Despre din versiunea S04 au fost eliminate din machetă. Aplicația Next.js (`src/`) implementează această variantă — vezi A-001 în [BACKLOG](../BACKLOG.md).

## Concept

Aspect sobru, clar și vizual: fundaluri albastru închis și alb cald, accent portocaliu, titluri mari, fotografii reale dominante și delimitări simple între secțiuni. O singură direcție propusă. Scopul este ca un beneficiar să înțeleagă rapid ce execută firma, unde lucrează și cum o contactează.

## Token-uri

| Rol | Valoare |
|---|---|
| Primar / cerneală | `#101F3C` |
| Accent / CTA | `#F8A046`, cu text albastru închis |
| Fundal | `#F5F3ED` |
| Suprafață | `#FFFFFF` |
| Text secundar | `#526077` pe fundal deschis |
| Text pe fundal închis | `#F5F3ED`; secundar `#C4CEDE` |
| Contur pe deschis | `#D8DCE3` |
| Semantic | Eroare `#A62828`; succes `#21643C`; avertizare `#795400`; informare `#285C88`, pe alb |

În aplicație, token-urile sunt definite în `src/app/globals.css` (`@theme`, Tailwind CSS 4).

O familie sans-serif: fonturile sistemului în machetă; în aplicație Inter găzduit local prin `next/font` (A-003). Maximum trei greutăți (400, 500, 700). Scară: 14/16/20/28/40/64 px; titlul mare se adaptează până la 40 px pe mobil. Text curent 16 px, line-height 1.6; titluri 1.1–1.2.

Spațiere: 4/8/12/16/24/32/48/64 px. Container maximum 1200 px. Butoane minimum 48 px înălțime (52 px în machetă), în formă de capsulă conform machetei finale; câmpurile de formular au colțuri de 14 px. Fără carduri rotunjite. Focus vizibil cu contur dublu sau culoare contrastantă cu suprafața.

## Componente

- Header: lipit sus; la scroll fundalul devine albastru închis semi-transparent (~75%) cu estompare, ca meniul alb să rămână lizibil peste secțiunile deschise (S11). Denumire provizorie în text, meniu cu cinci intrări (Acasă, Servicii, Proiecte, Despre ca ancore pe Acasă, Contact) și CTA; fără număr de telefon, conform cererii utilizatorului. Ambele numere rămân în Contact. Butonul telefonic de mobil este în partea de jos, nu în header.
- Hero: imagine pe întreg fundalul, cu strat albastru închis pentru lizibilitate și text suprapus; un singur buton principal și un link secundar. Vizualul generat este provizoriu și marcat explicit; vezi [proveniența](assets/README.md).
- Servicii: rânduri numerotate; fiecare serviciu are un link spre Contact (pagini dedicate de servicii — B-003).
- Proiecte (galerie, S12): grilă „bento” pe 12 coloane (tile mare 7×2 rânduri, apoi 5, 5, 4, 4, 4), 2 coloane pe tabletă, una pe telefon; colțuri de 2 px; la hover zoom lent pe imagine, gradient mai intens, legenda urcă și apare butonul portocaliu de mărire; clic → dialog pe tot ecranul (săgeți, ←/→, Esc, focus returnat). Eticheta „Ilustrativ” pe imaginile generate. Fără badge-uri „premium” sau indicatori inventați.
- Denumire (S12): „MERIDIAN” are exact lățimea lui „TRANSCONSTRUCT” (34/15 px desktop, 28/13 px mobil), literele distribuite pe lățime.
- Meniu (S12): 19 px; la hover fundal portocaliu discret, text portocaliu și subliniere care crește din centru.
- Acasă: secțiunea finală este un CTA scurt către Contact, fără repetarea telefoanelor și formularului. Pagina Contact are ambele telefoane, e-mailul și formularul (în machetă dezactivat, în aplicație funcțional).
- Footer: date de firmă verificate și linkurile legale. Adresa completă rămâne pentru pagina de identificare legală, după validare.

## Responsive și stări

Mobil sub 768 px: o coloană, meniu nativ accesibil în machetă, buton telefon persistent și padding inferior pentru a nu acoperi conținutul. Tabletă 768–1023 px: grile pe două coloane, meniu compact. Desktop de la 1024 px: navigare completă și hero cu imagine pe întreg fundalul. Verificare la 375, 768, 1024 și 1440 px, plus 320 px pentru overflow.

Fără poze: macheta prezintă explicit zone de fotografie; aplicația afișează starea goală de mai jos (A-002), fără proiecte fictive. Dacă nu există proiecte publicabile, starea goală explică disponibilitatea portofoliului și oferă contact. Puține proiecte: afișăm doar cele reale, fără celule artificiale. Fără recenzii: secțiunea este omisă.

Implementat în aplicație: dimensiuni de imagine rezervate, stări pentru formular (erori pe câmpuri cu focus, trimitere în curs, succes, eroare cu datele păstrate), 404 cu navigarea păstrată și cale de revenire. Galeria de proiecte (neimplementată încă) va avea navigare cu tastatura, închidere Escape și focus gestionat dacă se introduce un dialog.

## Accesibilitate și performanță

HTML semantic, o singură poziție H1, link de salt, nume accesibile explicite, focus vizibil, ținte de minimum 44×44 px, contrast AA și respectarea preferinței de mișcare redusă. Informația nu depinde exclusiv de culoare. Fără carusel automat, video de fundal sau animații care blochează conținutul.

Macheta nu folosește dependențe, fonturi sau imagini externe; aplicația, de asemenea, nu face cereri externe la rulare (fontul e găzduit local). Performanța se măsoară pe build de producție după primirea imaginilor reale (B-013).

## Limite și validare

Logo-ul și fotografiile lipsesc; textul este editorial de lucru. În machetă formularul de pe Contact e demonstrativ (dezactivat); în aplicație trimite prin SMTP. CTA-urile navighează către Contact. Serviciul 03 este „Construcții civile”, iar secțiunea 03 / Firma de pe Acasă este păstrată. Copy-ul final și deciziile provizorii A-001…A-006 rămân de aprobat. Dovezile de verificare (machetă și aplicație) se consemnează în [CHANGELOG.md](../CHANGELOG.md).
