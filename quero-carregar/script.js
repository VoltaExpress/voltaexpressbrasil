/* ===============================================================
    VOLTA EXPRESS BRASIL - QUERO CARREGAR
    */

/* =============================================================== 
    Controle de Sessão, Header, Logout e Funcionalidades 
    ====================== 🔐 CONFIGURAÇÕES DE LOCALSTORAGE ========  */

const STORAGE_KEY = "volta_express_users"; // Lista completa de usuários cadastrados
const SESSION_KEY = "volta_express_brasil"; // Sessão atual com { login_usuario, hora_login }

/**
 * Obtém a lista de usuários armazenada
 */
function getUsers() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

/**
 * Obtém a sessão ativa
 */
function getSession() {
  const sessionData = localStorage.getItem(SESSION_KEY);
  return sessionData ? JSON.parse(sessionData) : null;
}

/**
 * Encerra a sessão e redireciona para a tela de login
 */
function logoutUser() {
  localStorage.removeItem(SESSION_KEY);
  window.location.href = "./login-register/index.html";
}

/* =============================================================== 
    🌟 LÓGICA DE PAGINAÇÃO NUMÉRICA MISTA E CONDICIONAL 
    =============================================================== */

// Constantes de Limites de Paginação
const FIRST_PAGE_LIMIT = 5; // Limite para a primeira página (logado e deslogado)
const SUBSEQUENT_PAGE_LIMIT = 6; // Limite para as páginas seguintes (logado)
let currentPage = 1;
let totalPages = 1;

/**
 * Calcula o índice final acumulado baseado na regra de limite misto.
 * @param {number} page - O número da página atual (começa em 1).
 * @returns {number} O índice final (não inclusivo) para o método slice().
 */
function calculateAccumulatedEndIndex(page) {
  if (page === 1) {
    return FIRST_PAGE_LIMIT;
  } else {
    // Fórmula para acumular a P1 (5) + todas as páginas subsequentes (6 cada)
    return FIRST_PAGE_LIMIT + (page - 1) * SUBSEQUENT_PAGE_LIMIT;
  }
}

/**
 * Atualiza o estado visual (ativo/desabilitado) dos links e setas.
 * Agora, marca todas as páginas até a página atual como 'active'.
 */
function updatePaginationUI(totalItems, paginationContainer) {
  const paginationList = paginationContainer.querySelector(".pagination");

  // Recalcula totalPages (necessário para o controle de desabilitado)
  const remainingItems = totalItems - FIRST_PAGE_LIMIT;
  const subsequentPages = Math.ceil(remainingItems / SUBSEQUENT_PAGE_LIMIT);
  totalPages = 1 + subsequentPages;

  // 1. Atualiza o estado ativo nos números (Lógica Acumulativa)
  paginationList.querySelectorAll("a[data-page]").forEach((a) => {
    const pageNumber = parseInt(a.getAttribute("data-page"));
    a.classList.remove("active");

    // Marca como ativo todas as páginas até a página atual (inclusive)
    if (pageNumber <= currentPage) {
      a.classList.add("active");
    }
  });

  // 2. Atualiza o estado das setas de navegação (Lógica inalterada)
  const prevBtn = document.getElementById("prev-page-btn");
  const nextBtn = document.getElementById("next-page-btn");

  if (prevBtn) {
    prevBtn.classList.toggle("disabled", currentPage === 1);
  }

  if (nextBtn) {
    nextBtn.classList.toggle("disabled", currentPage === totalPages);
  }
}

/**
 * Gera os links numéricos de paginação e configura os eventos.
 * @param {HTMLElement} servicesContainer - Container dos cards para o scroll.
 * @param {HTMLElement} paginationContainer - Container da barra de paginação.
 * @param {boolean} isUserLoggedIn - Estado de login atual.
 */
