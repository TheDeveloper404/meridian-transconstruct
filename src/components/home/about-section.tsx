import { BadgeCheck, BrickWall, Construction, HardHat } from "lucide-react";
import { about } from "@/content/home";
import { Lines } from "./section-head";

const ICONS = {
  experience: HardHat,
  quality: BadgeCheck,
  site: Construction,
  materials: BrickWall,
} as const;

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
            <h3 className="mt-10 mb-6 text-sm tracking-[2px] text-muted uppercase">{about.recommendsTitle}</h3>
            <ul className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
              {about.recommends.map((item) => {
                const Icon = ICONS[item.icon as keyof typeof ICONS];
                return (
                  <li key={item.title} className="flex gap-4">
                    <span
                      aria-hidden="true"
                      className="flex size-11 shrink-0 items-center justify-center rounded-full bg-ink text-accent"
                    >
                      <Icon size={20} strokeWidth={2} />
                    </span>
                    <span>
                      <span className="mb-1 block font-bold text-ink">{item.title}</span>
                      <span className="block text-muted">{item.text}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
            <div className="mt-10 border-l-3 border-accent pl-6">
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
