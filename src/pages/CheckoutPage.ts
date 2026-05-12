import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly successMessage: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page, baseURL: string) {
    super(page, baseURL + '/checkout-step-one.html');
    this.firstNameInput = page.locator('#first-name');
    this.lastNameInput = page.locator('#last-name');
    this.postalCodeInput = page.locator('#postal-code');
    this.continueButton = page.locator('#continue');
    this.finishButton = page.locator('#finish');
    this.successMessage = page.locator('.complete-header');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async fillInformation(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.fillElement(this.firstNameInput, firstName, 'Nome');
    await this.fillElement(this.lastNameInput, lastName, 'Sobrenome');
    await this.fillElement(this.postalCodeInput, postalCode, 'CEP');
    await this.clickElement(this.continueButton, 'Botão Continuar');
  }

  async finish(): Promise<void> {
    await this.clickElement(this.finishButton, 'Botão Finalizar');
  }

  async getSuccessMessage(): Promise<string> {
    return await this.getText(this.successMessage);
  }

  async getErrorMessage(): Promise<string> {
    return await this.getText(this.errorMessage);
  }
}
