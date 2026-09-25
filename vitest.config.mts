import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

// Teste unit/integrare în Node: reguli de contact, serviciu și handler HTTP, cu transport SMTP fals.
// Proiectul nu are teste E2E (decizie a utilizatorului).
export default defineConfig({
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
