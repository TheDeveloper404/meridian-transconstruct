# Vizual provizoriu pentru hero

Imagine generată prin instrumentul integrat `image_gen` la 25 septembrie 2026. Este un concept pentru validarea designului, nu o fotografie a unei lucrări Meridian Transconstruct și nu se folosește în portofoliu. Marcajul este vizibil în machetă și în aplicație (`public/images/hero-concept.webp`, eticheta controlată de `hero.image.isConcept` în `src/content/home.ts`); fotografia firmei rămâne material de primit.

- Original: [hero-concept.png](hero-concept.png).
- Versiune pentru browser: [hero-concept.webp](hero-concept.webp), 1672 × 941 px, 158.414 bytes. Conversie WebP cu Sharp, calitate 82, fără schimbarea compoziției.
- Originalul generat a fost copiat în proiect; previzualizarea nu depinde de directorul personal Codex.

## Promptul folosit

Use case: ads-marketing. Asset type: wide website hero background, 16:9 landscape. Create a photorealistic conceptual construction scene for a Romanian civil construction company design preview. Low-rise concrete and brick building under construction, structural columns and slabs, orderly site, distant hills, early evening light, deep blue sky with warm natural sunlight on the concrete. Architectural details predominantly on the right half, calmer darker foreground on left for white page heading overlay. Realistic modest-scale Romanian building context, not skyscrapers, no people, no logos, no signage, no text, no watermark. This is a generic concept, not an actual company project or portfolio photo. Wide composition suitable for cropping on mobile.

## Imagini de generat (S12)

Mediul de lucru al agentului nu are generator de imagini și nici acces la bănci de imagini, deci imaginile de mai jos trebuie generate separat (de exemplu cu același instrument ca vizualul de mai sus) și puse în proiect cu **exact** numele indicate. Formatul recomandat: WebP, calitate ~82. Toate rămân marcate „Ilustrativ” pe site până la înlocuirea cu fotografii reale.

Stil comun (de adăugat la fiecare prompt): *photorealistic, modest-scale Romanian context, early evening golden light with deep blue sky, no people, no logos, no signage, no text, no watermark; generic concept, not an actual company project.*

### Hero — șantier cu blocuri (înlocuiește `hero-concept`)

Fișier: `public/images/hero-blocuri.webp`, 16:9, minimum 1920 × 1080. După adăugare, în `src/content/home.ts` → `hero.image.src = "/images/hero-blocuri.webp"` și dimensiunile reale.

> Wide website hero background, 16:9 landscape. Construction site of a mid-rise residential apartment block (5–8 floors) in a Romanian mountain town, reinforced concrete frame partly clad in brick and thermal insulation, one tower crane, scaffolding on one side, orderly site with materials stacked. Architectural details predominantly on the right half; calmer, darker foreground on the left for white heading text overlay. Distant forested hills. Suitable for cropping on mobile.

### Galerie — `public/images/galerie/`, 4:3, minimum 1600 × 1200

| Fișier | Categorie | Prompt (+ stilul comun) |
|---|---|---|
| `bloc-locuinte.webp` | Clădiri rezidențiale | Newly finished mid-rise residential apartment building, clean facade with light render and warm accents, balconies, landscaped entrance, eye-level three-quarter view. |
| `hala-industriala.webp` | Hale industriale | Newly built industrial hall with steel structure and insulated sandwich panel cladding in grey and dark blue, large sectional doors, concrete apron, wide-angle exterior view. |
| `casa.webp` | Case la cheie | Newly finished two-storey family house, modern but modest Romanian style, pitched roof, render facade with wood accents, small tidy yard. |
| `renovare-fatada.webp` | Renovări și reabilitări | Older apartment building facade during thermal rehabilitation: half of the facade with new insulation and fresh render, the other half still old, scaffolding, clear before/after contrast. |
| `interior-finisaje.webp` | Finisaje interioare | Bright finished interior of a new home, living area with large windows, light walls, wooden floor, minimal furniture, natural daylight. |

Imaginea „Construcții civile” din galerie folosește deja `hero-concept.webp`. Pentru fotografiile reale ale firmei: aceleași fișiere pot fi înlocuite, iar în `src/content/projects.ts` elementul primește `illustrative: false` și un titlu factual.
