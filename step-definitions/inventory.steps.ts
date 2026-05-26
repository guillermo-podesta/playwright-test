import { expect } from '@playwright/test';
import { When, Then } from '../support/fixtures';

When('I add {string} to the cart from inventory', async ({ inventoryPage }, productName: string) => {
  await inventoryPage.addToCart(productName);
});

Then('I should see the inventory page', async ({ inventoryPage }) => {
  expect(await inventoryPage.isOnPage()).toBe(true);
});

Then('there should be {int} products listed', async ({ inventoryPage }, count: number) => {
  expect(await inventoryPage.getProductCount()).toBe(count);
});
