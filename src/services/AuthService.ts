import { APIClient } from './APIClient';
import { AuthRequest, AuthResponse, AuthResponseSchema } from '../schemas/AuthSchema';
import { APIRequestContext, expect } from '@playwright/test';

export class AuthService extends APIClient {
  constructor(request: APIRequestContext, baseURL: string) {
    super(request, baseURL);
  }

  async createToken(credentials: AuthRequest): Promise<string> {
    const response = await this.post('/auth', credentials);
    expect(response.status()).toBe(200);
    
    const body = await response.json();
    const parsed = AuthResponseSchema.safeParse(body);
    
    if (!parsed.success) {
      throw new Error(`Invalid auth response schema: ${parsed.error.message}`);
    }
    
    return parsed.data.token;
  }
}
