import { test, expect } from '../../src/fixtures/test.fixture';
import { env } from '../../config/environments';

test.describe('@ui Testes de Inventário e Carrinho', () => {
  test.beforeEach(async ({ loginPage, inventoryPage }) => {
    await loginPage.navigate();
    await loginPage.login(env.STANDARD_USER, env.VALID_PASSWORD);
    await inventoryPage.navigate();
  });

  test('deve ordenar os produtos por preço (menor para o maior)', async ({ inventoryPage }) => {
    await inventoryPage.sortProducts('lohi');
    const prices = await inventoryPage.getProductPrices();
    const sortedPrices = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sortedPrices);
  });

  test('deve adicionar e remover itens do carrinho', async ({ inventoryPage }) => {
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.addProductToCart('Sauce Labs Bike Light');
    
    expect(await inventoryPage.getCartCount()).toBe(2);
    await inventoryPage.removeProductFromCart('Sauce Labs Backpack');
    expect(await inventoryPage.getCartCount()).toBe(1);
  });
});
