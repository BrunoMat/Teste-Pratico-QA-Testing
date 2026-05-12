import * as dotenv from 'dotenv';
import path from 'path';

// Load variables from .env
dotenv.config({ path: path.resolve(__dirname, '../.env') });

export const env = {
  UI_BASE_URL: process.env.UI_BASE_URL || 'https://www.saucedemo.com',
  API_BASE_URL: process.env.API_BASE_URL || 'https://restful-booker.herokuapp.com',
  
  // UI Credentials
  STANDARD_USER: process.env.STANDARD_USER || 'standard_user',
  LOCKED_OUT_USER: process.env.LOCKED_OUT_USER || 'locked_out_user',
  PROBLEM_USER: process.env.PROBLEM_USER || 'problem_user',
  PERFORMANCE_GLITCH_USER: process.env.PERFORMANCE_GLITCH_USER || 'performance_glitch_user',
  ERROR_USER: process.env.ERROR_USER || 'error_user',
  VISUAL_USER: process.env.VISUAL_USER || 'visual_user',
  VALID_PASSWORD: process.env.VALID_PASSWORD || 'secret_sauce',

  // API Credentials
  API_USERNAME: process.env.API_USERNAME || 'admin',
  API_PASSWORD: process.env.API_PASSWORD || 'password123',
};
