import { Mail, Phone } from "lucide-react";
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

// Un singur container, o singură coloană (S20): formularul sus, dedesubt banda închisă „Contact
// direct” — telefoane și e-mail, compacte, fără zonă (S22). Lățime limitată, ca formularul să nu se întindă pe tot ecranul.
export default function ContactPage() {
  const iconProps = { size: 16, strokeWidth: 2 };

  return (
    <>
      <PageHeading title={contactPage.title} lead={contactPage.lead} />
      <SectionEdge from="ink" to="paper" />
      <section className="pt-4 pb-12 md:pt-8 md:pb-20">
        <div className="wrap">
          <div className="mx-auto max-w-240 overflow-hidden rounded-sm bg-surface shadow-[0_24px_60px_-12px_rgb(16_31_60/0.3)]">
            <ContactForm />

            <aside
              aria-labelledby="contact-panel-title"
              className="dark grid gap-6 p-6 md:grid-cols-2 md:gap-10 md:p-8"
            >
              <div>
                <p className="eyebrow mb-4">{contactPage.panelKicker}</p>
                <h2 id="contact-panel-title" className="mb-3 text-2xl">
                  {contactPage.panelHeading}
                </h2>
                <p className="text-inverse">{contactPage.panelText}</p>
              </div>

              <ul className="flex flex-col gap-3 md:mt-12">
                {company.phones.map((phone) => (
                  <li key={phone.href}>
                    <a
                      href={phone.href}
                      className="group flex items-center gap-3 leading-none font-bold no-underline"
                    >
                      <span
                        aria-hidden="true"
                        className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent text-ink transition group-hover:scale-105"
                      >
                        <Phone {...iconProps} />
                      </span>
                      <span className="transition-colors group-hover:text-accent">
                        {phone.display}
                      </span>
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={`mailto:${company.email}`}
                    className="group flex items-center gap-3 no-underline"
                  >
                    <span
                      aria-hidden="true"
                      className="flex size-8 shrink-0 items-center justify-center rounded-full border border-inverse/40 text-accent transition group-hover:border-accent"
                    >
                      <Mail {...iconProps} />
                    </span>
                    <span className="[overflow-wrap:anywhere] transition-colors group-hover:text-accent">
                      {company.email}
                    </span>
                  </a>
                </li>
              </ul>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
