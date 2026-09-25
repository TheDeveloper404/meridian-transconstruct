# Direcție vizuală — propunere

25 septembrie 2026. Macheta începe cu [home-preview.html](home-preview.html) și are pagini individuale pentru [Servicii](servicii.html), [Proiecte](proiecte.html), [Despre](despre.html) și [Contact](contact.html). CSS-ul comun este preview.css. Nu este aplicația Next.js; formularul de pe Contact este explicit inactiv.

## Concept

Aspect sobru, clar și vizual: fundaluri albastru închis și alb cald, accent portocaliu, titluri mari, fotografii reale dominante și delimitări simple între secțiuni. O singură direcție propusă. Scopul este ca un beneficiar să înțeleagă rapid ce execută firma, unde lucrează și cum o contactează.

## Token-uri propuse

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

O familie sans-serif: fonturile sistemului în machetă; recomandare de producție Inter găzduit local, de verificat la implementare. Maximum trei greutăți (400, 500, 700). Scară: 14/16/20/28/40/64 px; titlul mare se adaptează până la 40 px pe mobil. Text curent 16 px, line-height 1.6; titluri 1.1–1.2.

Spațiere: 4/8/12/16/24/32/48/64 px. Container maximum 1200 px. Butoane minimum 48 px înălțime; colțuri de 4 px și fără amestec de capsule/carduri rotunde. Focus vizibil cu contur dublu sau culoare contrastantă cu suprafața.

## Componente

- Header: denumire provizorie în text, cinci pagini și CTA; fără număr de telefon, conform cererii utilizatorului. Ambele numere rămân în Contact. Butonul telefonic de mobil este în partea de jos, nu în header.
- Hero: imagine pe întreg fundalul, cu strat albastru închis pentru lizibilitate și text suprapus; un singur buton principal și un link secundar. Vizualul generat este provizoriu și marcat explicit; vezi [proveniența](assets/README.md).
- Servicii: rânduri numerotate sau grilă simplă; fiecare element conduce la pagina dedicată în implementare.
- Proiecte: imagine 4:3, categorie, titlu și localitate/an dacă sunt cunoscute. Fără badge-uri „premium” sau indicatori inventați.
- Acasă: secțiunea finală este un CTA scurt către Contact, fără repetarea telefoanelor și formularului. Pagina Contact are ambele telefoane, e-mailul și macheta formularului.
- Footer: date de firmă verificate și linkurile legale. Adresa completă rămâne pentru pagina de identificare legală, după validare.

## Responsive și stări

Mobil sub 768 px: o coloană, meniu nativ accesibil în machetă, buton telefon persistent și padding inferior pentru a nu acoperi conținutul. Tabletă 768–1023 px: grile pe două coloane, meniu compact. Desktop de la 1024 px: navigare completă și hero cu imagine pe întreg fundalul. Verificare la 375, 768, 1024 și 1440 px, plus 320 px pentru overflow.

Fără poze: portofoliul prezintă explicit zone de fotografie; în producție nu se publică proiecte fictive. Dacă nu există proiecte publicabile, starea goală explică disponibilitatea portofoliului și oferă contact. Puține proiecte: afișăm doar cele reale, fără celule artificiale. Fără recenzii: secțiunea este omisă.

La implementare: dimensiuni de imagine rezervate pentru evitarea salturilor, stări de încărcare/eroare pentru acțiuni și formular, navigare păstrată pe 404/eroare și cale de revenire. Galeria va avea navigare cu tastatura, închidere Escape și focus gestionat dacă se introduce un dialog.

## Accesibilitate și performanță

HTML semantic, o singură poziție H1, link de salt, nume accesibile explicite, focus vizibil, ținte de minimum 44×44 px, contrast AA și respectarea preferinței de mișcare redusă. Informația nu depinde exclusiv de culoare. Fără carusel automat, video de fundal sau animații care blochează conținutul.

Macheta nu folosește dependențe, fonturi sau imagini externe. Verificarea ei nu dovedește performanța aplicației finale. La implementare se măsoară imaginile reale și JavaScript-ul efectiv livrat.

## Limite și validare

Logo-ul și fotografiile lipsesc; textul este editorial de lucru. Formularul demonstrativ este pe pagina Contact, cu câmpuri și buton dezactivate; CTA-urile navighează către această pagină. Serviciul 03 este „Construcții civile”, iar secțiunea 03 / Firma de pe Acasă este păstrată. Culorile, structura și copy-ul rămân pentru aprobare. Dovezile de verificare a machetei se consemnează în [CHANGELOG.md](../CHANGELOG.md).
