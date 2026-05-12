import { test as setup, expect } from '../../src/fixtures/test.fixture';
import { env } from '../../config/environments';
import path from 'path';
import * as allure from 'allure-js-commons';

const authFile = path.join(__dirname, '../../.auth/user.json');

setup('authenticate as standard_user', async ({ loginPage, page }) => {
  await allure.parentSuite('🛠️ SETUP & INFRA');
  await allure.suite('Autenticação de Usuário');

  await loginPage.navigate();
  await loginPage.login(env.STANDARD_USER, env.VALID_PASSWORD);
  await expect(page).toHaveURL(/.*inventory.html/);

  await page.context().storageState({ path: authFile });
});
