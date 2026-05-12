import { Page, Locator } from '@playwright/test';
import * as allure from 'allure-js-commons';

export abstract class BasePage {
  readonly page: Page;
  readonly url: string;

  constructor(page: Page, url: string = '') {
    this.page = page;
    this.url = url;
  }

  async navigate(path: string = ''): Promise<void> {
    await allure.step(`Navegando para: ${this.url}${path}`, async () => {
      await this.page.goto(`${this.url}${path}`);
      await this.waitForLoadState();
    });
  }

  async waitForLoadState(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
  }

  async clickElement(locator: Locator, description: string): Promise<void> {
    await allure.step(`Clicar em: ${description}`, async () => {
      await locator.waitFor({ state: 'visible' });
      await locator.click();
    });
  }

  async fillElement(locator: Locator, text: string, description: string): Promise<void> {
    await allure.step(`Preencher '${description}' com: ${description.toLowerCase().includes('senha') ? '********' : text}`, async () => {
      await locator.waitFor({ state: 'visible' });
      await locator.fill(text);
    });
  }

  async getText(locator: Locator): Promise<string> {
    await locator.waitFor({ state: 'visible' });
    return (await locator.textContent()) || '';
  }
}
