import { test as setup, expect } from '../../src/fixtures/test.fixture';
import { env } from '../../config/environments';
import path from 'path';

const authFile = path.join(__dirname, '../../.auth/user.json');

setup('authenticate as standard_user', async ({ loginPage, page }) => {
  await loginPage.navigate();
  await loginPage.login(env.STANDARD_USER, env.VALID_PASSWORD);
  await expect(page).toHaveURL(/.*inventory.html/);

  await page.context().storageState({ path: authFile });
});
