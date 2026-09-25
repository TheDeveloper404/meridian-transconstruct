import { defineConfig, devices } from "@playwright/test";

// E2E pe build-ul de producție local (`next build` + `next start`), fără SMTP configurat:
// formularul este verificat cu răspunsurile API interceptate în browser.
// PLAYWRIGHT_CHROMIUM_EXECUTABLE permite un Chromium existent în mediu (ex. containere cloud).

const port = Number(process.env.E2E_PORT ?? 3100);
const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE;

export default defineConfig({
  testDir: "e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  reporter: "list",
  use: {
    baseURL: `http://127.0.0.1:${port}`,
    ...(executablePath ? { launchOptions: { executablePath } } : {}),
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: `npm run build && npx next start -H 127.0.0.1 -p ${port}`,
    url: `http://127.0.0.1:${port}`,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
