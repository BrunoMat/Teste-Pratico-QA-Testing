import { test, expect } from '../../src/fixtures/test.fixture';
import { env } from '../../config/environments';

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

  test('deve exibir erro para usuário bloqueado', async ({ loginPage }) => {
    await loginPage.login(env.LOCKED_OUT_USER, env.VALID_PASSWORD);
    const errorMsg = await loginPage.getErrorMessage();
    expect(errorMsg).toContain('Epic sadface: Sorry, this user has been locked out.');
  });

  test('deve exibir erro para credenciais inválidas', async ({ loginPage }) => {
    await loginPage.login('invalid_user', 'wrong_password');
    const errorMsg = await loginPage.getErrorMessage();
    expect(errorMsg).toContain('Epic sadface: Username and password do not match any user in this service');
  });

  test('deve realizar logout com sucesso', async ({ page, loginPage, inventoryPage }) => {
    await loginPage.login(env.STANDARD_USER, env.VALID_PASSWORD);
    await page.locator('#react-burger-menu-btn').click();
    await page.locator('#logout_sidebar_link').waitFor({ state: 'visible' });
    await page.locator('#logout_sidebar_link').click();
    
    await expect(page).toHaveURL(/.*saucedemo.com\//);
  });
});
