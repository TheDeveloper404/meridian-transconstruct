import Link from "next/link";
import { homeAlbums, projectAlbums, projectsIntro } from "@/content/projects";
import { Gallery, type GalleryTile } from "./gallery";
import { SectionHead } from "./section-head";

// Coperțile albumelor alese pentru Acasă (S45); un clic duce în album. Existența fișierelor e
// verificată de testul din src/content/projects.test.ts.
function albumTiles(): GalleryTile[] {
  return projectAlbums
    .filter((album) => homeAlbums.includes(album.slug))
    .sort((a, b) => homeAlbums.indexOf(a.slug) - homeAlbums.indexOf(b.slug))
    .map((album) => ({
      id: album.slug,
      category: album.category,
      title: album.title,
      image: album.photos[0],
      illustrative: album.illustrative ?? false,
      available: true,
      href: `/proiecte/${album.slug}`,
    }));
}

export function ProjectsSection() {
  const tiles = albumTiles();
  const hasIllustrative = tiles.some((tile) => tile.illustrative);

  return (
    <section id="proiecte" aria-labelledby="projects-title" className="bg-surface py-12 md:py-20">
      <div className="wrap">
        <SectionHead
          id="projects-title"
          kicker={projectsIntro.kicker}
          title={projectsIntro.title}
          intro={projectsIntro.intro}
        />

        {tiles.length === 0 ? (
          <div className="note max-w-170 py-2">
            <h3 className="mb-2 text-ink">{projectsIntro.emptyTitle}</h3>
            <p className="mb-2 text-base">{projectsIntro.emptyText}</p>
            <Link href="/contact" className="text-link text-ink">
              {projectsIntro.emptyCta}
              <span aria-hidden="true" className="arrow">
                ↗
              </span>
            </Link>
          </div>
        ) : (
          <>
            <Gallery tiles={tiles} placeholderLabel={projectsIntro.placeholder} />
            {hasIllustrative && <p className="note mt-6 max-w-170">{projectsIntro.illustrativeNote}</p>}
            <Link href="/proiecte" className="text-link mt-6 text-ink">
              {projectsIntro.allCta}
              <span aria-hidden="true" className="arrow">
                ↗
              </span>
            </Link>
          </>
        )}
      </div>
    </section>
  );
}
