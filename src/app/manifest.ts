import type { MetadataRoute } from "next";
import { company } from "@/content/company";

// Manifest web: numele și culorile folosite de browser (ex. „Adaugă pe ecranul principal”).
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: company.displayName,
    short_name: "Meridian",
    description: "Construcții civile, clădiri, hale industriale, renovări și case în Valea Jiului și județul Hunedoara.",
    lang: "ro",
    start_url: "/",
    display: "browser",
    background_color: "#f5f3ed",
    theme_color: "#101f3c",
    icons: [
      // Emblema din logo (S36); fișierele se generează din docs/assets/originale/logo.png.
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
