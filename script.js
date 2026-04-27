/**
 * Volta Express Brasil - v5.4
 * Core Script: High-End UX & Synchronized Animations
 */

// 1. Inicialização de Componentes
document.addEventListener("DOMContentLoaded", () => {
  setupMenu();
  setupWhatsapp();
  initScrollReveal();
});

// 2. Gerenciamento do Menu Mobile (UX Fluida)
const setupMenu = () => {
  const menuIcon = document.querySelector("#menu-icon");
  const navbar = document.querySelector(".navbar");

  if (!menuIcon || !navbar) return;

  menuIcon.onclick = () => {
    menuIcon.classList.toggle("bx-x");
    navbar.classList.toggle("active");
  };

  // Fecha o menu ao clicar fora ou scrollar
  window.addEventListener("scroll", () => {
    menuIcon.classList.remove("bx-x");
    navbar.classList.remove("active");
  });
};

// 3. Configuração Dinâmica do WhatsApp
const setupWhatsapp = () => {
  const whatsappButton = document.getElementById("fixed-whatsapp-button");
  if (!whatsappButton) return;

  const supportNumber = "5532998615190";
  const supportMessage =
    "Olá! Vim pelo site do Volta Express e gostaria de suporte.";

  whatsappButton.href = `https://wa.me/${supportNumber}?text=${encodeURIComponent(supportMessage)}`;
};

// 4. ScrollReveal - A "Mágica" da Sincronização
const initScrollReveal = () => {
  // Configuração Global Sênior
  const sr = ScrollReveal({
    origin: "top",
    distance: "40px",
    duration: 2000,
    delay: 200,
    reset: false, // Mantém a estabilidade após a primeira carga
  });

  // --- SEQUÊNCIA DA HOME (Sincronizada) ---

  // Primeiro: O Header aparece suavemente
  sr.reveal("header", {
    delay: 100,
    distance: "20px",
  });

  // Segundo: O Título e Subtítulo (Entrada Lateral para dinamismo)
  sr.reveal(".text h1", {
    delay: 400,
    origin: "left",
    distance: "80px",
  });

  sr.reveal(".text p", {
    delay: 600,
    origin: "left",
    distance: "60px",
  });

  // Terceiro: Os Persona Cards (O grande final)
  // Usamos um intervalo menor (150) para que eles entrem em "cascata"
  sr.reveal(".persona-card", {
    delay: 900,
    origin: "bottom",
    distance: "50px",
    interval: 200, // Cria o efeito de um card seguindo o outro
    rotate: { x: 20, z: 0 }, // Leve inclinação 3D na entrada
    scale: 0.9,
  });

  // --- OUTRAS SEÇÕES (Caso existam no HTML) ---
  sr.reveal(".about-img", { origin: "left" });
  sr.reveal(".about-text", { origin: "right" });
  sr.reveal(".footer-container", { origin: "bottom", distance: "20px" });
};

// 5. Accordion FAQ (Se você já implementou a seção de FAQ)
const initFaq = () => {
  const questions = document.querySelectorAll(".faq-question");
  questions.forEach((q) => {
    q.addEventListener("click", () => {
      const item = q.parentElement;
      item.classList.toggle("active");
    });
  });
};
