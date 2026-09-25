// Configurația publică a site-ului, citită la build (paginile sunt prerandate).

/** URL-ul canonic. Domeniul dorit nu este încă achiziționat (B-010); se suprascrie cu SITE_URL. */
export const siteUrl = (process.env.SITE_URL ?? "https://meridian-transconstruct.ro").replace(/\/+$/, "");

/** Indexarea e oprită implicit până la lansare; se pornește explicit cu ALLOW_INDEXING=true. */
export const allowIndexing = process.env.ALLOW_INDEXING === "true";
