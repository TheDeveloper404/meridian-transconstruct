import Link from "next/link";
import { contactTeaser } from "@/content/home";

// Secțiunea finală de pe Acasă: doar CTA spre Contact, fără telefoane sau formular (SITE_STRUCTURE › 7).
export function ContactTeaser() {
  return (
    <section aria-labelledby="teaser-title" className="dark py-12 md:py-16">
      <div className="wrap flex max-w-195 flex-col items-center gap-6 py-4 text-center">
        <div>
          <p className="eyebrow">{contactTeaser.eyebrow}</p>
          <h2 id="teaser-title">{contactTeaser.title}</h2>
          <p className="mx-auto mt-6 max-w-150 text-inverse">{contactTeaser.text}</p>
        </div>
        <Link href="/contact" className="button">
          {contactTeaser.cta}
          <span aria-hidden="true" className="arrow">
            ↗
          </span>
        </Link>
      </div>
    </section>
  );
}
