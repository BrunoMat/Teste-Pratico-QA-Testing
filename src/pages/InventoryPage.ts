import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  readonly title: Locator;
  readonly sortDropdown: Locator;
  readonly inventoryItems: Locator;
  readonly cartIcon: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page, baseURL: string) {
    super(page, baseURL + '/inventory.html');
    this.title = page.locator('.title');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.inventoryItems = page.locator('.inventory_item');
    this.cartIcon = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  async sortProducts(optionValue: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {
    await this.sortDropdown.waitFor({ state: 'visible' });
    await this.sortDropdown.selectOption(optionValue);
  }

  async getProductPrices(): Promise<number[]> {
    await this.inventoryItems.first().waitFor({ state: 'visible' });
    const priceTexts = await this.page.locator('.inventory_item_price').allTextContents();
    return priceTexts.map(text => parseFloat(text.replace('$', '')));
  }

  async addProductToCart(productName: string): Promise<void> {
    const formattedName = productName.toLowerCase().replace(/ /g, '-');
    const button = this.page.locator(`#add-to-cart-${formattedName}`);
    await this.clickElement(button);
  }

  async removeProductFromCart(productName: string): Promise<void> {
    const formattedName = productName.toLowerCase().replace(/ /g, '-');
    const button = this.page.locator(`#remove-${formattedName}`);
    await this.clickElement(button);
  }

  async getCartCount(): Promise<number> {
    if (await this.cartBadge.isVisible()) {
      return parseInt(await this.cartBadge.textContent() || '0', 10);
    }
    return 0;
  }

  async logout(): Promise<void> {
    await this.page.locator('#react-burger-menu-btn').click();
    await this.page.locator('#logout_sidebar_link').click();
  }

  async goToCart(): Promise<void> {
    await this.clickElement(this.cartIcon);
  }
}
