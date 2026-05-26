import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';

export class LoginPage extends BasePage {
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async navigateToLoginPage(): Promise<void> {
    await this.navigate('https://www.saucedemo.com');
    await this.waitForVisible(this.loginButton);
  }

  async fillUsername(username: string): Promise<void> {
    await this.waitForVisible(this.usernameInput);
    await this.usernameInput.clear();
    await this.usernameInput.fill(username);
  }

  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.clear();
    await this.passwordInput.fill(password);
  }

  async clickLogin(): Promise<void> {
    await this.loginButton.click();
  }

  async login(username: string, password: string): Promise<void> {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLogin();
  }

  async getErrorMessage(): Promise<string> {
    await this.waitForVisible(this.errorMessage, 5000);
    return this.getText(this.errorMessage);
  }

  async isOnLoginPage(): Promise<boolean> {
    return this.isVisible(this.loginButton);
  }
}
