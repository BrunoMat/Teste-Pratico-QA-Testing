# 🐞 Relatório de Bugs (Bug Report)

Este documento detalha as inconsistências encontradas durante a execução da suíte de automação. As falhas foram detectadas tanto em nível de **Interface (UI)** quanto em **API**.

---

## 🛠️ Bugs de API (Restful-Booker)

### 🔴 BUG-API-001: Status Code Incorreto na Autenticação
- **Severidade**: Alta
- **Localização**: `tests/api/auth.spec.ts`
- **Cenário**: `deve retornar 401 Unauthorized com credenciais inválidas`
- **Descrição**: O endpoint `/auth` retorna `200 OK` mesmo com credenciais inválidas, expondo uma falha de conformidade de segurança.
- **Reprodução**: Enviar um payload de login com senha incorreta para `/auth`.

### 🟡 BUG-API-002: Status Code Incorreto no DELETE
- **Severidade**: Média
- **Localização**: `tests/api/booking.spec.ts`
- **Cenário**: `deve remover a reserva`
- **Descrição**: A deleção de um recurso retorna `201 Created` em vez do padrão semântico `204 No Content`.
- **Reprodução**: Executar uma requisição `DELETE` em uma reserva válida.

### 🔴 BUG-API-003: Erro 500 ao Omitir Campos Obrigatórios
- **Severidade**: Crítica
- **Localização**: `tests/api/booking.spec.ts`
- **Cenário**: `deve retornar erro 400 ao tentar criar reserva sem campos obrigatórios`
- **Descrição**: Omissão de campos obrigatórios causa quebra interna do servidor (Internal Server Error) em vez de uma validação de entrada (Bad Request).
- **Reprodução**: Enviar um payload de criação de reserva sem o campo `firstname`.

### 🟡 BUG-API-004: Violação de SLA de Performance
- **Severidade**: Média
- **Localização**: `tests/performance/api-performance.spec.ts`
- **Cenário**: `deve buscar todas as reservas dentro do tempo aceitável`
- **Descrição**: A listagem de IDs de reserva excede o limite de performance estabelecido (800ms).
- **Reprodução**: Realizar um `GET` no endpoint `/booking`.

### 🔵 BUG-API-005: Status Code Incorreto no Health Check
- **Severidade**: Baixa
- **Localização**: `tests/performance/api-performance.spec.ts`
- **Cenário**: `deve realizar health check dentro do tempo limite`
- **Descrição**: Endpoint `/ping` retorna `201 Created` em vez de `200 OK`.
- **Reprodução**: Realizar um `GET` no endpoint `/ping`.

---

## 🎨 Bugs de UI (Sauce Demo)

### 🔴 BUG-UI-006: Violações de Acessibilidade WCAG 2.1
- **Severidade**: Alta
- **Localização**: `tests/accessibility/ui-acessibility.spec.ts`
- **Descrição**: Foram encontradas violações críticas de conformidade (contraste, nomes acessíveis em botões e falta de landmarks principais).
- **Evidência**: Relatório detalhado anexado no Allure (Axe-core JSON).

### 🔵 BUG-UI-007: Falha de Integridade de Imagens (Problem User)
- **Severidade**: Menor (Visual)
- **Localização**: `tests/ui/problem-user.spec.ts`
- **Descrição**: No perfil de usuário `problem_user`, os assets de imagem falham no carregamento (CDN Down simulation), exibindo placeholders de erro.
- **Reprodução**: Logar com o usuário `problem_user` e navegar pelo inventário.

### 🔴 BUG-UI-008: Erro Funcional no Botão de Remoção (Problem User)
- **Severidade**: Crítica
- **Localização**: `tests/ui/problem-user.spec.ts`
- **Descrição**: O botão "Remove" não dispara o evento de exclusão para o usuário `problem_user`, impedindo o gerenciamento do carrinho.
- **Reprodução**: Adicionar um item ao carrinho e tentar removê-lo como `problem_user`.
