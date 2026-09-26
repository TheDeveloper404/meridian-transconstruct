import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Gallery, type GalleryTile } from "@/components/home/gallery";
import { PageHeading } from "@/components/page-heading";
import { SectionEdge } from "@/components/section-edge";
import { projectAlbums, projectsIntro, projectsPage } from "@/content/projects";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

// Doar albumele din src/content/projects.ts; orice alt slug → 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return projectAlbums.map((album) => ({ slug: album.slug }));
}

function findAlbum(slug: string) {
  return projectAlbums.find((album) => album.slug === slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const album = findAlbum((await params).slug);
  if (!album) return {};
  return pageMetadata({
    title: album.title,
    description: album.summary ?? `${album.category} — lucrare executată de Meridian Transconstruct.`,
    path: `/proiecte/${album.slug}`,
  });
}

export default async function AlbumPage({ params }: Props) {
  const album = findAlbum((await params).slug);
  if (!album) notFound();

  // Aceeași galerie ca pe Acasă (grilă „bento” + vizualizare mărită).
  const tiles: GalleryTile[] = album.photos.map((photo, index) => ({
    id: `${album.slug}-${index + 1}`,
    category: album.category,
    title: album.title,
    image: photo,
    illustrative: album.illustrative ?? false,
    available: true,
    hideCaption: index > 0,
  }));

  return (
    <>
      <PageHeading
        title={album.title}
        lead={[album.category, album.year, album.summary].filter(Boolean).join(" · ")}
        back={{ href: "/proiecte", label: projectsPage.backLabel }}
      />
      <SectionEdge from="ink" to="paper" />
      <section className="pt-4 pb-12 md:pt-8 md:pb-20">
        <div className="wrap">
          <Gallery tiles={tiles} placeholderLabel={projectsIntro.placeholder} />
        </div>
      </section>
    </>
  );
}
