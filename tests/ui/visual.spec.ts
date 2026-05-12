import { test, expect } from '../../src/fixtures/test.fixture';

test.describe('@ui Regressão Visual', () => {
  
  test.describe('Visual Login', () => {
    test.use({ storageState: { cookies: [], origins: [] } });
    
    test('deve validar o layout da página de login', async ({ loginPage, page }) => {
      await loginPage.navigate();
      
      await expect(page).toHaveScreenshot('login-page.png', {
          maxDiffPixelRatio: 0.2,
          fullPage: true
      });
    });
  });

  test('deve validar o layout do cabeçalho do inventário', async ({ inventoryPage, page }) => {
    await inventoryPage.navigate();
    const header = page.locator('.header_container');
    await expect(header).toHaveScreenshot('inventory-header.png', {
        maxDiffPixelRatio: 0.2
    });
  });
});
