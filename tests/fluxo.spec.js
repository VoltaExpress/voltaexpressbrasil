// Fluxo principal da landing: persona → cadastro certo na plataforma → WhatsApp.
// Automatiza os testes T1–T7 e T11 do roteiro manual (docs/PLANO-DE-ACAO.md).
import { test, expect } from "./fixtures.js";

const WHATSAPP = "5532988367667";

const personas = [
  {
    nome: "Quero Carregar",
    url: "/quero-carregar/index.html",
    perfil: "caminhao",
    lista: "#cargas-list",
    busca: "#searchCarga",
    cardWhatsapp: "Carregar Agora",
    // A mensagem do card cita o título da carga
    textoDoCard: "Caixas de Livros",
  },
  {
    nome: "Quero Transportar",
    url: "/quero-transportar/index.html",
    perfil: "carga",
    lista: "#services-content",
    busca: "#search-input",
    cardWhatsapp: "Transportar Agora",
    // A mensagem do card cita o nome do veículo
    textoDoCard: "Caminhão do João",
  },
];

test("home leva às duas personas", async ({ page }) => {
  await page.goto("/index.html");
  await expect(page.locator("h1")).toHaveCount(1);
  await page.getByRole("link", { name: /Quero Carregar/ }).click();
  await expect(page).toHaveURL(/\/quero-carregar\/index\.html$/);
  await page.goto("/index.html");
  await page.getByRole("link", { name: /Quero Transportar/ }).click();
  await expect(page).toHaveURL(/\/quero-transportar\/index\.html$/);
});

test("home: Entrar / Cadastrar leva à plataforma e o WhatsApp usa o número central", async ({ page }) => {
  await page.goto("/index.html");
  await expect(page.locator(".site-header").getByRole("link", { name: "Entrar / Cadastrar" })).toHaveAttribute("href", "https://voltaexpress.com.br/");
  const flutuante = page.locator(".whatsapp-float");
  await expect(flutuante).toHaveAttribute("href", new RegExp(`^https://wa\\.me/${WHATSAPP}\\?text=.+`));
});

for (const p of personas) {
  test.describe(p.nome, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(p.url);
      await expect(page.locator(`${p.lista} .offer-card`).first()).toBeVisible();
    });

    test("T1/T2: CTAs da plataforma abrem o cadastro com a persona", async ({ page }) => {
      const cadastro = `https://voltaexpress.com.br/cadastro?perfil=${p.perfil}`;
      await expect(page.locator(".site-header").getByRole("link", { name: "Entrar / Cadastrar" })).toHaveAttribute("href", cadastro);
      const ctas = page.locator(`a[href^="https://voltaexpress.com.br/cadastro"]`);
      expect(await ctas.count()).toBeGreaterThanOrEqual(3);
      for (const href of await ctas.evaluateAll((els) => els.map((a) => a.getAttribute("href")))) {
        expect(href).toBe(cadastro);
      }
    });

    test("T3/T4: todo link de WhatsApp usa o número central, e o do card cita a oferta", async ({ page }) => {
      const hrefs = await page.locator('a[href*="wa.me"]').evaluateAll((els) => els.map((a) => a.href));
      expect(hrefs.length).toBeGreaterThan(5);
      for (const href of hrefs) expect(href).toMatch(new RegExp(`^https://wa\\.me/${WHATSAPP}(\\?text=|$)`));

      const card = page.locator(".offer-card", { hasText: p.textoDoCard });
      const link = card.getByRole("link", { name: p.cardWhatsapp });
      const mensagem = new URL(await link.getAttribute("href")).searchParams.get("text");
      expect(mensagem).toContain(p.textoDoCard);
    });

    test("T6: a busca filtra o mural e mostra o vazio", async ({ page }) => {
      const busca = page.locator(p.busca);
      await busca.fill("São Paulo");
      const cards = page.locator(`${p.lista} .offer-card`);
      await expect(cards.first()).toBeVisible();
      for (const texto of await cards.allInnerTexts()) expect(texto).toContain("São Paulo");

      await busca.fill("cidade-que-não-existe");
      await expect(cards).toHaveCount(0);
      await expect(page.locator(`${p.lista} .offers-empty`)).toBeVisible();
    });

    test("T7: Ver Trajeto abre o modal, e Esc e o X fecham devolvendo o foco", async ({ page }) => {
      const modal = page.locator("#route-modal");
      const botao = page.locator(`${p.lista} [data-route]`).first();

      await botao.click();
      await expect(modal).toBeVisible();
      await expect(page.locator("#modal-map iframe")).toHaveCount(1);
      await page.keyboard.press("Escape");
      await expect(modal).toBeHidden();
      await expect(botao).toBeFocused();

      await botao.click();
      await page.locator(".modal-close").click();
      await expect(modal).toBeHidden();
      await expect(page.locator("#modal-map iframe")).toHaveCount(0);
    });
  });
}

test("T5: menu do celular abre, fecha com Esc e devolve o foco", async ({ page }) => {
  // O botão do menu só aparece em telas de até 960 px
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/quero-carregar/index.html");
  const botao = page.locator(".menu-toggle");
  await botao.click();
  await expect(botao).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#site-nav")).toHaveClass(/is-open/);
  await page.keyboard.press("Escape");
  await expect(botao).toHaveAttribute("aria-expanded", "false");
  await expect(botao).toBeFocused();
});

test.describe("T11: sem JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("o conteúdo principal aparece nas 3 páginas", async ({ page }) => {
    for (const url of ["/index.html", ...personas.map((p) => p.url)]) {
      await page.goto(url);
      await expect(page.locator("h1")).toBeVisible();
    }
    await page.goto(personas[0].url);
    await expect(page.getByText("Carregando ofertas...")).toBeVisible();
    await expect(page.locator("details.faq-item").first()).toBeVisible();
  });
});
