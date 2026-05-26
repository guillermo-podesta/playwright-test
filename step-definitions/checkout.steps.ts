import { expect } from '@playwright/test';
import { When, Then } from '../support/fixtures';

When('I proceed to checkout', async ({ cartPage }) => {
  await cartPage.proceedToCheckout();
});

When('I fill in first name {string}, last name {string}, and zip code {string}',
  async ({ checkoutPage }, firstName: string, lastName: string, zipCode: string) => {
    await checkoutPage.fillInfo(firstName, lastName, zipCode);
  },
);

When('I click continue on the checkout info page', async ({ checkoutPage }) => {
  await checkoutPage.clickContinue();
});

When('I click finish', async ({ checkoutPage }) => {
  await checkoutPage.clickFinish();
});

Then('I should be on the checkout overview page', async ({ checkoutPage }) => {
  expect(await checkoutPage.isOnOverview()).toBe(true);
  expect(await checkoutPage.getCurrentUrl()).toContain('checkout-step-two.html');
});

Then('I should be on the order complete page', async ({ checkoutPage }) => {
  expect(await checkoutPage.isOrderComplete()).toBe(true);
});

Then('the success header should contain {string}', async ({ checkoutPage }, text: string) => {
  expect(await checkoutPage.getSuccessMessage()).toContain(text);
});

Then('the overview should contain {string}', async ({ checkoutPage }, productName: string) => {
  expect(await checkoutPage.getOverviewItemNames()).toContain(productName);
});

Then('the order total should be visible', async ({ checkoutPage }) => {
  expect(await checkoutPage.isTotalVisible()).toBe(true);
});
