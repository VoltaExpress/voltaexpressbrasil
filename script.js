/**
 * Volta Express Brasil - v5.4
 * Core Script: High-End UX & Synchronized Animations
 * * Análise de Qualidade (QA):
 * - Performance: Uso de ScrollReveal com 'reset: false' evita re-render desnecessário.
 * - UX: Fechamento automático do menu no scroll melhora a usabilidade mobile.
 * - Manutenibilidade: Funções isoladas por responsabilidade (Clean Code).
 */

/**
 * SEÇÃO: ORQUESTRAÇÃO GLOBAL
 * Gerencia o ciclo de vida da aplicação e inicializa os módulos após o carregamento do DOM.
 */
document.addEventListener("DOMContentLoaded", () => {
  setupMenu();
  setupWhatsapp();
  initScrollReveal();
  // Dica de QA: Verifique se o elemento .faq-question existe antes de chamar initFaq
  if (document.querySelector(".faq-question")) initFaq();
});

/**
 * SEÇÃO: HEADER & NAVEGAÇÃO (UX FLUIDA)
 * Controla a interatividade do menu hambúrguer e garante que a navegação não obstrua a visão no scroll.
 */
const setupMenu = () => {
  const menuIcon = document.querySelector("#menu-icon");
  const navbar = document.querySelector(".navbar");

  if (!menuIcon || !navbar) return;

  menuIcon.onclick = () => {
    menuIcon.classList.toggle("bx-x"); // Troca ícone para 'X' (Boxicons)
    navbar.classList.toggle("active");
  };

  // Garante que o menu feche ao navegar, evitando que o usuário precise fechar manualmente
  window.addEventListener("scroll", () => {
    if (navbar.classList.contains("active")) {
      menuIcon.classList.remove("bx-x");
      navbar.classList.remove("active");
    }
  });
};

/**
 * SEÇÃO: ATENDIMENTO AO CLIENTE (CONVERSÃO)
 * Centraliza a lógica de contato via WhatsApp, facilitando a manutenção do número de suporte.
 */
const setupWhatsapp = () => {
  const whatsappButton = document.getElementById("fixed-whatsapp-button");
  if (!whatsappButton) return;

  const supportNumber = "5532998615190";
  const supportMessage =
    "Olá! Vim pelo site do Volta Express e gostaria de suporte.";

  whatsappButton.href = `https://wa.me/${supportNumber}?text=${encodeURIComponent(supportMessage)}`;
};

/**
 * SEÇÃO: ANIMAÇÕES DE ENTRADA (VISUAL MODERNO)
 * Utiliza ScrollReveal para criar uma sequência coreografada que guia o olhar do usuário do Header até os Cards.
 */
const initScrollReveal = () => {
  // Configuração base para evitar saltos bruscos de layout
  const sr = ScrollReveal({
    origin: "top",
    distance: "40px",
    duration: 2000,
    delay: 200,
    reset: false,
  });

  // Camada 1: Identidade Visual (Header)
  sr.reveal("header", {
    delay: 100,
    distance: "20px",
  });

  // Camada 2: Proposta de Valor (Hero Section)
  // Entrada lateral para "quebrar" a monotonia vertical do scroll
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

  // Camada 3: Segmentação de Personas (Conversion Cards)
  // Efeito cascata (interval) e inclinação 3D para reforçar o design moderno
  sr.reveal(".persona-card", {
    delay: 900,
    origin: "bottom",
    distance: "50px",
    interval: 200,
    rotate: { x: 20, z: 0 },
    scale: 0.9,
  });

  // Elementos Auxiliares e Rodapé
  sr.reveal(".about-img", { origin: "left" });
  sr.reveal(".about-text", { origin: "right" });
  sr.reveal(".footer-container", { origin: "bottom", distance: "20px" });
};

/**
 * SEÇÃO: SUPORTE AO USUÁRIO (FAQ)
 * Implementa o comportamento de sanfona (Accordion) para economizar espaço vertical na Home.
 */
const initFaq = () => {
  const questions = document.querySelectorAll(".faq-question");
  questions.forEach((q) => {
    q.addEventListener("click", () => {
      // Dica de PM: Considere fechar outros itens abertos ao abrir um novo (Exclusividade)
      const item = q.parentElement;
      item.classList.toggle("active");
    });
  });
};
