// Fixture comum: corta toda requisição que não seja do servidor local.
// Fontes e ícones caem para o padrão do navegador; WhatsApp e Maps não são chamados.
import { test as base, expect } from "@playwright/test";

export const test = base.extend({
  page: async ({ page }, use) => {
    await page.context().route("**/*", (route) => {
      const url = new URL(route.request().url());
      return url.hostname === "localhost" ? route.continue() : route.abort();
    });
    await use(page);
  },
});

export { expect };
