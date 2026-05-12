import { test as baseTest, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { AuthService } from '../services/AuthService';
import { BookingService } from '../services/BookingService';
import { env } from '../../config/environments';

type CustomFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  authService: AuthService;
  bookingService: BookingService;
};

export const test = baseTest.extend<CustomFixtures>({
  loginPage: async ({ page }, use, testInfo) => {
    const pathParts = testInfo.file.split(/[\\\/]/);
    const pillar = pathParts.slice(-2, -1)[0].toUpperCase();
    const fileName = pathParts.slice(-1)[0].replace('.spec.ts', '').toUpperCase();

    await allure.epic(pillar);
    await allure.feature(fileName);
    await allure.story(testInfo.title);
    await allure.parentSuite(pillar);

    const loginPage = new LoginPage(page, env.UI_BASE_URL);
    
    const originalLogin = loginPage.login.bind(loginPage);
    loginPage.login = async (user, pass) => {
        await baseTest.step(`Login na UI - Usuário: ${user} | Senha: ********`, async () => {
            return await originalLogin(user, pass);
        });
    };

    await use(loginPage);
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page, env.UI_BASE_URL));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page, env.UI_BASE_URL));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page, env.UI_BASE_URL));
  },
  authService: async ({ request }, use, testInfo) => {
    const pathParts = testInfo.file.split(/[\\\/]/);
    const pillar = pathParts.slice(-2, -1)[0].toUpperCase();
    const fileName = pathParts.slice(-1)[0].replace('.spec.ts', '').toUpperCase();

    await allure.epic(pillar);
    await allure.feature(fileName);
    await allure.story(testInfo.title);
    await allure.parentSuite(pillar);

    const authService = new AuthService(request, env.API_BASE_URL);
    
    const originalCreateToken = authService.createToken.bind(authService);
    authService.createToken = async (data) => {
        let result: string;
        await baseTest.step(`Auth API - Usuário: ${data.username} | Senha: ********`, async () => {
            result = await originalCreateToken(data);
        });
        return result!;
    };

    await use(authService);
  },
  bookingService: async ({ request }, use, testInfo) => {
    const pathParts = testInfo.file.split(/[\\\/]/);
    const pillar = pathParts.slice(-2, -1)[0].toUpperCase();
    const fileName = pathParts.slice(-1)[0].replace('.spec.ts', '').toUpperCase();

    await allure.epic(pillar);
    await allure.feature(fileName);
    await allure.story(testInfo.title);
    await allure.parentSuite(pillar);

    const service = new BookingService(request, env.API_BASE_URL);
    await use(service);
  },
});

export { expect } from '@playwright/test';
