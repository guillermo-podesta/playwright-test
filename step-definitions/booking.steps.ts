import { expect } from '@playwright/test';
import { Given, When, Then } from '../support/fixtures';

const BASE_URL = 'https://restful-booker.herokuapp.com';

const bookingPayload = {
  firstname: 'John',
  lastname: 'Doe',
  totalprice: 150,
  depositpaid: true,
  bookingdates: {
    checkin: '2025-06-01',
    checkout: '2025-06-10',
  },
  additionalneeds: 'Breakfast',
};

Given('I authenticate with the Restful-Booker API', async ({ request, bookingState }) => {
  const response = await request.post(`${BASE_URL}/auth`, {
    data: { username: 'admin', password: 'password123' },
    headers: { 'Content-Type': 'application/json' },
  });
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.token).toBeDefined();
  bookingState.token = body.token;
});

When('I create a new booking', async ({ request, bookingState }) => {
  const response = await request.post(`${BASE_URL}/booking`, {
    data: bookingPayload,
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  });
  bookingState.lastStatus = response.status();
  const body = await response.json();
  bookingState.bookingId = body.bookingid;
  bookingState.bookingData = body.booking;
});

Then('the booking is created with status 200', ({ bookingState }) => {
  expect(bookingState.lastStatus).toBe(200);
  expect(bookingState.bookingId).toBeDefined();
});

When('I retrieve the booking by its ID', async ({ request, bookingState }) => {
  const response = await request.get(`${BASE_URL}/booking/${bookingState.bookingId}`, {
    headers: { Accept: 'application/json' },
  });
  bookingState.lastStatus = response.status();
  bookingState.lastResponse = await response.json();
});

Then('the retrieved booking matches the created data', ({ bookingState }) => {
  expect(bookingState.lastStatus).toBe(200);
  expect(bookingState.lastResponse.firstname).toBe(bookingPayload.firstname);
  expect(bookingState.lastResponse.lastname).toBe(bookingPayload.lastname);
  expect(bookingState.lastResponse.totalprice).toBe(bookingPayload.totalprice);
  expect((bookingState.lastResponse.bookingdates as Record<string, string>).checkin).toBe(
    bookingPayload.bookingdates.checkin
  );
});

When('I update the checkout date to {string}', async ({ request, bookingState }, newCheckout: string) => {
  const updatedPayload = {
    ...bookingPayload,
    bookingdates: { ...bookingPayload.bookingdates, checkout: newCheckout },
  };
  const response = await request.put(`${BASE_URL}/booking/${bookingState.bookingId}`, {
    data: updatedPayload,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Cookie: `token=${bookingState.token}`,
    },
  });
  bookingState.lastStatus = response.status();
  bookingState.lastResponse = await response.json();
});

Then('the booking is updated successfully', ({ bookingState }) => {
  expect(bookingState.lastStatus).toBe(200);
  expect(
    (bookingState.lastResponse.bookingdates as Record<string, string>).checkout
  ).toBe('2025-06-15');
});

When('I delete the booking', async ({ request, bookingState }) => {
  const response = await request.delete(`${BASE_URL}/booking/${bookingState.bookingId}`, {
    headers: { Cookie: `token=${bookingState.token}` },
  });
  bookingState.lastStatus = response.status();
});

Then('the deletion response returns status 201', ({ bookingState }) => {
  expect(bookingState.lastStatus).toBe(201);
});

Then('retrieving the deleted booking returns 404', async ({ request, bookingState }) => {
  const response = await request.get(`${BASE_URL}/booking/${bookingState.bookingId}`, {
    headers: { Accept: 'application/json' },
  });
  expect(response.status()).toBe(404);
});
