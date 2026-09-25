import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

// Teste unit/integrare în Node: reguli de contact, serviciu și handler HTTP, cu transport SMTP fals.
// E2E (Playwright) rulează separat, din e2e/.
export default defineConfig({
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
