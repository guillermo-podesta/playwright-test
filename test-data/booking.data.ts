import { Booking } from '../utils/bookingApi';

export const defaultBooking: Booking = {
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
