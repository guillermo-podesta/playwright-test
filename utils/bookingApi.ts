import { APIRequestContext } from '@playwright/test';

const BASE_URL = 'https://restful-booker.herokuapp.com';

export interface BookingDates {
  checkin: string;
  checkout: string;
}

export interface Booking {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: BookingDates;
  additionalneeds?: string;
}

export interface AuthResponse {
  token: string;
}

export interface CreateBookingResponse {
  bookingid: number;
  booking: Booking;
}

export class BookingApiClient {
  constructor(private request: APIRequestContext) {}

  private get jsonHeaders() {
    return { 'Content-Type': 'application/json', Accept: 'application/json' };
  }

  private authHeaders(token: string) {
    return { ...this.jsonHeaders, Cookie: `token=${token}` };
  }

  async authenticate(username: string, password: string) {
    const response = await this.request.post(`${BASE_URL}/auth`, {
      data: { username, password },
      headers: this.jsonHeaders,
    });
    return { status: response.status(), body: (await response.json()) as AuthResponse };
  }

  async createBooking(data: Booking) {
    const response = await this.request.post(`${BASE_URL}/booking`, {
      data,
      headers: this.jsonHeaders,
    });
    return { status: response.status(), body: (await response.json()) as CreateBookingResponse };
  }

  async getBooking(id: number) {
    const response = await this.request.get(`${BASE_URL}/booking/${id}`, {
      headers: { Accept: 'application/json' },
    });
    const status = response.status();
    if (status !== 200) return { status, body: undefined };
    return { status, body: (await response.json()) as Booking };
  }

  async updateBooking(id: number, token: string, data: Booking) {
    const response = await this.request.put(`${BASE_URL}/booking/${id}`, {
      data,
      headers: this.authHeaders(token),
    });
    return { status: response.status(), body: (await response.json()) as Booking };
  }

  async deleteBooking(id: number, token: string) {
    const response = await this.request.delete(`${BASE_URL}/booking/${id}`, {
      headers: { Cookie: `token=${token}` },
    });
    return { status: response.status() };
  }
}
