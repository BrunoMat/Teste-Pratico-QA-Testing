import { test, expect } from '../../src/fixtures/test.fixture';
import { env } from '../../config/environments';
import { faker } from '@faker-js/faker';
import * as allure from 'allure-js-commons';

test.describe('@ui Testes de Fluxo de Checkout', () => {
  test.beforeEach(async ({ loginPage, inventoryPage }) => {
    await loginPage.navigate();
    await loginPage.login(env.STANDARD_USER, env.VALID_PASSWORD);
    await inventoryPage.navigate();
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.goToCart();
  });

  test('deve completar o checkout com sucesso E2E', async ({ cartPage, checkoutPage, page }) => {
    await allure.description('Valida o fluxo completo de compra (E2E), desde o carrinho até a confirmação do pedido com sucesso.');
    await allure.severity('critical');
    await allure.tag('E2E');
    
    expect(await cartPage.getCartItemsCount()).toBe(1);
    await cartPage.goToCheckout();

    await checkoutPage.fillCheckoutInfo(
      faker.person.firstName(),
      faker.person.lastName(),
      faker.location.zipCode()
    );

    await expect(page).toHaveURL(/.*checkout-step-two.html/);
    await checkoutPage.finishCheckout();

    await expect(page).toHaveURL(/.*checkout-complete.html/);
    expect(await checkoutPage.getSuccessMessage()).toBe('Thank you for your order!');
  });

  test('deve exibir erro se as informações de checkout estiverem faltando', async ({ cartPage, checkoutPage }) => {
    await cartPage.goToCheckout();
    await checkoutPage.clickElement(checkoutPage.continueButton);
    const errorMsg = await checkoutPage.getErrorMessage();
    expect(errorMsg).toContain('Error: First Name is required');
  });
});
