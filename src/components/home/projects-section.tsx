import Image from "next/image";
import Link from "next/link";
import { HOME_PROJECT_LIMIT, projects, projectsIntro } from "@/content/projects";
import { SectionHead } from "./section-head";

export function ProjectsSection() {
  const selected = projects.slice(0, HOME_PROJECT_LIMIT);

  return (
    <section id="proiecte" aria-labelledby="projects-title" className="bg-surface py-12 md:py-16">
      <div className="wrap">
        <SectionHead
          id="projects-title"
          kicker={projectsIntro.kicker}
          title={projectsIntro.title}
          intro={projectsIntro.intro}
        />

        {selected.length === 0 ? (
          // Stare goală: fără proiecte fictive sau fotografii stock (PROJECT_BRIEF › Portofoliu).
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
          <div className="grid gap-8 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {selected.map((project) => (
              <article key={project.slug}>
                <Image
                  src={project.cover.src}
                  alt={project.cover.alt}
                  width={project.cover.width}
                  height={project.cover.height}
                  sizes="(min-width: 1024px) 384px, (min-width: 768px) 50vw, 100vw"
                  className="aspect-4/3 w-full border border-line object-cover"
                />
                <h3 className="mt-4 mb-3">{project.title}</h3>
                <p className="text-sm text-muted">
                  {[project.locality, project.year, project.workType].filter(Boolean).join(" · ")}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
