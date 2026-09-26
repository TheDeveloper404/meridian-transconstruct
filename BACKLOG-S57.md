# Backlog — de mutat în BACKLOG.md (S57)

Fișier temporar: BACKLOG.md e doar local (gitignored). Copiază rândurile de mai jos în el, apoi șterge acest fișier.

## B-016 — înlocuiește rândul actual

| B-016 | Limitare formular: proxy de încredere și mai multe instanțe | **Blocant la deploy (S57, revizuirea Codex):** `TRUST_PROXY=true` doar cu nginx în față, care suprascrie `X-Real-IP` / `X-Forwarded-For`; portul Node accesibil doar local (bind pe 127.0.0.1 sau firewall). Fără asta, toți vizitatorii împart limita de 5 cereri / oră, oricine o poate epuiza, iar în producție serverul avertizează în log. În nginx: `client_max_body_size 16k;` pe `/api/contact`, ca a doua barieră după limita din aplicație. Politica de confidențialitate spune că IP-ul e șters „după aproximativ o oră”; rămâne adevărat doar cu `CONTACT_RATE_LIMIT_WINDOW_MINUTES` ≤ 60. Limitarea e în memoria unui singur proces; la mai multe instanțe sau restarturi dese se mută într-un magazin partajat. |

## B-015 — adaugă la finalul rândului

 Semnalat și în revizuirea de securitate Codex (S57).

## B-007 — adaugă la finalul rândului

 **S57:** conexiunea SMTP cere obligatoriu TLS (STARTTLS pe 587 sau TLS pe 465, minim TLS 1.2); la testul de primire se verifică și că furnizorul acceptă asta, altfel e-mailul nu pleacă.

## „De unde reluăm” › 4. Deploy și lansare — adaugă punctul

- **Blocant de securitate:** `TRUST_PROXY=true` în spatele nginx, cu portul Node închis din exterior, plus `client_max_body_size 16k` (B-016); CSP/HSTS (B-015); pictogramele ANPC locale (B-021).

## CHANGELOG — sesiunea S57

**S57 — Revizuirea de securitate Codex** (commit `ea4c6e4`). Toate cele 7 constatări confirmate în cod; 5 reparate, 2 rămân pentru deploy.

- SMTP: TLS obligatoriu — `requireTLS` pe 587 (STARTTLS), TLS implicit pe 465, minim TLS 1.2.
- Corpul cererii citit pe bucăți, cu oprire la 16 KiB; înainte, un corp chunked fără Content-Length era citit integral (reprodus în test: 513 bucăți citite, acum se oprește devreme). Verificat manual: 512 KiB chunked → 413.
- Honeypot-ul verificat înaintea limitei: spamul filtrat nu mai consumă din cota vizitatorilor reali. Avertisment în log în producție când `TRUST_PROXY` nu e activ.
- IP-urile cu fereastra expirată se șterg din memorie la fiecare minut; politica de confidențialitate spune acum „ștearsă automat după aproximativ o oră”.
- `.gitignore`: `.env` și `.env.*` ignorate din nou, `.env.example` rămâne versionat.
- Rămân pentru deploy: CSP/HSTS (B-015), pictogramele ANPC locale (B-021).
- Verificări: typecheck, lint, 47 de teste Vitest, build — toate trecute; CI verde.