function setupPagination(
  servicesContainer,
  paginationContainer,
  isUserLoggedIn
) {
  const totalItems = allCardsData.length;

  // 1. Lógica de cálculo de TotalPages para Logado
  if (isUserLoggedIn) {
    if (totalItems <= FIRST_PAGE_LIMIT) {
      totalPages = 1;
    } else {
      const remainingItems = totalItems - FIRST_PAGE_LIMIT;
      const subsequentPages = Math.ceil(remainingItems / SUBSEQUENT_PAGE_LIMIT);
      totalPages = 1 + subsequentPages;
    }
  } else {
    // Deslogado: Sempre 1 página visível (limite 5)
    totalPages = 1;
  }

  // Chama renderPage para definir o estado inicial (5 cards visíveis)
  renderPage(1, isUserLoggedIn, servicesContainer, paginationContainer);

  // 2. Se deslogado, ou se o total de páginas for 1, não gera os números.
  if (!isUserLoggedIn || totalPages <= 1) {
    paginationContainer.classList.add("hidden-default");
    return;
  }

  // 3. --- Geração do HTML (Apenas se Logado e totalPages > 1) ---

  const paginationList = paginationContainer.querySelector(".pagination");
  paginationList.innerHTML = "";
  paginationContainer.classList.remove("hidden-default");

  // Adiciona a seta "Anterior"
  const prevArrowLi = document.createElement("li");
  prevArrowLi.innerHTML =
    '<a class="nav-arrow" id="prev-page-btn" href="#">&laquo;</a>';
  paginationList.appendChild(prevArrowLi);

  // Adiciona os links numéricos
  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = "#";
    a.textContent = i;
    a.setAttribute("data-page", i);

    a.addEventListener("click", (e) => {
      e.preventDefault();
      // Ao clicar, chama a função que renderiza o conteúdo
      renderPage(i, isUserLoggedIn, servicesContainer, paginationContainer);
    });

    li.appendChild(a);
    paginationList.appendChild(li);
  }

  // Adiciona a seta "Próximo"
  const nextArrowLi = document.createElement("li");
  nextArrowLi.innerHTML =
    '<a class="nav-arrow" id="next-page-btn" href="#">&raquo;</a>';
  paginationList.appendChild(nextArrowLi);

  // Adiciona eventos de clique às setas (após a criação)
  const prevBtn = document.getElementById("prev-page-btn");
  const nextBtn = document.getElementById("next-page-btn");

  if (prevBtn) {
    prevBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (currentPage > 1)
        renderPage(
          currentPage - 1,
          isUserLoggedIn,
          servicesContainer,
          paginationContainer
        );
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (currentPage < totalPages)
        renderPage(
          currentPage + 1,
          isUserLoggedIn,
          servicesContainer,
          paginationContainer
        );
    });
  }

  // Define o estado ativo inicial
  updatePaginationUI(totalItems, paginationContainer);
}

/**
 * Gera o HTML de um único card com base nos dados do objeto.
 * @param {object} cardData - Objeto contendo os dados do card.
 * @returns {string} - String contendo o HTML completo do card.
 */
function createCardHTML(cardData) {
  const message = encodeURIComponent(
    "Olá! Gostei do seu anúncio no Volta Express Brasil - Carregar Agora! Quero saber mais detalhes."
  );
  const whatsappLink = `https://wa.me/${cardData.whatsapp}?text=${message}`;

  return `
        <div class="box">
            <div class="box-img">
                <img src="${cardData.imagem}" alt="${cardData.titulo}" />
            </div>
            <p class="infos"><a href="#" class="trajeto-link">Trajeto</a></p>
            <h3>${cardData.titulo}</h3>
            <h2>de ${cardData.origem}</h2>
            <h2>para ${cardData.destino}</h2>
            <p>
                <span> ${cardData.valor}</span>
                <span> | ${cardData.data}</span>
                <span> | ${cardData.peso}</span>
                <span> | ${cardData.volume}</span>
                <span> | ${cardData.unidades}</span>
            </p>
            <a href="${whatsappLink}" target="_blank" class="btn">
                Carregar Agora <i class="bx bxl-whatsapp"></i>
            </a>
        </div>
    `;
}

/**
 * Anexa os event listeners (WhatsApp e Modal) aos cards recém-renderizados.
 * Esta função precisa ser chamada sempre que novos cards são inseridos no DOM.
 */
function attachCardEventListeners() {
  // 1. Eventos do Modal (Trajeto)
  document.querySelectorAll(".trajeto-link").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const cardElement = link.closest(".box");
      openModal(cardElement);
    });
  });
  // Observação: Os links do WhatsApp já estão corretos no HTML gerado pela createCardHTML.
}

/**
 * Renderiza (ou atualiza) os cards visíveis no DOM com base na página atual (Paginação Acumulativa).
 * @param {number} page - A página a ser exibida.
 * @param {boolean} isUserLoggedIn - Se o usuário está logado.
 * @param {HTMLElement} servicesContainer - O container onde os cards vão.
 * @param {HTMLElement} paginationContainer - O container da barra de paginação.
 */
