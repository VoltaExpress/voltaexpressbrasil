/* ===============================================================
   VOLTA EXPRESS BRASIL - LOGIN / REGISTRO
   main.js - Controle de Cadastro, Login, Sessão e UI
   =============================================================== */

/*=============== FUNÇÃO PARA MOSTRAR/OCULTAR SENHA ===============*/
const showHiddenPassword = (inputPassId, iconEyeId) => {
  const input = document.getElementById(inputPassId);
  const iconEye = document.getElementById(iconEyeId);
  if (!input || !iconEye) return;

  iconEye.addEventListener("click", () => {
    input.type = input.type === "password" ? "text" : "password";
    iconEye.classList.toggle("ri-eye-fill");
    iconEye.classList.toggle("ri-eye-off-fill");
  });
};

showHiddenPassword("password", "loginPassword");
showHiddenPassword("passwordCreate", "loginPasswordCreate");

/*=============== TROCAR ENTRE LOGIN E CADASTRO ===============*/
const loginAcessRegister = document.getElementById("loginAccessRegister");
const buttonRegister = document.getElementById("loginButtonRegister");
const buttonAccess = document.getElementById("loginButtonAccess");

if (buttonRegister && buttonAccess && loginAcessRegister) {
  buttonRegister.addEventListener("click", () => {
    loginAcessRegister.classList.add("active");
  });

  buttonAccess.addEventListener("click", () => {
    loginAcessRegister.classList.remove("active");
  });
}

/*=============== FEEDBACK AO USUÁRIO (CUSTOM ALERT) ===============*/

// ⭐ MUDANÇA: Referencie ambos os elementos (Login e Cadastro)
const loginMessageElement = document.getElementById("login-message");
const registerMessageElement = document.getElementById("register-message");

/**
 * Exibe uma mensagem no elemento HTML de feedback correto.
 * @param {string} message - O texto da mensagem.
 * @param {string} type - O tipo da mensagem ('success' ou 'error').
 * @param {HTMLElement} element - O elemento HTML onde a mensagem será exibida.
 */
function showMessage(message, type = "error", element) {
  // ⭐ ADICIONA O PARÂMETRO 'element'
  if (!element) return;

  // Sua lógica de mensagem (mantida):
  element.textContent = message;
  element.className = "login__feedback-message";
  element.classList.add(type);

  // Ajuste de tempo: O valor 5000000 é muito longo (5000 segundos). Use um valor menor.
  setTimeout(() => {
    element.textContent = "";
    element.className = "login__feedback-message";
  }, 5000000); // ⭐ SUGERIDO: 5000 milissegundos (5 segundos)
}

/*=============== CHAVES DE ARMAZENAMENTO ===============*/
const STORAGE_KEY = "volta_express_users"; // Todos os usuários
const SESSION_KEY = "volta_express_brasil"; // Sessão atual

/*=============== FUNÇÕES AUXILIARES ===============*/
function getUsers() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveUsers(users) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

