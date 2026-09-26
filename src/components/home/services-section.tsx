import { CircleCheck, Plus } from "lucide-react";
import Link from "next/link";
import type { CSSProperties } from "react";
import { services, servicesIntro, servicesLabels } from "@/content/services";
import { ServiceIcon } from "../service-icon";
import { OpenOnAnchor } from "./open-on-anchor";
import { Lines, SectionHead } from "./section-head";

/** Ordinea în care apar blocurile din panou la deschidere (animația `disclosure-in`). */
const step = (index: number) => ({ "--i": index }) as CSSProperties;

// Serviciile ca panouri care se deschid și se închid la clic (S19: textele rămân întregi, dar
// secțiunea nu mai cere atâta scroll). `<details>` nativ: funcționează și fără JS, cu tastatura și
// cu cititoarele de ecran. Id-ul fiecărui serviciu e ancora din hero; OpenOnAnchor deschide panoul.
// Efectul de deschidere (S20): bară galbenă pe margine, numărul se umple, conținutul intră pe rând.
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

        <div className="flex flex-col gap-3">
          {services.map((service, index) => (
            <details
              key={service.id}
              id={service.id}
              className="disclosure group relative overflow-hidden rounded-sm bg-surface transition-shadow duration-500 before:absolute before:inset-y-0 before:left-0 before:w-1 before:origin-top before:scale-y-0 before:bg-accent before:transition-transform before:duration-500 open:shadow-[0_18px_40px_rgb(16_31_60/0.12)] open:before:scale-y-100 hover:shadow-[0_10px_28px_rgb(16_31_60/0.08)]"
            >
              <summary className="flex cursor-pointer list-none items-center gap-4 p-5 md:gap-8 md:px-8 md:py-6 [&::-webkit-details-marker]:hidden">
                <span
                  aria-hidden="true"
                  className="w-12 shrink-0 text-[40px] leading-none font-bold text-transparent transition-colors duration-500 [-webkit-text-stroke:1.5px_var(--color-accent-strong)] group-open:text-accent-strong md:w-20 md:text-[58px]"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <ServiceIcon
                  id={service.id}
                  size={28}
                  strokeWidth={1.75}
                  className="hidden shrink-0 text-accent-strong md:block"
                />
                <span className="flex-1">
                  <h3 className="text-xl text-ink md:text-[30px]">{service.title}</h3>
                  <span className="mt-1 block text-muted">{service.subtitle}</span>
                </span>
                <span
                  aria-hidden="true"
                  className="flex size-11 shrink-0 items-center justify-center rounded-full bg-ink text-accent transition duration-500 group-open:rotate-[135deg] group-open:bg-accent group-open:text-ink"
                >
                  <Plus size={22} strokeWidth={2.25} />
                </span>
              </summary>

              <div className="px-5 pb-6 md:px-8 md:pb-8 lg:pl-[204px]">
                <ul className="disclosure-item mb-6 flex flex-wrap gap-2" style={step(0)}>
                  {service.highlights.map((item) => (
                    <li key={item} className="rounded-full bg-paper px-3 py-1 text-sm text-ink">
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:gap-12">
                  <div className="disclosure-item" style={step(1)}>
                    {service.paragraphs.map((paragraph) => (
                      <p key={paragraph.slice(0, 32)} className="mb-4 text-muted last:mb-0">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  <div className="disclosure-item" style={step(2)}>
                    <h4 className="mb-3 text-sm font-bold tracking-[2px] text-muted uppercase">{servicesLabels.works}</h4>
                    <ul className="mb-6 flex flex-col gap-2.5">
                      {service.works.map((work) => (
                        <li key={work} className="flex items-start gap-3 text-ink">
                          <CircleCheck
                            aria-hidden="true"
                            size={20}
                            strokeWidth={2}
                            className="mt-1 shrink-0 text-accent-strong"
                          />
                          {work}
                        </li>
                      ))}
                    </ul>
                    <h4 className="mb-2 text-sm font-bold tracking-[2px] text-muted uppercase">
                      {servicesLabels.audience}
                    </h4>
                    <p className="mb-6 text-ink">{service.audience}</p>
                    <Link href="/contact" className="text-link">
                      {service.ctaLabel}
                      <span aria-hidden="true" className="arrow">
                        ↗
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </details>
          ))}
        </div>
        <OpenOnAnchor />
      </div>
    </section>
  );
}