function renderPage(
  page,
  isUserLoggedIn,
  servicesContainer,
  paginationContainer
) {
  currentPage = page;

  const startIndex = 0; // Sempre começa do primeiro item (acumulativo)
  let requestedEndIndex = 0;

  // --- 1. Determina o índice de fim com base no estado de login ---
  if (isUserLoggedIn) {
    // Lógica logada: Usa o novo cálculo acumulativo
    requestedEndIndex = calculateAccumulatedEndIndex(page);
  } else {
    // Lógica deslogada: Sempre mostra apenas os primeiros 5 cards (P1)
    requestedEndIndex = FIRST_PAGE_LIMIT;

    // Garante que o container de paginação esteja oculto se deslogado
    paginationContainer.classList.add("hidden-default");
  }

  // Ajusta o endIndex para NUNCA ultrapassar o total de itens disponíveis
  const actualEndIndex = Math.min(requestedEndIndex, allCardsData.length);

  // 2. Filtra e Gera o HTML dos cards visíveis
  let htmlContent = "";

  // Pega o SLICE (a fatia) do array de dados para a exibição acumulada
  const cardsToRender = allCardsData.slice(startIndex, actualEndIndex);

  // Itera APENAS sobre os dados da página atual
  cardsToRender.forEach((cardData) => {
    htmlContent += createCardHTML(cardData);
  });

  // 3. Insere o HTML no container
  servicesContainer.innerHTML = htmlContent;

  // 4. Se logado, rola a tela e atualiza a UI da paginação.
  if (isUserLoggedIn) {
    // A lógica de visibilidade da barra de paginação fica em setupPagination

    window.scrollTo({
      top: servicesContainer.offsetTop - 100,
      behavior: "smooth",
    });
    // A UI de paginação é atualizada para destacar o número da página
    updatePaginationUI(allCardsData.length, paginationContainer);
  }

  // 5. Reanexa os Event Listeners (para os cards recém-inseridos)
  attachCardEventListeners();
}

/* ===============================================================
    🗺️ MODAL DE TRAJETO (Google Maps) - Mantido igual, mas agora chamado dinamicamente
    =============================================================== */
const apiKey = "AIzaSyBmtlBWyTjYX_C3FfPrKFgL-YHyyA3mfDY";
function openModal(cardElement) {
  const modal = document.getElementById("route-modal");
  const modalDetails = document.getElementById("modal-details");
  const modalMap = document.getElementById("modal-map");

  // Estas consultas dependem da estrutura que você manteve no createCardHTML
  const cardTitle = cardElement.querySelector("h3").innerText;
  const cardOrigin = cardElement.querySelector("h2:nth-of-type(1)").innerText;
  const cardDestination =
    cardElement.querySelector("h2:nth-of-type(2)").innerText;
  // Pega a segunda tag <p> (a que contém os detalhes do peso/valor)
  const cardInfo = cardElement.querySelector(".box p:nth-of-type(2)").innerText;

  modalDetails.innerHTML = `
        <p>${cardOrigin} ${cardDestination}</p>
        <p>${cardInfo}</p>
    `;

  const encodedOrigin = encodeURIComponent(cardOrigin);
  const encodedDestination = encodeURIComponent(cardDestination);
  // Atenção ao erro que estava na URL: corrigi para o formato correto.
  const mapUrl = `https://www.google.com/maps/embed/v1/directions?key=${apiKey}&origin=${encodedOrigin}&destination=${encodedDestination}`;

  modalMap.innerHTML = `<iframe src="${mapUrl}" width="100%" height="300" style="border:0;" allowfullscreen="" loading="lazy"></iframe>`;

  modal.style.display = "flex";
}

/* ===============================================================
    🔄 VERIFICAÇÃO DE LOGIN E INICIALIZAÇÃO GERAL
    =============================================================== */
