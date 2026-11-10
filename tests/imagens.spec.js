// Banner do hero: o celular baixa a variante de 1080 px, e não a de 1536 px (B1).
import { test, expect } from "./fixtures.js";

const paginas = ["/index.html", "/quero-carregar/index.html", "/quero-transportar/index.html"];

for (const pagina of paginas) {
  test(`banner do hero no tamanho certo em ${pagina}`, async ({ page, isMobile }) => {
    await page.goto(pagina);
    const banner = page.locator('img[fetchpriority="high"]');
    await expect(banner).toHaveJSProperty("complete", true);
    const arquivo = await banner.evaluate((img) => img.currentSrc);
    // Pixel 7: 412 px x 2,625 de densidade, 92vw → ~995 px: a variante de 1080 basta.
    // Desktop 1440 px, densidade 1, 46vw → ~662 px: a de 800 basta.
    expect(arquivo).toMatch(isMobile ? /-1080\.webp$/ : /-800\.webp$/);
  });
}
