describe("Usuários", () => { // Agrupa os cenários de usuários.
  it("retorna 200 com a lista de usuários", () => { // Define o resultado esperado para a listagem.
    cy.request("GET", "/usuarios").then((response) => { // Consulta o recurso e recebe a resposta HTTP.
      expect(response.status).to.equal(200); // Confirma que a consulta foi bem-sucedida.
      expect(response.body).to.have.property("usuarios").that.is.an("array"); // Confirma que a coleção é uma lista.
      expect(response.body).to.have.property("quantidade", response.body.usuarios.length); // Compara a quantidade informada com o tamanho da lista.
    }); // Encerra as verificações da resposta.
  }); // Encerra o cenário de listagem.
}); // Encerra o grupo de usuários.
