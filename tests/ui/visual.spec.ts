import { test, expect } from '../../src/fixtures/test.fixture';
import fs from 'fs';
import path from 'path';

test.describe('@ui Regressão Visual', () => {
  
  const getSnapshotPath = (testInfo: any, snapshotName: string) => {
    // Padrão do Playwright: nome-projeto-plataforma.png
    const platform = process.platform === 'win32' ? 'win32' : 'linux';
    const browser = testInfo.project.name;
    const fileName = `${snapshotName.replace('.png', '')}-${browser}-${platform}.png`;
    return path.join(testInfo.file + '-snapshots', fileName);
  };

  test.describe('Visual Login', () => {
    test.use({ storageState: { cookies: [], origins: [] } });
    
    test('deve validar o layout da página de login', async ({ loginPage, page }, testInfo) => {
      await loginPage.navigate();
      
      const snapshotPath = getSnapshotPath(testInfo, 'login-page.png');
      if (!fs.existsSync(snapshotPath)) {
        test.skip(true, 'Baseline visual não encontrado. O Playwright criará a imagem base nesta execução.');
      }

      await expect(page).toHaveScreenshot('login-page.png', {
          maxDiffPixelRatio: 0.2,
          fullPage: true
      });
    });
  });

  test('deve validar o layout do cabeçalho do inventário', async ({ inventoryPage, page }, testInfo) => {
    await inventoryPage.navigate();
    const header = page.locator('.header_container');
    
    const snapshotPath = getSnapshotPath(testInfo, 'inventory-header.png');
    if (!fs.existsSync(snapshotPath)) {
      test.skip(true, 'Baseline do cabeçalho não encontrado. Criando imagem base...');
    }

    await expect(header).toHaveScreenshot('inventory-header.png', {
        maxDiffPixelRatio: 0.2
    });
  });
});
