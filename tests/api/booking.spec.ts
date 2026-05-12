import { test, expect } from '../../src/fixtures/test.fixture';
import { BookingBuilder } from '../../src/builders/BookingBuilder';
import { env } from '../../config/environments';
import { z } from 'zod';
import * as allure from 'allure-js-commons';

const BookingSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  totalprice: z.number(),
  depositpaid: z.boolean(),
  bookingdates: z.object({
    checkin: z.string(),
    checkout: z.string()
  }),
  additionalneeds: z.string().optional()
});

test.describe('@api Operações CRUD de Reservas', () => {
  let bookingId: number;
  let token: string;

  test.beforeAll(async ({ authService }) => {
    token = await authService.createToken({
      username: env.API_USERNAME,
      password: env.API_PASSWORD,
    });
  });

  test('deve criar uma nova reserva', async ({ bookingService }) => {
    await allure.description('Valida a criação de uma reserva via POST. Garante que o serviço de backend está aceitando novas entradas e retornando IDs válidos.');
    await allure.severity('critical');
    
    const bookingData = new BookingBuilder().build();
    const result = await bookingService.createValidBooking(bookingData);
    
    expect(result.bookingid).toBeGreaterThan(0);
    expect(result.booking.firstname).toBe(bookingData.firstname);
    bookingId = result.bookingid;
  });

  test('deve buscar reserva por ID', async ({ bookingService }) => {
    expect(bookingId).toBeDefined();
    
    const response = await bookingService.getBooking(bookingId);
    expect(response.status()).toBe(200);
    
    const body = await response.json();
    expect(body).toHaveProperty('firstname');

    const result = BookingSchema.safeParse(body);
    expect(result.success, `Contrato da API quebrado: ${JSON.stringify(result.error)}`).toBe(true);
  });

  test('deve atualizar completamente a reserva', async ({ bookingService }) => {
    if (!bookingId) {
      const result = await bookingService.createValidBooking(new BookingBuilder().build());
      bookingId = result.bookingid;
    }
    
    bookingService.setAuthorizationHeader(token);

    const updatedData = new BookingBuilder().withFirstname('UpdatedName').build();
    const response = await bookingService.updateBooking(bookingId, updatedData);
    
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.firstname).toBe('UpdatedName');
  });

  test('deve atualizar parcialmente a reserva', async ({ bookingService }) => {
    if (!bookingId) {
      const result = await bookingService.createValidBooking(new BookingBuilder().build());
      bookingId = result.bookingid;
    }

    bookingService.setAuthorizationHeader(token);

    const patchData = { firstname: 'PatchedName' };
    const response = await bookingService.partialUpdateBooking(bookingId, patchData);
    
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.firstname).toBe('PatchedName');
  });

  test('deve retornar erro 400 ao tentar criar reserva sem campos obrigatórios', async ({ bookingService }) => {
    const invalidBooking = {
      lastname: 'MissingFirstName',
      totalprice: 100,
      depositpaid: true,
      bookingdates: { checkin: '2023-01-01', checkout: '2023-01-02' }
    };
    
    const response = await bookingService.post('/booking', invalidBooking);
    expect(response.status()).toBe(400);
  });

  test('deve buscar reserva utilizando filtro por nome', async ({ bookingService }) => {
    const uniqueFirstName = `TestFilter${Date.now()}`;
    const bookingData = new BookingBuilder().withFirstname(uniqueFirstName).build();
    await bookingService.createValidBooking(bookingData);

    const response = await bookingService.get(`/booking?firstname=${uniqueFirstName}`);
    expect(response.status()).toBe(200);
    
    const body = await response.json();
    expect(body.length).toBeGreaterThan(0);
    expect(body[0]).toHaveProperty('bookingid');
  });

  test('deve remover a reserva', async ({ bookingService }) => {
    if (!bookingId) {
      const result = await bookingService.createValidBooking(new BookingBuilder().build());
      bookingId = result.bookingid;
    }

    bookingService.setAuthorizationHeader(token);

    const response = await bookingService.deleteBooking(bookingId);
    expect(response.status()).toBe(204);
    
    const getResponse = await bookingService.getBooking(bookingId);
    expect(getResponse.status()).toBe(404);
  });
});
