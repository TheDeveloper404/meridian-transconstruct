import type { Metadata } from "next";
import Link from "next/link";

// Next adaugă singur `<meta name="robots" content="noindex">` pe 404, dar layout-ul ar adăuga și
// `index, follow` când indexarea e pornită — suprascriem ca etichetele să nu se contrazică.
export const metadata: Metadata = {
  title: "Pagina nu a fost găsită",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="dark py-16 md:py-24">
      <div className="wrap">
        <p className="eyebrow">Eroare 404</p>
        <h1 className="mb-6">Pagina nu a fost găsită.</h1>
        <p className="mb-8 max-w-150 text-inverse">
          Adresa poate fi greșită sau pagina a fost mutată. Poți reveni la prima pagină sau ne poți
          contacta direct.
        </p>
        <div className="flex flex-wrap items-center gap-6">
          <Link href="/" className="button">
            Înapoi la prima pagină
          </Link>
          <Link href="/contact" className="text-link">
            Contact
          </Link>
        </div>
      </div>
    </section>
  );
}
