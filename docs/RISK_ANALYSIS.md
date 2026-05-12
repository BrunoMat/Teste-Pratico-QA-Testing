# Análise de Riscos (Pós-Implementação)

Este documento foi atualizado após a finalização da automação para refletir os riscos reais encontrados e as soluções implementadas para garantir a estabilidade (Zero Flakiness).

| Risco Identificado | Impacto | Probabilidade | Estratégia de Mitigação Aplicada |
| :--- | :---: | :---: | :--- |
| **Concorrência de Dados na API (Race Conditions)** | Alto | Alta | **Implementado**: Isoli o projeto `api-tests` com `fullyParallel: false`. Os testes CRUD agora rodam de forma sequencial, evitando que um worker delete dados que outro ainda está lendo. |
| **Poluição de Dados na API Pública** | Médio | Alta | **Implementado**: Global Teardown com persistência de IDs. Criei um sistema que rastreia cada reserva em arquivo e faz a limpeza total apenas no fim da suíte, garantindo um ambiente limpo para o próximo ciclo. |
| **Falsos Negativos em Acessibilidade** | Médio | Média | **Implementado**: Filtragem de Impacto. Ajustei o scan do Axe-core para focar em violações "Críticas" e "Sérias", evitando que bugs estéticos conhecidos do Sauce Demo bloqueiem o pipeline. |
| **Instabilidade de Rede no CI (GitHub Actions)** | Alto | Média | **Implementado**: Uso de `retries: 2` no CI e aumento dos timeouts de asserção para 10s em operações críticas de rede. |
| **Exposição de Credenciais** | Crítico | Baixa | **Implementado**: Uso de `.gitignore` estrito e injeção de variáveis de ambiente diretamente no Workflow do GitHub Actions, evitando a subida de arquivos `.env`. |

---

### 📝 Lições Aprendidas

1. **Paralelismo Estratégico vs. Bruto**: Observei que o uso de paralelismo máximo em APIs públicas pode causar instabilidade (429 Too Many Requests). A lição aplicada foi o isolamento de projetos, onde a UI roda em paralelo (ganho de tempo) e a API roda sequencialmente (ganho de estabilidade).
2. **Teardown Baseado em Persistência**: A limpeza de dados via fixture `afterEach` mostrou-se ineficaz para suítes CRUD dependentes. A solução de persistir IDs em arquivo para um `Global Teardown` garantiu que os dados persistissem durante o fluxo e fossem limpos apenas no final, reduzindo o tráfego de rede.
3. **Resiliência vs. Rigidez (Acessibilidade)**: Diferenciar violações críticas de falhas estéticas em aplicações legadas ou de terceiros me permitiu manter um pipeline de CI saudável (verde) sem ignorar a auditoria de qualidade.
4. **Valor do Chaos Engineering**: O uso de `network interception` (Mocking) provou que a jornada de compra é tecnicamente resiliente a falhas de CDN, garantindo que o negócio não pare mesmo se as imagens não carregarem.
