// Acessibilidade: axe sem violações (WCAG 2.1 A e AA) nas 3 páginas, tema claro e escuro,
// e teclado: o primeiro Tab vai para "Pular para o conteúdo", com contorno visível.
import { test, expect } from "./fixtures.js";
import AxeBuilder from "@axe-core/playwright";

const paginas = ["/index.html", "/quero-carregar/index.html", "/quero-transportar/index.html"];

for (const tema of ["light", "dark"]) {
  for (const pagina of paginas) {
    test(`axe sem violações em ${pagina} (${tema})`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: tema, reducedMotion: "reduce" });
      await page.goto(pagina);
      // Espera o mural (dados reais) nas personas
      if (pagina !== "/index.html") await expect(page.locator(".offer-card").first()).toBeVisible();
      const resultado = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();
      const resumo = resultado.violations.map(
        (v) => `${v.id} (${v.nodes.length}): ${v.nodes.slice(0, 3).map((n) => n.target.join(" ")).join(" | ")}`,
      );
      expect(resumo, resumo.join("\n")).toEqual([]);
    });
  }
}

for (const pagina of paginas) {
  test(`teclado: primeiro Tab no link de pular, com foco visível, em ${pagina}`, async ({ page }) => {
    await page.goto(pagina);
    await page.keyboard.press("Tab");
    const pular = page.getByRole("link", { name: "Pular para o conteúdo" });
    await expect(pular).toBeFocused();
    await expect(pular).toBeInViewport();
    const contorno = await pular.evaluate((el) => {
      const s = getComputedStyle(el);
      return { estilo: s.outlineStyle, largura: parseFloat(s.outlineWidth) };
    });
    expect(contorno.estilo).not.toBe("none");
    expect(contorno.largura).toBeGreaterThan(0);

    // Enter leva o foco para o conteúdo principal
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#conteudo$/);
  });
}
