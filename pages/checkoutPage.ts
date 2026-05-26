import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';

export class CheckoutPage extends BasePage {
  // Step 1 — Personal info
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly zipCodeInput: Locator;
  private readonly continueButton: Locator;
  private readonly cancelButton: Locator;
  private readonly errorMessage: Locator;
  private readonly step1Container: Locator;

  // Step 2 — Overview
  private readonly overviewContainer: Locator;
  private readonly overviewItems: Locator;
  private readonly overviewItemNames: Locator;
  private readonly totalLabel: Locator;
  private readonly finishButton: Locator;

  // Complete page
  private readonly completeContainer: Locator;
  private readonly completeHeader: Locator;
  private readonly backHomeButton: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = page.locator('#first-name');
    this.lastNameInput = page.locator('#last-name');
    this.zipCodeInput = page.locator('#postal-code');
    this.continueButton = page.locator('#continue');
    this.cancelButton = page.locator('#cancel');
    this.errorMessage = page.locator('[data-test="error"]');
    this.step1Container = page.locator('#checkout_info_container');

    this.overviewContainer = page.locator('#checkout_summary_container');
    this.overviewItems = page.locator('[data-test="inventory-item"]');
    this.overviewItemNames = page.locator('[data-test="inventory-item-name"]');
    this.totalLabel = page.locator('[data-test="total-label"]');
    this.finishButton = page.locator('#finish');

    this.completeContainer = page.locator('#checkout_complete_container');
    this.completeHeader = page.locator('[data-test="complete-header"]');
    this.backHomeButton = page.locator('#back-to-products');
  }

  async fillInfo(firstName: string, lastName: string, zipCode: string): Promise<void> {
    await this.waitForVisible(this.firstNameInput, 10000);
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.zipCodeInput.fill(zipCode);
  }

  async clickContinue(): Promise<void> {
    await this.continueButton.click();
    await this.page.waitForTimeout(300);
  }

  async cancelCheckout(): Promise<void> {
    await this.cancelButton.click();
  }

  async getErrorMessage(): Promise<string> {
    await this.waitForVisible(this.errorMessage, 5000);
    return this.getText(this.errorMessage);
  }

  async isOnStep1(): Promise<boolean> {
    return this.isVisible(this.step1Container);
  }

  async isOnOverview(): Promise<boolean> {
    return this.isVisible(this.overviewContainer);
  }

  async getOverviewItemCount(): Promise<number> {
    await this.waitForVisible(this.overviewContainer);
    return this.overviewItems.count();
  }

  async getOverviewItemNames(): Promise<string[]> {
    await this.waitForVisible(this.overviewContainer);
    return this.overviewItemNames.allTextContents();
  }

  async isTotalVisible(): Promise<boolean> {
    return this.isVisible(this.totalLabel);
  }

  async clickFinish(): Promise<void> {
    await this.finishButton.click();
    await this.waitForNavigation('**/checkout-complete.html');
  }

  async isOrderComplete(): Promise<boolean> {
    await this.waitForVisible(this.completeContainer, 10000);
    return true;
  }

  async getSuccessMessage(): Promise<string> {
    await this.waitForVisible(this.completeHeader);
    return this.getText(this.completeHeader);
  }

  async backToProducts(): Promise<void> {
    await this.backHomeButton.click();
    await this.waitForNavigation('**/inventory.html');
  }
}
