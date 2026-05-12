import { test, expect } from '../../src/fixtures/test.fixture';
import { env } from '../../config/environments';

test.describe('@api API de Autenticação', () => {
  test('deve criar um novo token de autenticação com sucesso', async ({ authService }) => {
    const token = await authService.createToken({
      username: env.API_USERNAME,
      password: env.API_PASSWORD,
    });
    
    expect(token).toBeDefined();
    expect(typeof token).toBe('string');
  });

  test('deve retornar 200 porém sem token com credenciais inválidas', async ({ authService }) => {
    const response = await authService.post('/auth', {
      username: 'invalid',
      password: 'password123',
    });
    
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('reason', 'Bad credentials');
  });
});
