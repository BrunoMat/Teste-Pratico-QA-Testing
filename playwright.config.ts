import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  fullyParallel: false, 
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 2, 
  timeout: 60000,
  expect: {
    timeout: 10000,
  },
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['list'],
    ['allure-playwright', { outputFolder: 'allure-results' }]
  ],
  use: {
    baseURL: process.env.UI_BASE_URL || 'https://www.saucedemo.com',
    extraHTTPHeaders: {
      'Accept': 'application/json',
    },
    trace: 'retain-on-failure',
    screenshot: 'on',
    video: 'retain-on-failure',
    navigationTimeout: 30000,
    actionTimeout: 15000,
  },

  projects: [
    {
      name: 'Chromium',
      use: { ...devices['Desktop Chrome'] },
      testIgnore: /api\/.*spec\.ts|security\/.*spec\.ts|performance\/.*spec\.ts/,
    },
    {
      name: 'Firefox',
      use: { ...devices['Desktop Firefox'] },
      testIgnore: /api\/.*spec\.ts|security\/.*spec\.ts|performance\/.*spec\.ts/,
    },
    {
      name: 'Webkit',
      use: { ...devices['Desktop Safari'] },
      testIgnore: /api\/.*spec\.ts|security\/.*spec\.ts|performance\/.*spec\.ts/,
    },
    {
      name: 'Mobile-Chrome',
      use: { ...devices['Pixel 5'] },
      testIgnore: /api\/.*spec\.ts|security\/.*spec\.ts|performance\/.*spec\.ts/,
    },
    {
      name: 'Mobile-Safari',
      use: { ...devices['iPhone 12'] },
      testIgnore: /api\/.*spec\.ts|security\/.*spec\.ts|performance\/.*spec\.ts/,
    },
    {
      name: 'API',
      use: { ...devices['Desktop Chrome'] },
      testMatch: /api\/.*spec\.ts|security\/.*spec\.ts|performance\/.*spec\.ts/,
    },
  ],
});
