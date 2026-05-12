# 📋 Especificação BDD (Behavior-Driven Development)

Este documento descreve o comportamento esperado das funcionalidades através de cenários Gherkin. Estes cenários servem como documentação viva e base para a automação nativa em Playwright.

---

## UI (Interface do Usuário - Sauce Demo)

### 1. Autenticação
**Cenário: Login com sucesso**
- **Dado** que eu acesso a página de login
- **Quando** eu insiro credenciais válidas
- **Então** eu devo ser redirecionado para a página de inventário

**Cenário: Logout do sistema**
- **Dado** que eu estou logado no sistema
- **Quando** eu clico no botão de logout
- **Então** a minha sessão deve ser encerrada e eu devo voltar para a página de login

---

### 2. Inventário e Carrinho
**Cenário: Ordenação de produtos por preço**
- **Dado** que eu estou na página de inventário
- **Quando** eu seleciono a ordenação por preço (low to high)
- **Então** a lista de produtos deve ser exibida em ordem crescente de valor

**Cenário: Gestão de itens no carrinho**
- **Dado** que eu adicionei itens ao carrinho
- **Quando** eu removo um item específico
- **Então** o contador do carrinho deve refletir a quantidade atualizada

---

## API (Serviços - Restful-Booker)

### 1. Reservas (Booking CRUD)
**Cenário: Ciclo de vida completo de uma reserva**
- **Dado** que eu criei uma nova reserva via POST
- **Quando** eu consulto os detalhes da reserva pelo ID gerado
- **E** realizo uma atualização total (PUT) nos dados do hóspede
- **E** removo a reserva do sistema (DELETE)
- **Então** ao tentar buscar a reserva novamente, o sistema deve retornar 404

---

## Segurança (Security)

**Cenário: Bloqueio de acesso não autorizado**
- **Dado** que eu tenho o ID de uma reserva ativa
- **Quando** eu tento atualizar ou deletar a reserva sem um token de autenticação
- **Então** a API deve negar o acesso com status 403 (Forbidden)

---

## Performance

**Cenário: Monitoramento de SLA**
- **Dado** que os serviços da API estão disponíveis
- **Quando** eu realizo chamadas nos endpoints de listagem e health check
- **Então** o tempo de resposta deve ser inferior aos limites estabelecidos (800ms / 500ms)

---

## Acessibilidade

**Cenário: Auditoria de conformidade WCAG**
- **Dado** que as páginas principais do sistema estão carregadas
- **Quando** eu executo o motor de análise de acessibilidade Axe-core
- **Então** nenhuma violação crítica de acessibilidade deve ser detectada
