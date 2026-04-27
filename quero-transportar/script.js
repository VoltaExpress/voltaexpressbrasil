/**
 * VOLTA EXPRESS BRASIL - script.js
 * Lógica de Interface, Integração de Dados e UX
 */

/* --- CONFIGURAÇÕES E ESTADO GLOBAL --- */
const CONFIG = {
  apiKey: "AIzaSyBmtlBWyTjYX_C3FfPrKFgL-YHyyA3mfDY",
  supportNumber: "5532998615190",
  supportMessage:
    "Olá, gostaria de conversar com um especialista do Volta Express Brasil.",
};

/* --- MENU MOBILE & SCROLL NAVIGATION --- */
const menu = document.querySelector("#menu-icon");
const navbar = document.querySelector(".navbar");

const toggleMenu = (open = null) => {
  if (open === false) {
    menu.classList.remove("bx-x");
    navbar.classList.remove("active");
  } else {
    menu.classList.toggle("bx-x");
    navbar.classList.toggle("active");
  }
};

menu.onclick = () => toggleMenu();

window.onscroll = () => {
  toggleMenu(false);
  const header = document.querySelector("header");
  header.classList.toggle("shadow", window.scrollY > 0);
};

/* --- ANIMAÇÕES (SCROLL REVEAL) --- */
const sr = ScrollReveal({
  distance: "40px",
  duration: 2000,
  delay: 200,
  reset: false,
});

sr.reveal(".home-text", { origin: "left" });
sr.reveal(".heading", { origin: "top" });
sr.reveal(".about-container", { origin: "bottom" });
sr.reveal(".reviews-container", { origin: "top" });

/* * ============================================================
 * FUNCIONALIDADE: ENCONTRAR VIAGEM (DINÂMICO)
 * Gerenciamento de busca, listagem e carregamento progressivo
 * ============================================================
 */

const setupSearch = () => {
  const searchInput = document.getElementById("search-input");
  if (!searchInput) return;

  searchInput.addEventListener("input", (e) => {
    const termo = e.target.value.toLowerCase();

    // viagensDisponiveis vem do arquivo viagens.js
    const filtrados = viagensDisponiveis.filter(
      (viagem) =>
        viagem.origem.toLowerCase().includes(termo) ||
        viagem.destino.toLowerCase().includes(termo) ||
        viagem.categoria.toLowerCase().includes(termo) ||
        viagem.nome.toLowerCase().includes(termo),
    );

    // Reseta o container e a paginação global para a nova busca
    document.getElementById("services-content").innerHTML = "";
    viagensExibidas = 0; // Variável global em viagens.js
    renderizarCards(filtrados);
  });
};

const setupLoadMore = () => {
  const loadMoreBtn = document.getElementById("load-more-btn");
  if (loadMoreBtn) {
    loadMoreBtn.onclick = () => renderizarCards(viagensDisponiveis);
  }
};

/* --- LÓGICA DO MODAL DE TRAJETO --- */
window.abrirModal = function (id) {
  const modal = document.getElementById("route-modal");
  const modalDetails = document.getElementById("modal-details");
  const modalMap = document.getElementById("modal-map");

  const viagem = viagensDisponiveis.find((v) => v.id === id);
  if (!viagem) return;

  // Injeção com estilos forçados para evitar que fujam do modal
  modalDetails.innerHTML = `
        <div style="text-align: left; width: 100%;">
            <span class="type-badge" style="position: static; display: inline-block; margin-bottom: 5px;">
                ${viagem.categoria}
            </span>
            <h2 style="margin: 0; color: #1e293b; font-size: 1.5rem; line-height: 1.2;">
                ${viagem.nome}
            </h2>
            <p style="margin: 5px 0 0 0; color: #ef4444; font-weight: 600; display: flex; align-items: center; gap: 5px;">
                <i class='bx bxs-map'></i> ${viagem.origem} <i class='bx bx-right-arrow-alt'></i> ${viagem.destino}
            </p>
        </div>
    `;

  const origem = encodeURIComponent(viagem.origem);
  const destino = encodeURIComponent(viagem.destino);
  const mapUrl = `https://www.google.com/maps/embed/v1/directions?key=${CONFIG.apiKey}&origin=${origem}&destination=${destino}&mode=driving`;

  modalMap.innerHTML = `<iframe src="${mapUrl}" width="100%" height="100%" style="border:0; border-radius:12px;" allowfullscreen="" loading="lazy"></iframe>`;

  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
};

window.fecharModal = function () {
  const modal = document.getElementById("route-modal");
  modal.style.display = "none";
  document.body.style.overflow = "auto";
  document.getElementById("modal-map").innerHTML = ""; // Limpa para economizar recurso
};
// Event Listeners para o Modal
document.querySelector(".close-button")?.addEventListener("click", fecharModal);
window.addEventListener("click", (e) => {
  if (e.target.id === "route-modal") fecharModal();
});

/* --- SUPORTE & FAQ --- */
const setupSupport = () => {
  const whatsappButton = document.getElementById("fixed-whatsapp-button");
  if (whatsappButton) {
    whatsappButton.href = `https://wa.me/${CONFIG.supportNumber}?text=${encodeURIComponent(CONFIG.supportMessage)}`;
  }
};

const setupFAQ = () => {
  document.querySelectorAll(".faq-question").forEach((btn) => {
    btn.addEventListener("click", () => {
      const currentItem = btn.parentElement;
      const isActive = currentItem.classList.contains("active");
      document
        .querySelectorAll(".faq-item")
        .forEach((item) => item.classList.remove("active"));
      if (!isActive) currentItem.classList.add("active");
    });
  });
};

/* --- INICIALIZAÇÃO CENTRALIZADA --- */
document.addEventListener("DOMContentLoaded", () => {
  // 1. Inicializa Seção de Viagens (viagens.js deve estar carregado antes)
  if (typeof renderizarCards === "function") {
    renderizarCards(viagensDisponiveis);
    setupSearch();
    setupLoadMore();
  }

  // 2. Inicializa Componentes de UI
  setupSupport();
  setupFAQ();

  // 3. Delay para animação de entrada dos cards
  setTimeout(() => {
    sr.reveal(".services-container .box", { interval: 100 });
  }, 500);
});
