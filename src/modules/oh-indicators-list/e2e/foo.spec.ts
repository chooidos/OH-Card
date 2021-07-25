import { test, expect, chromium } from '@playwright/test';

test('basic test', async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ bypassCSP: true, ignoreHTTPSErrors: true });
  await page.goto('http://localhost:3000/#/');
  await page.waitForResponse(request => request.url().includes('rest/events'));

  const ul = await page.$('ul');
  const li = await ul?.waitForSelector('li', { state: 'attached' });

  expect(await page.screenshot()).toMatchSnapshot({ name: 'initial.png', threshold: 1 });
});
