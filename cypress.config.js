const { defineConfig } = require("cypress"); // Importa a função que organiza a configuração do Cypress.

module.exports = defineConfig({ // Exporta a configuração que o Cypress carrega ao iniciar.
  e2e: { // Usa o modo E2E do Cypress, onde o comando cy.request está disponível.
    baseUrl: "https://serverest.dev", // Define o endereço do ServeRest para as rotas relativas dos testes.
    specPattern: "cypress/api/**/*.cy.js", // Carrega apenas os testes da pasta de API e de suas subpastas.
    supportFile: false, // Desativa o arquivo de suporte que o Cypress carregaria antes dos testes.
    fixturesFolder: false, // Desativa a pasta de dados de teste, pois este exemplo usa dados da própria API.
    screenshotOnRunFailure: false, // Desativa capturas de tela porque os testes verificam respostas HTTP.
  }, // Encerra as opções do modo E2E.
}); // Finaliza a configuração do Cypress.
