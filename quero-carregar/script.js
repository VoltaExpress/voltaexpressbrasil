/* ==========================================================================
   Quero Carregar — mural de exemplos de cargas (busca, "ver mais" e trajeto)
   Dados: cargas.js (allCardsData). Comum às páginas: ../shared/site.js (VEB).
   Menu, WhatsApp flutuante e animações ficam no shared/site.js.
   ========================================================================== */

const PRIMEIRA_CARGA = 6; // múltiplo de 3 e 2: completa as linhas da grade no desktop e no tablet
const CARDS_PER_STEP = 3;
let visibleCount = PRIMEIRA_CARGA;
let filteredData = [];

/** Mensagem de WhatsApp que identifica a carga para o atendimento. */
const mensagemCarga = (carga) =>
  `Olá! Vi no site do Volta Express a carga "${carga.titulo}" de ${carga.origem} para ${carga.destino} e tenho interesse.`;

/* --- Card de carga (dados escapados; sem onclick inline) --- */
function createCardHTML(carga) {
  const e = VEB.esc;
  return `
    <article class="offer-card">
      <div class="offer-media">
        <img src="${e(carga.imagem)}" alt="" width="400" height="300" loading="lazy" decoding="async" />
      </div>
      <div class="offer-body">
        <h3>${e(carga.titulo)}</h3>
        <p class="offer-route">
          <span><i class="bx bxs-circle" aria-hidden="true"></i> De: ${e(carga.origem)}</span>
          <span><i class="bx bxs-map" aria-hidden="true"></i> Para: ${e(carga.destino)}</span>
        </p>
        <ul class="offer-specs">
          <li><i class="bx bx-calendar" aria-hidden="true"></i> ${e(carga.data)}</li>
          <li><i class="bx bx-package" aria-hidden="true"></i> ${e(carga.peso)}</li>
          <li><i class="bx bx-cube" aria-hidden="true"></i> ${e(carga.volume)}</li>
          <li><i class="bx bx-layer" aria-hidden="true"></i> ${e(carga.unidades)} un</li>
        </ul>
        <p class="offer-price">${e(carga.valor)}</p>
        <div class="offer-actions">
          <button type="button" class="btn btn-ghost" data-route="${e(carga.id)}">
            <i class="bx bx-map-alt" aria-hidden="true"></i> Ver Trajeto
          </button>
          <a href="${VEB.waLink(mensagemCarga(carga))}" target="_blank" rel="noopener" class="btn btn-whatsapp">
            <i class="bx bxl-whatsapp" aria-hidden="true"></i> Carregar Agora
          </a>
        </div>
      </div>
    </article>`;
}

function renderCargas() {
  const container = document.getElementById("cargas-list");
  const loadMoreBtn = document.getElementById("load-more-btn");
  const endMessage = document.getElementById("end-message");
  if (!container) return;

  const toRender = filteredData.slice(0, visibleCount);
  container.innerHTML = toRender.length
    ? toRender.map(createCardHTML).join("")
    : '<p class="offers-empty">Nenhuma carga encontrada para essa busca.</p>';

  const acabou = visibleCount >= filteredData.length;
  loadMoreBtn.hidden = acabou;
  endMessage.hidden = !(acabou && filteredData.length > 0);
}

/* --- Busca por origem, destino ou tipo de carga --- */
function initSearch() {
  const input = document.getElementById("searchCarga");
  if (!input) return;
  input.addEventListener("input", (e) => {
    const termo = e.target.value.trim().toLowerCase();
    filteredData = allCardsData.filter((carga) =>
      [carga.origem, carga.destino, carga.titulo].some((campo) => campo.toLowerCase().includes(termo)),
    );
    visibleCount = PRIMEIRA_CARGA;
    renderCargas();
  });
}

/* --- Modal de trajeto --- */
function openRoute(id, trigger) {
  const carga = allCardsData.find((c) => String(c.id) === String(id));
  const modal = document.getElementById("route-modal");
  if (!carga || !modal) return;

  document.getElementById("route-modal-title").textContent = carga.titulo;
  document.getElementById("route-modal-route").textContent = `${carga.origem} → ${carga.destino}`;
  document.getElementById("route-modal-valor").textContent = carga.valor;
  document.getElementById("route-modal-data").textContent = carga.data;
  document.getElementById("route-modal-peso").textContent = carga.peso;
  document.getElementById("route-modal-unidades").textContent = `${carga.unidades} un`;
  document.getElementById("route-modal-cta").href = VEB.waLink(mensagemCarga(carga));
  document.getElementById("modal-map").innerHTML = VEB.mapEmbed(carga.origem, carga.destino);

  VEB.modal.open(modal, trigger);
}

document.addEventListener("DOMContentLoaded", () => {
  if (typeof allCardsData === "undefined") return;
  filteredData = [...allCardsData];
  renderCargas();
  initSearch();

  document.getElementById("load-more-btn")?.addEventListener("click", () => {
    visibleCount += CARDS_PER_STEP;
    renderCargas();
  });

  // Um único listener para todos os botões "Ver Trajeto" (delegação de eventos)
  document.getElementById("cargas-list")?.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-route]");
    if (btn) openRoute(btn.dataset.route, btn);
  });
});
