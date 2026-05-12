import { test, expect } from '../../src/fixtures/test.fixture';
import { env } from '../../config/environments';
import AxeBuilder from '@axe-core/playwright';
import * as allure from 'allure-js-commons';
import { PRODUCT_NAMES } from '../../src/constants/test-data';

test.describe('@ui Testes de Acessibilidade', () => {

  test.describe('Acessibilidade da Autenticação', () => {
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
  });

  test('página de inventário deve seguir boas práticas de acessibilidade', async ({ inventoryPage, page }) => {
    await inventoryPage.navigate();
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    if (accessibilityScanResults.violations.length > 0) {
      await allure.attachment('Violacoes-Acessibilidade-Inventario', JSON.stringify(accessibilityScanResults.violations, null, 2), 'application/json');
      const summary = accessibilityScanResults.violations.map(v => v.id).join(', ');
      expect(accessibilityScanResults.violations.length, `Inventário com violações: ${summary}`).toBe(0);
    }
  });

  test('fluxo de checkout deve ser acessível', async ({ inventoryPage, cartPage, checkoutPage, page }) => {
    await inventoryPage.navigate();
    await inventoryPage.addProductToCart(PRODUCT_NAMES.BACKPACK);
    await inventoryPage.goToCart();
    
    const cartScan = await new AxeBuilder({ page }).analyze();
    if (cartScan.violations.length > 0) {
      await allure.attachment('Violacoes-Acessibilidade-Carrinho', JSON.stringify(cartScan.violations, null, 2), 'application/json');
    }

    await cartPage.goToCheckout();
    
    const checkoutScan = await new AxeBuilder({ page }).analyze();
    if (checkoutScan.violations.length > 0) {
      await allure.attachment('Violacoes-Acessibilidade-Checkout-Info', JSON.stringify(checkoutScan.violations, null, 2), 'application/json');
    }

    await checkoutPage.fillInformation('Acessivel', 'User', '12345');
    
    const overviewScan = await new AxeBuilder({ page }).analyze();
    if (overviewScan.violations.length > 0) {
      await allure.attachment('Violacoes-Acessibilidade-Checkout-Overview', JSON.stringify(overviewScan.violations, null, 2), 'application/json');
    }

    await checkoutPage.finish();
    
    const completeScan = await new AxeBuilder({ page }).analyze();
    if (completeScan.violations.length > 0) {
      await allure.attachment('Violacoes-Acessibilidade-Checkout-Complete', JSON.stringify(completeScan.violations, null, 2), 'application/json');
    }

    expect(completeScan.violations.length).toBe(0);
  });
});
