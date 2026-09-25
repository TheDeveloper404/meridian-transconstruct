import { company } from "@/content/company";
import { PageHeading } from "./page-heading";
import { SectionEdge } from "./section-edge";

// Pagină legală în pregătire (B-012): textul final depinde de datele firmei verificate și de
// furnizorii aleși (găzduire, SMTP). Nu publicăm text juridic nevalidat.
export function LegalPending({ title, lead }: { title: string; lead: string }) {
  return (
    <>
      <PageHeading title={title} lead={lead} />
      <SectionEdge from="ink" to="paper" />
      <section className="pt-4 pb-12 md:pt-8 md:pb-20">
        <div className="wrap max-w-190">
          <p className="note py-2 text-base">
            Documentul este în pregătire și va fi publicat după verificarea datelor firmei. Pentru
            întrebări până atunci:{" "}
            <a href={`mailto:${company.email}`} className="text-ink">
              {company.email}
            </a>
            .
          </p>
        </div>
      </section>
      <SectionEdge from="paper" to="deep" flip />
    </>
  );
}
