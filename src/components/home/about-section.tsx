import { about } from "@/content/home";
import { Lines } from "./section-head";

export function AboutSection() {
  return (
    <section id="despre" aria-labelledby="about-title" className="py-12 md:py-16">
      <div className="wrap">
        <div className="grid gap-8 md:grid-cols-2 md:gap-16">
          <div>
            <p className="kicker">{about.kicker}</p>
            <h2 id="about-title" className="mb-4">
              <Lines lines={about.titleLines} />
            </h2>
            <p className="mt-8 font-medium text-muted">
              {about.locationLines[0]}
              <br />
              {about.locationLines[1]}
            </p>
          </div>
          <div>
            <p className="mb-4 text-[28px] leading-[1.3] text-ink">{about.lead}</p>
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 32)} className="mb-4 text-muted">
                {paragraph}
              </p>
            ))}
            <div className="mt-8 border-l-3 border-accent pl-6">
              <h3 className="mb-3">{about.vision.title}</h3>
              <p className="text-muted">{about.vision.text}</p>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-8 border-t border-line pt-8 md:grid-cols-3">
          {about.principles.map((principle, index) => (
            <article key={principle.title}>
              <span className="mb-4 block text-sm text-muted">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="mb-3">{principle.title}</h3>
              <p className="text-muted">{principle.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
