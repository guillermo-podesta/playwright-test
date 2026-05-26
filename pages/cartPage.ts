import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';

export class CartPage extends BasePage {
  private readonly cartContainer: Locator;
  private readonly cartItems: Locator;
  private readonly cartBadge: Locator;
  private readonly checkoutButton: Locator;
  private readonly continueShoppingButton: Locator;
  private readonly itemNames: Locator;

  constructor(page: Page) {
    super(page);
    this.cartContainer = page.locator('#cart_contents_container');
    this.cartItems = page.locator('[data-test="inventory-item"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.checkoutButton = page.locator('#checkout');
    this.continueShoppingButton = page.locator('#continue-shopping');
    this.itemNames = page.locator('[data-test="inventory-item-name"]');
  }

  async waitForPageLoad(): Promise<void> {
    await this.waitForVisible(this.cartContainer, 10000);
  }

  async isOnPage(): Promise<boolean> {
    return this.isVisible(this.cartContainer);
  }

  async getItemCount(): Promise<number> {
    await this.waitForPageLoad();
    return this.cartItems.count();
  }

  async getItemNames(): Promise<string[]> {
    await this.waitForPageLoad();
    return this.itemNames.allTextContents();
  }

  async containsItem(productName: string): Promise<boolean> {
    const names = await this.getItemNames();
    return names.includes(productName);
  }

  async removeItem(productName: string): Promise<void> {
    const slug = this.toSlug(productName);
    const button = this.page.locator(`#remove-${slug}`);
    await this.clickWithRetry(button);
    await this.page.waitForTimeout(300);
  }

  async isCartBadgeVisible(): Promise<boolean> {
    return this.isVisible(this.cartBadge);
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
    await this.waitForNavigation('**/checkout-step-one.html');
  }

  async continueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
    await this.waitForNavigation('**/inventory.html');
  }
}
