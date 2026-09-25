import { about } from "@/content/home";
import { Lines } from "./section-head";

export function AboutSection() {
  return (
    <section id="despre" aria-labelledby="about-title" className="py-12 md:py-20">
      <div className="wrap">
        <div className="grid gap-8 md:grid-cols-2 md:gap-16">
          <div className="md:sticky md:top-32 md:self-start">
            <p className="kicker">{about.kicker}</p>
            <h2 id="about-title">
              <Lines lines={about.titleLines} />
            </h2>
          </div>
          <div>
            <p className="mb-6 text-[26px] leading-[1.3] text-ink md:text-[28px]">{about.lead}</p>
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

        <div className="mt-12 grid gap-8 md:mt-16 md:grid-cols-3">
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