document.addEventListener("DOMContentLoaded", () => {
  // ⭐ ELEMENTOS PARA PAGINAÇÃO E RENDERIZAÇÃO
  const servicesContainer = document.querySelector(".services-container");
  const paginationContainer = document.getElementById("pagination-container");

  // Elementos do Header
  const authSection = document.getElementById("auth-section");
  const welcomeMessage = document.getElementById("header-greeting");

  const session = getSession();
  let isUserLoggedIn = false;

  // --- Lógica de Login e Header ---
  if (!session || !session.login_usuario) {
    console.warn("Nenhum login encontrado. Modo offline ativo.");
  } else {
    const users = getUsers();
    const loggedUser = users.find((u) => u.email === session.login_usuario);

    if (!loggedUser) {
      console.warn("Usuário da sessão não encontrado na lista de usuários.");
      logoutUser();
      return;
    }

    /* =============== 🕒 VALIDAÇÃO DE TEMPO DE LOGIN =============== */
    const horaLogin = new Date(session.hora_login);
    const agora = new Date();
    const diffMinutos = Math.floor((agora - horaLogin) / 60000); // Diferença em minutos

    if (diffMinutos > 60) {
      console.info("Sessão expirada. Faça login novamente.");
      logoutUser();
      return;
    }

    isUserLoggedIn = true;

    /* ===============================================================
                🙋‍♂️ BOAS-VINDAS E HEADER: Usuário Logado
                =============================================================== */
    const userName = loggedUser.nome || session.login_usuario.split("@")[0];
    if (welcomeMessage) {
      welcomeMessage.textContent = `Olá, ${userName}`;
      welcomeMessage.classList.remove("hidden-default");
    }

    // Cria o botão de logout
    const logoutButton = document.createElement("a");
    logoutButton.textContent = "Sair";
    logoutButton.classList.add("sign-in", "logout-btn");
    logoutButton.href = "#";
    logoutButton.addEventListener("click", (e) => {
      e.preventDefault();
      logoutUser();
    });

    // Atualiza a seção de autenticação
    if (authSection) {
      authSection.innerHTML = "";
      authSection.appendChild(welcomeMessage);
      authSection.appendChild(logoutButton);
    }

    console.log("✅ Usuário logado:", loggedUser);
    console.log("🕒 Login feito em:", horaLogin.toLocaleString());
  }

  /* ===============================================================
        ⭐ INICIALIZAÇÃO DA PAGINAÇÃO E RENDERIZAÇÃO
        =============================================================== */

  // A função setupPagination inicia a renderização na Pág 1 e configura os botões.
  setupPagination(servicesContainer, paginationContainer, isUserLoggedIn);

  /* ===============================================================
        🗺️ MODAL DE TRAJETO - Eventos de Fechamento (Globais)
        =============================================================== */
  // Estes eventos não precisam ser reanexados
  const closeButton = document.querySelector(".close-button");
  if (closeButton) {
    closeButton.addEventListener("click", () => {
      document.getElementById("route-modal").style.display = "none";
    });
  }

  const routeModal = document.getElementById("route-modal");
  if (routeModal) {
    routeModal.addEventListener("click", (event) => {
      if (event.target.id === "route-modal") {
        document.getElementById("route-modal").style.display = "none";
      }
    });
  }

  /* ===============================================================
        📱 HEADER MENU RESPONSIVO
        =============================================================== */
  let menu = document.querySelector("#menu-icon");
  let navbar = document.querySelector(".navbar");

  if (menu && navbar) {
    menu.onclick = () => {
      menu.classList.toggle("bx-x");
      navbar.classList.toggle("active");
    };

    window.onscroll = () => {
      menu.classList.remove("bx-x");
      navbar.classList.remove("active");
    };
  }

  /* ===============================================================
        ✨ SCROLLREVEAL ANIMAÇÕES
        =============================================================== */
  if (typeof ScrollReveal !== "undefined") {
    const sr = ScrollReveal({
      distance: "60px",
      duration: 2500,
      delay: 400,
      reset: true,
    });

    sr.reveal(".text", { delay: 200, origin: "top" });
    sr.reveal(".form-container form", { delay: 800, origin: "left" });
    sr.reveal(".heading", { delay: 800, origin: "top" });
    sr.reveal(".ride-container .box", { delay: 600, origin: "top" });
    sr.reveal(".services-container .box", { delay: 600, origin: "top" });
    sr.reveal(".reviews-container", { delay: 600, origin: "top" });
    sr.reveal(".about-container .box", { delay: 600, origin: "top" });
    sr.reveal(".newsletter .box", { delay: 400, origin: "bottom" });
  }

  /* ===============================================================
        💬 BOTÃO FIXO DE SUPORTE (WhatsApp)
        =============================================================== */
  const whatsappButton = document.getElementById("fixed-whatsapp-button");
  const supportNumber = "5532998615190";
  const supportMessage =
    "Olá, gostaria de conversar com um especialista do Volta Express Brasil | Quero Carregar.";
  const encodedSupportMessage = encodeURIComponent(supportMessage);

  if (whatsappButton) {
    whatsappButton.href = `https://wa.me/${supportNumber}?text=${encodedSupportMessage}`;
  }

  /* ===============================================================
        ❓ FAQ (Expansão de perguntas)
        =============================================================== */
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const questionButton = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    questionButton.addEventListener("click", () => {
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.querySelector(".faq-answer").style.display = "none";
        }
      });
      answer.style.display =
        answer.style.display === "block" ? "none" : "block";
    });
  });
});
