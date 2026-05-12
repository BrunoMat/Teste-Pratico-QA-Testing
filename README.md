# 🚀 QA Automation Challenge - QA Enginner Senior

Este projeto é uma solução de automação de testes de alto nível, cobrindo testes de **Interface (UI)** e **API**, construído com **Playwright**, **TypeScript** e **Allure Report**.

---

## 🏗️ Estratégia de Cobertura

O framework foi desenhado para oferecer **Exposição Total** da qualidade através de 6 projetos simultâneos:
- **Chromium** (Desktop Chrome)
- **Firefox** (Desktop Firefox)
- **Webkit** (Desktop Safari)
- **Mobile-Chrome** (Android Simulation)
- **Mobile-Safari** (iOS Simulation)
- **API** (Restful-Booker Service Layer)

Totalizando mais de **72 execuções por ciclo**, garantindo compatibilidade total e resiliência.

---

## 💎 Diferenciais

1.  **👁️ Regressão Visual**: Validação de integridade de layout via Screenshots (Pixel-to-Pixel Comparison).
2.  **🔌 Validação de Contrato**: Uso de `Zod` para garantir que o esquema JSON da API nunca mude sem aviso.
3.  **⚡ UI Performance SLA**: Auditoria automática de tempos de carregamento de página e processamento de login.
4.  **♿ Acessibilidade WCAG**: Auditorias completas via `axe-core`.
5.  **🌀 Chaos Engineering**: Simulação de queda de CDN (assets/imagens) para validar resiliência do sistema.
6.  **🔐 Autenticação Global**: Reaproveitamento de estado de sessão (Storage State) para máxima performance.

---

## 📊 Relatório Inteligente (Allure)

- **Consolidação de Erros**: Falhas em múltiplos navegadores são agrupadas sob o mesmo cenário funcional (Behaviors), eliminando ruído no dashboard.
- **Categorização Técnica**: Os defeitos são classificados automaticamente por natureza (Segurança, Performance, Acessibilidade, Contrato).
- **Evidências**: Vídeos e Screenshots são capturados em caso de falha.
- **Mascaramento**: Dados sensíveis (senhas) são ocultados nos logs e steps do relatório.

---

## 🛠️ Requisitos
- **Node.js**: Versão 18 ou superior.
- **Java (JRE)**: Necessário para gerar e abrir o Allure Report localmente.

---

## 📁 Estrutura do Projeto
- `tests/`: Suítes de testes divididas por pilares (UI, API, Segurança, etc).
- `src/pages/`: Page Object Model (POM) para isolamento de seletores e ações de UI.
- `src/services/`: Camada de serviços para abstração de chamadas de API.
- `src/fixtures/`: Extensões do Playwright para injeção de dependências e metadados.
- `src/builders/`: Geração de massas de dados dinâmicas.
- `config/`: Configurações de ambiente e URLs.

---

## 🚀 Como Executar

### Instalação
```bash
npm install
npx playwright install --with-deps
```

### Execução
```bash
# Executar todos os testes (72 cenários)
npm run test

# Abrir o dashboard Allure
npm run allure:open
```

---

## 🤖 CI/CD

Integrado com **GitHub Actions**. O pipeline executa a suíte completa, utiliza **GitHub Secrets** para credenciais e faz o deploy automático do relatório consolidado no **GitHub Pages**.

---
*Projeto desenvolvido com as melhores práticas de Engenharia de Qualidade e Segurança.*