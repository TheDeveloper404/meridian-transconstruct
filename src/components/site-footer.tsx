import { existsSync } from "node:fs";
import path from "node:path";
import { Building2, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { company } from "@/content/company";
import { footerTagline } from "@/content/home";
import { anpcBadges, legalLinks } from "@/content/legal";
import { Brand } from "./brand";

// Footer (S12b): doar datele de contact, pe un rând, cu iconițe; regiunea apare o singură dată.
// Fundal închis; tranziția oblică de deasupra o randează fiecare pagină (depinde de secțiunea
// anterioară), vezi SectionEdge.

function ContactItem({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <li className="flex min-h-11 items-center gap-3">
      <span aria-hidden="true" className="text-accent">
        {icon}
      </span>
      {children}
    </li>
  );
}

const linkClass = "no-underline transition-colors hover:text-accent focus-visible:text-accent";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const iconProps = { size: 18, strokeWidth: 2 };

  return (
    <footer className="dark bg-ink-deep pt-10 pb-8 md:pt-12">
      <div className="wrap">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Brand />
          <p className="max-w-105 text-sm text-inverse md:text-right">{footerTagline}</p>
        </div>

        <h2 className="sr-only">Contact</h2>
        <ul className="mt-8 flex flex-col gap-x-10 gap-y-2 text-[15px] md:mt-10 md:flex-row md:flex-wrap">
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
            </span>
          </ContactItem>
        </ul>

        <div className="mt-8 flex flex-col gap-6 pt-6 text-sm text-inverse md:mt-10 lg:flex-row lg:items-center lg:justify-between">
          <p>
            © {year} {company.legalName} Toate drepturile rezervate.
          </p>
          <nav aria-label="Informații legale" className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {legalLinks.map((item) => (
              <Link key={item.href} href={item.href} className={`${linkClass} flex min-h-11 items-center`}>
                {item.label}
              </Link>
            ))}
          </nav>
          <ul className="flex flex-wrap items-center gap-3">
            {anpcBadges.map((badge) => {
              const hasImage = existsSync(path.join(process.cwd(), "public", badge.image));
              return (
                <li key={badge.id}>
                  <a
                    href={badge.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${badge.label} (se deschide într-o filă nouă)`}
                    className="flex h-12 items-center rounded-sm border border-inverse/40 bg-paper px-3 font-bold text-ink no-underline transition hover:border-accent"
                  >
                    {hasImage ? (
                      <Image src={badge.image} alt="" width={200} height={40} className="h-10 w-auto" />
                    ) : (
                      badge.short
                    )}
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
