# 📋 Especificação BDD (Behavior-Driven Development)

Este documento descreve o comportamento esperado das funcionalidades através de cenários Gherkin. Estes cenários servem como documentação viva e base para a automação nativa em Playwright.

---

## 🛒 UI (Sauce Demo)

### 1. Autenticação e Gestão de Sessão
**Cenário: Login com sucesso e reuso de estado**
- **Dado** que eu realizo o login com o usuário `standard_user`
- **Quando** a sessão é salva via `storageState`
- **Então** os demais testes de UI devem iniciar já autenticados, otimizando o tempo de execução

**Cenário: Detecção de erros dinâmicos no Login**
- **Dado** que eu insiro credenciais inválidas ou de um usuário bloqueado
- **Quando** eu submeto o formulário
- **Então** eu devo visualizar uma mensagem de erro específica e um screenshot da falha deve ser capturado

### 2. Fluxo de Compra (E2E)
**Cenário: Compra completa de ponta a ponta**
- **Dado** que eu estou logado e adiciono produtos ao carrinho
- **Quando** eu preencho as informações de entrega e finalizo o pedido
- **Então** eu devo ver a mensagem de confirmação "Thank you for your order!"

---

## 🧬 Casos Especiais (Edge Cases)

### 1. Perfil Problem User
**Cenário: Falha de integridade visual**
- **Dado** que eu estou logado com o perfil `problem_user`
- **Quando** eu navego pelo inventário
- **Então** o sistema deve detectar imagens quebradas (404) ou incorretas

**Cenário: Falha funcional na gestão do carrinho**
- **Dado** que o `problem_user` adiciona um item ao carrinho
- **Quando** ele tenta remover o item através do botão "Remove"
- **Então** o sistema deve falhar ao processar a exclusão, expondo o bug funcional

### 2. Chaos Engineering (Resiliência)
**Cenário: Finalização de compra com queda de CDN (Assets)**
- **Dado** que as imagens do sistema estão indisponíveis (Simulado via Mock 404)
- **Quando** o usuário realiza o fluxo de checkout
- **Então** o sistema deve permanecer funcional e permitir a conclusão da compra, garantindo a resiliência do negócio

---

## ⚡ API (Restful-Booker)

### 1. Reservas (Booking Service)
**Cenário: Resiliência no CRUD de Reservas**
- **Dado** que eu preciso atualizar ou deletar uma reserva
- **Quando** o ID alvo não existe ou está indisponível
- **Então** o sistema deve criar dinamicamente uma nova massa de dados para garantir a execução do teste

### 2. Validação de Contrato (Security & Contract)
**Cenário: Integridade do Schema JSON**
- **Dado** que eu recebo uma resposta da API de Reservas
- **Quando** eu valido o corpo da resposta contra o Schema Zod
- **Então** a estrutura deve estar 100% em conformidade com a especificação técnica

---

## ♿ Acessibilidade e Performance

### 1. Acessibilidade Transacional
**Cenário: Auditoria de acessibilidade no fluxo completo**
- **Dado** que eu percorro a jornada do Login até o Checkout Complete
- **Quando** eu executo auditorias Axe-core em cada mudança de estado
- **Então** o sistema deve reportar violações de conformidade e anexar os detalhes técnicos ao relatório Allure

### 2. Performance SLA
**Cenário: Auditoria de tempos de resposta**
- **Dado** que eu realizo operações críticas de UI ou API
- **Quando** eu mensuro o tempo de processamento
- **Então** os valores devem respeitar os SLAs definidos (UI < 2s | API < 800ms)

---
*Documentação atualizada conforme as implementações técnicas da suíte de testes.*
