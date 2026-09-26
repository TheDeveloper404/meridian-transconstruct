import { existsSync } from "node:fs";
import path from "node:path";
import { Building2, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { company } from "@/content/company";
import { footerTagline } from "@/content/home";
import { anpcBadges, legalLinks } from "@/content/legal";
import { Brand } from "./brand";

// Footer pe 3 coloane (S26): denumirea, fraza de prezentare și copyright-ul; datele de contact, cu
// iconițe (regiunea o singură dată); paginile legale și pictogramele ANPC (190 px lățime).
// Fundal închis; fără tranziție oblică deasupra (S20) — secțiunea anterioară se termină drept.
// Pe telefon (sub 768 px) totul e centrat (S49); de la tabletă, aliniat la stânga.

function ContactItem({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <li className="flex min-h-9 items-center gap-3">
      <span aria-hidden="true" className="text-accent">
        {icon}
      </span>
      {children}
    </li>
  );
}

const headingClass = "mb-2 text-sm font-bold tracking-[2px] text-accent uppercase";

const linkClass = "no-underline transition-colors hover:text-accent focus-visible:text-accent";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const iconProps = { size: 16, strokeWidth: 2 };

  return (
    <footer className="dark bg-ink-deep pt-8 pb-6 md:pt-10">
      <div className="wrap grid gap-8 text-center md:grid-cols-2 md:text-left md:gap-10 lg:grid-cols-[1.1fr_1.3fr_auto] lg:gap-16">
        <div>
          <Brand />
          <p className="mx-auto mt-2 max-w-105 text-sm text-inverse md:mx-0">{footerTagline}</p>
          <p className="mt-6 text-sm text-inverse">
            © {year} {company.legalName} Toate drepturile rezervate.
          </p>
        </div>

        <div>
          <h2 className={headingClass}>Contact</h2>
          <ul className="flex flex-col items-center text-sm md:items-start">
            <ContactItem icon={<Mail {...iconProps} />}>
              <a className={`${linkClass} [overflow-wrap:anywhere]`} href={`mailto:${company.email}`}>
                {company.email}
              </a>
            </ContactItem>
            {company.phones.map((phone) => (
              <ContactItem key={phone.href} icon={<Phone {...iconProps} />}>
                <a className={linkClass} href={phone.href}>
                  {phone.display}
                </a>
              </ContactItem>
            ))}
            <ContactItem icon={<MapPin {...iconProps} />}>
              <span>
                {company.region}, județul {company.county}
              </span>
            </ContactItem>
            <ContactItem icon={<Building2 {...iconProps} />}>
              <span className="text-inverse">
                {company.legalName} · CUI {company.cui} · {company.tradeRegister}
                <br />
                Sediul: {company.registeredOfficeShort}
              </span>
            </ContactItem>
          </ul>
        </div>

        <div className="text-sm text-inverse">
          <h2 id="footer-legal-title" className={headingClass}>
            Informații legale
          </h2>
          <nav aria-labelledby="footer-legal-title" className="flex flex-col items-center md:items-start">
            {legalLinks.map((item) => (
              <Link key={item.href} href={item.href} className={`${linkClass} flex min-h-9 items-center`}>
                {item.label}
              </Link>
            ))}
          </nav>
          <ul className="mt-4 flex flex-col items-center gap-2 md:items-start">
            {anpcBadges.map((badge) => {
              const local = existsSync(path.join(process.cwd(), "public", badge.image));
              return (
                <li key={badge.id}>
                  <a
                    href={badge.href}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    aria-label={`${badge.label} (se deschide într-o filă nouă)`}
                    className="block w-max rounded-sm transition-opacity hover:opacity-85"
                  >
                    {/* Imagine statică mică (250 × 50); next/image nu aduce nimic aici, iar varianta
                        de rezervă e pe alt domeniu. */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={local ? badge.image : badge.remote}
                      alt={badge.label}
                      width={250}
                      height={50}
                      loading="lazy"
                      className="h-auto w-[190px]"
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </footer>
  );
}
