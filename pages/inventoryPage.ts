import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';

export class InventoryPage extends BasePage {
  private readonly inventoryContainer: Locator;
  private readonly inventoryItems: Locator;
  private readonly itemNames: Locator;
  private readonly sortDropdown: Locator;
  private readonly cartBadge: Locator;
  private readonly cartLink: Locator;
  private readonly pageTitle: Locator;

  constructor(page: Page) {
    super(page);
    this.inventoryContainer = page.locator('[data-test="inventory-container"]');
    this.inventoryItems = page.locator('[data-test="inventory-item"]');
    this.itemNames = page.locator('[data-test="inventory-item-name"]');
    this.sortDropdown = page.locator('#product_sort_container');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.cartLink = page.locator('#shopping_cart_container');
    this.pageTitle = page.locator('[data-test="title"]');
  }

  async waitForPageLoad(): Promise<void> {
    await this.waitForVisible(this.inventoryContainer, 15000);
  }

  async isOnPage(): Promise<boolean> {
    return this.isVisible(this.inventoryContainer);
  }

  async getPageTitle(): Promise<string> {
    await this.waitForVisible(this.pageTitle);
    return this.getText(this.pageTitle);
  }

  async getProductCount(): Promise<number> {
    await this.waitForPageLoad();
    return this.inventoryItems.count();
  }

  async getProductNames(): Promise<string[]> {
    await this.waitForPageLoad();
    return this.itemNames.allTextContents();
  }

  async addToCart(productName: string): Promise<void> {
    const slug = this.toSlug(productName);
    const button = this.page.locator(`#add-to-cart-${slug}`);
    await this.clickWithRetry(button);
    await this.page.waitForTimeout(300);
  }

  async getCartBadgeCount(): Promise<number> {
    if (await this.isVisible(this.cartBadge)) {
      const text = await this.getText(this.cartBadge);
      return parseInt(text, 10);
    }
    return 0;
  }

  async isCartBadgeVisible(): Promise<boolean> {
    return this.isVisible(this.cartBadge);
  }

  async navigateToCart(): Promise<void> {
    await this.cartLink.click();
    await this.waitForNavigation('**/cart.html');
  }
}
