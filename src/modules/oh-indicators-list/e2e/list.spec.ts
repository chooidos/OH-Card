import { test, expect, chromium } from '@playwright/test';

const strictThreshold = 0;
const laxThreshold = 1;
const url = 'http://localhost:3000/#/';
const expectedIndicatorsCount = 44;

// https://playwright.dev/docs/intro
test('List.tsx e2e', async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ bypassCSP: true, ignoreHTTPSErrors: true });
  await page.goto(url);

  // https://playwright.dev/docs/api/class-page#page-wait-for-response
  await page.waitForResponse(request => request.url().includes('rest/events'));

  const ul = await page.$('ul');
  // https://playwright.dev/docs/api/class-elementhandle#element-handle-wait-for-selector
  const li = await ul?.waitForSelector('li', { state: 'attached' });

  // https://playwright.dev/docs/screenshots
  expect(await page.screenshot()).toMatchSnapshot({ name: 'initial.png', threshold: 0.5 });

  // https://playwright.dev/docs/api/class-elementhandle#element-handle-eval-on-selector-all
  const liCount = await page.$$eval('li', lis => lis.length);
  expect(liCount).toBe(expectedIndicatorsCount);
});
