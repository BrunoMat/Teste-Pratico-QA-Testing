const fs = require('fs');
const path = require('path');

const resultsDir = path.resolve(__dirname, '../allure-results');

if (!fs.existsSync(resultsDir)) {
    fs.mkdirSync(resultsDir, { recursive: true });
}

const envData = `
Browser=Chromium
Browser.Version=124.0
Platform=Windows
Environment=Staging
URL.UI=https://www.saucedemo.com
URL.API=https://restful-booker.herokuapp.com
Executor=Local-Senior-QA
`;
fs.writeFileSync(path.join(resultsDir, 'environment.properties'), envData);

const categories = [
    {
        name: "♿ Violações de Acessibilidade",
        matchedStatuses: ["failed"],
        messageRegex: ".*accessibility.*|.*axe-core.*|.*Acessibilidade.*"
    },
    {
        name: "⚡ Falhas de Performance (SLA)",
        matchedStatuses: ["failed"],
        messageRegex: ".*SLA.*|.*performance.*|.*duration.*"
    },
    {
        name: "🛡️ Falhas de Segurança",
        matchedStatuses: ["failed"],
        messageRegex: ".*security.*|.*forbidden.*|.*403.*|.*unauthorized.*"
    },
    {
        name: "🔌 Quebra de Contrato (API)",
        matchedStatuses: ["failed"],
        messageRegex: ".*schema.*|.*contract.*|.*ZodError.*"
    },
    {
        name: "🖥️ Erros de Interface (UI)",
        matchedStatuses: ["failed"],
        messageRegex: ".*locator.*|.*visible.*|.*timeout.*|.*screenshot.*"
    }
];
fs.writeFileSync(path.join(resultsDir, 'categories.json'), JSON.stringify(categories, null, 2));

console.log('✅ Metadados do Allure configurados!');
