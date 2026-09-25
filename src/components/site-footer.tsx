import Link from "next/link";
import { company } from "@/content/company";
import { footerTagline } from "@/content/home";
import { footerCompanyNav } from "@/content/navigation";
import { services } from "@/content/services";
import { Brand } from "./brand";

const headingClass = "mb-4 text-sm leading-normal tracking-[2px] uppercase";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-paper pt-12 pb-6 text-ink md:pt-16">
      <div className="wrap">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-[1.15fr_1fr_0.7fr_1fr] lg:gap-6 xl:gap-10">
          <div>
            <Brand className="mb-6" />
            <p className="mt-4 max-w-72 text-sm text-muted">{footerTagline}</p>
            <p className="mt-4 text-sm text-muted">Petroșani · Valea Jiului · Hunedoara</p>
          </div>

          <nav aria-label="Servicii în footer">
            <h2 className={headingClass}>Servicii</h2>
            {services.map((service) => (
              <a key={service.id} className="footer-link" href={`/#${service.id}`}>
                {service.title}
              </a>
            ))}
          </nav>

          <nav aria-label="Companie în footer">
            <h2 className={headingClass}>Companie</h2>
            {footerCompanyNav.map((item) =>
              item.href.includes("#") ? (
                <a key={item.label} className="footer-link" href={item.href}>
                  {item.label}
                </a>
              ) : (
                <Link key={item.label} className="footer-link" href={item.href}>
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div>
            <h2 className={headingClass}>Contact</h2>
            <a className="footer-link" href={`mailto:${company.email}`}>
              {company.email}
            </a>
            {company.phones.map((phone) => (
              <a key={phone.href} className="footer-link" href={phone.href}>
                {phone.display}
              </a>
            ))}
            <p className="mt-4 text-sm text-muted">
              {company.locality}, {company.county}
            </p>
            <p className="mt-4 text-sm text-muted">
              CUI {company.cui}
              <br />
              {company.tradeRegister}
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-line pt-6 md:flex-row md:items-start md:justify-between md:gap-8">
          <p className="text-sm text-muted">
            © {year} {company.legalName}
            <br />
            Toate drepturile rezervate.
          </p>
          {/* Paginile legale (date firmă, confidențialitate, cookies) urmează după verificarea
              datelor și a furnizorilor — B-012. Până atunci, starea e declarată explicit. */}
          <details className="max-w-105 text-sm">
            <summary className="min-h-11 cursor-pointer py-2">Date firmă · Confidențialitate · Cookies</summary>
            <p className="pt-3 text-muted">
              Paginile cu datele complete de identificare, politica de confidențialitate și informarea
              despre cookies sunt în pregătire. Site-ul nu folosește trackere sau cookies de marketing.
            </p>
          </details>
        </div>
      </div>
    </footer>
  );
}
