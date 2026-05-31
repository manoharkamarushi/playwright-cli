import { Page } from '@playwright/test';

export async function waitForElement(page: Page, selector: string, timeout: number = 5000) {
  return page.waitForSelector(selector, { timeout });
}

export async function clickAndWait(page: Page, selector: string, navigationPromise?: Promise<any>) {
  await page.click(selector);
  if (navigationPromise) {
    await navigationPromise;
  }
}
