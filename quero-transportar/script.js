/**
 * Menu Header responsive
 */
let menu = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menu.onclick = () => {
  menu.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

window.onscroll = () => {
  menu.classList.remove("bx-x");
  navbar.classList.remove("active");
};
/**
 * Scrollrevel
 */
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
sr.reveal(".about-container .box", { delay: 600, origin: "top" });
sr.reveal(".reviews-container-edit", { delay: 600, origin: "top" });
sr.reveal(".newsletter .box", { delay: 400, origin: "bottom" });


/**
 * Encontrar Caminhão
 */
// Dados para os cards de caminhões, incluindo os números de WhatsApp.
// Substitua os números de exemplo pelos reais.
const truckCardsData = [
  { whatsapp: '5532998615190' }, // Card 1: Caminhão do João
  { whatsapp: '5532999999999' }, // Card 2: Caminhão da Ana
  { whatsapp: '5532888888888' }, // Card 3: Transportes Sul
  { whatsapp: '5532777777777' }, // Card 4: Rápido Fretes
  { whatsapp: '5532666666666' }, // Card 5: Expedição Brasil
  { whatsapp: '5532555555555' }, // Card 6: Caminhão do Beto
  { whatsapp: '5532444444444' }  // Card 7: Logística Segura
];

// Mensagem pré-definida para o WhatsApp, com o nome do projeto
const message = encodeURIComponent('Olá! Gostei do seu anúncio no Volta Express Brasil - Transportar Agora! Quero saber mais detalhes.');

// Seleciona todos os botões de "Transportar Agora"
const truckButtons = document.querySelectorAll('.services-container .box .btn');

// Itera sobre os botões e os dados, atualizando o link de cada um
truckButtons.forEach((button, index) => {
  if (truckCardsData[index]) {
    button.href = `https://wa.me/${truckCardsData[index].whatsapp}?text=${message}`;
  }
});
/**
 * Modal de trajeto
 * 
 */

// Substitua o valor real em SUA_CHAVE_DE_API_DO_GOOGLE
const apiKey = 'AIzaSyBmtlBWyTjYX_C3FfPrKFgL-YHyyA3mfDY';

// 

/**
 * Acessa a chave de API de forma segura a partir da variável de ambiente
const apiKey = import.meta.env.VITE_Maps_API_KEY;
 * 
 */

/*
// Mensagem pré-definida para o WhatsApp
const message = encodeURIComponent('Olá! Gostei do seu anúncio no Volta Express Brasil - Transportar Agora! Quero saber mais detalhes.');*/

// Função para abrir o modal com os dados do card clicado
function openModal(cardElement) {
  const modal = document.getElementById("route-modal");
  const modalDetails = document.getElementById("modal-details");
  const modalMap = document.getElementById("modal-map");

  // Captura as informações do card clicado
  const cardTitle = cardElement.querySelector("h3").innerText;
  const cardOrigin = cardElement.querySelector("h2:nth-of-type(1)").innerText;
  const cardDestination = cardElement.querySelector("h2:nth-of-type(2)").innerText;
  const cardInfo = cardElement.querySelector("p:nth-of-type(2)").innerText;

  // Atualiza o conteúdo do modal
  modalDetails.innerHTML = `
    <p>${cardOrigin} ${cardDestination}</p>
    <p>${cardInfo}</p>
  `;

  // CORREÇÃO: Cria a URL do trajeto de forma dinâmica para a API do Google Maps Embed
  const encodedOrigin = encodeURIComponent(cardOrigin);
  const encodedDestination = encodeURIComponent(cardDestination);

  const mapUrl = `https://www.google.com/maps/embed/v1/directions?key=${apiKey}&origin=${encodedOrigin}&destination=${encodedDestination}`;

  modalMap.innerHTML = `<iframe src="${mapUrl}" width="100%" height="300" style="border:0;" allowfullscreen="" loading="lazy"></iframe>`;

  // Exibe o modal
  modal.style.display = "flex";
}

// Seleciona todos os links de "Trajeto" e adiciona um evento de clique
document.querySelectorAll(".trajeto-link").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault(); // Impede a navegação padrão do link
    const cardElement = link.closest(".box"); // Encontra o card pai
    openModal(cardElement);
  });
});

// Fecha o modal ao clicar no botão de fechar ou no overlay
document.querySelector(".close-button").addEventListener("click", () => {
  document.getElementById("route-modal").style.display = "none";
});

document.getElementById("route-modal").addEventListener("click", (event) => {
  if (event.target.id === "route-modal") {
    document.getElementById("route-modal").style.display = "none";
  }
});

/**
 * Botao Fixed
 */
// Configura o link do botão fixo do WhatsApp
const whatsappButton = document.getElementById("fixed-whatsapp-button");
const supportNumber = "5532998615190"; // Número de WhatsApp do suporte da empresa
const supportMessage =
  "Olá, gostaria de conversar com um especialista do Volta Express Brasil | Quero Transportar.";
const encodedSupportMessage = encodeURIComponent(supportMessage);

whatsappButton.href = `https://wa.me/${supportNumber}?text=${encodedSupportMessage}`;


/**
 * FAQ
 */
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const questionButton = item.querySelector('.faq-question');
  const answer = item.querySelector('.faq-answer');

  questionButton.addEventListener('click', () => {
    // Fecha todas as respostas
    faqItems.forEach(otherItem => {
      if (otherItem !== item) {
        otherItem.querySelector('.faq-answer').style.display = 'none';
      }
    });

    //Alterna a exibição da resposta atual
    if (answer.style.display === 'block') {
      answer.style.display = 'none';
    } else {
      answer.style.display = 'block';
    }
  });
});