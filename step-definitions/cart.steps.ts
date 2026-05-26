import { expect } from '@playwright/test';
import { When, Then } from '../support/fixtures';

When('I navigate to the cart page', async ({ inventoryPage, cartPage }) => {
  await inventoryPage.navigateToCart();
  await cartPage.waitForPageLoad();
});

When('I remove {string} from the cart', async ({ cartPage }, productName: string) => {
  await cartPage.removeItem(productName);
});

When('I continue shopping from the cart', async ({ cartPage }) => {
  await cartPage.continueShopping();
});

Then('the cart should have {int} items', async ({ cartPage }, count: number) => {
  expect(await cartPage.getItemCount()).toBe(count);
});

Then('the cart should have {int} item', async ({ cartPage }, count: number) => {
  expect(await cartPage.getItemCount()).toBe(count);
});

Then('the cart should contain {string}', async ({ cartPage }, productName: string) => {
  expect(await cartPage.containsItem(productName)).toBe(true);
});
