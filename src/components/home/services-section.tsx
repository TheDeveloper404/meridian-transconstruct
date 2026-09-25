import Link from "next/link";
import { services, servicesIntro } from "@/content/services";
import { Lines, SectionHead } from "./section-head";

export function ServicesSection() {
  return (
    <section id="servicii" aria-labelledby="services-title" className="py-12 md:py-16">
      <div className="wrap">
        <SectionHead
          id="services-title"
          kicker={servicesIntro.kicker}
          title={<Lines lines={servicesIntro.titleLines} />}
          intro={servicesIntro.intro}
        />

        {/* Fără linii între servicii (S12b): numerele mari, conturate, dau ritmul. */}
        <div className="flex flex-col gap-4 md:gap-2">
          {services.map((service, index) => (
            <article
              key={service.id}
              id={service.id}
              className="grid grid-cols-1 gap-3 py-6 md:grid-cols-[110px_0.85fr_1.3fr] md:gap-6 md:py-10"
            >
              <span
                aria-hidden="true"
                className="text-[56px] leading-none font-bold text-transparent [-webkit-text-stroke:1.5px_var(--color-accent)] md:text-[80px]"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="mb-4 text-2xl md:text-[28px]">
                  {service.titleLines ? <Lines lines={service.titleLines} /> : service.title}
                </h3>
                <p className="mb-4 max-w-60 text-muted">{service.subtitle}</p>
              </div>
              <div className="md:col-start-3">
                {service.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)} className="mb-4 text-muted">
                    {paragraph}
                  </p>
                ))}
                <ul className="my-6">
                  {service.highlights.map((item) => (
                    <li
                      key={item}
                      className="relative mb-2 pl-5 before:absolute before:top-2.5 before:left-0 before:size-1.5 before:rounded-full before:bg-accent"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="text-link mt-2">
                  {service.ctaLabel}
                  <span aria-hidden="true" className="arrow">
                    ↗
                  </span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
