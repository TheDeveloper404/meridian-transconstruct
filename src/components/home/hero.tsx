import Image from "next/image";
import Link from "next/link";
import { hero } from "@/content/home";
import { SectionEdge } from "../section-edge";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="dark relative isolate flex min-h-162.5 items-end overflow-hidden md:min-h-150 lg:min-h-162.5 md:items-center"
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
        className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgb(8_22_47/0.97),rgb(8_22_47/0.84)_65%,rgb(8_22_47/0.42))] md:bg-[linear-gradient(90deg,rgb(8_22_47/0.94)_0%,rgb(8_22_47/0.85)_43%,rgb(8_22_47/0.2)_78%),linear-gradient(0deg,rgb(8_22_47/0.5),transparent_50%)]"
      />
      <div className="wrap pt-12 pb-14 md:pt-16 md:pb-24">
        <p className="eyebrow">{hero.eyebrow}</p>
        <h1 id="hero-title" className="mb-6 max-w-162.5">
          {hero.titleLead}
          <br />
          <span className="text-accent">
            {hero.titleAccentLines[0]}
            <br />
            {hero.titleAccentLines[1]}
          </span>
        </h1>
        <p className="mb-8 max-w-122.5 text-paper">{hero.lead}</p>
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
          <p className="mt-8 inline-block bg-ink px-2 py-1 text-sm text-inverse md:mt-12">
            {hero.image.conceptCredit}
          </p>
        )}
      </div>
      <SectionEdge to="paper" className="absolute inset-x-0 bottom-0" />
    </section>
  );
}
