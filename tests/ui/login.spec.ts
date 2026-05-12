import { test, expect } from '../../src/fixtures/test.fixture';
import { env } from '../../config/environments';
import * as allure from 'allure-js-commons';
import { ERROR_MESSAGES } from '../../src/constants/test-data';

test.describe('@ui Testes de Autenticação UI', () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();
  });

  test('deve logar com sucesso com usuário padrão', async ({ page, loginPage }) => {
    await allure.description('Valida o fluxo principal de autenticação utilizando credenciais válidas. Este é um teste crítico de fumaça (Smoke Test).');
    await allure.severity('blocker');
    await allure.owner('Squad-Core');
    
    await loginPage.login(env.STANDARD_USER, env.VALID_PASSWORD);
    await expect(page).toHaveURL(/.*inventory.html/);
  });

  test('deve exibir erro para usuário bloqueado', async ({ loginPage, page }) => {
    await loginPage.login(env.LOCKED_OUT_USER, env.VALID_PASSWORD);
    await page.screenshot({ path: 'test-results/screenshots/login-error-locked.png' });
    const errorMsg = await loginPage.getErrorMessage();
    expect(errorMsg).toContain(ERROR_MESSAGES.LOCKED_USER);
  });

  test('deve exibir erro para credenciais inválidas', async ({ loginPage, page }) => {
    await loginPage.login('invalid_user', 'wrong_password');
    await page.screenshot({ path: 'test-results/screenshots/login-error-invalid.png' });
    const errorMsg = await loginPage.getErrorMessage();
    expect(errorMsg).toContain(ERROR_MESSAGES.INVALID_CREDENTIALS);
  });

  test('deve realizar logout com sucesso', async ({ loginPage, inventoryPage, page }) => {
    await loginPage.login(env.STANDARD_USER, env.VALID_PASSWORD);
    await inventoryPage.logout();
    await expect(page).toHaveURL(new RegExp(env.UI_BASE_URL + '/?'));
  });
});
