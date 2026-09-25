import type { Metadata } from "next";
import { AboutSection } from "@/components/home/about-section";
import { ContactTeaser } from "@/components/home/contact-teaser";
import { Hero } from "@/components/home/hero";
import { ProjectsSection } from "@/components/home/projects-section";
import { ServicesSection } from "@/components/home/services-section";
import { SectionEdge } from "@/components/section-edge";
import { StructuredData } from "@/components/structured-data";
import { homeSeo } from "@/content/home";
import { pageMetadata } from "@/lib/seo";

// Titlul vine din `title.default` din layout; aici doar canonical/Open Graph complete pentru Acasă.
export const metadata: Metadata = pageMetadata({ description: homeSeo.description, path: "/" });

export default function HomePage() {
  return (
    <>
      <StructuredData />
      <Hero />
      <ServicesSection />
      <SectionEdge from="paper" to="surface" flip />
      <ProjectsSection />
      <SectionEdge from="surface" to="paper" />
      <AboutSection />
      <SectionEdge from="paper" to="ink" flip />
      <ContactTeaser />
      <SectionEdge from="ink" to="deep" />
    </>
  );
}
