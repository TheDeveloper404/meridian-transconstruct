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

O familie sans-serif: fonturile sistemului în machetă; în aplicație Inter găzduit local prin `next/font` (A-003). Maximum trei greutăți (400, 500, 700). Scară: 16/18/22/30/42/66 px (toate dimensiunile +2 px în S18, la cererea utilizatorului; utilitarele `text-*` ale Tailwind sunt redefinite în `@theme`); titlul mare se adaptează până la 42 px pe mobil. Text curent 18 px, line-height 1.6; titluri 1.1–1.2. Denumirea din logo are dimensiunile ei (lățimile rândurilor sunt potrivite), neschimbate.

Spațiere: 4/8/12/16/24/32/48/64 px. Container maximum 1600 px (1200 → 1440 în S17 → 1680 în S18 → 1600 în S25, la cererea utilizatorului). Butoane de 48 px înălțime, text 17 px (micșorate în S18 de la 52 px), în formă de capsulă conform machetei finale; câmpurile de formular au colțuri de 14 px. Fără carduri rotunjite. Focus vizibil cu contur dublu sau culoare contrastantă cu suprafața.

## Componente

- Header: lipit sus; la scroll fundalul devine albastru închis semi-transparent (~75%) cu estompare, ca meniul alb să rămână lizibil peste secțiunile deschise (S11). Denumire provizorie în text, meniu cu cinci intrări — Acasă, Ce construim (ancoră), Despre firmă (ancoră), Lucrări realizate (`/proiecte`), Contact (denumiri alese de utilizator în S19; ordinea din S20: întâi secțiunile de pe Acasă, apoi paginile) — și CTA, afișate complet de la 1280 px (sub acest prag, meniul compact); „Acasă” și denumirea firmei, apăsate pe Acasă, urcă în capul paginii; fără număr de telefon, conform cererii utilizatorului. Ambele numere rămân în Contact. Butonul telefonic de mobil este în partea de jos, nu în header.
- Hero: imagine pe întreg fundalul, cu strat albastru închis pentru lizibilitate și text suprapus; un singur buton principal și un link secundar. Vizualul generat este provizoriu și marcat explicit; vezi [proveniența](assets/README.md).
- Servicii: rânduri numerotate; fiecare serviciu are un link spre Contact (pagini dedicate de servicii — B-003).
- Hero (S18): pe aproape tot ecranul (`100svh` minus header, pe desktop); imaginea pe tot fundalul, titlu până la 84 px, două CTA-uri; jos, cele 5 servicii ca plachete semi-transparente (număr, iconiță Lucide, titlu, săgeată) care devin portocalii la hover și duc la serviciul de pe Acasă, deschizându-i panoul (S19). Pe mobil 2 coloane, pe tabletă 3, pe desktop 5.
- Servicii pe Acasă (S19): panouri albe `<details>` — număr conturat, iconiță, titlu și subtitlu, buton rotund „+” care se rotește în „×” la deschidere; în panou, textele complete, punctele cheie și linkul spre Contact. La deschidere (S20): bară portocalie pe marginea stângă, numărul se umple cu portocaliu, umbră, înălțimea crește lin (`::details-content`, unde browserul permite), iar conținutul intră pe rând — etichetele, textul, apoi „Ce executăm” (bife) și „Pentru cine”. Paginile `/servicii` din S18 au fost eliminate. Efectul de navigare între pagini (S19) a fost scos în S20.
- Efecte la navigarea între pagini: încercate și scoase — apariție cu fade (S19–S20), tranziție cu element comun a copertei de album (S21–S22). Din S23: bară de progres portocalie de 3 px în capul paginii — crește cât se încarcă pagina nouă, apoi se completează și dispare; conținutul nu se mișcă.
- Proiecte (galerie, S12): grilă „bento” pe 12 coloane (tile mare 7×2 rânduri, apoi 5, 5, 4, 4, 4), 2 coloane pe tabletă, una pe telefon; colțuri de 2 px; la hover zoom lent pe imagine, gradient mai intens, legenda urcă și apare butonul portocaliu de mărire; clic → dialog pe tot ecranul (săgeți, ←/→, Esc, focus returnat). Eticheta „Ilustrativ” pe imaginile generate. Fără badge-uri „premium” sau indicatori inventați.
- Denumire (S12): „MERIDIAN” are exact lățimea lui „TRANSCONSTRUCT” (34/15 px desktop, 28/13 px mobil), literele distribuite pe lățime.
- Meniu (S12): 19 px; la hover fundal portocaliu discret, text portocaliu și subliniere care crește din centru.
- Acasă: secțiunea finală este un CTA scurt către Contact, fără repetarea telefoanelor și formularului. Pagina Contact are ambele telefoane, e-mailul și formularul (în machetă dezactivat, în aplicație funcțional).
- Footer (S13/S14/S18, 3 coloane din S26): fundal închis; (1) denumirea, fraza scurtă și copyright-ul; (2) „Contact” — datele de contact una sub alta, text 16 px, cu iconițe Lucide (e-mail, telefoane, zonă, date firmă cu sediul pe scurt: municipiul și județul — regiunea o singură dată); (3) „Informații legale” — Politica de confidențialitate, Termeni și condiții și butoanele ANPC (SAL, SOL) de 190 px, una sub alta. 2 coloane pe tabletă, una pe telefon. Adresa completă rămâne pentru pagina de identificare legală, după validare.
- WhatsApp (S18): buton rotund flotant, jos-dreapta, pe toate paginile, în verdele mărcii (`--color-whatsapp`, singura culoare din afara paletei); deschide conversația cu 0726 379 408. Pe mobil stă deasupra barei „Sună”.
- Contact (S13, S20): un singur container alb, cu umbră, pe o coloană (maximum 960 px, centrat) — formularul sus, dedesubt bandă închisă „Contact direct” (titlu și text în stânga; telefoane și e-mail compacte în dreapta, coborâte un rând față de titlu, fără zonă — S22/S23); umbră moale, vizibilă, în spatele containerului. Pe telefon formularul vine primul.

