import { existsSync } from "node:fs";
import path from "node:path";
import Link from "next/link";
import { gallery, projectsIntro } from "@/content/projects";
import { Gallery, type GalleryTile } from "./gallery";
import { SectionHead } from "./section-head";

// Server component: verifică la build ce imagini există în public/, ca un fișier lipsă să afișeze
// blocul de rezervă, nu o imagine spartă.
function withAvailability(): GalleryTile[] {
  return gallery.map((item) => ({
    ...item,
    available: existsSync(path.join(process.cwd(), "public", item.image.src)),
  }));
}

export function ProjectsSection() {
  const tiles = withAvailability();
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
