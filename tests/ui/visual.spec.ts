import { test, expect } from '../../src/fixtures/test.fixture';

test.describe('@ui Regressão Visual', () => {
  
  test.describe('Visual Login', () => {
    test.use({ storageState: { cookies: [], origins: [] } });
    
    test('deve validar o layout da página de login', async ({ loginPage, page }) => {
      await loginPage.navigate();
      
      try {
        await expect(page).toHaveScreenshot('login-page.png', {
            maxDiffPixelRatio: 0.2,
            fullPage: true
        });
      } catch (error: any) {
        if (error.message.includes("A snapshot doesn't exist")) {
          test.skip(true, 'Baseline visual não encontrado. O Playwright criou a imagem base, realize o commit para ativar este teste.');
        } else {
          throw error;
        }
      }
    });
  });

  test('deve validar o layout do cabeçalho do inventário', async ({ inventoryPage, page }) => {
    await inventoryPage.navigate();
    const header = page.locator('.header_container');
    
    try {
      await expect(header).toHaveScreenshot('inventory-header.png', {
          maxDiffPixelRatio: 0.2
      });
    } catch (error: any) {
      if (error.message.includes("A snapshot doesn't exist")) {
        test.skip(true, 'Baseline visual do cabeçalho não encontrado. Criando imagem base...');
      } else {
        throw error;
      }
    }
  });
});
