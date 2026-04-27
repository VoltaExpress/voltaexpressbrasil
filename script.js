/**
 * Volta Express Brasil - v5.3
 * Core Script: UX, Menu & Animations
 */

// 1. Gerenciamento do Menu Mobile
const menuIcon = document.querySelector("#menu-icon");
const navbar = document.querySelector(".navbar");

if (menuIcon && navbar) {
  menuIcon.onclick = () => {
    menuIcon.classList.toggle("bx-x");
    navbar.classList.toggle("active");
  };

  // Fecha o menu ao clicar em um link ou ao scrollar (melhor UX)
  window.onscroll = () => {
    if (navbar.classList.contains("active")) {
      menuIcon.classList.remove("bx-x");
      navbar.classList.remove("active");
    }
  };
}

// 2. Configuração Dinâmica do WhatsApp
const setupWhatsapp = () => {
  const whatsappButton = document.getElementById("fixed-whatsapp-button");
  if (!whatsappButton) return;

  const supportNumber = "5532998615190";
  const supportMessage =
    "Olá! Vim pelo site do Volta Express e gostaria de suporte.";

  whatsappButton.href = `https://wa.me/${supportNumber}?text=${encodeURIComponent(supportMessage)}`;
};

// 3. ScrollReveal - Animações de Entrada Sênior
// Reset: false evita que o site fique "piscando" ao subir e descer a página
const sr = ScrollReveal({
  distance: "60px",
  duration: 2500,
  delay: 400,
  reset: false,
});

// Animação do Texto Principal
sr.reveal(".text", { delay: 200, origin: "top" });

// Animação dos Novos Persona Cards (Entrada em sequência/intervalo)
sr.reveal(".persona-card", {
  delay: 500,
  origin: "bottom",
  interval: 200,
});

// Animação do Header
sr.reveal("header", { delay: 100, origin: "top" });

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  setupWhatsapp();
});
