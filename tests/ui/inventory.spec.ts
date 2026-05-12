import { test, expect } from '../../src/fixtures/test.fixture';
import { env } from '../../config/environments';
import { PRODUCT_NAMES } from '../../src/constants/test-data';

test.describe('@ui Testes de Inventário e Carrinho', () => {
  test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.navigate();
  });

  test('deve ordenar os produtos por preço (menor para o maior)', async ({ inventoryPage }) => {
    await inventoryPage.sortProducts('lohi');
    const prices = await inventoryPage.getProductPrices();
    const sortedPrices = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sortedPrices);
  });

  test('deve adicionar produtos ao carrinho', async ({ inventoryPage }) => {
    await inventoryPage.addProductToCart(PRODUCT_NAMES.BACKPACK);
    await inventoryPage.addProductToCart(PRODUCT_NAMES.BIKE_LIGHT);
    expect(await inventoryPage.getCartCount()).toBe(2);
  });

  test('deve remover produtos do carrinho', async ({ inventoryPage }) => {
    await inventoryPage.addProductToCart(PRODUCT_NAMES.BACKPACK);
    await inventoryPage.removeProductFromCart(PRODUCT_NAMES.BACKPACK);
    expect(await inventoryPage.getCartCount()).toBe(0);
  });
});