function createSession(email) {
  const session = {
    login_usuario: email,
    hora_login: new Date().toISOString(),
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

/* ===============================================================
   1️⃣  CADASTRO DE NOVO USUÁRIO
   =============================================================== */
function registerUser(formData) {
  const users = getUsers();

  const emailExists = users.some((u) => u.email === formData.email);
  if (emailExists) {
    return { success: false, message: "Este e-mail já está cadastrado." };
  }

  const newUser = {
    nome: formData.nome.trim(),
    sobrenome: formData.sobrenome.trim(),
    email: formData.email.trim().toLowerCase(),
    password: formData.password,
    type: "transportador",
  };

  users.push(newUser);
  saveUsers(users);

  return {
    success: true,
    message: "Cadastro realizado com sucesso! Faça seu login.",
  };
}

/* ===============================================================
   2️⃣  LOGIN DO USUÁRIO
   =============================================================== */
function loginUser(email, password) {
  const users = getUsers();
  const user = users.find(
    (u) =>
      u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );

  if (!user) {
    return { success: false, message: "E-mail ou senha inválidos." };
  }

  // Cria sessão
  createSession(user.email);

  // Redireciona para "Quero Carregar"
  window.location.href = "./../../../../quero-carregar/index.html";
  return { success: true };
}

/* ===============================================================
   3️⃣  LOGOUT DO USUÁRIO
   =============================================================== */
function logoutUser() {
  localStorage.removeItem(SESSION_KEY);
  window.location.href = "login.html";
}

// NO ARQUIVO: login-register/main.js

// Nomes dos campos nos formulários (Ajuste se o seu HTML for diferente)
const requiredFieldsRegister = ["nome", "sobrenome", "email", "password"];
const requiredFieldsLogin = ["email", "password"];

/**
 * Função auxiliar para verificar campos vazios/nulos.
 * @param {FormData} formData - Os dados do formulário.
 * @param {Array<string>} requiredFields - Nomes dos campos a verificar.
 * @returns {boolean} True se todos os campos estão preenchidos, False caso contrário.
 */
function areFieldsValid(formData, requiredFields) {
  // Verifica se TODOS os campos obrigatórios existem e não estão vazios após trim()
  return requiredFields.every((field) => {
    const value = formData.get(field);
    return value && value.trim() !== "";
  });
}

/* ===============================================================
   4️⃣  CONEXÃO COM O HTML
   =============================================================== */
const loginForm = document.querySelector(".login__access .login__form");
const registerForm = document.querySelector(".login__register .login__form");

// NO ARQUIVO: login-register/main.js

if (registerForm) {
  registerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    // Não é necessário criar 'data' aqui, pois passaremos o formData para areFieldsValid

    // ⭐ VALIDAÇÃO: Campos Vazios (Cadastro)
    if (!areFieldsValid(formData, requiredFieldsRegister)) {
      // Usa o elemento de mensagem de CADASTRO
      showMessage(
        "Preencha todos os campos obrigatórios.",
        "error",
        registerMessageElement
      );
      return; // Interrompe a submissão
    }

    const data = Object.fromEntries(formData.entries());
    const result = registerUser(data);

    // Exibe a mensagem de sucesso ou erro (Cadastro Duplicado)
    showMessage(
      result.message,
      result.success ? "success" : "error",
      registerMessageElement
    );

    if (result.success) {
      // Volta para a tela de login
      loginAcessRegister.classList.remove("active");
      event.target.reset(); // Usa event.target.reset() para limpar o formulário
    }
  });
}

// NO ARQUIVO: login-register/main.js

if (loginForm) {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    // ⭐ VALIDAÇÃO: Campos Vazios (Login)
    if (!areFieldsValid(formData, requiredFieldsLogin)) {
      // Usa o elemento de mensagem de LOGIN
      showMessage(
        "Preencha todos os campos obrigatórios.",
        "error",
        loginMessageElement
      );
      return; // Interrompe a submissão
    }

    const result = loginUser(data.email, data.password);

    if (result.success) {
      // ⭐ MENSAGEM: Sucesso no Login (Aparece antes do redirecionamento)
      showMessage(
        "Login realizado com sucesso! Redirecionando...",
        "success",
        loginMessageElement
      );
    } else {
      // ⭐ MENSAGEM: Credenciais Inválidas
      showMessage(result.message, "error", loginMessageElement);
    }
  });
}

/* ===============================================================
   5️⃣  VERIFICAÇÃO AUTOMÁTICA DE SESSÃO (AUTOLOGIN)
   =============================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const sessionData = localStorage.getItem(SESSION_KEY);
  if (sessionData) {
    const session = JSON.parse(sessionData);
    const horaLogin = new Date(session.hora_login);
    const diffMinutos = Math.floor((Date.now() - horaLogin) / 60000);

    // Se a sessão ainda for válida (<60 min), vai direto pro Quero Carregar
    if (diffMinutos < 60 && session.login_usuario) {
      window.location.href = "./../../../../quero-carregar/index.html";
    }
  }
});
