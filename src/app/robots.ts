import type { MetadataRoute } from "next";
import { allowIndexing, siteUrl } from "@/lib/site";

// Până la lansare (ALLOW_INDEXING=true) site-ul nu se indexează, inclusiv pe medii de test.
export default function robots(): MetadataRoute.Robots {
  if (!allowIndexing) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
