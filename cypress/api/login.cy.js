describe("Login", () => { // Agrupa os cenários de autenticação.
  it("retorna 200 ao autenticar com credenciais válidas", () => { // Define o cenário de login bem-sucedido.
    cy.request("POST", "/login", { // Envia um POST para a rota de login com o corpo abaixo.
      email: "fulano@qa.com", // Usa o e-mail de exemplo do ServeRest.
      password: "teste", // Usa a senha de exemplo documentada para esse login.
    }).then((response) => { // Recebe a resposta HTTP para fazer as verificações.
      expect(response.status).to.equal(200); // Confirma o código HTTP de sucesso.
      expect(response.body).to.have.property("authorization").that.is.a("string").and.is.not.empty; // Confirma que a resposta contém um token em texto.
    }); // Encerra as verificações da resposta.
  }); // Encerra o cenário de sucesso.

  it("retorna 400 quando o corpo está vazio", () => { // Exercita a validação dos campos obrigatórios.
    cy.request({ // Envia a requisição HTTP com as opções abaixo.
      method: "POST", // Usa o método definido para autenticação.
      url: "/login", // Seleciona a rota de login.
      body: {}, // Omite e-mail e senha para testar a validação.
      failOnStatusCode: false, // Permite inspecionar a resposta de erro esperada.
    }).then((response) => { // Recebe a resposta da API.
      expect(response.status).to.equal(400); // Confirma que a API rejeitou o corpo inválido.
      expect(response.body).to.have.property("email").that.is.a("string"); // Verifica a mensagem de validação do e-mail.
      expect(response.body).to.have.property("password").that.is.a("string"); // Verifica a mensagem de validação da senha.
    }); // Encerra a verificação da resposta.
  }); // Encerra o cenário.
}); // Encerra o grupo de login.
