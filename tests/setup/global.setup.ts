import { test as setup } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';
import { env } from '../../config/environments';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page, env.UI_BASE_URL);
  await loginPage.navigate();
  await loginPage.login(env.STANDARD_USER, env.VALID_PASSWORD);
  
  await page.waitForURL(/.*inventory.html/);
  await page.context().storageState({ path: authFile });
});
