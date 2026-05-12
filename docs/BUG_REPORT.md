# Relatório de Bugs (Bug Report) - Detalhamento e Rastreabilidade

Eu identifiquei as seguintes inconsistências durante a execução da suíte de testes. Abaixo estão os detalhes técnicos, arquivos e cenários exatos para reprodução.

---

### BUG-API-001: Status Code Incorreto na Autenticação
*   **Severidade**: Alta
*   **Arquivo**: `tests/api/auth.spec.ts`
*   **Cenário**: `deve retornar 200 porém sem token com credenciais inválidas`
*   **Descrição**: Credenciais inválidas retornam `200 OK` em vez de `401 Unauthorized`.
*   **Passos para Reproduzir**:
    1. Realizar uma requisição `POST` para o endpoint `/auth`.
    2. Enviar um payload com `username` ou `password` incorretos.
    3. Validar que o Status Code retornado é `200`.

### BUG-API-002: Status Code Incorreto no DELETE
*   **Severidade**: Média
*   **Arquivo**: `tests/api/booking.spec.ts`
*   **Cenário**: `deve remover a reserva`
*   **Descrição**: A deleção de recurso retorna `201 Created` em vez de `204`.
*   **Passos para Reproduzir**:
    1. Criar uma reserva válida ou usar um ID existente.
    2. Realizar uma requisição `DELETE` para `/booking/{id}` enviando um token válido no header `Cookie`.
    3. Validar que o Status Code retornado é `201`.

### BUG-API-003: Erro 500 ao Omitir Campos Obrigatórios
*   **Severidade**: Crítica
*   **Arquivo**: `tests/api/booking.spec.ts`
*   **Cenário**: `deve retornar erro 400 ao tentar criar reserva sem campos obrigatórios`
*   **Descrição**: Omissão de campos obrigatórios causa quebra interna do servidor (Internal Server Error) em vez de uma validação adequada de entrada (Bad Request).
*   **Passos para Reproduzir**:
    1. Realizar uma requisição `POST` para `/booking`.
    2. Enviar um payload incompleto (ex: sem o campo `firstname`).
    3. Validar que o servidor responde com Status `500`.

### BUG-API-004: Violação de SLA de Performance da API
*   **Severidade**: Média
*   **Arquivo**: `tests/performance/api-performance.spec.ts`
*   **Cenário**: `deve buscar todas as reservas dentro do tempo aceitável`
*   **Descrição**: Resposta da listagem de IDs excede o limite de 800ms estabelecido.
*   **Passos para Reproduzir**:
    1. Realizar uma requisição `GET` para `/booking`.
    2. Mensurar o tempo total de resposta.
    3. Validar que o tempo excede o limite de performance estabelecido (800ms).

### BUG-API-005: Status Code Incorreto no Health Check
*   **Severidade**: Baixa
*   **Arquivo**: `tests/performance/api-performance.spec.ts`
*   **Cenário**: `deve realizar health check dentro do tempo limite`
*   **Descrição**: Endpoint `/ping` retorna `201 Created` em vez de `200 OK`.
*   **Passos para Reproduzir**:
    1. Realizar uma requisição `GET` para o endpoint `/ping`.
    2. Validar que o Status Code retornado é `201`.

### BUG-UI-006: Violações de Acessibilidade WCAG 2.1
*   **Severidade**: Alta
*   **Arquivo**: `tests/accessibility/ui-acessibility.spec.ts`
*   **Cenário**: `página de inventário deve seguir boas práticas de acessibilidade`
*   **Descrição**: Múltiplas falhas críticas de acessibilidade (contraste, nomes acessíveis em botões e landmarks).
*   **Passos para Reproduzir**:
    1. Acessar a página de inventário do Sauce Demo.
    2. Executar uma auditoria automatizada (Axe-core).
    3. Verificar as falhas de conformidade com as regras WCAG 2.1 AA.
