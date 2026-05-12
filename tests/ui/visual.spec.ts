import { test, expect } from '../../src/fixtures/test.fixture';

test.describe('@ui Regressão Visual', () => {
  
  test('deve validar o layout da página de login', async ({ loginPage, page }) => {
    await loginPage.navigate();
    
    await expect(page).toHaveScreenshot('login-page.png', {
        maxDiffPixelRatio: 0.1,
        fullPage: true
    });
  });

  test('deve validar o layout do cabeçalho do inventário', async ({ loginPage, inventoryPage, page }) => {
    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.navigate();
    const header = page.locator('.header_container');
    await expect(header).toHaveScreenshot('inventory-header.png');
  });
});
