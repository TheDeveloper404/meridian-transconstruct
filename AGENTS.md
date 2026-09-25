# Reguli locale — Meridian Transconstruct

Aceste reguli completează instrucțiunile globale de engineering. Nu înlocuiesc regulile de securitate, clasificare, testare, review sau Git.

## La începutul sesiunii

1. Citește [README.md](README.md), ultimele intrări din [CHANGELOG.md](CHANGELOG.md) și elementele relevante din [BACKLOG.md](BACKLOG.md).
2. Consultă [PROJECT_BRIEF.md](PROJECT_BRIEF.md) pentru produs/conținut și [ARCHITECTURE.md](ARCHITECTURE.md) pentru deciziile tehnice relevante.
3. Verifică stadiul real înainte să editezi; nu trata o propunere documentată drept aprobare sau o procedură planificată drept funcționalitate implementată.

## În timpul lucrului

- Lucrează pe faze; rezumă deciziile și propune următorul pas. Respectă redirecționările explicite ale utilizatorului.
- Scaffold-ul există (S06). Schimbările structurale noi (rute, dependențe, integrări) se propun înainte de implementare.
- Păstrează conținutul separat de componente; adaptează Clean Architecture la dimensiunea site-ului. Nu adăuga straturi fără responsabilitate reală.
- Formularul va separa UI/handler, regulile de contact și transportul e-mail. Validarea și protecțiile se aplică pe server.
- Nu inventa lucrări, recenzii, certificări, rezultate sau date ale firmei. Folosește placeholder-e explicite în lucru; elimină-le înainte de lansare.
- Ideile suplimentare intră în backlog; înregistrarea lor nu autorizează implementarea.
- Deciziile structurale luate provizoriu fără design real se notează în backlog cu `ASSUMED — needs ratification`, motiv și impact. O propunere încă neadoptată nu este o decizie asumată.
- Nu crea documente goale preventiv. Adaugă documentație de deploy, conținut, API, ADR sau incidente când există o nevoie concretă; indexeaz-o în README.

## La închiderea fiecărei sesiuni

- Adaugă o intrare datată în [CHANGELOG.md](CHANGELOG.md): scop/clasificare, ce s-a făcut, decizii și starea aprobărilor, verificări reale, blocaje și următorul pas. Pentru mai multe sesiuni în aceeași zi folosește identificatori consecutivi. Nu inventa istoricul lipsă.
- Actualizează documentele afectate: brief pentru produs, arhitectură pentru soluția tehnică, README pentru utilizare, backlog pentru acțiuni și idei.
- Nu dubla descrierile ample: folosește linkuri către documentul de referință.
- Înregistrează exact ce teste/verificări au rulat și ce s-a omis, cu motiv. Pentru documentație simplă sunt suficiente verificarea coerenței și a legăturilor locale.
- Închide taskul cu verdictul proporțional. Se lucrează direct pe `main`; utilizatorul a autorizat agentul să facă commit și push (2026-09-25), după ce type-check, lint, testele și build-ul trec local.
