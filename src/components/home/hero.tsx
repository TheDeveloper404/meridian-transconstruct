import Image from "next/image";
import Link from "next/link";
import { hero } from "@/content/home";
import { services } from "@/content/services";
import { SectionEdge } from "../section-edge";
import { ServiceIcon } from "../service-icon";

// Hero pe (aproape) tot ecranul, cu cele 5 servicii ca plachete (S18: „să vândă” — vizitatorul vede
// imediat ce construiește firma). Plachetele duc la serviciul de pe Acasă și îi deschid panoul.
export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="dark relative isolate flex flex-col overflow-hidden md:min-h-[calc(100svh-100px)]"
    >
      <Image
        src={hero.image.src}
        width={hero.image.width}
        height={hero.image.height}
        alt=""
        preload
        sizes="100vw"
        className="absolute inset-0 -z-10 size-full object-cover object-[64%_center] md:object-center"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgb(8_22_47/0.97),rgb(8_22_47/0.84)_65%,rgb(8_22_47/0.42))] md:bg-[linear-gradient(90deg,rgb(8_22_47/0.94)_0%,rgb(8_22_47/0.85)_43%,rgb(8_22_47/0.2)_78%),linear-gradient(0deg,rgb(8_22_47/0.7),transparent_45%)]"
      />
      <div className="wrap flex flex-1 flex-col justify-center pt-16 pb-10 md:pt-20 md:pb-12">
        <p className="eyebrow">{hero.eyebrow}</p>
        <h1 id="hero-title" className="mb-6 max-w-220 lg:text-[clamp(52px,5vw,84px)]">
          {hero.titleLead}
          <br />
          <span className="text-accent">
            {hero.titleAccentLines[0]}
            <br />
            {hero.titleAccentLines[1]}
          </span>
        </h1>
        <p className="mb-8 max-w-140 text-lg text-paper">{hero.lead}</p>
        <div className="flex flex-wrap items-center gap-6">
          <Link href="/contact" className="button">
            {hero.primaryCta}
            <span aria-hidden="true" className="arrow">
              ↗
            </span>
          </Link>
          <a href="#proiecte" className="text-link">
            {hero.secondaryCta}
          </a>
        </div>
        {hero.image.isConcept && (
          <p className="mt-8 inline-block self-start bg-ink px-2 py-1 text-sm text-inverse">
            {hero.image.conceptCredit}
          </p>
        )}
      </div>

      <nav aria-label="Serviciile noastre" className="wrap pb-14 md:pb-20">
        <ul className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3 lg:grid-cols-5 [&>li:last-child]:col-span-2 md:[&>li:last-child]:col-span-1">
          {services.map((service, index) => (
            <li key={service.id}>
              <a
                href={`#${service.id}`}
                className="group flex h-full flex-col gap-3 rounded-sm border border-inverse/20 bg-ink/70 p-4 no-underline backdrop-blur-md transition hover:-translate-y-1 hover:border-accent hover:bg-accent hover:text-ink md:p-5"
              >
                <span className="flex items-center justify-between">
                  <ServiceIcon
                    id={service.id}
                    size={26}
                    strokeWidth={1.75}
                    className="text-accent transition-colors group-hover:text-ink"
                  />
                  <span aria-hidden="true" className="text-lg transition group-hover:translate-x-0.5">
                    ↗
                  </span>
                </span>
                <span>
                  <span className="block text-xs font-bold tracking-[2px] text-accent transition-colors group-hover:text-ink">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-1 block text-sm leading-snug font-bold md:text-base">{service.title}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <SectionEdge to="paper" className="absolute inset-x-0 bottom-0" />
    </section>
  );
}
