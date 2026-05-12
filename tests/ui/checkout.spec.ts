import { test, expect } from '../../src/fixtures/test.fixture';
import { env } from '../../config/environments';
import { faker } from '@faker-js/faker';
import * as allure from 'allure-js-commons';
import { PRODUCT_NAMES, ERROR_MESSAGES, SUCCESS_MESSAGES } from '../../src/constants/test-data';

test.describe('@ui Testes de Fluxo de Checkout', () => {
  test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.navigate();
    await inventoryPage.addProductToCart(PRODUCT_NAMES.BACKPACK);
    await inventoryPage.goToCart();
  });

  test('deve completar o checkout com sucesso E2E', async ({ cartPage, checkoutPage, page }) => {
    await allure.description('Valida o fluxo completo de compra (E2E), desde o carrinho até a confirmação do pedido com sucesso.');
    await allure.severity('critical');
    await allure.tag('E2E');
    
    expect(await cartPage.getCartItemsCount()).toBe(1);
    await cartPage.goToCheckout();

    await checkoutPage.fillInformation(
      faker.person.firstName(),
      faker.person.lastName(),
      faker.location.zipCode()
    );

    await expect(page).toHaveURL(/.*checkout-step-two.html/);
    await checkoutPage.finish();

    await expect(page).toHaveURL(/.*checkout-complete.html/);
    expect(await checkoutPage.getSuccessMessage()).toBe(SUCCESS_MESSAGES.CHECKOUT_COMPLETE);
  });

  test('deve exibir erro se as informações de checkout estiverem faltando', async ({ cartPage, checkoutPage, page }) => {
    await cartPage.goToCheckout();
    await checkoutPage.clickElement(checkoutPage.continueButton, 'Botão Continuar');
    await page.screenshot({ path: 'test-results/screenshots/checkout-error-missing-info.png' });
    const errorMsg = await checkoutPage.getErrorMessage();
    expect(errorMsg).toContain(ERROR_MESSAGES.FIRST_NAME_REQUIRED);
  });
});
