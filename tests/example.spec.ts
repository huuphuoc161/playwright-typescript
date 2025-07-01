import { test, expect, chromium, devices } from '@playwright/test';

// capabilities to run test on LambdaTest Web
const capabilities = {
    browserName: "Chrome", // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
    browserVersion: "latest",
    // ...devices['iPhone 12'],
    "LT:Options": {
      platform: "Windows 11",
      // deviceName: 'iPhone 13 Pro Max',
      build: "Playwright Build",
      name: "Playwright Test",
      user: "huuphuocnguyen",
      accessKey: "ac",
    },  
  };

test('Should add item to cart', async({})=>{
const browser = await chromium.connect(`wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`)
const page = await browser.newPage()
await page.goto('https://ecommerce-playground.lambdatest.io/');
await page.locator("span.title", {hasText: 'Mega Menu' }).hover()
await page.locator("a[title=Desktop]").click();
await page.locator("div.carousel-item.active > img[title='HTC Touch HD']").click()
await page.locator("//div[@id='entry_216848']").click();
await expect(page.locator("//div[@id='entry_216865']")).toBeVisible()
await expect(page.locator("//div[@class='modal-content']//table/tbody/tr[1]/td[1]")).toBeVisible()

await page.waitForTimeout(2000);
});

// test('has title', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   await page.waitForTimeout(2000);
// });

// test('Should add item to cart', async({page})=>{
//   await page.goto('https://ecommerce-playground.lambdatest.io/'); 

//   await page.locator("span.title", {hasText: 'Mega Menu' }).hover()
//   await page.locator("a[title=Desktop]").click();
//   await page.locator("div.carousel-item.active > img[title='HTC Touch HD']").click()
//   await page.locator("//div[@id='entry_216848']").click();
//   await expect(page.locator("//div[@id='entry_216865']")).toBeVisible()
//   await expect(page.locator("//div[@class='modal-content']//table/tbody/tr[1]/td[1]")).toBeVisible()

//   await page.waitForTimeout(2000);
// })