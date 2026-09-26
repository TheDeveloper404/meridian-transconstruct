import Link from "next/link";

type PageHeadingProps = {
  title: string;
  lead?: string;
  /** Linkul de întoarcere; implicit Acasă. */
  back?: { href: string; label: string };
};

// Antet pentru paginile interioare, cu întoarcere spre Acasă (breadcrumb simplu).
export function PageHeading({ title, lead, back = { href: "/", label: "Acasă" } }: PageHeadingProps) {
  return (
    <section className="dark pt-6 pb-8 md:pt-8 md:pb-10">
      <div className="wrap">
        <nav aria-label="Breadcrumb">
          <Link href={back.href} className="text-link mb-6 text-inverse">
            {back.label}
          </Link>
        </nav>
        <h1 className="mb-6 max-w-212.5">{title}</h1>
        {lead && <p className="max-w-162.5 text-inverse">{lead}</p>}
      </div>
    </section>
  );
}
