# Plano de Testes (Test Plan) - QA Automation Challenge

## 1. Escopo e Objetivos
Validar as aplicações Sauce Demo e Restful-Booker, garantindo conformidade com os requisitos funcionais (Nível 1) e diferenciais técnicos (Nível 2). O foco é garantir uma suíte estável, resiliente e altamente informativa.

## 2. Abordagem Técnica
*   **Estratégia**: Automação baseada em Pilares de Qualidade (Funcional, Segurança, Performance, Acessibilidade, Caos).
*   **Arquitetura**: Utilização de Page Object Model (POM) para UI e Service Layer para API, garantindo desacoplamento.
*   **Gestão de Dados**: Builders dinâmicos e isolamento de estado.
*   **Configuração**: 
    *   **Setup**: Login global via StorageState para otimização de performance.
    *   **Teardown**: Limpeza global de dados de API via persistência e deduplicação de IDs.
*   **Diferenciais**: Chaos Engineering via Mocking de rede e auditorias automáticas de Acessibilidade WCAG 2.1.

## 3. Critérios de Aceitação
*   100% dos testes P0 e P1 automatizados.
*   Exposição total de falhas (Zero mitigação de bugs da aplicação).
*   Execução estável no GitHub Actions (CI) com deploy automático de report.
*   Dashboard Allure disponível com evidências (prints e vídeos).

## 4. Ferramentas
*   **Playwright / TypeScript** (Core Engine)
*   **Allure Report** (Reporting)
*   **Axe-core** (Accessibility)
*   **Faker.js** (Data generation)
*   **Zod** (Schema Validation)
