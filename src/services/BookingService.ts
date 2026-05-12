import { APIClient } from './APIClient';
import { Booking, CreateBookingResponse, CreateBookingResponseSchema } from '../schemas/BookingSchema';
import { APIRequestContext, APIResponse } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

export class BookingService extends APIClient {
  private createdBookingIds: number[] = [];

  constructor(request: APIRequestContext, baseURL: string) {
    super(request, baseURL);
  }

  async getBookingIds(): Promise<APIResponse> {
    return await this.get('/booking');
  }

  async getBooking(id: number): Promise<APIResponse> {
    return await this.get(`/booking/${id}`, { Accept: 'application/json' });
  }

  async createBooking(booking: Booking): Promise<APIResponse> {
    return await this.post('/booking', booking);
  }

  async updateBooking(id: number, booking: Booking): Promise<APIResponse> {
    return await this.put(`/booking/${id}`, booking);
  }

  async partialUpdateBooking(id: number, booking: Partial<Booking>): Promise<APIResponse> {
    return await this.patch(`/booking/${id}`, booking);
  }

  async deleteBooking(id: number): Promise<APIResponse> {
    return await this.delete(`/booking/${id}`);
  }

  async createValidBooking(booking: Booking): Promise<CreateBookingResponse> {
    const response = await this.createBooking(booking);
    if (response.status() !== 200) {
      throw new Error(`Failed to create booking: ${await response.text()}`);
    }
    
    const body = await response.json();
    const parsed = CreateBookingResponseSchema.safeParse(body);
    
    if (!parsed.success) {
      throw new Error(`Invalid create booking response schema: ${parsed.error.message}`);
    }
    this.trackBooking(parsed.data.bookingid);
    return parsed.data;
  }

  private trackBooking(id: number): void {
    const authDir = path.resolve(process.cwd(), 'playwright/.auth');
    if (!fs.existsSync(authDir)) {
      fs.mkdirSync(authDir, { recursive: true });
    }
    const filePath = path.join(authDir, 'bookings_to_delete.txt');
    fs.appendFileSync(filePath, `${id}\n`);
  }

  async teardown(): Promise<void> {
    const filePath = path.resolve(process.cwd(), 'playwright/.auth/bookings_to_delete.txt');
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      const ids = [...new Set(content.split('\n').filter(id => id.trim() !== '').map(Number))];
      
      for (const id of ids) {
        try {
          await this.deleteBooking(id);
        } catch (e) {
        }
      }
      fs.unlinkSync(filePath);
    }
  }
}
