import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';
import os from 'os';

const testDir = defineBddConfig({
  features: 'features/**/*.feature',
  steps: ['support/fixtures.ts', 'step-definitions/**/*.ts'],
});

const githubActionsReporter: [string, Record<string, unknown>] = [
  '@estruyf/github-actions-reporter',
  { title: 'Playwright Tests Results', useDetails: true, showError: true },
];

export default defineConfig({
  testDir,
  timeout: 30000,
  retries: 1,
  fullyParallel: true,
  workers: os.cpus().length,

  use: {
    baseURL: 'https://www.saucedemo.com',
    headless: true,
    viewport: { width: 1280, height: 720 },
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    navigationTimeout: 15000,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  reporter: [
    ['list'],
    ['html', { outputFolder: 'reports/playwright-html', open: 'never' }],
    githubActionsReporter,
  ],
});
