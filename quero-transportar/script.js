/* ==========================================================================
   Quero Transportar — mural de exemplos de caminhões (busca, "ver mais" e trajeto)
   Dados: viagens.js (viagensDisponiveis). Comum às páginas: ../shared/site.js (VEB).
   Menu, WhatsApp flutuante e animações ficam no shared/site.js.
   ========================================================================== */

const PRIMEIRA_CARGA = 6; // cards na primeira exibição
const INCREMENTO = 3;     // cards a cada "Ver mais"
let listaAtual = [];      // resultado da busca atual (corrige o "Ver mais" que voltava à lista completa)
let exibidas = 0;

/** Mensagem de WhatsApp que identifica o veículo para o atendimento. */
const mensagemViagem = (viagem) =>
  `Olá! Vi no site do Volta Express o veículo "${viagem.nome}" (${viagem.categoria}) de ${viagem.origem} para ${viagem.destino} e quero transportar minha carga.`;

/* --- Card de veículo (dados escapados; sem onclick inline) --- */
function createCardHTML(viagem) {
  const e = VEB.esc;
  return `
    <article class="offer-card">
      <div class="offer-media">
        <img src="${e(viagem.imagem)}" alt="" width="400" height="300" loading="lazy" decoding="async" />
        <span class="offer-tag">${e(viagem.categoria)}</span>
      </div>
      <div class="offer-body">
        <h3>${e(viagem.nome)}</h3>
        <p class="offer-route">
          <span><i class="bx bxs-circle" aria-hidden="true"></i> De: ${e(viagem.origem)}</span>
          <span><i class="bx bxs-map" aria-hidden="true"></i> Para: ${e(viagem.destino)}</span>
        </p>
        <ul class="offer-specs">
          <li><i class="bx bx-calendar" aria-hidden="true"></i> ${e(viagem.data)}</li>
          <li><i class="bx bx-package" aria-hidden="true"></i> ${e(viagem.capacidade)}</li>
          <li><i class="bx bx-cube" aria-hidden="true"></i> ${e(viagem.volume)}</li>
          <li><i class="bx bx-check-shield" aria-hidden="true"></i> Verificado</li>
        </ul>
        <p class="offer-desc">${e(viagem.descricao)}</p>
        <div class="offer-actions">
          <button type="button" class="btn btn-ghost" data-route="${e(viagem.id)}">
            <i class="bx bx-map-alt" aria-hidden="true"></i> Ver Trajeto
          </button>
          <a href="${VEB.waLink(mensagemViagem(viagem))}" target="_blank" rel="noopener" class="btn btn-whatsapp">
            <i class="bx bxl-whatsapp" aria-hidden="true"></i> Transportar Agora
          </a>
        </div>
      </div>
    </article>`;
}

/** Renderiza os primeiros N cards da lista atual; `reset` recomeça a contagem (nova busca). */
function renderizarCards(reset = false) {
  const container = document.getElementById("services-content");
  const botao = document.getElementById("load-more-btn");
  const fim = document.getElementById("all-loaded-msg");
  if (!container) return;

  if (reset) exibidas = 0;
  exibidas = Math.min(exibidas + (exibidas === 0 ? PRIMEIRA_CARGA : INCREMENTO), listaAtual.length);

  container.innerHTML = listaAtual.length
    ? listaAtual.slice(0, exibidas).map(createCardHTML).join("")
    : '<p class="offers-empty">Nenhum veículo encontrado para essa busca.</p>';

  const acabou = exibidas >= listaAtual.length;
  botao.hidden = acabou;
  fim.hidden = !(acabou && listaAtual.length > 0);
}

/* --- Busca por origem, destino, tipo de veículo ou nome --- */
function setupSearch() {
  const input = document.getElementById("search-input");
  if (!input) return;
  input.addEventListener("input", (e) => {
    const termo = e.target.value.trim().toLowerCase();
    listaAtual = viagensDisponiveis.filter((v) =>
      [v.origem, v.destino, v.categoria, v.nome].some((campo) => campo.toLowerCase().includes(termo)),
    );
    renderizarCards(true);
  });
}

/* --- Modal de trajeto --- */
function abrirTrajeto(id, trigger) {
  const viagem = viagensDisponiveis.find((v) => String(v.id) === String(id));
  const modal = document.getElementById("route-modal");
  if (!viagem || !modal) return;

  document.getElementById("route-modal-categoria").textContent = viagem.categoria;
  document.getElementById("route-modal-title").textContent = viagem.nome;
  document.getElementById("route-modal-route").textContent = `${viagem.origem} → ${viagem.destino}`;
  document.getElementById("route-modal-data").textContent = viagem.data;
  document.getElementById("route-modal-capacidade").textContent = viagem.capacidade;
  document.getElementById("route-modal-volume").textContent = viagem.volume;
  document.getElementById("route-modal-veiculo").textContent = viagem.categoria;
  document.getElementById("route-modal-cta").href = VEB.waLink(mensagemViagem(viagem));
  document.getElementById("modal-map").innerHTML = VEB.mapEmbed(viagem.origem, viagem.destino);

  VEB.modal.open(modal, trigger);
}

document.addEventListener("DOMContentLoaded", () => {
  if (typeof viagensDisponiveis === "undefined") return;
  listaAtual = [...viagensDisponiveis];
  renderizarCards(true);
  setupSearch();

  document.getElementById("load-more-btn")?.addEventListener("click", () => renderizarCards());

  // Um único listener para todos os botões "Ver Trajeto" (delegação de eventos)
  document.getElementById("services-content")?.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-route]");
    if (btn) abrirTrajeto(btn.dataset.route, btn);
  });
});
