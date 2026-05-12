import { test, expect } from '../../src/fixtures/test.fixture';
import { env } from '../../config/environments';

test.describe('@ui Performance de Interface (SLA)', () => {
  
  test('página de inventário deve carregar em menos de 2 segundos', async ({ inventoryPage, page }) => {
    const startTime = Date.now();
    await inventoryPage.navigate();
    const duration = Date.now() - startTime;

    console.log(`Página de inventário carregada em ${duration}ms`);
    
    expect(duration, `Página demorou ${duration}ms para carregar, acima do SLA de 2s`).toBeLessThan(2000);
  });

  test('deve medir o tempo de resposta do login', async ({ loginPage, page }) => {
    await loginPage.navigate();
    
    const startTime = Date.now();
    await loginPage.login(env.STANDARD_USER, env.VALID_PASSWORD);
    await page.waitForURL(/.*inventory.html/);
    const duration = Date.now() - startTime;

    console.log(`Login processado em ${duration}ms`);
    expect(duration).toBeLessThan(3000); // Login deve ser processado em menos de 3s
  });
});
