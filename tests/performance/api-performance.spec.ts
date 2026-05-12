import { test, expect } from '../../src/fixtures/test.fixture';

test.describe('@api Testes de Performance da API', () => {
  const PERFORMANCE_THRESHOLD_MS = 800;

  test('deve buscar todas as reservas dentro do tempo aceitável', async ({ bookingService }) => {
    const startTime = Date.now();
    const response = await bookingService.getBookingIds();
    const duration = Date.now() - startTime;

    expect(response.status()).toBe(200);
    expect(duration, `API response time was ${duration}ms, exceeding threshold of ${PERFORMANCE_THRESHOLD_MS}ms`).toBeLessThan(PERFORMANCE_THRESHOLD_MS);
  });

  test('deve realizar health check dentro do tempo limite', async ({ bookingService }) => {
    const startTime = Date.now();
    const response = await bookingService.get('/ping');
    const duration = Date.now() - startTime;

    expect(response.status()).toBe(200);
    expect(duration).toBeLessThan(500);
  });
});
