import { test, expect } from '../../src/fixtures/test.fixture';
import { env } from '../../config/environments';
import * as allure from 'allure-js-commons';
import { PRODUCT_NAMES } from '../../src/constants/test-data';

test.describe('@ui Testes de Perfil de Usuário com Problemas', () => {
  
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();
  });

  test('deve detectar falha de integridade de imagem com Problem User', async ({ loginPage, page }) => {
    await allure.description('Valida se o framework detecta que o Problem User visualiza imagens quebradas ou incorretas no inventário.');
    await allure.severity('normal');

    await loginPage.login(env.PROBLEM_USER, env.VALID_PASSWORD);
    
    const images = page.locator('.inventory_item_img img');
    const firstImageSrc = await images.first().getAttribute('src');
    
    expect(firstImageSrc).not.toContain('sl-404.168b1cce.jpg');
  });

  test('deve detectar falha ao tentar remover itens do carrinho com Problem User', async ({ loginPage, inventoryPage, page }) => {
    await allure.description('Valida um bug funcional real onde o Problem User consegue adicionar mas não consegue remover itens do carrinho.');
    await allure.severity('normal');

    await loginPage.login(env.PROBLEM_USER, env.VALID_PASSWORD);
    
    await inventoryPage.addProductToCart(PRODUCT_NAMES.BACKPACK);
    expect(await inventoryPage.getCartCount()).toBe(1);
    
    await inventoryPage.removeProductFromCart(PRODUCT_NAMES.BACKPACK);
    
    const cartCount = await inventoryPage.getCartCount();
    expect(cartCount, 'Bug Detectado: Problem User não conseguiu remover item do carrinho').toBe(0);
  });
});
