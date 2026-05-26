import { expect } from '@playwright/test';
import { When, Then } from '../support/fixtures';

When('I enter username {string} and password {string}', async ({ loginPage }, username: string, password: string) => {
  await loginPage.fillUsername(username);
  await loginPage.fillPassword(password);
});

When('I click the login button', async ({ loginPage }) => {
  await loginPage.clickLogin();
});

Then('I should be redirected to the inventory page', async ({ inventoryPage }) => {
  await inventoryPage.waitForPageLoad();
  expect(await inventoryPage.getCurrentUrl()).toContain('inventory.html');
});

Then('the inventory page title should be {string}', async ({ inventoryPage }, expectedTitle: string) => {
  expect(await inventoryPage.getPageTitle()).toBe(expectedTitle);
});

Then('I should see a login error containing {string}', async ({ loginPage }, errorText: string) => {
  expect(await loginPage.getErrorMessage()).toContain(errorText);
});

Then('I should remain on the login page', async ({ loginPage }) => {
  expect(await loginPage.isOnLoginPage()).toBe(true);
  expect(await loginPage.getCurrentUrl()).not.toContain('inventory.html');
});
