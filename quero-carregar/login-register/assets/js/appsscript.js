// O ID da sua planilha precisa ser inserido aqui
var SPREADSHEET_ID = "1PQ_CEymmCOovX7-tSUXKgjFprdWekGRfdzGJ0Tm6amc"; // <<<<<<< SUBSTITUA AQUI

function doGet(e) {
  // Apenas para evitar erros caso alguém tente acessar com GET.
  return ContentService.createTextOutput("Método não permitido.");
}

function doPost(e) {
  // Converte a ação para minúsculas para evitar erros de case-sensitivity
  var acao = e.parameter.action.toLowerCase();
  var planilha =
    SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName("Usuarios");
  var response = null;

  if (acao === "register") {
    var email = e.parameter.email;
    var password = e.parameter.password;
    var nome = e.parameter.nome;
    var sobrenome = e.parameter.sobrenome;

    var dados = planilha.getDataRange().getValues();
    for (var i = 1; i < dados.length; i++) {
      if (dados[i][2] === email) {
        response = ContentService.createTextOutput(
          JSON.stringify({
            success: false,
            message: "Este e-mail já está cadastrado.",
          })
        );
        return response.setMimeType(ContentService.MimeType.JSON);
      }
    }

    var passwordHash = Utilities.base64Encode(
      Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, password)
    );
    planilha.appendRow([nome, sobrenome, email, passwordHash]);

    response = ContentService.createTextOutput(
      JSON.stringify({
        success: true,
        message: "Usuário cadastrado com sucesso!",
      })
    );
  } else if (acao === "login") {
    var email = e.parameter.email;
    var password = e.parameter.password;

    var dados = planilha.getDataRange().getValues();
    var usuarioEncontrado = false;

    for (var i = 1; i < dados.length; i++) {
      if (dados[i][2] === email) {
        var passwordHashSalvo = dados[i][3];
        var passwordHashFornecido = Utilities.base64Encode(
          Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, password)
        );

        if (passwordHashFornecido === passwordHashSalvo) {
          usuarioEncontrado = true;
          response = ContentService.createTextOutput(
            JSON.stringify({ success: true, message: "Login bem-sucedido!" })
          );
          return response.setMimeType(ContentService.MimeType.JSON);
        }
      }
    }

    if (!usuarioEncontrado) {
      response = ContentService.createTextOutput(
        JSON.stringify({
          success: false,
          message: "E-mail ou senha incorretos.",
        })
      );
    }
  }

  if (response === null) {
    response = ContentService.createTextOutput(
      JSON.stringify({ success: false, message: "Ação inválida." })
    );
  }

  return response.setMimeType(ContentService.MimeType.JSON);
}
