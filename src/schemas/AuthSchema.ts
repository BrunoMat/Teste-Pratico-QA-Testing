import { z } from 'zod';

export const AuthRequestSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const AuthResponseSchema = z.object({
  token: z.string(),
});

export type AuthRequest = z.infer<typeof AuthRequestSchema>;
export type AuthResponse = z.infer<typeof AuthResponseSchema>;
