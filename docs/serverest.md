# ServeRest no projeto de testes de API

O ServeRest simula uma loja virtual. Use `https://serverest.dev` como URL base. O parâmetro `?lang=pt-BR` seleciona o idioma da interface de documentação. Use o OpenAPI oficial em português para consultar o contrato completo, incluindo os schemas, os exemplos de resposta e os detalhes de cada código HTTP. [Interface oficial](https://serverest.dev/?lang=pt-BR) · [Swagger oficial](https://serverest.dev/swagger?lang=pt-BR) · [OpenAPI oficial em JSON](https://serverest.dev/swagger.json?lang=pt-BR)

## Rotas e respostas

Os códigos da tabela cobrem sucesso, validação e autorização de cada operação. O Swagger também detalha erros de transporte e limite de requisições. [OpenAPI oficial](https://serverest.dev/swagger.json?lang=pt-BR)

| Método e rota | Acesso | Respostas principais |
| --- | --- | --- |
| `POST /login` | Público | `200` autentica, `400` dados inválidos, `401` credenciais inválidas |
| `GET /usuarios` | Público | `200` lista usuários, `400` filtro inválido |
| `POST /usuarios` | Público | `201` cadastra, `400` dados inválidos ou e-mail duplicado |
| `GET /usuarios/{_id}` | Público | `200` encontra, `400` ID inválido ou usuário ausente |
| `PUT /usuarios/{_id}` | Público | `200` atualiza, `201` cadastra, `400` entrada inválida ou e-mail duplicado |
| `DELETE /usuarios/{_id}` | Público | `200` conclui a operação, inclusive se nenhum registro for excluído, `400` ID inválido ou usuário com carrinho |
| `GET /produtos` | Público | `200` lista produtos, `400` filtro inválido |
| `POST /produtos` | Administrador | `201` cadastra, `400` dados inválidos ou nome duplicado, `401` ou `403` |
| `GET /produtos/{_id}` | Público | `200` encontra, `400` ID inválido ou produto ausente |
| `PUT /produtos/{_id}` | Administrador | `200` atualiza, `201` cadastra, `400` entrada inválida ou nome duplicado, `401` ou `403` |
| `DELETE /produtos/{_id}` | Administrador | `200` conclui a operação, inclusive se nenhum registro for excluído, `400` ID inválido ou produto em carrinho, `401` ou `403` |
| `GET /carrinhos` | Público | `200` lista carrinhos, `400` filtro inválido |
| `POST /carrinhos` | Autenticado | `201` cadastra, `400` viola regras de entrada, carrinho ou estoque, `401` |
| `GET /carrinhos/{_id}` | Público | `200` encontra, `400` ID inválido ou carrinho ausente |
| `DELETE /carrinhos/concluir-compra` | Autenticado | `200` conclui a operação, inclusive se o usuário estiver sem carrinho, `401` |
| `DELETE /carrinhos/cancelar-compra` | Autenticado | `200` conclui a operação, inclusive se o usuário estiver sem carrinho, `401` |

## Corpos JSON e filtros

| Operação | Campos obrigatórios do corpo |
| --- | --- |
| Login | `email`, `password` |
| Cadastro ou edição de usuário | `nome`, `email`, `password`, `administrador`. Use a string `"true"` ou `"false"` em `administrador`. |
| Cadastro ou edição de produto | `nome`, `preco`, `descricao`, `quantidade`. Use inteiros, com `preco` a partir de 1 e `quantidade` a partir de 0. |
| Cadastro de carrinho | `produtos`, uma lista de itens com `idProduto` e `quantidade`. |

| Listagem | Filtros opcionais na query string |
| --- | --- |
| `GET /usuarios` | `_id`, `nome`, `email`, `password`, `administrador` |
| `GET /produtos` | `_id`, `nome`, `preco`, `descricao`, `quantidade` |
| `GET /carrinhos` | `_id`, `precoTotal`, `quantidadeTotal`, `idUsuario` |

As listagens retornam `quantidade` e a coleção correspondente, em `usuarios`, `produtos` ou `carrinhos`. Consulte os schemas oficiais para validar tipos, limites e campos da resposta. [OpenAPI oficial](https://serverest.dev/swagger.json?lang=pt-BR)

## Autenticação e estoque

- Após `POST /login`, envie o valor completo de `authorization` recebido no corpo da resposta no cabeçalho `Authorization` de cada requisição protegida. O Swagger documenta validade de 600 segundos. Token ausente, inválido, vencido ou associado a usuário excluído gera `401`. Acesso autenticado sem perfil de administrador a uma operação restrita gera `403`. [OpenAPI oficial](https://serverest.dev/swagger.json?lang=pt-BR)
- Cada usuário pode ter um carrinho por vez. O cadastro vincula o carrinho ao usuário do token e reduz o estoque. Produto duplicado no carrinho, inexistente ou com estoque insuficiente gera `400`. [OpenAPI oficial](https://serverest.dev/swagger.json?lang=pt-BR)
- Concluir e cancelar excluem o carrinho associado ao token. O cancelamento também devolve os itens ao estoque. [OpenAPI oficial](https://serverest.dev/swagger.json?lang=pt-BR)

## Como usar o contrato nos testes

1. Escolha o método e a rota e consulte a operação correspondente no OpenAPI.
2. Use os campos e tipos documentados para montar a requisição. Quando o cenário exigir dados já cadastrados, use os IDs retornados ao criar os dados de teste.
3. Valide o status esperado e os campos do schema daquele status. Se o contrato deixar um comportamento em aberto, trate-o como pendente de confirmação antes de escrever uma asserção.
