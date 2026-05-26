import { Page, Locator } from '@playwright/test';

export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  protected async navigate(url: string): Promise<void> {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  async waitForVisible(locator: Locator, timeout = 10000): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
  }

  async getText(locator: Locator): Promise<string> {
    return (await locator.textContent()) ?? '';
  }

  async isVisible(locator: Locator): Promise<boolean> {
    return locator.isVisible();
  }

  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  async waitForNavigation(urlPattern: string | RegExp): Promise<void> {
    await this.page.waitForURL(urlPattern, { timeout: 15000 });
  }

  protected toSlug(productName: string): string {
    return productName.toLowerCase().replace(/ /g, '-');
  }

  protected async clickWithRetry(locator: Locator, maxRetries = 3): Promise<void> {
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        await locator.waitFor({ state: 'visible', timeout: 5000 });
        await locator.click({ timeout: 5000 });
        return;
      } catch (err) {
        if (attempt === maxRetries - 1) throw err;
        await this.page.waitForTimeout(300);
      }
    }
  }
}
