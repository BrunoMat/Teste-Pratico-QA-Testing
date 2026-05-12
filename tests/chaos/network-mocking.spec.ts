import { test, expect } from '../../src/fixtures/test.fixture';
import { env } from '../../config/environments';

test.describe('@ui Chaos Engineering - Mocking de Rede', () => {
  
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();
    await loginPage.login(env.STANDARD_USER, env.VALID_PASSWORD);
  });

  test('deve permitir finalizar a compra mesmo com falha no carregamento de imagens (CDN Down)', async ({ inventoryPage, cartPage, checkoutPage, page }) => {
    // Intercepta apenas imagens para simular queda de CDN de assets
    await page.route('**/*.{png,jpg,jpeg,svg}', route => route.fulfill({ status: 404 }));

    await inventoryPage.navigate();
    
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    expect(await inventoryPage.getCartCount()).toBe(1);

    await inventoryPage.goToCart();
    await cartPage.goToCheckout();

    await checkoutPage.fillCheckoutInfo('Chaos', 'User', '12345');
    await checkoutPage.finishCheckout();

    expect(await checkoutPage.getSuccessMessage()).toBe('Thank you for your order!');
  });
});
