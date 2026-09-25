import { expect, test } from "@playwright/test";

// Stările formularului. Răspunsurile /api/contact sunt interceptate în browser, deci testul nu
// trimite e-mailuri; handler-ul real e acoperit de testele de integrare (src/server/contact/http.test.ts).

async function fill(page: import("@playwright/test").Page) {
  await page.getByLabel("Nume / firmă").fill("Ion Popescu");
  await page.getByLabel("E-mail", { exact: true }).fill("ion@example.ro");
  await page.getByLabel(/^Telefon/).fill("0723 400 646");
  await page.getByLabel("Despre lucrare").fill("Casă la roșu în Petrila, stadiu: fundație.");
}

test.beforeEach(async ({ page }) => {
  await page.goto("/contact");
});

test("afișează erori lângă câmpuri și mută focusul pe primul câmp invalid", async ({ page }) => {
  let posted = false;
  await page.route("/api/contact", (route) => {
    posted = true;
    return route.fulfill({ status: 200, json: { ok: true } });
  });

  await page.getByRole("button", { name: "Trimite cererea" }).click();
  await expect(page.getByText("Completează numele sau denumirea firmei.")).toBeVisible();
  await expect(page.getByText("Completează adresa de e-mail.")).toBeVisible();
  await expect(page.getByLabel("Nume / firmă")).toBeFocused();
  await expect(page.getByLabel("Nume / firmă")).toHaveAttribute("aria-invalid", "true");
  expect(posted).toBe(false);
});

test("succes: trimite JSON, golește formularul și confirmă", async ({ page }) => {
  let body: Record<string, unknown> | undefined;
  await page.route("/api/contact", async (route) => {
    body = route.request().postDataJSON();
    await route.fulfill({ status: 200, json: { ok: true } });
  });

  await fill(page);
  await page.getByRole("button", { name: "Trimite cererea" }).click();
  await expect(page.locator("form").getByRole("status")).toContainText("Cererea a fost trimisă");
  await expect(page.getByLabel("Nume / firmă")).toHaveValue("");
  expect(body).toMatchObject({ name: "Ion Popescu", email: "ion@example.ro", website: "" });
});

test("eroare: păstrează datele și arată mesajul serverului cu alternativa telefonică", async ({ page }) => {
  await page.route("/api/contact", (route) =>
    route.fulfill({
      status: 503,
      json: {
        error: {
          code: "SERVICE_UNAVAILABLE",
          message: "Formularul nu este disponibil momentan. Poți suna la 0723 400 646 sau 0726 379 408.",
        },
      },
    }),
  );

  await fill(page);
  await page.getByRole("button", { name: "Trimite cererea" }).click();
  // Next are propriul role="alert" pentru anunțarea rutelor; restrângem la formular.
  await expect(page.locator("form").getByRole("alert")).toContainText("0723 400 646");
  await expect(page.getByLabel("Nume / firmă")).toHaveValue("Ion Popescu");
  await expect(page.getByRole("button", { name: "Trimite cererea" })).toBeEnabled();
});

test("API-ul real răspunde 503 când SMTP nu este configurat", async ({ request }) => {
  const response = await request.post("/api/contact", {
    data: {
      name: "Ion Popescu",
      email: "ion@example.ro",
      phone: "",
      message: "Test fără configurație SMTP.",
    },
  });
  expect(response.status()).toBe(503);
  expect((await response.json()).error.code).toBe("SERVICE_UNAVAILABLE");
});
