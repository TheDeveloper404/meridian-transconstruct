import { expect, test, type Page } from "@playwright/test";

// Verificările machetei (docs/qa/check-preview.cjs) portate pe aplicația Next.js.

const widths = [320, 375, 768, 1024, 1440];
const pages = [
  { path: "/", name: "Acasă" },
  { path: "/contact", name: "Contact" },
];

function navFor(page: Page, width: number) {
  return width < 1024
    ? page.getByRole("navigation", { name: "Navigare mobilă" })
    : page.getByRole("navigation", { name: "Navigare principală" });
}

async function openMobileMenu(page: Page) {
  await page.locator("header summary").focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("header details")).toHaveJSProperty("open", true);
}

test.describe("pagini la toate lățimile", () => {
  for (const width of widths) {
    for (const { path, name } of pages) {
      test(`${name} la ${width}px`, async ({ page }) => {
        const external: string[] = [];
        const errors: string[] = [];
        page.on("pageerror", (error) => errors.push(error.message));
        page.on("request", (request) => {
          const url = new URL(request.url());
          if (url.hostname !== "127.0.0.1") external.push(request.url());
        });

        await page.setViewportSize({ width, height: 900 });
        await page.goto(path);

        await expect(page.locator("html")).toHaveAttribute("lang", "ro");
        await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
        await expect(page.locator('header a[href^="tel:"]')).toHaveCount(0);

        if (width < 1024) await openMobileMenu(page);
        await expect(navFor(page, width).locator('[aria-current="page"]')).toHaveText(name);

        // Ascuns cu display:none pe ecrane late, deci îl căutăm prin locator, nu prin rol accesibil.
        const mobileCall = page.locator("a", { hasText: /^Sună:/ });
        await expect(mobileCall).toHaveAttribute("href", "tel:+40723400646");
        if (width < 768) await expect(mobileCall).toBeVisible();
        else await expect(mobileCall).toBeHidden();

        expect(errors).toEqual([]);
        expect(external).toEqual([]);
      });
    }
  }
});

test("Acasă: hero, servicii, stare goală portofoliu, CTA spre Contact", async ({ page }) => {
  await page.goto("/");
  const hero = page.locator("section").first();
  expect(await hero.locator("img").evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(
    true,
  );
  await expect(page.getByText("nu reprezintă o lucrare a firmei")).toBeVisible();
  await expect(page.locator("#constructii-civile h3")).toHaveText("Construcții civile");
  await expect(page.locator('main a[href^="tel:"]')).toHaveCount(0);
  await expect(page.getByText("Portofoliul este în pregătire.")).toBeVisible();

  await hero.getByRole("link", { name: /Cere o ofertă/ }).click();
  await expect(page).toHaveURL(/\/contact$/);
});

test("navigarea marchează secțiunea activă și închide meniul mobil", async ({ page }) => {
  for (const width of [375, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/contact");
    for (const [name, url] of [
      ["Acasă", /\/$/],
      ["Servicii", /\/#servicii$/],
      ["Proiecte", /\/#proiecte$/],
      ["Despre", /\/#despre$/],
      ["Contact", /\/contact$/],
    ] as const) {
      if (width < 1024) await openMobileMenu(page);
      await navFor(page, width).getByRole("link", { name, exact: true }).click();
      await expect(page).toHaveURL(url);
      await expect(page.locator("header nav [aria-current]").first()).toHaveText(name);
      if (width < 1024) await expect(page.locator("header details")).toHaveJSProperty("open", false);
    }
  }
});

for (const navigationApi of [true, false]) {
  test(`revenirea pe Acasă resetează secțiunea activă (Navigation API: ${navigationApi ? "da" : "nu"})`, async ({
    page,
  }) => {
    // Fără Navigation API (unele browsere), componenta folosește ramura de rezervă după clic.
    if (!navigationApi) {
      await page.addInitScript(() => Object.defineProperty(window, "navigation", { value: undefined }));
    }
    await checkHomeReset(page);
  });
}

async function checkHomeReset(page: Page) {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const nav = navFor(page, 1440);
  const active = page.locator("header nav [aria-current]").first();

  await nav.getByRole("link", { name: "Despre", exact: true }).click();
  await expect(active).toHaveText("Despre");
  await nav.getByRole("link", { name: "Acasă", exact: true }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(active).toHaveText("Acasă");

  await nav.getByRole("link", { name: "Proiecte", exact: true }).click();
  await expect(active).toHaveText("Proiecte");
  await page.locator("header").getByRole("link", { name: /— Acasă/ }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(active).toHaveText("Acasă");
}

test("contrastul perechilor de culori din paletă este minimum AA", async ({ page }) => {
  await page.goto("/");
  const ratios = await page.evaluate(() => {
    const css = getComputedStyle(document.documentElement);
    const hex = (name: string) => css.getPropertyValue(name).trim();
    const luminance = (value: string) => {
      // Build-ul poate scurta #ffffff la #fff.
      const full = value.length === 4 ? `#${[...value.slice(1)].map((c) => c + c).join("")}` : value;
      const [r, g, b] = (full.match(/[a-f\d]{2}/gi) ?? []).map((part) => {
        const channel = parseInt(part, 16) / 255;
        return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
      });
      return r * 0.2126 + g * 0.7152 + b * 0.0722;
    };
    const ratio = (a: string, b: string) => {
      const [hi, lo] = [luminance(hex(a)), luminance(hex(b))].sort((x, y) => y - x);
      return (hi + 0.05) / (lo + 0.05);
    };
    return [
      ratio("--color-ink", "--color-paper"),
      ratio("--color-ink", "--color-accent"),
      ratio("--color-muted", "--color-paper"),
      ratio("--color-inverse", "--color-ink"),
      ratio("--color-error", "--color-surface"),
      ratio("--color-success", "--color-surface"),
    ];
  });
  for (const value of ratios) expect(value).toBeGreaterThanOrEqual(4.5);
});

test("404 păstrează navigarea și oferă revenire", async ({ page }) => {
  const response = await page.goto("/pagina-inexistenta");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Pagina nu a fost găsită.");
  await expect(page.getByRole("link", { name: "Înapoi la prima pagină" })).toHaveAttribute("href", "/");
});

test("robots blochează indexarea până la lansare", async ({ request }) => {
  const robots = await request.get("/robots.txt");
  expect(await robots.text()).toContain("Disallow: /");
});
