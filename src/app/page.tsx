import type { Metadata } from "next";
import { AboutSection } from "@/components/home/about-section";
import { ContactTeaser } from "@/components/home/contact-teaser";
import { Hero } from "@/components/home/hero";
import { ProjectsSection } from "@/components/home/projects-section";
import { ServicesSection } from "@/components/home/services-section";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <ProjectsSection />
      <AboutSection />
      <ContactTeaser />
    </>
  );
}
