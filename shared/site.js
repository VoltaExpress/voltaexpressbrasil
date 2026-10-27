/* ==========================================================================
   Volta Express Brasil — comportamento comum às 3 páginas
   Carregado com `defer` antes do script de cada página.
   Sem dependências externas.
   ========================================================================== */

/* --- Configuração central: trocar aqui muda as 3 páginas --- */
const VEB = {
  // Número de TESTE. Para trocar: veja docs/PLANO-DE-ACAO.md, seção "Trocar o número do WhatsApp".
  whatsapp: "5532988367667",
  plataforma: "https://voltaexpress.com.br/",
  // Chave do Google Maps Embed (pública por natureza): precisa estar restrita
  // ao domínio voltaexpressbrasil.com.br no Google Cloud.
  mapsKey: "AIzaSyBmtlBWyTjYX_C3FfPrKFgL-YHyyA3mfDY",
};

/** Monta o link do WhatsApp com mensagem pré-preenchida. */
VEB.waLink = (mensagem) =>
  `https://wa.me/${VEB.whatsapp}?text=${encodeURIComponent(mensagem)}`;

/** Escapa texto antes de inserir em HTML (evita injeção quando os dados vierem de fora). */
VEB.esc = (valor) =>
  String(valor).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

/* --- Links de WhatsApp: todo elemento com data-wa recebe o número central --- */
function setupWhatsappLinks(root = document) {
  root.querySelectorAll("[data-wa]").forEach((link) => {
    link.href = VEB.waLink(link.dataset.wa);
  });
}

/* --- Menu mobile acessível --- */
function setupMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.getElementById("site-nav");
  if (!toggle || !nav) return;

  const setOpen = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    nav.classList.toggle("is-open", open);
  };

  toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
  nav.addEventListener("click", (e) => { if (e.target.closest("a")) setOpen(false); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("is-open")) {
      setOpen(false);
      toggle.focus();
    }
  });
  document.addEventListener("click", (e) => {
    if (nav.classList.contains("is-open") && !e.target.closest(".site-header")) setOpen(false);
  });
}

/* --- Sombra no header ao rolar (listener passivo: não atrasa a rolagem) --- */
function setupHeaderShadow() {
  const header = document.querySelector(".site-header");
  if (!header) return;
  const update = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  update();
  window.addEventListener("scroll", update, { passive: true });
}

/* --- Animação de entrada com IntersectionObserver (substitui o ScrollReveal) ---
   Custo: um observer para todos os blocos; cada bloco é observado uma vez e liberado. */
function setupReveal() {
  const items = document.querySelectorAll("[data-reveal]");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!("IntersectionObserver" in window) || reduce) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
  );
  items.forEach((el) => observer.observe(el));
}

/* --- Modal acessível (Esc fecha, clique fora fecha, foco volta ao botão de origem) --- */
VEB.modal = (() => {
  let current = null;
  let opener = null;

  const close = () => {
    if (!current) return;
    current.hidden = true;
    document.body.classList.remove("has-modal");
    const map = current.querySelector(".modal-map");
    if (map) map.innerHTML = ""; // libera o iframe do mapa
    if (opener) opener.focus();
    current = null;
  };

  const open = (modal, trigger) => {
    current = modal;
    opener = trigger || null;
    modal.hidden = false;
    document.body.classList.add("has-modal");
    modal.querySelector(".modal-close")?.focus();
  };

  document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
  document.addEventListener("click", (e) => {
    if (!current) return;
    if (e.target === current || e.target.closest(".modal-close")) close();
  });

  return { open, close };
})();

/** Mapa de trajeto (Google Maps Embed) carregado só quando o modal abre. */
VEB.mapEmbed = (origem, destino) => {
  const src = `https://www.google.com/maps/embed/v1/directions?key=${VEB.mapsKey}` +
    `&origin=${encodeURIComponent(origem)}&destination=${encodeURIComponent(destino)}&mode=driving`;
  return `<iframe src="${src}" title="Mapa do trajeto de ${VEB.esc(origem)} até ${VEB.esc(destino)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>`;
};

document.addEventListener("DOMContentLoaded", () => {
  setupWhatsappLinks();
  setupMenu();
  setupHeaderShadow();
  setupReveal();
});
