import { test, expect } from '../../src/fixtures/test.fixture';
import { env } from '../../config/environments';
import AxeBuilder from '@axe-core/playwright';

test.describe('@ui Testes de Acessibilidade', () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test('página de login não deve ter violações de acessibilidade críticas', async ({ loginPage, page }) => {
    await loginPage.navigate();
    
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    if (accessibilityScanResults.violations.length > 0) {
      const summary = accessibilityScanResults.violations.map(v => v.id).join(', ');
      expect(accessibilityScanResults.violations.length, `Foram encontradas violações de acessibilidade nas regras: ${summary}`).toBe(0);
    }
  });

  test('página de inventário deve seguir boas práticas de acessibilidade', async ({ loginPage, inventoryPage, page }) => {
    await loginPage.navigate();
    await loginPage.login(env.STANDARD_USER, env.VALID_PASSWORD);
    await inventoryPage.navigate();
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    if (accessibilityScanResults.violations.length > 0) {
      const summary = accessibilityScanResults.violations.map(v => v.id).join(', ');
      expect(accessibilityScanResults.violations.length, `Foram encontradas violações de acessibilidade nas regras: ${summary}`).toBe(0);
    }
  });
});
