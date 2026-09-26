import type { LegalDocument } from "@/content/legal";
import { PageHeading } from "./page-heading";
import { SectionEdge } from "./section-edge";

// Pagină legală (S24): antet + secțiuni numerotate, pe o coloană de citit confortabil.
export function LegalDocumentPage({ document }: { document: LegalDocument }) {
  return (
    <>
      <PageHeading title={document.title} lead={document.lead} />
      <SectionEdge from="ink" to="paper" />
      <section className="pt-4 pb-12 md:pt-8 md:pb-20">
        <div className="wrap max-w-190">
          <p className="mb-8 text-sm text-muted">Ultima actualizare: {document.updated}</p>
          {document.sections.map((section) => (
            <div key={section.heading} className="mb-10 last:mb-0">
              <h2 className="mb-4 text-2xl text-ink">{section.heading}</h2>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="mb-4 text-ink">
                  {paragraph}
                </p>
              ))}
              {section.items && (
                <ul className="mb-4 flex flex-col gap-2">
                  {section.items.map((item) => (
                    <li
                      key={item.slice(0, 40)}
                      className="relative pl-5 text-ink before:absolute before:top-3 before:left-0 before:size-1.5 before:rounded-full before:bg-accent"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
