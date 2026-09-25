import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // Aceeași formă ca URL-ul canonic generat de Next pentru Acasă (fără slash final).
    { url: siteUrl, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/contact`, changeFrequency: "yearly", priority: 0.8 },
  ];
}
