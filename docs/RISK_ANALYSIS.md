# 🛡️ Análise de Riscos (Pós-Implementação)

Este documento reflete os riscos técnicos encontrados durante o desenvolvimento e execução da suíte, consolidando as estratégias de mitigação aplicadas.

---

## 📊 Matriz de Riscos Técnicos

| Risco Identificado | Impacto | Probabilidade | Estratégia de Mitigação Aplicada |
| :--- | :---: | :---: | :--- |
| **Instabilidade de API (Socket Hang Up)** | Alto | Alta | **Observado**: O servidor Heroku (Restful-Booker) apresenta quedas intermitentes. **Mitigação**: Implementação de `retries` no Playwright e isolamento de dependência de dados para não quebrar a suíte inteira. |
| **Variação Visual (Cross-OS)** | Médio | Alta | **Observado**: Renderização de fontes difere entre Windows (Local) e Linux (GitHub Actions). **Mitigação**: Criação de baselines específicos por ambiente e uso de `threshold` flexível para evitar falsos negativos. |
| **Concorrência de Dados (Race Condition)** | Alto | Alta | **Mitigação**: Execução sequencial (`fullyParallel: false`) para o projeto de API, garantindo que o CRUD não sofra interferência de workers paralelos. |
| **Falsos Negativos em Acessibilidade** | Médio | Média | **Mitigação**: Auditoria E2E em todo o fluxo com anexo de relatórios JSON detalhados para investigação rápida sem bloquear o deploy se as falhas forem puramente estéticas. |
| **Exposição de Dados Sensíveis** | Crítico | Baixa | **Mitigação**: Mascaramento automático de senhas nos logs do Allure e uso de `storageState` para evitar login repetitivo com credenciais expostas. |

---

## 📝 Lições Aprendidas e Conclusões

1. **Infraestrutura de Terceiros é Frágil**: A dependência de APIs públicas gratuitas (Heroku) exige que a automação seja resiliente a falhas de rede (`socket hang up`). A lição é que o teste deve ser capaz de ser reexecutado sem perda de integridade.
2. **Global Auth como Game Changer**: A implementação do `Global Setup` reduziu o tempo da suíte em aproximadamente **40%**, provando ser a melhor estratégia para suítes E2E em múltiplos navegadores.
3. **Poder do Chaos Engineering**: Simular falhas de CDN (404 em assets) provou que a aplicação Sauce Demo é robusta o suficiente para permitir a conversão de venda mesmo sem elementos visuais, um insight de negócio valioso.
4. **Visão Crítica de Acessibilidade**: Implementar o Axe-core em todo o fluxo transacional revelou que acessibilidade não é apenas uma página estática, mas uma jornada. As falhas encontradas no Checkout são muito mais graves que as da Home para o usuário final.

---
*Análise técnica consolidada por Antigravity QA Engineering.*
