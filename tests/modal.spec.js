// Modal de trajeto: o foco fica dentro do diálogo enquanto ele está aberto (B8).
import { test, expect } from "./fixtures.js";

const personas = [
  { url: "/quero-carregar/index.html", lista: "#cargas-list" },
  { url: "/quero-transportar/index.html", lista: "#services-content" },
];

for (const p of personas) {
  test(`Tab e Shift+Tab não saem do modal em ${p.url}`, async ({ page }) => {
    await page.goto(p.url);
    const botao = page.locator(`${p.lista} [data-route]`).first();
    await botao.click();

    const modal = page.locator("#route-modal");
    const fechar = modal.locator(".modal-close");
    const cta = modal.locator("#route-modal-cta");
    await expect(fechar).toBeFocused();

    // Shift+Tab no primeiro vai ao último
    await page.keyboard.press("Shift+Tab");
    await expect(cta).toBeFocused();

    // Tab no último volta ao primeiro
    await page.keyboard.press("Tab");
    await expect(fechar).toBeFocused();

    // Várias voltas de Tab: o foco nunca vai para a página por trás
    for (let i = 0; i < 6; i++) {
      await page.keyboard.press("Tab");
      const dentro = await page.evaluate(() => document.getElementById("route-modal").contains(document.activeElement));
      expect(dentro).toBe(true);
    }

    // Esc fecha e devolve o foco ao botão de origem
    await page.keyboard.press("Escape");
    await expect(modal).toBeHidden();
    await expect(botao).toBeFocused();

    // Com o modal fechado, Tab volta a andar pela página normalmente
    await page.keyboard.press("Tab");
    const naPagina = await page.evaluate(() => !document.getElementById("route-modal").contains(document.activeElement));
    expect(naPagina).toBe(true);
  });
}
