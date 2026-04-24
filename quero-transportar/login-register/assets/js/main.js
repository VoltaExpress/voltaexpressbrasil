/* O URL do seu Apps Script precisa ser atualizado aqui */
const webAppUrl =
  "https://script.google.com/macros/s/AKfycbwMmp_wjwW1hKFXGZ7_udXP9QKGUiBNxGwt2oXmn64RilbmAVv-eL-ienlD-zaNb7ByXA/exec";

/*=============== FUNÇÃO PARA MOSTRAR/OCULTAR SENHA ===============*/
// Esta função unifica a lógica para os dois formulários, removendo código duplicado.
const showHiddenPassword = (inputPassId, iconEyeId) => {
  const input = document.getElementById(inputPassId);
  const iconEye = document.getElementById(iconEyeId);

  if (!input || !iconEye) return;

  iconEye.addEventListener("click", () => {
    // Alterna o tipo do input entre 'password' e 'text'
    input.type === "password"
      ? (input.type = "text")
      : (input.type = "password");

    // Alterna o ícone de 'olho fechado' para 'olho aberto'
    iconEye.classList.toggle("ri-eye-fill");
    iconEye.classList.toggle("ri-eye-off-fill");
  });
};

// Aplica a função aos formulários de login e cadastro
showHiddenPassword("password", "loginPassword");
showHiddenPassword("passwordCreate", "loginPasswordCreate");

/*=============== FUNÇÃO PARA ALTERNAR TELAS DE LOGIN E CADASTRO ===============*/
const loginAcessRegister = document.getElementById("loginAccessRegister");
const buttonRegister = document.getElementById("loginButtonRegister");
const buttonAccess = document.getElementById("loginButtonAccess");

buttonRegister.addEventListener("click", () => {
  loginAcessRegister.classList.add("active");
});

buttonAccess.addEventListener("click", () => {
  loginAcessRegister.classList.remove("active");
});

/*=============== FEEDBACK AO USUÁRIO (CUSTOM ALERT) ===============*/
// Cria uma caixa de mensagem personalizada para substituir o 'alert()' nativo.
function showMessage(message) {
  const messageBox = document.createElement("div");
  messageBox.classList.add("custom-message-box");
  messageBox.textContent = message;
  document.body.appendChild(messageBox);

  setTimeout(() => {
    messageBox.classList.add("show");
  }, 10); // Pequeno atraso para a animação CSS

  setTimeout(() => {
    messageBox.classList.remove("show");
    setTimeout(() => {
      document.body.removeChild(messageBox);
    }, 500); // Espera a animação de desaparecimento
  }, 3000); // Exibe por 3 segundos
}

/*=============== LÓGICA DE SUBMISSÃO DE FORMULÁRIOS ===============*/
const loginForm = document.querySelector(".login__access .login__form");
const registerForm = document.querySelector(".login__register .login__form");

async function handleFormSubmit(event, action) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  // Converte FormData para URLSearchParams para o formato form-urlencoded
  const formBody = new URLSearchParams(formData).toString();

  // Adiciona a ação para o backend saber o que fazer
  const fullBody = `${formBody}&action=${action}`;

  // Mostra um indicador de carregamento
  // O seu código aqui para um loader, se desejar

  try {
    const response = await fetch(webAppUrl, {
      method: "POST",
      // Envia os dados no formato simples
      body: fullBody,
      headers: {
        // CORRIGIDO: Remover o Content-Type: application/json
        // O navegador enviará o Content-Type: application/x-www-form-urlencoded
        // automaticamente, o que evita a requisição de pré-voo
      },
    });

    const result = await response.json();
    showMessage(result.message); // Exibe a mensagem de sucesso ou erro na caixa personalizada
  } catch (error) {
    console.error("Erro ao enviar dados:", error);
    showMessage("Ocorreu um erro ao processar sua requisição.");
  }
}

// Conecta os formulários às novas funções
registerForm.addEventListener("submit", (event) =>
  handleFormSubmit(event, "register")
);
loginForm.addEventListener("submit", (event) =>
  handleFormSubmit(event, "login")
);
