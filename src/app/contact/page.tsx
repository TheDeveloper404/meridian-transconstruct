import { Mail, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { PageHeading } from "@/components/page-heading";
import { SectionEdge } from "@/components/section-edge";
import { company } from "@/content/company";
import { contactPage } from "@/content/contact";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact și cerere ofertă",
  description:
    "Cere o ofertă pentru construcții civile, clădiri, hale industriale, renovări sau case în Petroșani și Valea Jiului. Telefon, e-mail și formular de contact.",
  path: "/contact",
});

// Formularul e elementul principal (S12b); datele de contact stau într-un panou închis alături.
// Pe telefon formularul vine primul — butonul „Sună” e oricum fix în partea de jos.
export default function ContactPage() {
  const iconProps = { size: 20, strokeWidth: 2 };

  return (
    <>
      <PageHeading title={contactPage.title} lead={contactPage.lead} />
      <SectionEdge from="ink" to="paper" />
      <section className="pt-4 pb-12 md:pt-8 md:pb-20">
        <div className="wrap grid gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="lg:order-2 lg:col-span-7">
            <ContactForm />
          </div>

          <aside
            aria-labelledby="contact-panel-title"
            className="dark rounded-sm p-6 md:p-8 lg:sticky lg:top-32 lg:order-1 lg:col-span-5 lg:self-start"
          >
            <p className="eyebrow mb-4">{contactPage.panelKicker}</p>
            <h2 id="contact-panel-title" className="mb-4 text-[28px]">
              {contactPage.panelHeading}
            </h2>
            <p className="mb-8 text-inverse">{contactPage.panelText}</p>

            <ul className="flex flex-col gap-5">
              {company.phones.map((phone) => (
                <li key={phone.href}>
                  <a
                    href={phone.href}
                    className="group flex items-center gap-4 text-[26px] leading-none font-bold no-underline"
                  >
                    <span
                      aria-hidden="true"
                      className="flex size-12 shrink-0 items-center justify-center rounded-full bg-accent text-ink transition group-hover:scale-105"
                    >
                      <Phone {...iconProps} />
                    </span>
                    <span className="transition-colors group-hover:text-accent">{phone.display}</span>
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${company.email}`} className="group flex items-center gap-4 no-underline">
                  <span
                    aria-hidden="true"
                    className="flex size-12 shrink-0 items-center justify-center rounded-full border border-inverse/40 text-accent transition group-hover:border-accent"
                  >
                    <Mail {...iconProps} />
                  </span>
                  <span className="[overflow-wrap:anywhere] transition-colors group-hover:text-accent">
                    {company.email}
                  </span>
                </a>
              </li>
              <li className="flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="flex size-12 shrink-0 items-center justify-center rounded-full border border-inverse/40 text-accent"
                >
                  <MapPin {...iconProps} />
                </span>
                <span>
                  {company.region}, județul {company.county}
                </span>
              </li>
            </ul>
          </aside>
        </div>
      </section>
      <SectionEdge from="paper" to="deep" flip />
    </>
  );
}
