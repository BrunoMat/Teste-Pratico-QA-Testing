import { Page, Locator } from '@playwright/test';

export abstract class BasePage {
  readonly page: Page;
  readonly url: string;

  constructor(page: Page, url: string = '') {
    this.page = page;
    this.url = url;
  }

  /**
   * Navega para a URL da página.
   */
  async navigate(): Promise<void> {
    await this.page.goto(this.url);
    await this.waitForLoadState();
  }

  /**
   * Aguarda o carregamento completo da rede e do DOM.
   */
  async waitForLoadState(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Clica no elemento com espera automática e validação de visibilidade.
   */
  async clickElement(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.click();
  }

  /**
   * Fill input element with automatic clear and wait
   */
  async fillElement(locator: Locator, text: string): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.fill(text);
  }

  /**
   * Get text content from element
   */
  async getText(locator: Locator): Promise<string> {
    await locator.waitFor({ state: 'visible' });
    return (await locator.textContent()) || '';
  }
}