## Tranziții între secțiuni (S13)

Fără linii orizontale între secțiuni sau între elementele unei liste (cerința utilizatorului). Trecerea dintre secțiuni este o margine oblică în culoarea secțiunii următoare, cu o fâșie portocalie subțire pe diagonală (`SectionEdge`, S13); panta alternează (`flip`); spre footer nu există tranziție — secțiunea se termină drept (S20). Varianta „zid de cărămidă” (S14–S18) a fost abandonată în S19 la cererea utilizatorului. Serviciile sunt panouri separate prin spațiu, cu numere mari conturate în portocaliu. Footer-ul este albastru foarte închis (`ink-deep`), ca fiecare pagină să se încheie cu aceeași tranziție.

## Responsive și stări

Mobil sub 768 px: o coloană, meniu nativ accesibil în machetă, buton telefon persistent și padding inferior pentru a nu acoperi conținutul. Tabletă 768–1023 px: grile pe două coloane, meniu compact. Desktop de la 1024 px: navigare completă și hero cu imagine pe întreg fundalul. Verificare la 375, 768, 1024 și 1440 px, plus 320 px pentru overflow.

Fără poze: macheta prezintă explicit zone de fotografie; aplicația afișează starea goală de mai jos (A-002), fără proiecte fictive. Dacă nu există proiecte publicabile, starea goală explică disponibilitatea portofoliului și oferă contact. Puține proiecte: afișăm doar cele reale, fără celule artificiale. Fără recenzii: secțiunea este omisă.

Implementat în aplicație: dimensiuni de imagine rezervate, stări pentru formular (erori pe câmpuri cu focus, trimitere în curs, succes, eroare cu datele păstrate), 404 cu navigarea păstrată și cale de revenire. Galeria de proiecte (neimplementată încă) va avea navigare cu tastatura, închidere Escape și focus gestionat dacă se introduce un dialog.

## Accesibilitate și performanță

HTML semantic, o singură poziție H1, link de salt, nume accesibile explicite, focus vizibil, ținte de minimum 44×44 px, contrast AA și respectarea preferinței de mișcare redusă. Informația nu depinde exclusiv de culoare. Fără carusel automat, video de fundal sau animații care blochează conținutul.

Macheta nu folosește dependențe, fonturi sau imagini externe; aplicația, de asemenea, nu face cereri externe la rulare (fontul e găzduit local). Performanța se măsoară pe build de producție după primirea imaginilor reale (B-013).

## Limite și validare

Logo-ul și fotografiile lipsesc; textul este editorial de lucru. În machetă formularul de pe Contact e demonstrativ (dezactivat); în aplicație trimite prin SMTP. CTA-urile navighează către Contact. Serviciul 03 este „Construcții civile”, iar secțiunea 03 / Firma de pe Acasă este păstrată. Copy-ul final și deciziile provizorii A-001…A-006 rămân de aprobat. Dovezile de verificare (machetă și aplicație) se consemnează în [CHANGELOG.md](../CHANGELOG.md).
