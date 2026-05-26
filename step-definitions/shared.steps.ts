import { expect } from '@playwright/test';
import { Given, When, Then } from '../support/fixtures';
import env from '../utils/env';

Given('I am on the login page', async ({ loginPage }) => {
  await loginPage.navigateToLoginPage();
  expect(await loginPage.isOnLoginPage()).toBe(true);
});

Given('I am logged in as {string}', async ({ loginPage, inventoryPage }, username: string) => {
  await loginPage.navigateToLoginPage();
  await loginPage.login(username, env.SAUCE_PASSWORD);
  await inventoryPage.waitForPageLoad();
});

Given('I am on the inventory page', async ({ inventoryPage }) => {
  await inventoryPage.waitForPageLoad();
  expect(await inventoryPage.isOnPage()).toBe(true);
});

Given('I have added {string} to the cart', async ({ inventoryPage }, productName: string) => {
  await inventoryPage.addToCart(productName);
});

Given('I am on the cart page', async ({ inventoryPage, cartPage }) => {
  await inventoryPage.navigateToCart();
  await cartPage.waitForPageLoad();
});

Then('the cart badge should display {string}', async ({ inventoryPage }, expected: string) => {
  const count = await inventoryPage.getCartBadgeCount();
  expect(count.toString()).toBe(expected);
});

Then('the cart badge should not be visible', async ({ cartPage }) => {
  expect(await cartPage.isCartBadgeVisible()).toBe(false);
});

Then('I should be on the inventory page', async ({ inventoryPage }) => {
  await inventoryPage.waitForPageLoad();
  expect(await inventoryPage.getCurrentUrl()).toContain('inventory.html');
});

Then('I should be on the cart page', async ({ cartPage }) => {
  await cartPage.waitForPageLoad();
  expect(await cartPage.getCurrentUrl()).toContain('cart.html');
});
