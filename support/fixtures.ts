import { test as base } from 'playwright-bdd';
import { createBdd } from 'playwright-bdd';
import { LoginPage } from '../pages/loginPage';
import { InventoryPage } from '../pages/inventoryPage';
import { CartPage } from '../pages/cartPage';
import { CheckoutPage } from '../pages/checkoutPage';

type PageFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
};

export type BookingState = {
  token: string;
  bookingId: number;
  bookingData: Record<string, unknown>;
  lastResponse: Record<string, unknown>;
  lastStatus: number;
};

type ApiFixtures = {
  bookingState: BookingState;
};

export const test = base.extend<PageFixtures & ApiFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
  bookingState: async ({}, use) => {
    await use({} as BookingState);
  },
});

export const { Given, When, Then } = createBdd(test);
