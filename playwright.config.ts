import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  projects: [
    {
      name: 'mobile-chrome',
      use: {
        browserName: 'chromium',
        // LambdaTest capabilities for mobile
        connectOptions: {
          wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(
            JSON.stringify({
              browserName: 'Chrome',
              browserVersion: 'latest',
              platform: 'Android',
              deviceName: 'Galaxy S21',
              platformVersion: '11',
              'LT:Options': {
                username: process.env.huuphuocnguyen,
                accessKey: process.env.LT_yTiEaL0Y795tr17XLifMciqOn6OMzjZf9brM5j2v8BhhjDb,
                project: 'Mobile Automation Test',
                name: 'Cucumber Playwright Test',
                build: 'Mobile Build'
              }
            })
          )}`
        },
        viewport: { width: 360, height: 640 }, // Mobile viewport
        isMobile: true,
        hasTouch: true
      }
    }
  ],
  timeout: 60000,
  retries: 1,
  reporter: [['html', { outputFolder: 'test-results' }]]
};

export default config;