import { defineConfig, devices } from '@playwright/test';

// 빌드 산출물을 대상으로 테스트합니다: npm run build && npm run export:pdf && npm run test:e2e
export default defineConfig({
  testDir: 'e2e',
  fullyParallel: true,
  reporter: 'list',
  use: {
    baseURL: 'http://127.0.0.1:4300/',
    ...devices['Desktop Chrome'],
  },
  webServer: {
    command: 'node scripts/serve-static.mjs',
    env: { PORT: '4300' },
    url: 'http://127.0.0.1:4300/',
    reuseExistingServer: !process.env['CI'],
  },
});
