import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { PageHeading } from "@/components/page-heading";
import { company } from "@/content/company";
import { contactPage } from "@/content/contact";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact și cerere ofertă",
  description:
    "Cere o ofertă pentru construcții civile, clădiri, hale industriale, renovări sau case în Petroșani și Valea Jiului. Telefon, e-mail și formular de contact.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHeading title={contactPage.title} lead={contactPage.lead} />
      <section className="py-12 md:py-16">
        <div className="wrap grid gap-8 md:grid-cols-2 lg:gap-16">
          <div>
            <p className="kicker">{contactPage.kicker}</p>
            <h2 className="mb-4">{contactPage.heading}</h2>
            <div className="my-6 flex flex-col items-start gap-2">
              {company.phones.map((phone) => (
                <a
                  key={phone.href}
                  href={phone.href}
                  className="flex min-h-11 items-center text-[28px] leading-[1.2] font-bold no-underline hover:underline"
                >
                  {phone.display}
                </a>
              ))}
              <a href={`mailto:${company.email}`} className="flex min-h-11 max-w-full items-center [overflow-wrap:anywhere]">
                {company.email}
              </a>
            </div>
            <p className="mb-4">
              {company.region}, județul {company.county}
            </p>
            <p className="text-muted">{contactPage.hint}</p>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
