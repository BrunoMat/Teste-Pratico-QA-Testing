import { test, expect } from '../../src/fixtures/test.fixture';
import { BookingBuilder } from '../../src/builders/BookingBuilder';

test.describe('@api Testes de Segurança da API', () => {
  let bookingId: number;

  test.beforeAll(async ({ bookingService }) => {
    const booking = new BookingBuilder().build();
    const response = await bookingService.createValidBooking(booking);
    bookingId = response.bookingid;
  });

  test('não deve permitir DELETE sem autorização', async ({ bookingService }) => {
    bookingService.clearHeaders();
    const response = await bookingService.deleteBooking(bookingId);
    expect(response.status()).toBe(403);
  });

  test('não deve permitir PUT sem autorização', async ({ bookingService }) => {
    bookingService.clearHeaders();
    const bookingData = new BookingBuilder().build();
    const response = await bookingService.updateBooking(bookingId, bookingData);
    
    expect(response.status()).toBe(403);
  });

  test('deve falhar com injeção básica de SQL na autenticação', async ({ authService }) => {
    const response = await authService.post('/auth', {
      username: "' OR '1'='1",
      password: "password123",
    });
    
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.reason).toBe('Bad credentials');
  });
});
