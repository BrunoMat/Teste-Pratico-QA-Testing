import { test, expect } from '../../src/fixtures/test.fixture';
import { env } from '../../config/environments';
import AxeBuilder from '@axe-core/playwright';
import * as allure from 'allure-js-commons';

test.describe('@ui Testes de Acessibilidade', () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test('página de login deve ter violações de acessibilidade críticas', async ({ loginPage, page }) => {
    await loginPage.navigate();
    
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    if (accessibilityScanResults.violations.length > 0) {
      await allure.attachment('Violacoes-Acessibilidade-Login', JSON.stringify(accessibilityScanResults.violations, null, 2), 'application/json');
      const summary = accessibilityScanResults.violations.map(v => v.id).join(', ');
      expect(accessibilityScanResults.violations.length, `Foram encontradas violações de acessibilidade nas regras: ${summary}`).toBe(0);
    }
  });

  test('mensagem de erro de login deve ser acessível', async ({ loginPage, page }) => {
    await loginPage.navigate();
    await loginPage.login('invalid_user', 'wrong_password');
    
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    if (accessibilityScanResults.violations.length > 0) {
      await allure.attachment('Violacoes-Acessibilidade-Erro-Login', JSON.stringify(accessibilityScanResults.violations, null, 2), 'application/json');
      const summary = accessibilityScanResults.violations.map(v => v.id).join(', ');
      expect(accessibilityScanResults.violations.length, `Estado de erro com violações: ${summary}`).toBe(0);
    }
  });

  test('página de inventário deve seguir boas práticas de acessibilidade', async ({ inventoryPage, page }) => {
    await inventoryPage.navigate();
    
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    if (accessibilityScanResults.violations.length > 0) {
      await allure.attachment('Violacoes-Acessibilidade-Inventario', JSON.stringify(accessibilityScanResults.violations, null, 2), 'application/json');
      const summary = accessibilityScanResults.violations.map(v => v.id).join(', ');
      expect(accessibilityScanResults.violations.length, `Foram encontradas violações de acessibilidade nas regras: ${summary}`).toBe(0);
    }
  });
});
