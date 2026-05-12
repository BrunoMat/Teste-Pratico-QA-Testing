import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly checkoutButton: Locator;
  readonly cartItems: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page, baseURL: string) {
    super(page, baseURL + '/cart.html');
    this.checkoutButton = page.locator('#checkout');
    this.cartItems = page.locator('.cart_item');
    this.continueShoppingButton = page.locator('#continue-shopping');
  }

  async goToCheckout(): Promise<void> {
    await this.clickElement(this.checkoutButton, 'Botão de Checkout');
  }

  async getCartItemsCount(): Promise<number> {
    return await this.cartItems.count();
  }

  async getCartItemNames(): Promise<string[]> {
    return await this.cartItems.locator('.inventory_item_name').allTextContents();
  }
}
