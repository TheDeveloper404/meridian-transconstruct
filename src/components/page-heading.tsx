import Link from "next/link";

type PageHeadingProps = {
  title: string;
  lead: string;
};

// Antet pentru paginile interioare, cu întoarcere spre Acasă (breadcrumb simplu).
export function PageHeading({ title, lead }: PageHeadingProps) {
  return (
    <section className="dark pt-6 pb-8 md:pt-8 md:pb-10">
      <div className="wrap">
        <nav aria-label="Breadcrumb">
          <Link href="/" className="text-link mb-6 text-inverse">
            Acasă
          </Link>
        </nav>
        <h1 className="mb-6 max-w-212.5">{title}</h1>
        <p className="max-w-162.5 text-inverse">{lead}</p>
      </div>
    </section>
  );
}
