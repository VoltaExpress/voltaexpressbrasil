// Testes de ponta a ponta da landing, servida localmente por scripts/servidor.mjs.
// A rede externa (fontes, ícones, Google Maps, WhatsApp) é cortada nos testes:
// assim eles não dependem de terceiros e não geram acessos falsos.
import { defineConfig, devices } from "@playwright/test";

const porta = Number(process.env.PORTA_TESTE || 5531);

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: `http://localhost:${porta}`,
    reducedMotion: "reduce",
    trace: "retain-on-failure",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } } },
    { name: "celular", use: { ...devices["Pixel 7"] } },
  ],
  webServer: {
    command: `node scripts/servidor.mjs ${porta}`,
    url: `http://localhost:${porta}/index.html`,
    reuseExistingServer: !process.env.CI,
  },
});
