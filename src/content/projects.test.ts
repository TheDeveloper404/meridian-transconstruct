import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { projectAlbums } from "./projects";

// Albumele se completează de mână; testul prinde greșelile care ar strica pagina sau build-ul.
describe("projectAlbums", () => {
  it("are slug-uri unice, folosibile în adresă", () => {
    const slugs = projectAlbums.map((album) => album.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    slugs.forEach((slug) => expect(slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/));
  });

  it("fiecare album are cel puțin o fotografie, iar fișierele există în public/", () => {
    projectAlbums.forEach((album) => {
      expect(album.photos.length).toBeGreaterThan(0);
      album.photos.forEach((photo) => {
        expect(existsSync(path.join(process.cwd(), "public", photo.src)), photo.src).toBe(true);
      });
    });
  });
});
