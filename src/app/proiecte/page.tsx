import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeading } from "@/components/page-heading";
import { SectionEdge } from "@/components/section-edge";
import { projectAlbums, projectsIntro, projectsPage } from "@/content/projects";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: projectsPage.title,
  description:
    "Lucrări executate de Meridian Transconstruct în Petroșani și Valea Jiului: construcții civile, clădiri, hale industriale, renovări și case la cheie.",
  path: "/proiecte",
});

// Lista albumelor (S18). Fără lucrări reale publicate → stare goală, fără albume ilustrative.
export default function ProjectsPage() {
  return (
    <>
      <PageHeading title={projectsPage.title} lead={projectsPage.lead} />
      <SectionEdge from="ink" to="paper" />
      <section className="pt-4 pb-12 md:pt-8 md:pb-20">
        <div className="wrap">
          {projectAlbums.length === 0 ? (
            <div className="note max-w-170 py-2">
              <h2 className="mb-2 text-2xl text-ink">
                {projectsIntro.emptyTitle}
              </h2>
              <p className="mb-2 text-base">{projectsIntro.emptyText}</p>
              <Link href="/contact" className="text-link text-ink">
                {projectsIntro.emptyCta}
                <span aria-hidden="true" className="arrow">
                  ↗
                </span>
              </Link>
            </div>
          ) : (
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projectAlbums.map((album) => {
                const cover = album.photos[0];
                return (
                  <li key={album.slug}>
                    <Link
                      href={`/proiecte/${album.slug}`}
                      className="group block no-underline"
                    >
                      <span className="relative block aspect-[4/3] overflow-hidden rounded-sm bg-ink">
                        {album.illustrative && (
                          <span className="absolute top-4 left-4 z-10 bg-ink/80 px-2 py-1 text-xs font-bold tracking-[1px] text-inverse uppercase backdrop-blur-sm">
                            Ilustrativ
                          </span>
                        )}
                        <Image
                          src={cover.src}
                          alt={cover.alt}
                          fill
                          sizes="(min-width: 1024px) 560px, (min-width: 768px) 50vw, 100vw"
                          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                        />
                      </span>
                      <span className="mt-4 block text-xs font-bold tracking-[2px] text-accent-strong uppercase">
                        {album.category}
                      </span>
                      <span className="mt-1 block text-xl leading-tight font-bold transition-colors group-hover:text-accent-strong">
                        {album.title}
                      </span>
                      <span className="mt-1 block text-sm text-muted">
                        {album.year && `${album.year} · `}
                        {album.photos.length === 1
                          ? "1 fotografie"
                          : `${album.photos.length} fotografii`}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
          {projectAlbums.some((album) => album.illustrative) && (
            <p className="note mt-8 max-w-170">
              {projectsIntro.illustrativeNote}
            </p>
          )}
        </div>
      </section>
    </>
  );
}
