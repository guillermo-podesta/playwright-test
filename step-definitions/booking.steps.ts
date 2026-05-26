import { expect } from '@playwright/test';
import { Given, When, Then } from '../support/fixtures';
import { BookingApiClient } from '../utils/bookingApi';
import { defaultBooking } from '../test-data/booking.data';

Given('I authenticate with the Restful-Booker API', async ({ request, bookingState }) => {
  const api = new BookingApiClient(request);
  const { status, body } = await api.authenticate('admin', 'password123');
  expect(status).toBe(200);
  expect(body.token).toBeDefined();
  bookingState.token = body.token;
});

When('I create a new booking', async ({ request, bookingState }) => {
  const api = new BookingApiClient(request);
  const { status, body } = await api.createBooking(defaultBooking);
  bookingState.lastStatus = status;
  bookingState.bookingId = body.bookingid;
  bookingState.bookingData = body.booking;
});

Then('the booking is created with status 200', ({ bookingState }) => {
  expect(bookingState.lastStatus).toBe(200);
  expect(bookingState.bookingId).toBeDefined();
});

When('I retrieve the booking by its ID', async ({ request, bookingState }) => {
  const api = new BookingApiClient(request);
  const { status, body } = await api.getBooking(bookingState.bookingId);
  bookingState.lastStatus = status;
  if (body) bookingState.lastResponse = body;
});

Then('the retrieved booking matches the created data', ({ bookingState }) => {
  expect(bookingState.lastStatus).toBe(200);
  expect(bookingState.lastResponse.firstname).toBe(defaultBooking.firstname);
  expect(bookingState.lastResponse.lastname).toBe(defaultBooking.lastname);
  expect(bookingState.lastResponse.totalprice).toBe(defaultBooking.totalprice);
  expect(bookingState.lastResponse.bookingdates.checkin).toBe(defaultBooking.bookingdates.checkin);
});

When('I update the checkout date to {string}', async ({ request, bookingState }, newCheckout: string) => {
  const api = new BookingApiClient(request);
  const updatedBooking = {
    ...defaultBooking,
    bookingdates: { ...defaultBooking.bookingdates, checkout: newCheckout },
  };
  const { status, body } = await api.updateBooking(bookingState.bookingId, bookingState.token, updatedBooking);
  bookingState.lastStatus = status;
  bookingState.lastResponse = body;
  bookingState.lastCheckout = newCheckout;
});

Then('the booking is updated successfully', ({ bookingState }) => {
  expect(bookingState.lastStatus).toBe(200);
  expect(bookingState.lastResponse.bookingdates.checkout).toBe(bookingState.lastCheckout);
});

When('I delete the booking', async ({ request, bookingState }) => {
  const api = new BookingApiClient(request);
  const { status } = await api.deleteBooking(bookingState.bookingId, bookingState.token);
  bookingState.lastStatus = status;
});

Then('the deletion response returns status 201', ({ bookingState }) => {
  expect(bookingState.lastStatus).toBe(201);
});

Then('retrieving the deleted booking returns 404', async ({ request, bookingState }) => {
  const api = new BookingApiClient(request);
  const { status } = await api.getBooking(bookingState.bookingId);
  expect(status).toBe(404);
});
