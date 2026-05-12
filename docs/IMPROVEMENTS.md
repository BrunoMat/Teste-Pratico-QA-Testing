# 🚀 Sugestões de Melhorias Futuras

Este documento descreve as evoluções sugeridas para o framework, visando escalabilidade e maturidade tecnológica.

---

### ✅ Implementado nesta Versão (Diferenciais)
- **Regressão Visual**: Integração nativa com `toHaveScreenshot`.
- **Autenticação Global**: Otimização de performance via `storageState`.
- **Chaos Engineering**: Mocking de rede para testes de resiliência.
- **Acessibilidade Full-Flow**: Auditorias WCAG do login ao checkout.

---

### 📈 Roadmap de Evolução

#### 1. Performance de Carga (Load Testing)
- **Oportunidade**: Validar como a API do Restful-Booker se comporta sob alto volume de usuários simultâneos.
- **Ação**: Integrar ferramentas como **K6** ou **Artillery**, reaproveitando os scripts de API já criados em TypeScript.

#### 2. Segurança Dinâmica (DAST)
- **Oportunidade**: Detectar vulnerabilidades de segurança conhecidas (OWASP Top 10) durante a execução dos testes.
- **Ação**: Integrar o **OWASP ZAP** ao pipeline de CI/CD para realizar scans passivos e ativos nos endpoints da API.

#### 3. Testes em Nuvem (Grid Scalability)
- **Oportunidade**: Executar centenas de testes simultâneos em múltiplos sistemas operacionais (Windows, macOS, Android Real Devices).
- **Ação**: Integrar o Playwright com provedores de nuvem como **BrowserStack** ou **LambdaTest**.

#### 4. IA para Manutenção de Seletores (Self-Healing)
- **Oportunidade**: Reduzir a flakiness dos testes de UI quando os IDs ou classes mudam no front-end.
- **Ação**: Implementar ferramentas de **Self-Healing** ou utilizar o `AIAssistant` do Playwright para sugerir correções automáticas de seletores.

#### 5. Dashboard de Qualidade Consolidado
- **Oportunidade**: Ter uma visão histórica da qualidade ao longo de meses, e não apenas por execução.
- **Ação**: Implementar o **Allure TestOps** ou **ReportPortal** para armazenar e analisar tendências de falhas e tempo de execução.

---
*Roadmap atualizado conforme a evolução técnica do projeto.*
