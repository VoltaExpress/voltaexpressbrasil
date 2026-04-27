/* ===============================================================
    VOLTA EXPRESS BRASIL - LÓGICA DE CARGAS E BUSCA
   =============================================================== */

const CARDS_PER_STEP = 4;
let visibleCount = CARDS_PER_STEP;
let filteredData = [];
const GOOGLE_API_KEY = "AIzaSyBmtlBWyTjYX_C3FfPrKFgL-YHyyA3mfDY";

/* --- 🔍 BUSCA --- */
function initSearch() {
  const searchInput = document.getElementById("searchCarga");
  if (!searchInput) return;

  filteredData = [...allCardsData];

  searchInput.addEventListener("input", (e) => {
    const term = e.target.value.toLowerCase();
    filteredData = allCardsData.filter(
      (carga) =>
        carga.origem.toLowerCase().includes(term) ||
        carga.destino.toLowerCase().includes(term) ||
        carga.titulo.toLowerCase().includes(term),
    );
    visibleCount = CARDS_PER_STEP;
    renderCargas();
  });
}

/* --- 📦 RENDERIZAÇÃO --- */
function createCardHTML(carga, index) {
  return `
        <div class="box" data-index="${index}">
            <div class="box-img">
                <img src="${carga.imagem}" alt="${carga.titulo}" loading="lazy" />
            </div>
            <div class="card-content">
                <p class="infos">
                    <a href="javascript:void(0)" class="trajeto-link" onclick="handleOpenModal(${index})">
                        Ver Trajeto
                    </a>
                </p>
                <h3>${carga.titulo}</h3>
                <div class="route">
                    <h2>de ${carga.origem}</h2>
                    <h2>para ${carga.destino}</h2>
                </div>
                <div class="details-grid">
                    <span class="price">${carga.valor}</span>
                    <span>| ${carga.data}</span>
                    <span>| ${carga.peso}</span>
                    <span>| ${carga.unidades} un</span>
                </div>
                <a href="https://wa.me/${carga.whatsapp}" target="_blank" class="btn">
                    Carregar Agora <i class="bx bxl-whatsapp"></i>
                </a>
            </div>
        </div>
    `;
}

function renderCargas() {
  const container = document.getElementById("cargas-list");
  const loadMoreBtn = document.getElementById("load-more-btn");
  const endMessage = document.getElementById("end-message");

  if (!container) return;

  // CORREÇÃO AQUI: Passando o index para a função de criação do HTML
  const toRender = filteredData.slice(0, visibleCount);
  container.innerHTML = toRender
    .map((carga, index) => createCardHTML(carga, index))
    .join("");

  if (visibleCount >= filteredData.length) {
    loadMoreBtn.classList.add("hidden-default");
    if (filteredData.length > 0) endMessage.classList.remove("hidden-default");
  } else {
    loadMoreBtn.classList.remove("hidden-default");
    endMessage.classList.add("hidden-default");
  }
}

function handleLoadMore() {
  visibleCount += CARDS_PER_STEP;
  renderCargas();
}

/* --- 🗺️ MODAL MARAVILHOSO --- */
function handleOpenModal(index) {
  // Buscamos nos dados filtrados para garantir que o index bata com o que está na tela
  const carga = filteredData[index];
  const modal = document.getElementById("route-modal");

  if (!carga || !modal) return;

  // Injetar dados
  modal.querySelector(".header-info p").innerText = carga.titulo;
  modal.querySelector(".is-origin span").innerText = carga.origem;
  modal.querySelector(".is-destination span").innerText = carga.destino;
  modal.querySelector(".price .data-value").innerText = carga.valor;

  const detailValues = modal.querySelectorAll(".data-item .data-value");
  detailValues[1].innerText = carga.data;
  detailValues[2].innerText = carga.peso;
  detailValues[3].innerText = `${carga.unidades} un`;

  // WhatsApp
  const whatsappMsg = encodeURIComponent(
    `Olá! Vi o trajeto de ${carga.origem} para ${carga.destino} no Volta Express.`,
  );
  modal.querySelector(".btn-whatsapp").href =
    `https://wa.me/${carga.whatsapp}?text=${whatsappMsg}`;

  // Mapa
  const modalMap = document.getElementById("modal-map");
  const encodedOrigin = encodeURIComponent(carga.origem.replace("de ", ""));
  const encodedDest = encodeURIComponent(carga.destino.replace("para ", ""));

  // CORREÇÃO NA URL: Template string correta
  const mapUrl = `https://www.google.com/maps/embed/v1/directions?key=${GOOGLE_API_KEY}&origin=${encodedOrigin}&destination=${encodedDest}&mode=driving`;

  modalMap.innerHTML = `<iframe src="${mapUrl}" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>`;

  modal.classList.remove("hidden-default");
  document.body.style.overflow = "hidden";
}

/* --- 🧹 EVENTOS --- */
function initModalEvents() {
  const modal = document.getElementById("route-modal");
  const closeBtn = document.getElementById("closeModal");

  if (closeBtn) {
    closeBtn.onclick = () => {
      modal.classList.add("hidden-default");
      document.body.style.overflow = "auto";
    };
  }

  window.onclick = (event) => {
    if (event.target == modal) {
      modal.classList.add("hidden-default");
      document.body.style.overflow = "auto";
    }
  };
}


    /* FAQ */
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Verifica se o item já está ativo
        const isActive = item.classList.contains('active');
        
        // Fecha todos os outros itens (Opcional - UX de foco)
        faqItems.forEach(otherItem => otherItem.classList.remove('active'));
        
        // Se não estava ativo, abre. Se estava, ele fechou no loop acima.
        if (!isActive) {
            item.classList.add('active');
        }
    });
});


/* --- 🚀 START --- */
document.addEventListener("DOMContentLoaded", () => {
  if (typeof allCardsData !== "undefined") {
    filteredData = [...allCardsData];
    renderCargas();
    initSearch();
    initModalEvents();

    const loadBtn = document.getElementById("load-more-btn");
    if (loadBtn) loadBtn.onclick = handleLoadMore;
  }
});
