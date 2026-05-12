import { test as teardown, request } from '@playwright/test';
import { BookingService } from '../../src/services/BookingService';
import { AuthService } from '../../src/services/AuthService';
import { env } from '../../config/environments';

teardown('cleanup bookings', async () => {
  const requestContext = await request.newContext();
  const authService = new AuthService(requestContext, env.API_BASE_URL);
  const bookingService = new BookingService(requestContext, env.API_BASE_URL);
  
  const token = await authService.createToken({
    username: env.API_USERNAME,
    password: env.API_PASSWORD,
  });
  
  bookingService.setAuthorizationHeader(token);
  
  console.log('Iniciando limpeza global de reservas...');
  await bookingService.teardown();
  console.log('Limpeza global concluída.');
  
  await requestContext.dispose();
});
