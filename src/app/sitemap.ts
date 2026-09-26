import type { MetadataRoute } from "next";
import { projectAlbums } from "@/content/projects";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // Aceeași formă ca URL-ul canonic generat de Next pentru Acasă (fără slash final).
    { url: siteUrl, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/proiecte`, changeFrequency: "monthly", priority: 0.8 },
    ...projectAlbums.map((album) => ({
      url: `${siteUrl}/proiecte/${album.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    { url: `${siteUrl}/contact`, changeFrequency: "yearly", priority: 0.8 },
  ];
}
